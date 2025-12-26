<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";

const {lt:t}=autoUseI18n();

const props = defineProps({
  footerMarginTop: {
    type: Number,
    required: true,
  },
});
</script>

<template>
<footer class="modal modal-footer" :style="{ marginTop: props.footerMarginTop + 'px' }">
  <a href="https://github.com/Hgnim/libre-tool-hub">
    <svg class="bi" width="24" height="24" ><use xlink:href="#svg-bsi-github"></use></svg>
  </a>
  <strong>{{t('main')}}</strong>
</footer>
</template>

<style scoped lang="scss">
footer{
  background-color: var(--bs-modal-footer-bg);
  color: var(--bs-modal-footer-color);
  position: relative;
  width: 100%;
  justify-content: center;
  //margin-top: 100vh;
}
</style>

<i18n>
{
  "zh-CN": {
    "main": "该网站的所有工具开源且均为本地计算"
  },
  "en-US": {
    "main": "All the tools on this website are open-source and run locally."
  }
}
</i18n>