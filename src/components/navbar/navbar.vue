<script setup lang="ts">
import {autoUseI18n, getCurrentLocale, switchLocale} from "@/utils/i18nUtils.ts";
import {type Ref, ref} from "vue";

const {lt:t}=autoUseI18n();

const curLoc:Ref<string>= ref(getCurrentLocale());
async function doLangSel(lang:string){
  await switchLocale(lang);
  curLoc.value=getCurrentLocale();
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home'}">LTH</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" :to="{ name: 'toolList'}">{{t('toolList')}}</router-link>
          </li>
        </ul>
        <span>{{t('dev')}}</span>
        <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
          <li class="nav-item dropdown">
            <button type="button" class="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle" data-bs-toggle="dropdown">
              <svg class="bi mb-1" width="24" height="24" style="margin-right: 0.25rem"><use xlink:href="#svg-bsi-globe2"></use></svg><span>{{t('langs.lang')}}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <h6 class="dropdown-header">{{t('langs.lang-sel')}}</h6>
              </li>
              <li>
                <button @click="doLangSel('zh-CN')" :class="{ 'active': (curLoc=='zh-CN') }" class="dropdown-item">
                  {{t('langs.zh-CN')}}
                  <svg :style="(curLoc!='zh-CN')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doLangSel('en-US')" :class="{ 'active': (curLoc=='en-US') }" class="dropdown-item">
                  {{t('langs.en-US')}}
                  <svg :style="(curLoc!='en-US')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">

</style>

<i18n>
{
  "zh-CN": {
    "dev": "网站开发中",
    "toolList": "工具列表",
    "langs": {
      "lang": "语言",
      "lang-sel": "语言选择",
      "zh-CN": "简体中文",
      "en-US": "English(英语)"
    }
  },
  "en-US": {
    "dev": "In development",
    "toolList": "Tool List",
    "langs": {
      "lang": "Language",
      "lang-sel": "Language Selection",
      "zh-CN": "简体中文(Simplified Chinese)",
      "en-US": "English"
    }
  }
}
</i18n>