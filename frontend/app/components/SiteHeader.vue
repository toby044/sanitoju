<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useWindowScroll } from "@vueuse/core";

const { y } = useWindowScroll();
const scrolled = computed(() => y.value > 40);

const { data: settings } = await useSettings();
const resolveLink = await useResolveLink();

const $el = ref<HTMLElement | null>(null);
const sizeObserver = ref<ResizeObserver | null>(null);

onMounted(() => {
  sizeObserver.value = new ResizeObserver(handleResize);

  if ($el.value) {
    sizeObserver.value.observe($el.value);
    handleResize();
  }
});

onUnmounted(() => {
  sizeObserver.value?.disconnect();
});

function handleResize(): void {
  if ($el.value) {
    const height = $el.value.offsetHeight;
    document.documentElement.style.setProperty(
      "--dynamic-site-header-height",
      `${height}px`,
    );
  } else {
    document.documentElement.style.removeProperty(
      "--dynamic-site-header-height",
    );
  }
}
</script>

<template>
  <div class="c-site-header__wrapper">
    <nav
      ref="$el"
      :class="['c-site-header', scrolled ? 'c-site-header--scrolled' : '']"
    >
      <NuxtLink to="/" class="c-site-header__logo">
        <span>{{ settings?.studioName ?? "Sanitoju" }}</span>
      </NuxtLink>
      <div class="c-site-header__links">
        <NuxtLink
          v-for="link in settings?.navLinks ?? []"
          :key="link._key"
          :to="resolveLink(link.link)"
          :target="link.link?.openInNewTab ? '_blank' : undefined"
          >{{ link.label }}</NuxtLink
        >
      </div>
      <Button
        as="NuxtLink"
        :to="resolveLink(settings?.ctaLink)"
        :target="settings?.ctaLink?.openInNewTab ? '_blank' : undefined"
      >
        {{ settings?.ctaLabel ?? "Get in touch" }}
      </Button>
    </nav>
  </div>
</template>

<style lang="postcss">
.c-site-header__wrapper {
  @apply h-[--dynamic-site-header-height];
}
:where(.c-site-header) {
  @apply fixed inset-x-0 top-0 z-[100] flex items-center justify-between;
  padding: 22px 48px;
  transition:
    backdrop-filter 0.3s,
    background 0.3s,
    padding 0.4s;
}

:where(.c-site-header--scrolled) {
  background: color-mix(in oklab, var(--bg) 78%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  padding: 14px 48px;
  border-bottom: 1px solid var(--line);
}

@media (max-width: 720px) {
  :where(.c-site-header),
  :where(.c-site-header--scrolled) {
    padding-left: 24px;
    padding-right: 24px;
  }
}

:where(.c-site-header__logo) {
  @apply flex items-center gap-[10px] font-headline font-semibold;
  font-size: 18px;
  letter-spacing: -0.02em;
}

:where(.c-site-header__links) {
  @apply flex gap-8;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.005em;
}

:where(.c-site-header__links a) {
  @apply relative;
  padding: 6px 0;
  opacity: 0.7;
  transition: opacity 0.3s;
}

:where(.c-site-header__links a):hover {
  opacity: 1;
}

:where(.c-site-header__links a)::after {
  content: "";
  @apply absolute left-0 right-0 bottom-0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
}

:where(.c-site-header__links a):hover::after {
  transform: scaleX(1);
}

@media (max-width: 720px) {
  :where(.c-site-header__links) {
    @apply hidden;
  }
}
</style>
