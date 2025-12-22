<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, onMounted, ref, type Ref} from "vue";
import {marked} from "marked";
import type {appendix_mdFile_type} from "@/router/tool.router.ts";

const route = useRoute();
const meta = computed(() => ({
  appendixMdFile: route.meta.appendix_mdFile as appendix_mdFile_type,
}))

const appendix:Ref<HTMLElement|null> = ref(null);

onMounted(async () => {
  if(appendix.value) {
    appendix.value.innerHTML=marked.parse((await meta.value.appendixMdFile()).default) as string;
  }
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div id="tool-view" class="col-12 mt-4">
        <router-view/>
      </div>
      <div ref="appendix" id="appendix" class="col-12 mt-2">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#tool-view{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5vh 5vw 5vh 5vw;
  background-color: var(--bs-secondary-bg);
  border: 2px solid var(--bs-border-color);
  border-radius: 15px;
}
</style>