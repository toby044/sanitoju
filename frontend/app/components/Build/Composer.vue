<script setup lang="ts">
import {
  BUILD_BLOCKS,
  BUILD_DEFAULTS,
  type BuildBlock,
  findBlock,
  formatBuildPrice,
} from '~/utils/buildBlocks'

type Item = { uid: string; blockId: string }
type DragSource = 'palette' | 'dock'
type Drag = {
  block: BuildBlock
  source: DragSource
  uid?: string
  x: number
  y: number
}

const { discountPct, discountThreshold } = BUILD_DEFAULTS

const categories = computed(() => {
  const set = new Set(BUILD_BLOCKS.map((b) => b.category))
  return ['All', ...set] as string[]
})

const activeCat = ref<string>('All')
const filtered = computed(() =>
  activeCat.value === 'All' ? BUILD_BLOCKS : BUILD_BLOCKS.filter((b) => b.category === activeCat.value),
)

const selectedId = ref<string | null>(null)
const selected = computed(() => (selectedId.value ? findBlock(selectedId.value) ?? null : null))

const items = ref<Item[]>([])
const drag = ref<Drag | null>(null)
const overDock = ref(false)
const dropIdx = ref<number | null>(null)
const toast = ref<string | null>(null)
const bump = ref(false)

const dockEl = ref<HTMLElement | null>(null)
const chipsEl = ref<HTMLElement | null>(null)

let toastTimer: ReturnType<typeof setTimeout> | null = null
let bumpTimer: ReturnType<typeof setTimeout> | null = null

const newUid = () =>
  `u${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

/* URL state */
const encodeBuild = (list: Item[]) => list.map((it) => it.blockId).join(',')
const decodeBuild = (str: string): Item[] =>
  str
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
    .filter((id) => !!findBlock(id))
    .map((id) => ({ uid: newUid(), blockId: id }))

onMounted(() => {
  const hash = window.location.hash.replace(/^#/, '')
  if (hash.startsWith('b=')) items.value = decodeBuild(decodeURIComponent(hash.slice(2)))
})

watch(
  items,
  (list) => {
    if (!import.meta.client) return
    const enc = encodeBuild(list)
    const next = enc ? `#b=${enc}` : ''
    if (window.location.hash !== next) {
      history.replaceState(null, '', window.location.pathname + window.location.search + next)
    }
  },
  { deep: true },
)

/* Bump total */
watch(
  () => items.value.length,
  (n) => {
    if (n === 0) return
    bump.value = true
    if (bumpTimer) clearTimeout(bumpTimer)
    bumpTimer = setTimeout(() => (bump.value = false), 350)
  },
)

const showToast = (msg: string) => {
  toast.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = null), 1600)
}

const addItem = (blockId: string, atIndex = -1) => {
  const newItem: Item = { uid: newUid(), blockId }
  if (atIndex < 0 || atIndex >= items.value.length) items.value.push(newItem)
  else items.value.splice(atIndex, 0, newItem)
  showToast('Block added')
}

const removeItem = (uid: string) => {
  items.value = items.value.filter((it) => it.uid !== uid)
}

const moveItem = (uid: string, toIndex: number) => {
  const fromIndex = items.value.findIndex((it) => it.uid === uid)
  if (fromIndex === -1) return
  const next = [...items.value]
  const [moved] = next.splice(fromIndex, 1)
  if (!moved) return
  const ti = toIndex > fromIndex ? toIndex - 1 : toIndex
  next.splice(Math.max(0, Math.min(next.length, ti)), 0, moved)
  items.value = next
}

/* Drag pipeline */
const handleDragStart = (block: BuildBlock, e: PointerEvent, _el: HTMLElement, source: DragSource, uid?: string) => {
  e.preventDefault()
  drag.value = { block, source, uid, x: e.clientX, y: e.clientY }
  document.body.style.userSelect = 'none'
}

const onPointerMove = (e: PointerEvent) => {
  if (!drag.value) return
  drag.value = { ...drag.value, x: e.clientX, y: e.clientY }

  const dock = dockEl.value
  if (!dock) return
  const dr = dock.getBoundingClientRect()
  const inDock = e.clientX >= dr.left && e.clientX <= dr.right && e.clientY >= dr.top && e.clientY <= dr.bottom
  overDock.value = inDock

  if (inDock && chipsEl.value) {
    const chips = [...chipsEl.value.querySelectorAll<HTMLElement>('.c-build-chip:not(.c-build-chip--placeholder):not(.c-build-chip--dragging)')]
    let insertIdx = chips.length
    for (let i = 0; i < chips.length; i++) {
      const cr = chips[i]!.getBoundingClientRect()
      if (e.clientX < cr.left + cr.width / 2) {
        insertIdx = i
        break
      }
    }
    dropIdx.value = insertIdx
  } else {
    dropIdx.value = null
  }
}

