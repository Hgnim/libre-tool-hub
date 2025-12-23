import {createRouter, createWebHashHistory} from 'vue-router';
import toolRouter from './tool.router';

export default createRouter({
    history: createWebHashHistory(),//hash模式，使用'#'内部导航，'#'及后面的内容不会发送给服务器，避免了非'/'时404的情况。
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home/Home.vue'),
        },
        {
            path:'/toollist',
            name:'toolList',
            component:()=>import('@/views/ToolList/ToolList.vue'),
        },
        ...toolRouter,
    ],
});