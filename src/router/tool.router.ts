import type { RouteRecordRaw } from 'vue-router'

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
                    appendix_mdPath:'/assets/md/views/tools/BaseConversion/appendix.{lang}.md',
                },
            },
            {
                path: 'textandbaseconvert',
                name: 'tool-stringAndBaseConversion',
                component:() => import('@/views/tools/StringAndBaseConversion/StringAndBaseConversion.vue'),
                meta: {
                    appendix_mdPath: '/assets/md/views/tools/StringAndBaseConversion/appendix.{lang}.md',
                }
            },
            {
                path: 'qrcode',
                name: 'tool-qrcode',
                component: () => import('@/views/tools/QRCode/QRCode.vue'),
                meta: {
                    appendix_mdPath:'/assets/md/views/tools/QRCode/appendix.{lang}.md',
                }
            },
        ],
    },
] as RouteRecordRaw[];