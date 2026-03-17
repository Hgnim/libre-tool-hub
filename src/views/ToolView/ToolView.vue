<script setup lang="ts">
import tvFooter from "@/components/footer/toolview/toolviewFooter.vue";

import {useRoute} from "vue-router";
import {computed, onMounted, onUnmounted, ref, type Ref} from "vue";
import {localeEvents} from "@/utils/i18nUtils.ts";
import appendixLoader from "@/views/ToolView/ts/appendixLoader.ts";

const route = useRoute();
const meta = computed(() => ({
  toolId: route.meta.toolId as string,
}))

const appendix:Ref<HTMLElement|null> = ref(null);
const {doLoad:doAppendixLoad} = appendixLoader(appendix,meta.value.toolId);

function handleResize(){
  footerMt_update();
}
const container:Ref<HTMLElement|null>=ref(null);
const footerMt:Ref<number>=ref(0)
function footerMt_update(){
  footerMt.value=(()=>{
    const min=100;//最小间隔100px
    let out=window.innerHeight-container.value!.offsetHeight;
    if (out<0)
      return min;
    else
      return out;
  })();
}
onMounted(async () => {
  await doAppendixLoad();
  localeEvents.on('afterLocaleChange',doAppendixLoad);

  window.addEventListener('resize', handleResize)
  footerMt_update();
});
onUnmounted(()=>{
  localeEvents.off('afterLocaleChange',doAppendixLoad);

  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div ref="container" class="container">
    <div class="row">
      <div id="tool-view" class="col-12 mt-4">
        <router-view/>
      </div>
      <div id="appendix-border" class="col-12 mt-4">
        <div ref="appendix" id="appendix" class="markdown-body">
        </div>
      </div>
    </div>
  </div>
  <tvFooter :footerMarginTop="footerMt"/>
</template>

<style scoped lang="scss">
%shared-border{
  padding: 5vh 5vw 5vh 5vw;
  background-color: var(--bs-secondary-bg);
  border: 2px solid var(--bs-border-color);
  border-radius: 15px;
}
#tool-view{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @extend %shared-border;
}
#appendix-border{
  @extend %shared-border;

  .markdown-body {
    background-color: transparent;
  }
}
#appendix{
  position: relative;
  height: 100%;
  width: 100%;
}
</style>