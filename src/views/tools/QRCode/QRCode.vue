<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useRoute} from "vue-router";

const {lt:t}=autoUseI18n();
const route = useRoute();
</script>

<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link class="nav-link"
                   :class="{'active':(route.name=='tool_qrcode_create')}"
                   :to="{name: 'tool_qrcode_create'}"
      >{{t('tab.create')}}</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link"
                   :class="{'active':(route.name=='tool_qrcode_parse')}"
                   :to="{name: 'tool_qrcode_parse'}"
      >{{t('tab.parse')}}</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link"
                   :class="{'active':(route.name=='tool_qrcode_scanparse')}"
                   :to="{name: 'tool_qrcode_scanparse'}"
      >{{t('tab.scanparse')}}</router-link>
    </li>
  </ul>
  <router-view/>
</template>

<style scoped lang="scss" src="@/views/tools/scss/shared.scss">
</style>

<i18n>
{
  "zh-CN": {
    "tab": {
      "create": "生成二维码",
      "parse": "解析二维码",
      "scanparse": "扫描二维码"
    }
  },
  "en-US": {
    "tab": {
      "create": "Create qrcode",
      "parse": "Parse qrcode",
      "scanparse": "Scan qrcode"
    }
  }
}
</i18n>
