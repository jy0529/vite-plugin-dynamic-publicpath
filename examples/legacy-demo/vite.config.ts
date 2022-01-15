import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import { useDynamicPublicPath } from '../../dist/index'
// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not ie <= 8']
    }),
    /** Attention! The legacy plugin must before loaded than dynamic-publicpath plugin */
    useDynamicPublicPath({
      dynamicImportHandler: 'window.__dynamic_handler__',
      dynamicImportPreload: 'window.__dynamic_preload__'
    }),
  ]
})
