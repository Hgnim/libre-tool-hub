import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import { createHtmlPlugin } from 'vite-plugin-html';
import {type TransformOption, viteStaticCopy} from "vite-plugin-static-copy";
import {minify} from "html-minifier-terser";

//当前是否为生产模式
const isProd = (mode:string):boolean=>mode=='production';
//当前是否为开发模式
const isDev = (mode:string):boolean=>mode=='development';

const vscMinify:TransformOption=async (contents, filename) => {
    try {
        return await minify(contents.toString(), {
            collapseWhitespace: true,//折叠空白
            removeComments: true,//移除注释
            removeAttributeQuotes: true,//移除属性引号
            minifyCSS: true,//压缩内联css
            minifyJS: true,//压缩内联js
        });
    } catch (error) {
        console.error(`HTML 压缩失败: ${filename}`, error);
        return contents;//返回原内容
    }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) =>{
    console.log(`当前模式：${mode}\nisDev: ${isDev(mode)}\nisProd: ${isProd(mode)}`);
return {
    plugins: [
        vue(),
        VueI18nPlugin({
            include: [path.resolve(__dirname, 'src/locales/**/*')],

            runtimeOnly: true,//只打包运行时，体积减小
            compositionOnly: true,//只使用Composition API，体积减小

            defaultSFCLang: 'json',//块中的默认语言
            globalSFCScope: false,//块默认是局部的

            exclude: ['*.d.ts', '*.ts', '*.js'], //只用JSON，排除脚本
        }),
        createSvgIconsPlugin({
            iconDirs: [
                path.resolve(__dirname, 'src/assets/_svg'),
            ],
            symbolId: 'svg-[dir]-[name]',
            customDomId: '__svg__icons__dom__',
            //使用示例：<svg class="bi" width="16" height="16"><use xlink:href="#bi-check2"></use></svg>
        }),
        createHtmlPlugin({
            minify: true,
            template: "public/index.html",
        }),
        viteStaticCopy({
            //structured: true,
            targets:[
                {
                    src:"src/static/door/*.html",
                    dest:"",
                    transform: vscMinify,
                },
                {
                    src:"src/static/door/tool/*.html",
                    dest:"tool",
                    transform: vscMinify,
                },
            ]
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                //静默警告，避免bootstrap报一大堆警告
                quietDeps: true,//静默所有依赖警告
                silenceDeprecations: [
                    'import',//静默@import的警告
                    'color-functions',//静默red()/blue()的警告
                    'global-builtin',//静默mix()等函数的警告
                    'if-function',//静默if()的警告
                ]
            }
        },
    },
};
})
