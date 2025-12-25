import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import {mockDevServerPlugin} from "vite-plugin-mock-dev-server";

//当前是否为生产模式
const isProd = (mode:string):boolean=>mode=='production';
//当前是否为开发模式
const isDev = (mode:string):boolean=>mode=='development';

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
        mockDevServerPlugin({
            prefix: ["^/api"],
            dir: "src",
            include: ['**/mock/**/*.mock.{js,ts,cjs,mjs,json,json5}'],
            exclude: ['**/node_modules/**'],
            log: isDev(mode)?'debug':'silent',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
};
})
