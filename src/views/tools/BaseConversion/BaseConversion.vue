<script setup lang="ts">
import {computed, onMounted, type Ref, ref} from "vue";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import {doConv, legalCheck} from "@/views/tools/BaseConversion/ts/baseConversion.ts";
import {useRoute} from "vue-router";
const {lt:t,gt}=autoUseI18n();
useTitle(`${t('title')}${gt('global.title')}`);

const route = useRoute();
const query = computed(()=>({
  //获取url中的参数
  inputString: route.query.input,
  inputBase: route.query.inbase,
  outputBase: route.query.outbase,
}));

const autoConvSw:Ref<HTMLInputElement|null>=ref(null);

const inputValue:Ref<HTMLInputElement|null>=ref(null);
const inputTypeSelect:Ref<HTMLSelectElement|null>=ref(null);
const inputValueIsInvalid:Ref<boolean>=ref(false);
const outputValue:Ref<HTMLInputElement|null>=ref(null);
const outputTypeSelect:Ref<HTMLSelectElement|null>=ref(null);

const doConvBtn:Ref<HTMLButtonElement|null>=ref(null);


function autoConvSw_change(){
  if (autoConvSw.value) {
    if (autoConvSw.value.checked) {
      doConvBtn.value && (doConvBtn.value.style.display='none');
    } else {
      doConvBtn.value && (doConvBtn.value.style.display='');
    }
  }
}

function inputValue_input(){
  if (autoConvSw.value) {
    if (autoConvSw.value.checked) {
      doConvAction();
    } else {
      if (inputValue.value
          && inputTypeSelect.value
      ) {
        inputValueIsInvalid.value = !legalCheck(
            inputValue.value.value,
            Number(inputTypeSelect.value.value),
        );
      }
    }
  }
}

function doConvAction(){
  if (
         inputValue.value
      && inputTypeSelect.value
      && outputTypeSelect.value
      && outputValue.value
  ) {
    const res = doConv(
        inputValue.value.value,
        Number(inputTypeSelect.value.value),
        Number(outputTypeSelect.value.value),
    );
    if (res.code == 0){
      inputValueIsInvalid.value=false;
      outputValue.value.value=res.output!;
    }
    else if (res.code == 1){
      inputValueIsInvalid.value=true;
    }
  }
}

onMounted(() => {
  autoConvSw_change();

  if (
         inputValue.value
      && inputTypeSelect.value
      && outputTypeSelect.value
  ) {
    let haveArgs:boolean=false;
    if (typeof query.value.inputString == 'string') {
      inputValue.value.value = query.value.inputString;
      haveArgs = true;
    }
    if (typeof query.value.inputBase == 'string') {
      inputTypeSelect.value.value = query.value.inputBase;
      haveArgs = true;
    }
    if (typeof query.value.outputBase == 'string') {
      outputTypeSelect.value.value = query.value.outputBase;
      haveArgs = true;
    }
    if (haveArgs)
      inputValue_input();
  }
});
</script>

<template>
  <div class="input-group center mb-2">
    <div class="form-check form-switch">
      <input ref="autoConvSw" @change="autoConvSw_change" class="form-check-input" type="checkbox" role="switch" checked>
      <label class="form-check-label">{{t('autoConv')}}</label>
    </div>
  </div>
  <div class="input-group mb-2">
    <span class="input-group-text">{{t('input')}}</span>
    <input ref="inputValue" @input="inputValue_input" :class="{ 'is-invalid': inputValueIsInvalid }" type="text" class="form-control" :placeholder="t('input')"/>
    <select ref="inputTypeSelect" @change="inputValue_input" class="input-group-text">
      <option value="2">{{t('base-2')}}</option>
      <option value="8">{{t('base-8')}}</option>
      <option value="10" selected>{{t('base-10')}}</option>
      <option value="16">{{t('base-16')}}</option>
    </select>
  </div>
  <div class="input-group mb-2">
    <span class="input-group-text">{{t('output')}}</span>
    <input ref="outputValue" type="text" class="form-control" :placeholder="t('output')" disabled/>
    <select ref="outputTypeSelect" @change="inputValue_input" class="input-group-text">
      <option value="2" selected>{{t('base-2')}}</option>
      <option value="8">{{t('base-8')}}</option>
      <option value="10">{{t('base-10')}}</option>
      <option value="16">{{t('base-16')}}</option>
    </select>
  </div>
  <button ref="doConvBtn" @click="doConvAction" type="button" class="btn btn-primary">{{t('conv')}}</button>
</template>

<style scoped lang="scss" src="@/views/tools/scss/shared.scss">
</style>

<i18n>
{
  "zh-CN": {
    "title": "进制转换-",
    "autoConv": "自动转换",
    "conv": "转换",
    "input": "输入",
    "output": "输出",
    "base-2": "二进制",
    "base-8": "八进制",
    "base-10": "十进制",
    "base-16": "十六进制"
  },
  "en-US": {
    "title": "Base conversion - ",
    "autoConv": "Automatic conversion",
    "conv": "Convert",
    "input": "Input",
    "output": "Output",
    "base-2": "Binary",
    "base-8": "Octal",
    "base-10": "Decimal",
    "base-16": "Hexadecimal"
  }
}
</i18n>