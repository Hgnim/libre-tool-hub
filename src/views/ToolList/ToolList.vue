<script setup lang="ts">
import { autoLoadLocale } from "@/ts/global/vue/autoLoadLocale";
import {autoUseI18n, getCurrentLocale, getFallbackLocale, localeEvents} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import type {AllTools, AllTools_Tool} from "@/views/tools/json/type/allTools.type.ts";
import allToolsJsonFileGet from "@/views/tools/ts/allToolsJsonFileGet.ts";
import {onMounted, onUnmounted, ref, type Ref} from "vue";
import {explanationJson_get} from "@/views/tools/ts/assets.ts";
import explanationJsonFileGet from "@/views/tools/ts/explanationJsonFileGet.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_ToolList";
function onLocaleChanged(){
  initAllExplanation();
}

autoLoadLocale(lp, () => {
  useTitle(`${t(`${lp}.title`)}${t('global.title')}`);
});

onMounted(()=>{
  localeEvents.on("afterLocaleChange", onLocaleChanged);
});
onUnmounted(()=>{
  localeEvents.off("afterLocaleChange", onLocaleChanged);
});

const allTools:Ref<AllTools|undefined>=ref(undefined);
const allExplanation:Ref<any>=ref({});
const explanationJson=explanationJson_get();
async function initAllExplanation(){
  if (allTools.value) {
    for (const tid of allTools.value.allToolsId) {
      const tryLocale: string[] = [
        ...[getCurrentLocale()],//当前语言
        ...getFallbackLocale(true),//如果当前语言对应的文件未找到，则寻找回退语言
      ];
      for (let i = 0; i < tryLocale.length; i++) {
        const res = await explanationJsonFileGet(
            ((allTools.value!.allTools as any)[tid]! as AllTools_Tool).path.explanationJson
                .replace('{lang}', tryLocale[i] as string),
            explanationJson
        );
        if (res.code==0) {
          allExplanation.value[tid] = res.content;
          break;
        }
      }
    }
  }
}
onMounted(async ()=>{
  allTools.value=(await allToolsJsonFileGet()).content;
  await initAllExplanation();
})
</script>

<template>
  <div class="container pt-2">
    <div class="row">
      <router-link class="col-3 router-link_toollist"
                   v-for="(tid,index) in allTools?.allToolsId"
                   :key="index"
                   :to="{name: ((allTools?.allTools as any)[tid] as AllTools_Tool).router.name}"
      >
        <div class="card toollist">
          <div class="card-header">
            {{allExplanation[tid]?.title.raw}}
          </div>
          <div class="card-body">
            {{allExplanation[tid]?.description.raw}}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card{
  &.toollist{
    height: 10rem;
    .card-body{
      overflow-y: scroll;
    }
  }
}
.router-link_toollist{
  text-decoration: none;
  /*
  *{
      text-decoration: none;
  }
  */
}
</style>