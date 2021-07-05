# vite-plugin-dynamic-publicpath

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

```ts
// main.ts

// Your dynamic cdn
const dynamicCdn = oneOf(['cdn.xxx.com', 'cdn1.xxx.com'];
window.__dynamicImportHandler__ = function(importer) {
    return dynamicCdn + importer;
}
window.__dynamicImportPreload__ = function(preloads) {
    return preloads.map(preload => dynamicCdn + preload);
}

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

Type: `string`
Default: `assets`

Custom the assets directory.
