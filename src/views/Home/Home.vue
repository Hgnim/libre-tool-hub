<script setup lang="ts">
import {ref} from 'vue';
import {switchLocale, viewAutoLoadLocale} from "@/utils/i18nUtils";
import {useI18n} from "vue-i18n";

const { t } = useI18n({//访问全局语言
  inheritLocale: true,
  useScope: 'global'
})
viewAutoLoadLocale('Home');
const switchLoc=ref(()=>{
  switchLocale('en-US','Home');
});
const switchLoc2=ref(()=>{
  switchLocale('zh-CN','Home');
})
</script>

<template>
  <p @click="switchLoc()">{{ t('home.test') }}</p>
  <p @click="switchLoc2()">{{ t('home.home') }}</p>
  <p>{{ t('global.public') }}</p>
  <p>{{ t('tv.tv') }}(使用动态语言加载，在没有加载其它页的语言文件时将无法获取对应语言)</p>
  <p>{{ t('tv2') }}(无法跨页获取嵌入式私有语言)</p>
  <p>Home:
    <router-link class="router-link" to="/testview">testView</router-link>
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