const onPointerUp = (e: PointerEvent) => {
  if (!drag.value) return
  const dock = dockEl.value
  const dr = dock?.getBoundingClientRect()
  const inDock = !!dr && e.clientX >= dr.left && e.clientX <= dr.right && e.clientY >= dr.top && e.clientY <= dr.bottom

  if (drag.value.source === 'palette') {
    if (inDock) {
      const idx = dropIdx.value ?? items.value.length
      addItem(drag.value.block.id, idx)
    }
  } else if (drag.value.source === 'dock' && drag.value.uid) {
    if (!inDock) {
      removeItem(drag.value.uid)
      showToast('Block removed')
    } else if (dropIdx.value != null) {
      moveItem(drag.value.uid, dropIdx.value)
    }
  }
  drag.value = null
  overDock.value = false
  dropIdx.value = null
  document.body.style.userSelect = ''
}

watch(drag, (d) => {
  if (d) {
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  } else {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('resize', updateDockHeight)
  resizeObs?.disconnect()
  document.documentElement.style.removeProperty('--dock-h')
  if (toastTimer) clearTimeout(toastTimer)
  if (bumpTimer) clearTimeout(bumpTimer)
})

/* Keep --dock-h synced for body padding */
let resizeObs: ResizeObserver | null = null
const updateDockHeight = () => {
  const dock = dockEl.value
  if (!dock) return
  const h = dock.getBoundingClientRect().height
  document.documentElement.style.setProperty('--dock-h', `${Math.ceil(h)}px`)
}
onMounted(() => {
  const dock = dockEl.value
  if (!dock) return
  updateDockHeight()
  resizeObs = new ResizeObserver(updateDockHeight)
  resizeObs.observe(dock)
  window.addEventListener('resize', updateDockHeight)
})

/* Pricing */
const pricing = computed(() => {
  const subtotal = items.value.reduce((sum, it) => sum + (findBlock(it.blockId)?.price ?? 0), 0)
  const days = items.value.reduce((sum, it) => sum + (findBlock(it.blockId)?.days ?? 0), 0)
  const eligible = items.value.length >= discountThreshold
  const discount = eligible ? Math.round(subtotal * (discountPct / 100)) : 0
  const total = subtotal - discount
  return { subtotal, discount, total, days, eligible }
})

const onShare = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    showToast('Link copied')
  } catch {
    showToast('Copy failed')
  }
}

const onExport = () => window.print()

const onSend = () => {
  const lines = items.value.map((it, i) => {
    const b = findBlock(it.blockId)
    return b ? `${String(i + 1).padStart(2, '0')}. ${b.name} — ${formatBuildPrice(b.price)}` : ''
  })
  const body = encodeURIComponent(
    `Hi Sanitobi,\n\nHere's a build I put together:\n\n${lines.join('\n')}\n\n` +
      `Subtotal: ${formatBuildPrice(pricing.value.subtotal)}\n` +
      (pricing.value.discount ? `Discount: -${formatBuildPrice(pricing.value.discount)}\n` : '') +
      `Total: ${formatBuildPrice(pricing.value.total)}\n` +
      `Estimated build: ${pricing.value.days} day${pricing.value.days === 1 ? '' : 's'}\n\n` +
      `Build URL: ${window.location.href}\n\nCheers,`,
  )
  window.location.href = `mailto:hello@sanitobi.studio?subject=Project%20brief%20from%20builder&body=${body}`
}

const onClearAll = () => {
  if (items.value.length && confirm('Clear all blocks?')) items.value = []
}

/* Render helpers */
const placeholderName = computed(() => drag.value?.block.name ?? '')
</script>

