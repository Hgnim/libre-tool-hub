import type { RouteRecordRaw } from 'vue-router'

export type appendix_mdFile_type=()=>Promise<{default:string}>;
export default [
    {
        path: '/tool',
        name: 'toolView',
        component: () => import('@/views/ToolView/ToolView.vue'),
        children:[
            {
                path: '',
                component: () => import('@/views/ToolView/ToolView.vue'),
            },
            {
                path: 'baseconversion',
                name: 'tool-baseConversion',
                component: () => import('@/views/tools/BaseConversion/BaseConversion.vue'),
                meta: {
                    appendix_mdFile: (()=>import('@/views/tools/BaseConversion/md/appendix.md?raw')) as appendix_mdFile_type,
                },
            },
        ]
    }
] as RouteRecordRaw[];