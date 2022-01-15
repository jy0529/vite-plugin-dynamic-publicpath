import { createApp } from 'vue'
import App from './App.vue'

const dynamicCdn = ''; // Your cdn
// @ts-ignore
window.__dynamic_handler__ = function(importer) {
    return dynamicCdn + importer;
}
// @ts-ignore
window.__dynamic_preload__ = function(preloads: Array<string>) {
    return preloads.map(preload => dynamicCdn + preload);
}

createApp(App).mount('#app')
