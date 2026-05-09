<script setup lang="ts">
import type { BuildBlockId } from '~/utils/buildBlocks'

const props = withDefaults(
  defineProps<{
    id: BuildBlockId
    detailed?: boolean
  }>(),
  { detailed: false },
)

const sw = computed(() => (props.detailed ? 1.2 : 1))
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 140"
    fill="none"
    :stroke-width="sw"
    class="c-build-wire"
  >
    <template v-if="id === 'hero'">
      <rect x="8" y="10" width="184" height="120" rx="3" class="c-build-wire__faint" />
      <line x1="20" y1="22" x2="50" y2="22" class="c-build-wire__stroke" />
      <circle cx="16" cy="22" r="2" class="c-build-wire__dot" />
      <line x1="20" y1="64" x2="180" y2="64" class="c-build-wire__stroke" :stroke-width="sw * 1.6" />
      <line x1="20" y1="78" x2="160" y2="78" class="c-build-wire__stroke" :stroke-width="sw * 1.6" />
      <line x1="20" y1="92" x2="120" y2="92" class="c-build-wire__stroke" :stroke-width="sw * 1.6" />
      <rect x="20" y="108" width="46" height="14" rx="7" class="c-build-wire__fill" />
      <rect x="74" y="108" width="38" height="14" rx="7" class="c-build-wire__faint" />
    </template>

    <template v-else-if="id === 'marquee'">
      <line x1="0" y1="40" x2="200" y2="40" class="c-build-wire__faint" />
      <line x1="0" y1="100" x2="200" y2="100" class="c-build-wire__faint" />
      <g v-for="(x, i) in [12, 60, 108, 156]" :key="i">
        <line :x1="x" y1="70" :x2="x + 30" y2="70" class="c-build-wire__stroke" :stroke-width="sw * 1.4" />
        <circle :cx="x + 38" cy="70" r="2" class="c-build-wire__dot" />
      </g>
    </template>

    <template v-else-if="id === 'showcase'">
      <rect x="8" y="10" width="184" height="100" rx="3" class="c-build-wire__soft-fill c-build-wire__faint" />
      <rect x="20" y="22" width="40" height="12" rx="6" class="c-build-wire__faint" fill="#fff" />
      <text x="178" y="32" text-anchor="end" font-size="7" font-family="ui-monospace" class="c-build-wire__text">26</text>
      <line x1="8" y1="120" x2="100" y2="120" class="c-build-wire__stroke" :stroke-width="sw * 1.4" />
      <line x1="120" y1="120" x2="180" y2="120" class="c-build-wire__faint" />
    </template>

    <template v-else-if="id === 'work'">
      <rect x="8" y="10" width="110" height="60" rx="3" class="c-build-wire__soft-fill c-build-wire__faint" />
      <rect x="124" y="10" width="68" height="60" rx="3" class="c-build-wire__soft-fill c-build-wire__faint" />
      <rect x="8" y="76" width="68" height="54" rx="3" class="c-build-wire__soft-fill c-build-wire__faint" />
      <rect x="82" y="76" width="110" height="54" rx="3" class="c-build-wire__soft-fill c-build-wire__faint" />
    </template>

    <template v-else-if="id === 'services'">
      <g v-for="(y, i) in [24, 50, 76, 102]" :key="i">
        <text x="14" :y="y + 4" font-size="6" font-family="ui-monospace" class="c-build-wire__text">0{{ i + 1 }}</text>
        <line x1="32" :y1="y" x2="100" :y2="y" class="c-build-wire__stroke" :stroke-width="sw * 1.6" />
        <line x1="120" :y1="y" x2="180" :y2="y" class="c-build-wire__faint" />
        <line x1="8" :y1="y + 12" x2="192" :y2="y + 12" class="c-build-wire__faint" />
      </g>
    </template>

    <template v-else-if="id === 'process'">
      <rect x="0" y="0" width="200" height="140" fill="rgba(14,14,14,0.92)" />
      <g v-for="i in [0, 1, 2, 3]" :key="i">
        <text :x="14 + i * 47" y="30" font-size="6" font-family="ui-monospace" fill="rgba(244,241,234,0.5)">0{{ i + 1 }}</text>
        <line :x1="14 + i * 47" y1="60" :x2="44 + i * 47" y2="60" :stroke-width="sw * 1.6" stroke="rgba(244,241,234,0.85)" />
        <line :x1="14 + i * 47" y1="76" :x2="50 + i * 47" y2="76" stroke="rgba(244,241,234,0.4)" />
        <line :x1="14 + i * 47" y1="86" :x2="40 + i * 47" y2="86" stroke="rgba(244,241,234,0.4)" />
        <text :x="14 + i * 47" y="118" font-size="5" font-family="ui-monospace" fill="#FF5C2A">STEP</text>
        <line v-if="i < 3" :x1="47 * (i + 1)" y1="0" :x2="47 * (i + 1)" y2="140" stroke="rgba(244,241,234,0.15)" />
      </g>
    </template>

    <template v-else-if="id === 'about'">
      <line x1="8" y1="22" x2="100" y2="22" class="c-build-wire__stroke" :stroke-width="sw * 1.4" />
      <line x1="8" y1="34" x2="92" y2="34" class="c-build-wire__stroke" :stroke-width="sw * 1.4" />
      <line x1="8" y1="46" x2="80" y2="46" class="c-build-wire__stroke" :stroke-width="sw * 1.4" />
      <rect x="120" y="14" width="72" height="80" rx="3" class="c-build-wire__soft-fill c-build-wire__faint" />
      <pattern id="c-build-wire-hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="6" class="c-build-wire__faint" />
      </pattern>
      <rect x="120" y="14" width="72" height="80" fill="url(#c-build-wire-hatch)" />
      <line x1="8" y1="110" x2="56" y2="110" class="c-build-wire__stroke" :stroke-width="sw * 1.6" />
      <line x1="68" y1="110" x2="116" y2="110" class="c-build-wire__stroke" :stroke-width="sw * 1.6" />
      <text x="8" y="124" font-size="5" font-family="ui-monospace" class="c-build-wire__text">YEARS</text>
      <text x="68" y="124" font-size="5" font-family="ui-monospace" class="c-build-wire__text">CLIENTS</text>
    </template>

    <template v-else-if="id === 'pricing'">
      <g v-for="i in [0, 1, 2]" :key="i">
        <rect
          :x="8 + i * 62"
          y="14"
          width="58"
          height="112"
          rx="3"
          :fill="i === 1 ? 'rgba(14,14,14,0.92)' : 'rgba(14,14,14,0.04)'"
          :stroke="i === 1 ? 'none' : 'rgba(14,14,14,0.25)'"
        />
        <line :x1="16 + i * 62" y1="32" :x2="48 + i * 62" y2="32" :stroke="i === 1 ? 'rgba(244,241,234,0.7)' : 'rgba(14,14,14,0.55)'" :stroke-width="sw * 1.4" />
        <line :x1="16 + i * 62" y1="56" :x2="42 + i * 62" y2="56" :stroke="i === 1 ? 'rgba(244,241,234,0.9)' : 'rgba(14,14,14,0.55)'" :stroke-width="sw * 2.2" />
        <line v-for="y in [80, 92, 104]" :key="y" :x1="16 + i * 62" :y1="y" :x2="56 + i * 62" :y2="y" :stroke="i === 1 ? 'rgba(244,241,234,0.4)' : 'rgba(14,14,14,0.25)'" />
      </g>
    </template>

    <template v-else-if="id === 'writing'">
      <g v-for="(y, i) in [24, 48, 72, 96, 120]" :key="i">
        <text x="10" :y="y + 3" font-size="5" font-family="ui-monospace" class="c-build-wire__text">26.0{{ i + 1 }}</text>
        <line x1="44" :y1="y" x2="120" :y2="y" class="c-build-wire__stroke" :stroke-width="sw * 1.4" />
        <line x1="140" :y1="y" x2="180" :y2="y" class="c-build-wire__faint" />
        <line x1="8" :y1="y + 12" x2="192" :y2="y + 12" class="c-build-wire__faint" />
      </g>
    </template>

    <template v-else-if="id === 'media'">
      <rect x="8" y="10" width="184" height="110" rx="3" class="c-build-wire__soft-fill c-build-wire__faint" />
      <circle cx="100" cy="65" r="14" class="c-build-wire__stroke" fill="#fff" />
      <path d="M96 58 L96 72 L108 65 Z" class="c-build-wire__fill" />
      <line x1="8" y1="130" x2="80" y2="130" class="c-build-wire__faint" />
    </template>

    <template v-else-if="id === 'text'">
      <line v-for="(y, i) in [20, 32, 44, 56, 72, 84, 96, 108]" :key="i" x1="16" :y1="y" :x2="i === 3 || i === 7 ? 110 : 184" :y2="y" class="c-build-wire__faint" />
      <text x="16" y="28" font-size="22" font-family="serif" font-style="italic" class="c-build-wire__text">T</text>
    </template>

    <template v-else-if="id === 'contact'">
      <rect x="0" y="0" width="200" height="140" fill="rgba(14,14,14,0.92)" />
      <line x1="14" y1="40" x2="160" y2="40" stroke="rgba(244,241,234,0.85)" :stroke-width="sw * 2.4" />
      <line x1="14" y1="56" x2="120" y2="56" stroke="#FF5C2A" :stroke-width="sw * 2.4" />
      <line x1="14" y1="80" x2="80" y2="80" stroke="rgba(244,241,234,0.4)" />
      <line x1="100" y1="80" x2="166" y2="80" stroke="rgba(244,241,234,0.4)" />
      <rect x="14" y="100" width="60" height="18" rx="9" stroke="#FF5C2A" fill="rgba(255,92,42,0.15)" />
    </template>

    <template v-else>
      <rect x="8" y="10" width="184" height="120" rx="3" class="c-build-wire__faint" />
    </template>
  </svg>
</template>

<style lang="postcss">
:where(.c-build-wire) {
  display: block;
  width: 100%;
  height: 100%;
}
:where(.c-build-wire__stroke) { stroke: rgba(14, 14, 14, 0.55); }
:where(.c-build-wire__faint) { stroke: rgba(14, 14, 14, 0.25); }
:where(.c-build-wire__fill) { fill: rgba(14, 14, 14, 0.55); stroke: none; }
:where(.c-build-wire__soft-fill) { fill: rgba(14, 14, 14, 0.06); }
:where(.c-build-wire__dot) { fill: #FF5C2A; stroke: none; }
:where(.c-build-wire__text) { fill: rgba(14, 14, 14, 0.55); }
</style>
