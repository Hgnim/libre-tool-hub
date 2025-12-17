<script setup lang="ts">
//import {ref} from 'vue';
import { useI18n } from 'vue-i18n'
import {switchLocale, viewAutoLoadLocale} from "@/utils/i18nUtils.ts";
import {ref} from "vue";

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})
viewAutoLoadLocale('testView');
const switchLoc=ref(()=>{
  switchLocale('en-US','testView');
});
const switchLoc2=ref(()=>{
  switchLocale('zh-CN','testView');
})
</script>

<template>
  <p @click="switchLoc()">{{ $t('test') }}</p>
  <p @click="switchLoc2()">{{ $t('tv') }}</p>
  <p>{{ $t('public') }}</p>
  <p>{{ t('test2') }}</p>
  <p>{{ t('tv2') }}</p>
  <p>{{ $t('home') }}(无法跨页稳定获取私有翻译)</p>
  <p>testView:
    <router-link class="router-link" to="/">Home</router-link>
  </p>
</template>

<style scoped lang="scss">
p {
  color: white;
}

.router-link {
  color: white;
}
</style>

<i18n lang="json">
{
  "zh-CN": {
    "test2": "测试文本",
    "tv2": "textView的嵌入式翻译"
  },
  "en-US": {
    "test2": "test text",
    "tv2": "textView's text"
  }
}
</i18n>