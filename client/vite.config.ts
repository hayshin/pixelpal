import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  // resolve: {
  //   alias: {
  //      '@shared': resolve(__dirname, '../shared'),
  //      '@shared/types': resolve(__dirname, '../shared/types'),	  }
  // }
});