<template>
  <div class="c-build-cat-strip">
    <button
      v-for="c in categories"
      :key="c"
      :class="['c-build-cat', activeCat === c && 'c-build-cat--active']"
      @click="activeCat = c"
    >
      {{ c }}
    </button>
  </div>

  <div class="c-build-body">
    <div class="c-build-grid">
      <BuildPaletteCard
        v-for="b in filtered"
        :key="b.id"
        :block="b"
        :selected="selectedId === b.id"
        :dragging="drag?.source === 'palette' && drag.block.id === b.id"
        @select="selectedId = b.id"
        @add="addItem(b.id)"
        @drag-start="(e, el) => handleDragStart(b, e, el, 'palette')"
      />
    </div>

    <BuildSidePanel
      :block="selected"
      :count="items.length"
      @add="selected && addItem(selected.id)"
      @clear="selectedId = null"
    />
  </div>

  <div ref="dockEl" class="c-build-dock">
    <div class="c-build-dock__inner">
      <div :class="['c-build-drop', overDock && 'c-build-drop--over', items.length === 0 && !drag && 'c-build-drop--empty']">
        <div class="c-build-drop__head">
          <span>Your build</span>
          <button class="c-build-drop__clear" :disabled="!items.length" @click="onClearAll">Clear</button>
        </div>
        <div ref="chipsEl" class="c-build-chips">
          <template v-for="(it, i) in items" :key="it.uid">
            <div
              v-if="overDock && drag?.source === 'palette' && dropIdx === i"
              class="c-build-chip c-build-chip--placeholder"
            >
              <span class="c-build-chip__idx">·</span>
              <span class="c-build-chip__name">{{ placeholderName }}</span>
            </div>
            <BuildDockChip
              v-if="findBlock(it.blockId)"
              :block="findBlock(it.blockId)!"
              :uid="it.uid"
              :index="i"
              :dragging="drag?.uid === it.uid"
              @remove="removeItem(it.uid)"
              @drag-start="(e, el) => handleDragStart(findBlock(it.blockId)!, e, el, 'dock', it.uid)"
            />
          </template>
          <div
            v-if="overDock && drag?.source === 'palette' && dropIdx === items.length"
            class="c-build-chip c-build-chip--placeholder"
          >
            <span class="c-build-chip__idx">·</span>
            <span class="c-build-chip__name">{{ placeholderName }}</span>
          </div>
        </div>
      </div>

      <div class="c-build-total">
        <div class="c-build-total__head">
          <span>Total · {{ pricing.days || 0 }} day{{ pricing.days === 1 ? '' : 's' }}</span>
          <span v-if="pricing.eligible" class="c-build-total__badge">−{{ discountPct }}%</span>
        </div>
        <div :class="['c-build-total__num', bump && 'c-build-total__num--bump']">
          <span class="c-build-total__currency">€</span>
          <span class="c-build-total__digits">{{ formatBuildPrice(pricing.total).replace('€', '') }}</span>
        </div>
        <div class="c-build-total__suffix">
          <template v-if="pricing.discount">
            {{ formatBuildPrice(pricing.subtotal) }} − {{ formatBuildPrice(pricing.discount) }} bundle
          </template>
          <template v-else-if="items.length">
            {{ items.length }} block{{ items.length === 1 ? '' : 's' }} · add {{ discountThreshold - items.length }} more for −{{ discountPct }}%
          </template>
          <template v-else>
            Drag a block to start
          </template>
        </div>
        <div class="c-build-total__actions">
          <button class="c-build-total__act" :disabled="!items.length" @click="onShare">Share</button>
          <button class="c-build-total__act" :disabled="!items.length" @click="onExport">Quote PDF</button>
          <button class="c-build-total__act c-build-total__act--primary" :disabled="!items.length" @click="onSend">Send brief</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="drag" :style="{ left: `${drag.x}px`, top: `${drag.y}px` }" class="c-build-ghost">
    <span class="c-build-ghost__dot" />
    {{ drag.block.name }}
    <span class="c-build-ghost__price">{{ formatBuildPrice(drag.block.price) }}</span>
  </div>

  <div :class="['c-build-toast', toast && 'c-build-toast--show']">
    <span class="c-build-toast__dot" />
    {{ toast || '' }}
  </div>

  <div class="c-build-quote" aria-hidden="true">
    <h1>Sanitobi · Project quote</h1>
    <div class="c-build-quote__meta">
      {{ new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) }}
      · {{ items.length }} block{{ items.length === 1 ? '' : 's' }}
    </div>
    <table>
      <thead>
        <tr><th>#</th><th>Block</th><th>Tier</th><th>Days</th><th style="text-align:right">Price</th></tr>
      </thead>
      <tbody>
        <tr v-for="(it, i) in items" :key="it.uid">
          <template v-if="findBlock(it.blockId)">
            <td>{{ String(i + 1).padStart(2, '0') }}</td>
            <td>{{ findBlock(it.blockId)!.name }}</td>
            <td>{{ findBlock(it.blockId)!.complexity }}</td>
            <td>{{ findBlock(it.blockId)!.days }}</td>
            <td style="text-align:right">{{ formatBuildPrice(findBlock(it.blockId)!.price) }}</td>
          </template>
        </tr>
      </tbody>
      <tfoot>
        <tr><td colspan="3" /><td>{{ pricing.days }}d</td><td style="text-align:right">{{ formatBuildPrice(pricing.subtotal) }}</td></tr>
        <tr v-if="pricing.discount > 0">
          <td colspan="3" class="c-build-quote__note">Bundle discount ({{ discountPct }}%)</td>
          <td />
          <td style="text-align:right">−{{ formatBuildPrice(pricing.discount) }}</td>
        </tr>
        <tr><td colspan="3">Total</td><td /><td style="text-align:right">{{ formatBuildPrice(pricing.total) }}</td></tr>
      </tfoot>
    </table>
    <div class="c-build-quote__foot">
      Indicative price · subject to scoping conversation. <br />
      hello@sanitobi.studio · sanitobi.studio
    </div>
  </div>
