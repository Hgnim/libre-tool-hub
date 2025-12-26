import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import {i18n} from "@/plugins/i18n.ts";

import '@/assets/scss/bootstrap/bs-custom.scss';
import 'bootstrap';
import 'virtual:svg-icons-register';//vite-plugin-svg-icons的虚拟模块
import '@/assets/css/global/unSelect.css';
import 'github-markdown-css/github-markdown.css';

createApp(App)
    .use(router)
    .use(i18n)
    .mount('#app');


import {isDev} from "@/ts/global/packMode.ts";
if (isDev) {
    console.log('当前为开发模式');
    import('@/utils/vite-plugin-svg-icons/get_svg-icons-names').then(({get_ids})=>{
        console.debug("[main.ts] 'vite-plugin-svg-icons'的所有svg图标id：",get_ids());
    });
}