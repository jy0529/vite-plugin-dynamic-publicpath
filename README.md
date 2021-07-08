# vite-plugin-dynamic-publicpath

## Why
Use dynamic public path like webpack's `__webpack_public_path__`.

## Usage

- run `yarn add vite-plugin-dynamic-publicpath --dev`
- add the plugin into `vite.config.ts`
``` ts
// vite.config.ts

import { useDynamicPublicPath } from 'vite-plugin-dynamic-publicpath'
export default defineConfig({
  plugins: [
    useDynamicPublicPath(/** option */),
  ]
})
```
e.g. [basic demo](https://github.com/jy0529/vite-plugin-dynamic-publicpath/tree/main/examples/dynamic-publicpath-demo)


```ts
// main.ts

// Your dynamic cdn
const dynamicCdn = oneOf(['cdn.xxx.com', 'cdn1.xxx.com']);
window.__dynamicImportHandler__ = function(importer) {
    return dynamicCdn + importer;
}
window.__dynamicImportPreload__ = function(preloads) {
    return preloads.map(preload => dynamicCdn + preload);
}

```
### For legacy browser
e.g. [legacy browser demo](https://github.com/jy0529/vite-plugin-dynamic-publicpath/tree/main/examples/legacy-demo)
```ts
// vite.config.ts

import legacy from '@vitejs/plugin-legacy'
import { useDynamicPublicPath } from '../../dist/index'
export default defineConfig({
  plugins: [
    // See https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
    legacy({
      targets: ['defaults', 'not ie <= 8'] 
    }),
    /** Attention! The legacy plugin must before loaded than dynamic-publicpath plugin */
    useDynamicPublicPath({
      dynamicImportHanlder: 'window.__dynamic_handler__',
      dynamicImportPreload: 'window.__dynamic_preload__'
    }),
  ]
})

```

## [Options](https://github.com/jy0529/vite-plugin-dynamic-publicpath/blob/main/index.d.ts)

### `dynamicImportHanlder`

Type: `Function`<br>
Default: `window.__dynamicImportHandler__`

Register dynamic import handler

### `dynamicImportPreload`

Type: `Function`<br>
Default: `window.__dynamicImportPreload__`

Register dynamic import preload handler

### `assetsBase`

Type: `string`<br>
Default: `assets`

Custom the assets directory.
