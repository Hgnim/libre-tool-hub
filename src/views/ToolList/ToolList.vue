<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";

const {lt:t,gt}=autoUseI18n();
useTitle(`${t('title')}${gt('global.title')}`);
</script>

<template>
<router-link :to="{name: 'tool_baseConversion'}">{{t('baseConv')}}</router-link>
  <br>
  <router-link :to="{name: 'tool_stringAndBaseConversion'}">{{t('stringAndBaseConv')}}</router-link>
  <br>
  <router-link :to="{name: 'tool_qrcode'}">{{t('qrcode')}}</router-link>
  <br>
  <router-link :to="{name: 'tool_markdown-pane'}">markdown pane工具</router-link>
</template>

<style scoped lang="scss">

</style>

<i18n>
{
  "zh-CN": {
    "title": "工具列表-",
    "baseConv": "进制转换",
    "stringAndBaseConv": "文本转进制",
    "qrcode": "二维码工具"
  },
  "en-US": {
    "title": "Tool list - ",
    "baseConv": "Base conversion",
    "stringAndBaseConv": "Text to n-base",
    "qrcode": "Qrcode tool"
  }
}
</i18n>