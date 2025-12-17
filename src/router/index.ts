import {createRouter, createWebHashHistory} from 'vue-router';
import Home from '@/views/Home/Home.vue';
import testView from "@/views/test/testView.vue";

export default createRouter({
    history: createWebHashHistory(),//hash模式，使用'#'内部导航，'#'及后面的内容不会发送给服务器，避免了非'/'时404的情况。
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/testview',
            name: 'testview',
            component: testView,
        },
    ],
});