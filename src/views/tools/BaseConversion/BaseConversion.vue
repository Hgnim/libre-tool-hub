<script setup lang="ts">
import {onMounted, type Ref, ref} from "vue";
import {isDev} from "@/ts/global/packMode.ts";

const autoConvSw:Ref<HTMLInputElement|null>=ref(null);

const inputValue:Ref<HTMLInputElement|null>=ref(null);
const inputTypeSelect:Ref<HTMLSelectElement|null>=ref(null);
const inputValueIsInvalid:Ref<boolean>=ref(false);
const outputValue:Ref<HTMLInputElement|null>=ref(null);
const outputTypeSelect:Ref<HTMLSelectElement|null>=ref(null);

const doConvBtn:Ref<HTMLButtonElement|null>=ref(null);

const allChars:string[]=[
    '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e'
]

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
      doConv();
    } else {
      legalCheck();
    }
  }
}
function legalCheck():boolean|null{
  if (inputTypeSelect.value && inputValue.value) {
    const chars: string[] = (() => allChars.slice(0, Number(inputTypeSelect.value.value)))();
    const charsRegex:RegExp = new RegExp(`^[${chars.join('')}]+$`);
    const test:boolean=charsRegex.test(inputValue.value.value);
    inputValueIsInvalid.value=!(test);
    return test;
  }
  return null;
}

function doConv(){
  if (legalCheck()!=true) return;

  if (inputValue.value &&
      inputTypeSelect.value &&
      outputTypeSelect.value &&
      outputValue.value
  ){
    const inputChars:string[]=inputValue.value.value.split('');
    const inputBase:number=Number(inputTypeSelect.value.value);
    const outputBase:number=Number(outputTypeSelect.value.value);

    const outToDec:bigint=(()=>{
      let op:bigint=0n;
      for (let i=0; i<inputChars.length; i++){
        for (let j=0;j<allChars.length;j++){
          if (inputChars[i] == allChars[j]){
            op+=BigInt(j)*BigInt((BigInt(inputBase)**BigInt((inputChars.length-1-i))));
            break;
          }
        }
      }
      return op;
    })();
    if (isDev)
      console.debug
        (`[BaseConversion.vue] ${inputBase}进制转十进制结果：${outToDec.toLocaleString('fullwide'/*不使用科学计数法*/, {useGrouping: false/*不使用千位分隔符','*/})}`);

    let dec:bigint=outToDec;
    let opVals:string[] = [];
    while (true){
      opVals.push((dec%BigInt(outputBase)).toString());
      dec /= BigInt(outputBase);//bigint正数情况下向下取整，负数计算则需要额外逻辑
      if (dec == 0n){
        break;
      }
    }
    let outputVal:string='';
    for (let i=opVals.length-1;i>=0;i--){
      outputVal+=opVals[i];
    }
    console.debug(`[BaseConversion.vue] ${inputBase}进制转${outputBase}进制输出：${outputVal}`);

    outputValue.value.value=outputVal;
  }
}


onMounted(() => {
  autoConvSw_change();
});
</script>

<template>
  <div class="input-group center mb-2">
    <div class="form-check form-switch">
      <input ref="autoConvSw" @change="autoConvSw_change" class="form-check-input" type="checkbox" role="switch" checked>
      <label class="form-check-label">自动转换</label>
    </div>
  </div>
  <div class="input-group mb-2">
    <span class="input-group-text">输入</span>
    <input ref="inputValue" @input="inputValue_input" :class="{ 'is-invalid': inputValueIsInvalid }" type="text" class="form-control" placeholder="输入"/>
    <select ref="inputTypeSelect" @change="inputValue_input" class="input-group-text">
      <option value="2">二进制</option>
      <option value="8">八进制</option>
      <option value="10" selected>十进制</option>
      <option value="16">十六进制</option>
    </select>
  </div>
  <div class="input-group mb-2">
    <span class="input-group-text">输出</span>
    <input ref="outputValue" type="text" class="form-control" placeholder="输出" disabled/>
    <select ref="outputTypeSelect" @change="inputValue_input" class="input-group-text">
      <option value="2" selected>二进制</option>
      <option value="8">八进制</option>
      <option value="10">十进制</option>
      <option value="16">十六进制</option>
    </select>
  </div>
  <button ref="doConvBtn" @click="doConv" type="button" class="btn btn-primary">转换</button>
</template>

<style scoped lang="scss">
.input-group{
  &.center{
    justify-content: center;
  }
}
</style>