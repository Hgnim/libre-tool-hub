<script setup lang="ts">
import {autoUseI18n, getCurrentLocale, switchLocale} from "@/utils/i18nUtils.ts";
import {onMounted, type Ref, ref} from "vue";

const emit = defineEmits(['navbarHeight']);
const {lt:t}=autoUseI18n();

const curLoc:Ref<string>= ref(getCurrentLocale());
async function doLangSel(lang:string){
  await switchLocale(lang);
  curLoc.value=getCurrentLocale();
}

const navbar:Ref<HTMLElement|null> = ref(null);
onMounted(()=>{
  emit('navbarHeight',navbar.value!.offsetHeight);
})
</script>

<template>
  <nav ref="navbar" class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home'}">LTH</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav d-flex me-auto nav-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" :to="{ name: 'toolList'}">{{t('toolList')}}</router-link>
          </li>
        </ul>
        <ul class="navbar-nav d-flex me-auto nav-1">
          <li class="nav-item">
            <span>{{t('dev')}}</span>
          </li>
        </ul>
        <ul class="navbar-nav d-flex nav-2">
          <li class="nav-item dropdown d-flex flex-ai-c">
            <button type="button" class="btn btn-link nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <svg class="bi" width="24" height="24" ><use xlink:href="#svg-bsi-globe2"></use></svg>
              <span class="ml">{{t('langs.lang')}}</span>
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
          <li class="nav-item py-2 py-lg-1 col-12 col-lg-auto">
            <div class="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
            <hr class="d-lg-none my-2 text-white-50">
          </li>
          <li class="nav-item py-2 d-flex flex-ai-c">
            <a href="https://github.com/Hgnim/libre-tool-hub">
              <svg class="bi" width="24" height="24" ><use xlink:href="#svg-bsi-github"></use></svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar{
  padding: .2rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  opacity: .9;
}
.nav-0{}
.nav-1{}
.nav-2{
  .dropdown-toggle{
    display: flex;
    align-items: center;
    .ml{
      margin-left: 0.25rem;
    }
  }
}
.d-flex{
  .flex-ai-c{
    align-items: center;
  }
}
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