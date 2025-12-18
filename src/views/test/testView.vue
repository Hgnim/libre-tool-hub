<script setup lang="ts">
//import {ref} from 'vue';
import { useI18n } from 'vue-i18n'
import {switchLocale, viewAutoLoadLocale} from "@/utils/i18nUtils.ts";
import {ref} from "vue";

const { t } = useI18n({//访问全局语言
  inheritLocale: true,
  useScope: 'global'
})
const { t:lt } = useI18n({//仅供访问嵌入式语言
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
  <p @click="switchLoc()">{{ t('tv.test') }}</p>
  <p @click="switchLoc2()">{{ t('tv.tv') }}</p>
  <p>{{ t('global.public') }}</p>
  <p>{{ lt('test2') }}</p>
  <p>{{ lt('tv2') }}</p>
  <p>{{ lt('tv.tv') }}</p>
  <p>{{ t('home.home') }}(使用动态语言加载，在没有加载其它页的语言文件时将无法获取对应语言)</p>
  <p>{{ t('test2') }}(使用全局函数无法访问局部嵌入式语言)</p>
  <p>{{ lt('global.public') }}(使用局部函数可以访问全局语言)</p>
  <p>{{ lt('tv.test') }}(使用局部函数可以访问全局语言)</p>
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
    "tv": {
      "tv": "嵌入式同名键测试"
    },
    "test2": "测试文本",
    "tv2": "textView的嵌入式翻译"
  },
  "en-US": {
    "tv": {
      "tv": "嵌入式同名键测试:)"
    },
    "test2": "test text",
    "tv2": "textView's text"
  }
}
</i18n>