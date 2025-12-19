<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";

const {lt:t,gt}=autoUseI18n();
useTitle(`${t('title')}${gt('global.title')}`);
</script>

<template>
<router-link to="">{{t('baseConv')}}</router-link>
</template>

<style scoped lang="scss">

</style>

<i18n>
{
  "zh-CN": {
    "title": "工具列表-",
    "baseConv": "进制转换"
  },
  "en-US": {
    "title": "Tool list - ",
    "baseConv": "Base conversion"
  }
}
</i18n>