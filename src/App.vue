<script setup lang="ts">
import navbar from "@/components/navbar/navbar.vue";
import {loadGlobalLocale} from "@/utils/i18nUtils.ts";

loadGlobalLocale();
</script>

<template>
  <navbar/>
  <div id="view">
    <router-view/>
  </div>
</template>

<style scoped lang="scss">
</style>