</template>

<style lang="postcss">
:where(.c-build-cat-strip) {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
}
:where(.c-build-cat) {
  font-family: var(--mono-font);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  transition: background 0.25s, color 0.25s, border-color 0.25s;
}
:where(.c-build-cat):hover { border-color: var(--line-strong); }
:where(.c-build-cat--active) {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}

:where(.c-build-body) {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 32px;
  padding: 24px 48px calc(var(--dock-h, 196px) + 80px);
  align-items: start;
  position: relative;
  min-height: calc(100vh - 200px);
}
@media (max-width: 1100px) {
  :where(.c-build-body) {
    grid-template-columns: 1fr;
    padding: 24px 24px calc(var(--dock-h, 196px) + 60px);
  }
}

:where(.c-build-grid) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

/* Dock */
:where(.c-build-dock) {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 90;
  background: color-mix(in oklab, var(--bg) 85%, transparent);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-top: 1px solid var(--line);
}
:where(.c-build-dock__inner) {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 32px;
  padding: 18px 48px;
  align-items: stretch;
}

:where(.c-build-drop) {
  background: var(--bg);
  border: 1px dashed var(--line-strong);
  border-radius: 12px;
  min-height: 140px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: background 0.25s, border-color 0.25s;
  position: relative;
}
:where(.c-build-drop--over) {
  border-color: var(--accent);
  background: color-mix(in oklab, var(--accent) 8%, var(--bg));
}
:where(.c-build-drop__head) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--mono-font);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}
:where(.c-build-drop__clear) {
  background: transparent;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font: inherit;
  font-family: var(--mono-font);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: color 0.2s;
}
:where(.c-build-drop__clear):hover:not(:disabled) { color: var(--accent); }
:where(.c-build-drop__clear:disabled) { opacity: 0.4; cursor: not-allowed; }

:where(.c-build-chips) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  flex: 1;
  min-height: 56px;
  align-content: center;
}
:where(.c-build-drop--empty .c-build-chips)::after {
  content: 'Drag blocks here — or click any tile to add';
  font-family: var(--mono-font);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--muted);
  text-transform: none;
  width: 100%;
  text-align: center;
}

