<script setup lang="ts">
import {onMounted, onUnmounted, type Ref, ref} from "vue";
import markpane from "markpane";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";

const {lt:t,gt}=autoUseI18n();
useTitle(`${t('title')}${gt('global.title')}`);

const inputBox:Ref<HTMLTextAreaElement|null> = ref(null);
const outputBox:Ref<HTMLDivElement|null> = ref(null);
const outputBox_mdp:Ref<HTMLDivElement|null> = ref(null);

function doConv(){
  if (inputBox.value && outputBox_mdp.value){
    outputBox_mdp.value.innerHTML=markpane.parse(inputBox.value.value,false);
  }
}

function inputBox_input(){
  if (autoConvSw.value && autoConvSw.value.checked)
    doConv();
}
function inputBox_resize(){
  if (inputBox.value && outputBox.value){
    //outputBox.value.style.width=inputBox.value.style.width;
    outputBox.value.style.height=inputBox.value.style.height || `${inputBox.value.offsetHeight}px`;
  }
}

const autoConvSw:Ref<HTMLInputElement|null>=ref(null);
const doConvBtn:Ref<HTMLButtonElement|null>=ref(null);
function autoConvSw_change(){
  if (autoConvSw.value && doConvBtn.value) {
    doConvBtn.value.style.display=autoConvSw.value.checked?'none':'';
  }
}

let inputBox_resizeObserver:ResizeObserver|null = null;
onMounted(()=>{
  inputBox_resizeObserver = new ResizeObserver(inputBox_resize);
  inputBox_resizeObserver.observe(inputBox.value!);

  inputBox_resize();
  autoConvSw_change();
});
onUnmounted(() => {
  if (inputBox_resizeObserver) {
    inputBox_resizeObserver.disconnect()
  }
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-2">
        <div class="input-group center">
          <div class="form-check form-switch">
            <input ref="autoConvSw" @change="autoConvSw_change" class="form-check-input" type="checkbox" role="switch" checked>
            <label class="form-check-label">{{t('autoConv')}}</label>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 mb-2">
        <div class="input-group">
          <textarea
              ref="inputBox"
              id="inputBox"
              class="form-control"
              :placeholder="t('input')"
              @input="inputBox_input"
          ></textarea>
        </div>
      </div>
      <div class="col-12 col-md-6 mb-2">
        <div ref="outputBox" class="form-control">
          <div ref="outputBox_mdp" class="mdp-cont markdown-body">

          </div>
        </div>
      </div>
      <div class="col-12 mb-2">
        <div class="input-group center">
          <button ref="doConvBtn" @click="doConv()" type="button" class="btn btn-primary">{{t('convBtn')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container{
  padding: 0;
}

#inputBox{
  height: 50vh;
}
.mdp-cont{
  position:relative;
  overflow:scroll;
  width:100%;
  height:100%;
  background-color: unset;
}
</style>
<style scoped lang="scss" src="@/views/tools/scss/shared.scss">
</style>

<i18n>
{
  "zh-CN": {
    "title": "Markdown Pane预览工具-",
    "autoConv": "自动预览",
    "input": "输入",
    "convBtn": "预览"
  },
  "en-US": {
    "title": "Markdown Pane Preview Tool - ",
    "autoConv": "Auto Preview",
    "input": "Input",
    "convBtn": "Preview"
  }
}
</i18n>