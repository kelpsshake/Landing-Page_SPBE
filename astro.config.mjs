import { defineConfig } from 'astro/config';

// 1. Import yang benar adalah dari "@astrojs/tailwind"
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // 2. Tidak perlu ada blok 'vite'. Cukup daftarkan di 'integrations'
  integrations: [tailwind(), alpinejs(), react()]
});