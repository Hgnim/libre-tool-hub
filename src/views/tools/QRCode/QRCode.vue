<script setup lang="ts">
import QRCode from 'qrcode'
import {onMounted, ref, type Ref} from "vue";
import {isDev} from "@/ts/global/packMode.ts";


const contentInput:Ref<HTMLInputElement|null> = ref(null);
const contentInputIsInvalid:Ref<boolean>=ref(false);
const typeSelect:Ref<HTMLSelectElement|null> = ref(null);
const qualityInput:Ref<HTMLInputElement|null> = ref(null);
const errorCorrectionSelect:Ref<HTMLSelectElement|null> = ref(null);
const scaleInput:Ref<HTMLInputElement|null> = ref(null);
const widthInput:Ref<HTMLInputElement|null> = ref(null);
const marginInput:Ref<HTMLInputElement|null> = ref(null);
const darkInput:Ref<HTMLInputElement|null> = ref(null);
const darkInputIsInvalid:Ref<boolean>=ref(false);
const lightInput:Ref<HTMLInputElement|null> = ref(null);
const lightInputIsInvalid:Ref<boolean>=ref(false);
const createBtn:Ref<HTMLButtonElement|null> = ref(null);

const qrcodeOutput:Ref<HTMLImageElement|null>=ref(null);

function createBtn_click(){
  if (
        qrcodeOutput.value
      &&contentInput.value
      &&typeSelect.value
      &&qualityInput.value
      &&errorCorrectionSelect.value
      &&marginInput.value
      &&scaleInput.value
      &&widthInput.value
      &&darkInput.value
      &&lightInput.value
  ) {
    qrcodeOutput.value.style.display="none";
    QRCode.toDataURL(
        contentInput.value.value,
        {
          type: typeSelect.value.value as ("image/png"|"image/jpeg"|"image/webp"),
          quality: Number(qualityInput.value.value),
          errorCorrectionLevel: errorCorrectionSelect.value.value as ('H'|'Q'|'M'|'L'),
          margin: Number(marginInput.value.value),
          scale: Number(scaleInput.value.value),
          width: Number(widthInput.value.value),//256,//undefined,
          color: {
            dark: darkInput.value.value,
            light: lightInput.value.value,
          },
        },
        function (err, url) {
          if (err) {
            if (isDev) console.error('[QRCode.vue] 生成时出现错误：',err);
            if (err.message.includes('No input text')){
              contentInputIsInvalid.value = true;
            }else if (err.message.includes('color')){
              darkInputIsInvalid.value = true;
              lightInputIsInvalid.value = true;
            }
          }
          else {
            qrcodeOutput.value!.src = url;
            qrcodeOutput.value!.style.display = '';

            contentInputIsInvalid.value = false;
            darkInputIsInvalid.value = false;
            lightInputIsInvalid.value = false;
          }
        },
    );
  }
}

onMounted(()=>{
  qrcodeOutput.value!.style.display='none';

  typeSelect_change();
  widthInput_input();
})

function typeSelect_change(){
  if (
        typeSelect.value
      &&qualityInput.value
  ){
    qualityInput.value.disabled = typeSelect.value.value == 'image/png';
  }
}
function widthInput_input(){
  if(
        widthInput.value
      &&scaleInput.value
  ){
    scaleInput.value.disabled = widthInput.value.value != '';
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="mb-1 col-12">
        <div class="input-group">
          <span class="input-group-text">内容</span>
          <textarea ref="contentInput" class="form-control" :class="{ 'is-invalid': contentInputIsInvalid }"></textarea>
        </div>
      </div>
      <div class="mb-1 col-12 col-md-6">
        <div class="input-group">
          <span class="input-group-text">类型</span>
          <select ref="typeSelect" class="form-select" @change="typeSelect_change">
            <option value="image/png" selected>png</option>
            <option value="image/jpeg">jpeg</option>
            <option value="image/webp">webp</option>
          </select>
          <span class="input-group-text">质量</span>
          <input ref="qualityInput" type="number" max="1" min="0" step="0.1" class="form-control" placeholder="0-1" value="0.92"/>
        </div>
      </div>
      <div class="mb-1 col-12 col-md-6">
        <div class="input-group">
          <span class="input-group-text">抗损坏面积</span>
          <select ref="errorCorrectionSelect" class="form-select">
            <option value="H">30%</option>
            <option value="Q">25%</option>
            <option value="M" selected>15%</option>
            <option value="L">7%</option>
          </select>
        </div>
      </div>
      <div class="mb-1 col-12 col-lg-6">
        <div class="input-group">
          <span class="input-group-text">块像素大小</span>
          <input ref="scaleInput" type="number" min="0" step="1" class="form-control" value="4"/>
          <span class="input-group-text">宽度</span>
          <input ref="widthInput" @input="widthInput_input" type="number" min="0" step="16" class="form-control"/>
        </div>
      </div>
      <div class="mb-1 col-12 col-lg-6">
        <div class="input-group">
          <span class="input-group-text">边距</span>
          <input ref="marginInput" type="text" class="form-control" value="1"/>
          <span class="input-group-text">前景色</span>
          <input ref="darkInput" type="text" class="form-control" :class="{ 'is-invalid': darkInputIsInvalid }" value="#000"/>
          <span class="input-group-text">背景色</span>
          <input ref="lightInput" type="text" class="form-control" :class="{ 'is-invalid': lightInputIsInvalid }" value="#fff"/>
        </div>
      </div>
      <div class="mb-3 col-12 d-flex justify-content-center">
        <button ref="createBtn" @click="createBtn_click" type="button" class="btn btn-primary">生成</button>
      </div>
      <div class="col-12 d-flex justify-content-center">
        <img ref="qrcodeOutput" src="" alt="qrcode"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container{
  padding: 0;
}
</style>
<style scoped lang="scss" src="@/views/tools/scss/shared.scss">
</style>
