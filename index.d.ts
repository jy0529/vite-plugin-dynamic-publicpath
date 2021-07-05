export interface Options {
    /**
     * default: window.__dynamicImportHandler__
     */
    dynamicImportHanlder?: string,
    /**
     * default: window.__dynamicImportPreload__
     */
    dynamicImportPreload?: string,
    /**
     * default: assets
     */
    assetsBase?: string,
}