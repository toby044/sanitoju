import {
  defineConfig,
  transformerVariantGroup,
  transformerDirectives,
  presetWind3,
} from "unocss";

export default defineConfig({
  presets: [presetWind3()],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme: {
    colors: {
      surface: "var(--bg)",
      "surface-deep": "var(--bg-deep)",
      ink: "var(--ink)",
      "ink-soft": "var(--ink-soft)",
      muted: "var(--muted)",
      line: "var(--line)",
      "line-strong": "var(--line-strong)",
      accent: "var(--accent)",
      "accent-soft": "var(--accent-soft)",
    },
    fontFamily: {
      headline: "var(--headline-font)",
      body: "var(--body-font)",
      mono: "var(--mono-font)",
      serif: "var(--serif-font)",
    },
  },
});
