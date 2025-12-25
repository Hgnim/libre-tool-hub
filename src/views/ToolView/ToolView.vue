<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, onMounted, onUnmounted, ref, type Ref} from "vue";
import {marked} from "marked";
import {getCurrentLocale, getFallbackLocale, localeEvents} from "@/utils/i18nUtils.ts";
import {isDev} from "@/ts/global/packMode.ts";

const route = useRoute();
const meta = computed(() => ({
  appendixMdPath: route.meta.appendix_mdPath as string,
}))

const appendix:Ref<HTMLElement|null> = ref(null);

async function doMd(){
  if(appendix.value) {
    appendix.value.innerHTML=marked.parse(
        (await (async ():Promise<string> => {
          const tryLocale:string[]=[
            ...[getCurrentLocale()],//当前语言
            ...getFallbackLocale(true),//如果当前语言对应的文件未找到，则寻找回退语言
          ]
          let resp:Response;
          for (let i=0;i<tryLocale.length;i++) {
            resp = await fetch(meta.value.appendixMdPath.replace('{lang}',tryLocale[i] as string));
            const contentType:string = resp.headers.get('content-type')||'';
            if (resp.ok &&
                (
                    //添加内容类型判断，避免未匹配到目标时返回index.html导致fetch误以为请求成功
                    contentType.includes('text/plain') ||
                    contentType.includes('text/markdown')
                )
            ) {
              if (isDev) console.debug(`[ToolView.vue] '${meta.value.appendixMdPath.replace('{lang}',tryLocale[i] as string)}'文件已加载`);
              return resp.text();
            }
          }
          throw new Error('无法请求到文件');
        })()).toString()
    ) as string;
  }
}
onMounted(async () => {
  await doMd();
  localeEvents.on('afterLocaleChange',doMd);
});
onUnmounted(()=>{
  localeEvents.off('afterLocaleChange',doMd);
})
</script>

<template>
  <div class="container">
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