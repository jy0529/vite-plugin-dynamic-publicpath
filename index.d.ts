export interface Options {
    /**
     * default: window.__dynamicImportHandler__
     * @deprecated: This will be removed in future versions.
     * as it is spelled incorrectly.
     */
    dynamicImportHanlder?: string,
    /**
     * default: window.__dynamicImportHandler__
     */
    dynamicImportHandler?: string,
    /**
     * default: window.__dynamicImportPreload__
     */
    dynamicImportPreload?: string,
    /**
     * default: assets
     */
    assetsBase?: string,
}
