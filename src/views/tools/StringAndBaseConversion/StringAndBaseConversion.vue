<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import {computed, onMounted, ref, type Ref} from "vue";
import {doSbConv} from "@/views/tools/StringAndBaseConversion/ts/strBaseConversion.ts";
import {useRoute} from "vue-router";

const {lt:t,gt}=autoUseI18n();
useTitle(`${t('title')}${gt('global.title')}`);

const route = useRoute();
const query = computed(()=>({
  str: route.query.text,
  baseStr: route.query.baseText,
  base: route.query.base,
}));

const autoConvSw:Ref<HTMLInputElement|null>=ref(null);
const doConvBtn_stb:Ref<HTMLButtonElement|null>=ref(null);
const doConvBtn_bts:Ref<HTMLButtonElement|null>=ref(null);

const stringValue:Ref<HTMLInputElement|null>=ref(null);
const baseValue:Ref<HTMLInputElement|null>=ref(null);
const baseType:Ref<HTMLInputElement|null>=ref(null);
const stringValueIsInvalid:Ref<boolean>=ref(false);
const baseValueIsInvalid:Ref<boolean>=ref(false);

function autoConvSw_change(){
  if (autoConvSw.value) {
    if (autoConvSw.value.checked) {
      doConvBtn_stb.value && (doConvBtn_stb.value.style.display='none');
      doConvBtn_bts.value && (doConvBtn_bts.value.style.display='none');
    } else {
      doConvBtn_stb.value && (doConvBtn_stb.value.style.display='');
      doConvBtn_bts.value && (doConvBtn_bts.value.style.display='');
    }
  }
}
function doConvAction(isStrToBase:boolean){
  if (
         stringValue.value
      && baseValue.value
      && baseType.value
  ) {
    const res=(()=>{
      if (isStrToBase){
        return doSbConv(
            stringValue.value!.value,
            null,
            Number(baseType.value!.value)
        )
      }else{
        return doSbConv(
            null,
            baseValue.value!.value,
            Number(baseType.value!.value)
        )
      }
    })();
    if (res.code==0){
      if (isStrToBase){
        baseValue.value.value=res.output!;
      }else{
        stringValue.value.value=res.output!;
      }
      stringValueIsInvalid.value=false;
      baseValueIsInvalid.value=false;
    }else if (res.code==1){
      if (isStrToBase){
        stringValueIsInvalid.value=true;
      }else{
        baseValueIsInvalid.value=true;
      }
    }
  }
}

let stringValue_input_lock:boolean=false;
function stringValue_input(){
  if (
         autoConvSw.value
      && autoConvSw.value.checked
      && !stringValue_input_lock
  ){
    baseValue_input_lock = true;
    doConvAction(true);
    baseValue_input_lock = false;
  }
}
let baseValue_input_lock:boolean=false;
function baseValue_input(){
  if (
         autoConvSw.value
      && autoConvSw.value.checked
      && !baseValue_input_lock
  ){
    stringValue_input_lock = true;
    doConvAction(false);
    stringValue_input_lock = false;
  }
}
onMounted(() => {
  autoConvSw_change();

  {
    if (
        (
              typeof query.value.str == 'string'
            ||typeof query.value.baseStr == 'string'
        )
        &&typeof query.value.base == 'string'){
      baseType.value!.value = query.value.base;
      if (typeof query.value.str == 'string'){
        stringValue.value!.value=query.value.str;
        doConvAction(true);
      }else if (typeof query.value.baseStr == 'string'){
        baseValue.value!.value=query.value.baseStr;
        doConvAction(false);
      }
    }
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
    <span class="input-group-text">{{t('text')}}</span>
    <textarea ref="stringValue" class="form-control" @input="stringValue_input" :class="{ 'is-invalid': stringValueIsInvalid }"></textarea>
  </div>
  <div class="input-group mb-2">
    <select ref="baseType" @change="stringValue_input" class="input-group-text">
      <option value="2" selected>{{t('base-2')}}</option>
      <option value="8">{{t('base-8')}}</option>
      <option value="10">{{t('base-10')}}</option>
      <option value="16">{{t('base-16')}}</option>
    </select>
    <textarea ref="baseValue" class="form-control" @input="baseValue_input" :class="{ 'is-invalid': baseValueIsInvalid }"></textarea>
  </div>
  <div class="input-group center mb-2">
    <button ref="doConvBtn_stb" @click="doConvAction(true)" type="button" class="btn btn-primary">{{t('conv-textToBase')}}</button>
    <button ref="doConvBtn_bts" @click="doConvAction(false)" type="button" class="btn btn-primary">{{t('conv-baseToText')}}</button>
  </div>
</template>

<style scoped lang="scss">
.input-group{
  &.center{
    justify-content: center;
  }
}
</style>

<i18n>
{
  "zh-CN": {
    "title": "文本转进制-",
    "autoConv": "自动转换",
    "conv-textToBase": "文本->n进制",
    "conv-baseToText": "n进制->文本",
    "text": "文本",
    "base-2": "二进制",
    "base-8": "八进制",
    "base-10": "十进制",
    "base-16": "十六进制"
  },
  "en-US": {
    "title": "Text to n-base - ",
    "autoConv": "Automatic conversion",
    "conv-textToBase": "text -> n-base",
    "conv-baseToText": "n-base -> text",
    "text": "Text",
    "base-2": "Binary",
    "base-8": "Octal",
    "base-10": "Decimal",
    "base-16": "Hexadecimal"
  }
}
</i18n>