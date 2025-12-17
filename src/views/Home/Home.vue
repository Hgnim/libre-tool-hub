<script setup lang="ts">
import {ref} from 'vue';
import {switchLocale, viewAutoLoadLocale} from "@/utils/i18nUtils";

viewAutoLoadLocale('Home');
const switchLoc=ref(()=>{
  switchLocale('en-US','Home');
});
const switchLoc2=ref(()=>{
  switchLocale('zh-CN','Home');
})
</script>

<template>
  <p @click="switchLoc()">{{ $t('test') }}</p>
  <p @click="switchLoc2()">{{ $t('home') }}</p>
  <p>{{ $t('public') }}</p>
  <p>{{ $t('tv') }}(无法跨页稳定获取私有翻译)</p>
  <p>{{ $t('tv2') }}(无法跨页获取嵌入式私有翻译)</p>
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