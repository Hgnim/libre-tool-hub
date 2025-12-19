<script setup lang="ts">
import {useTitle} from "@vueuse/core";
import {autoUseI18n} from "@/utils/i18nUtils.ts";

const {gt}=autoUseI18n();
useTitle(gt('global.title'));
</script>

<template>
  <h1>主页</h1>
  <p>{{gt('global.title')}}</p>
</template>

<style scoped lang="scss">
</style>