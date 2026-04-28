import {
  defineConfig,
  transformerVariantGroup,
  transformerDirectives,
  presetWind3,
} from "unocss";

export default defineConfig({
  presets: [presetWind3()],
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
