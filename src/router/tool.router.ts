import type { RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '/tool',
        name: 'toolView',
        component: () => import('@/views/ToolView/ToolView.vue'),
    }
] as RouteRecordRaw[];