/* Total card */
:where(.c-build-total) {
  background: var(--ink);
  color: var(--bg);
  border-radius: 12px;
  padding: 16px 20px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 8px;
}
:where(.c-build-total__head) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--mono-font);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--bg) 60%, transparent);
}
:where(.c-build-total__badge) {
  background: var(--accent);
  color: #fff;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 10px;
  letter-spacing: 0.1em;
}
:where(.c-build-total__num) {
  font-family: var(--headline-font);
  font-weight: 500;
  font-size: 44px;
  letter-spacing: -0.035em;
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 10px;
}
:where(.c-build-total__currency) {
  font-size: 22px;
  color: color-mix(in oklab, var(--bg) 60%, transparent);
}
:where(.c-build-total__digits) {
  display: inline-block;
  font-variant-numeric: tabular-nums;
  transition: transform 0.35s cubic-bezier(0.22, 1.2, 0.36, 1);
}
:where(.c-build-total__num--bump .c-build-total__digits) {
  transform: translateY(-2px);
}
:where(.c-build-total__suffix) {
  font-size: 12px;
  color: color-mix(in oklab, var(--bg) 60%, transparent);
  letter-spacing: -0.005em;
  margin-top: -2px;
}
:where(.c-build-total__actions) {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 6px;
}
:where(.c-build-total__act) {
  font-family: var(--mono-font);
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 8px 12px;
  background: transparent;
  color: var(--bg);
  border: 1px solid color-mix(in oklab, var(--bg) 22%, transparent);
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.25s, color 0.25s, border-color 0.25s;
  flex: 1;
  min-width: 0;
  text-align: center;
  white-space: nowrap;
}
:where(.c-build-total__act):hover:not(:disabled) {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
:where(.c-build-total__act:disabled) { opacity: 0.4; cursor: not-allowed; }
:where(.c-build-total__act--primary) {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
:where(.c-build-total__act--primary):hover:not(:disabled) {
  background: #fff;
  color: var(--ink);
  border-color: #fff;
}

/* Drag ghost */
:where(.c-build-ghost) {
  position: fixed;
  pointer-events: none;
  z-index: 1000;
  transform: translate(-50%, -50%) rotate(-2deg);
  background: var(--bg-card, #FAF7F0);
  border: 1px solid var(--ink);
  border-radius: 999px;
  padding: 9px 14px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.005em;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 24px 50px -12px rgba(14, 14, 14, 0.4);
}
:where(.c-build-ghost__dot) {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}
:where(.c-build-ghost__price) {
  font-family: var(--mono-font);
  font-size: 11px;
  color: var(--muted);
}

/* Toast */
:where(.c-build-toast) {
  position: fixed;
  bottom: calc(var(--dock-h, 196px) + 24px);
  left: 50%;
  transform: translate(-50%, 20px);
  background: var(--ink);
  color: var(--bg);
  padding: 10px 18px;
  border-radius: 999px;
  font-family: var(--mono-font);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  z-index: 95;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s, transform 0.35s cubic-bezier(0.22, 1.2, 0.36, 1);
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
:where(.c-build-toast__dot) {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
}
:where(.c-build-toast--show) {
  opacity: 1;
  transform: translate(-50%, 0);
}

/* Print quote */
:where(.c-build-quote) {
  position: fixed;
  left: -10000px;
  top: 0;
  width: 800px;
  padding: 48px;
  background: #fff;
  color: #0E0E0E;
  font-family: var(--body-font);
}
:where(.c-build-quote h1) {
  font-family: var(--headline-font);
  font-weight: 500;
  font-size: 40px;
  letter-spacing: -0.03em;
  margin: 0 0 8px;
}
:where(.c-build-quote__meta) {
  font-family: var(--mono-font);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 32px;
}
:where(.c-build-quote table) {
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;
}
:where(.c-build-quote th, .c-build-quote td) {
  text-align: left;
  padding: 14px 0;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}
:where(.c-build-quote th) {
  font-family: var(--mono-font);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #888;
  font-weight: 400;
}
:where(.c-build-quote tfoot td) {
  font-family: var(--headline-font);
  font-weight: 500;
  font-size: 22px;
  letter-spacing: -0.02em;
  border-bottom: none;
  padding-top: 20px;
}
:where(.c-build-quote__note) {
  font-family: var(--mono-font);
  font-size: 11px;
  color: #888;
}
:where(.c-build-quote__foot) {
  font-family: var(--mono-font);
  font-size: 11px;
  color: #888;
  margin-top: 32px;
  line-height: 1.6;
}

@media print {
  body * { visibility: hidden; }
  .c-build-quote, .c-build-quote * { visibility: visible; }
  .c-build-quote {
    position: absolute !important;
    left: 0;
    top: 0;
    width: 100%;
    padding: 48px;
    background: #fff;
  }
  .c-build-dock,
  .c-build-toast,
  .c-build-ghost,
  .c-noise { display: none !important; }
}

/* narrow viewport overrides — keep last to win cascade */
@media (max-width: 1100px) {
  :where(.c-build-dock__inner) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 10px 16px;
  }
  :where(.c-build-drop) {
    min-height: 64px;
    padding: 10px 12px;
    gap: 6px;
  }
  :where(.c-build-drop__head) { font-size: 10px; }
  :where(.c-build-chips) { min-height: 32px; }
  :where(.c-build-total) {
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto;
    grid-template-areas: 'num suf actions';
    align-items: center;
    gap: 14px;
    padding: 10px 14px;
  }
  :where(.c-build-total__head) { display: none; }
  :where(.c-build-total__num) { grid-area: num; font-size: 28px; }
  :where(.c-build-total__suffix) { grid-area: suf; margin-top: 0; font-size: 11px; }
  :where(.c-build-total__actions) {
    grid-area: actions;
    margin-top: 0;
    flex-wrap: nowrap;
  }
  :where(.c-build-total__act) {
    padding: 7px 10px;
    font-size: 9.5px;
    flex: 0 0 auto;
  }
}
@media (max-width: 600px) {
  :where(.c-build-total) {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'num actions'
      'suf suf';
    gap: 6px 12px;
  }
  :where(.c-build-total__num) { font-size: 24px; }
}
</style>
