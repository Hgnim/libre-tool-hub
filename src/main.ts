import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import {i18n} from "@/plugins/i18n.ts";

import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap';

createApp(App)
    .use(router)
    .use(i18n)
    .mount('#app');
