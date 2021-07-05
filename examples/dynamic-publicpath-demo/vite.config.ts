import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { useDynamicPublicPath } from '../../dist/index'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    useDynamicPublicPath({
      dynamicImportHanlder: 'window.__dynamic_handler__',
      dynamicImportPreload: 'window.__dynamic_preload__'
    }),
  ]
})
