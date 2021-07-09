import path from 'path';
import { parse as parseImports, ImportSpecifier } from 'es-module-lexer'
import { normalizePath, Plugin } from 'vite';
import { Options } from '../index';

export function useDynamicPublicPath(options?: Options): Plugin {
    const _defaultOptions : Options = {
        dynamicImportHanlder: 'window.__dynamicImportHandler__',
        dynamicImportPreload: 'window.__dynamicImportPreload__',
        assetsBase: 'assets',
    }

    options = Object.assign({}, _defaultOptions, options);

    const {
        dynamicImportHanlder,
        dynamicImportPreload,
        assetsBase,
    } = options;
    
    return {
        name: 'vite-plugin-dynamic-publicpath',
        enforce: 'post',
        apply: 'build',
        renderDynamicImport({ format }) {
            if (format === 'es') {
                return {
                    left: `import("__PUBLIC_PATH_MARKER__" + (${dynamicImportHanlder} || function(importer) { return importer; })(`,
                    right: ') + "__PUBLIC_PATH_MARKER__" )'
                };
            } else if (format === 'system') {
                return {
                    left: `module.import((${dynamicImportHanlder} || function(importer) { return importer; })(`,
                    right: '))'
                };
            }
            return null;
        },
        generateBundle({ format }, bundle) {
            if (format !== 'es') {
                return;
            }
            const preloadMarker = `__VITE_PRELOAD__`;
            const preloadMarkerRE = new RegExp(`"${preloadMarker}"`, 'g');
            for (const file in bundle) {
                const chunk = bundle[file];
                if (chunk.type === 'chunk' && chunk.code.indexOf(preloadMarker) > -1) {
                    const code = chunk.code.replace(/"__PUBLIC_PATH_MARKER__"/g, '""');
                    let imports: ImportSpecifier[];
                    try {
                        imports = parseImports(code)[0].filter((i) => i.d > -1)
                    } catch (e) {
                        this.error(e, e.idx);
                    }
                    if (imports.length) {
                        for (let index = 0; index < imports.length; index++) {
                            const { s: start, e: end, } = imports[index];
                            const url = code.slice(start, end);
                            const normalizedFile = path.posix.join(
                                path.posix.dirname(chunk.fileName),
                                url.slice(1, -1)
                            )
                            const importerResult = url.match(/\(['"]([\s\S]+)['"]\)/);
                            if (importerResult instanceof Array && importerResult.length > 1) {
                                const assetKey = normalizePath(path.join(`${assetsBase}`, importerResult[1]));
                                bundle[normalizedFile] = bundle[assetKey];
                            }
                        }
                    }
                    chunk.code = chunk.code.replace(/"__PUBLIC_PATH_MARKER__"/g, '""');
                    chunk.code = chunk.code.replace(preloadMarkerRE, `(${dynamicImportPreload} || function(importer) { return importer; })((${preloadMarker}))`);
                }
            }
        }
    }
}
