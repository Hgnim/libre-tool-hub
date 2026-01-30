<script setup lang="ts">
import QRCode, {
  type QRCodeDataURLType,
  type QRCodeErrorCorrectionLevel,
  type QRCodeMaskPattern,
  type QRCodeRenderersOptions,
  type QRCodeStringType,
} from 'qrcode'
import {onMounted, onUnmounted, ref, type Ref} from "vue";
import { isDev } from "@/ts/env/packMode.ts";
import { autoUseI18n } from "@/utils/i18nUtils.ts";
import { autoLoadLocale } from "@/ts/global/vue/autoLoadLocale.ts";
import { useTitle } from "@vueuse/core";

const {gt:t}=autoUseI18n();
const lp:string="view_tool_QRCode_comp_createQRCode";
autoLoadLocale(lp,()=>{
  useTitle(`${t(`${lp}.title`)}${t('global.title')}`);
});

const tempDownloadUrl:string[]=[];
onUnmounted(()=>{
  tempDownloadUrl.forEach((url)=>{
    URL.revokeObjectURL(url);//释放临时url
  });
});

const contentInput:Ref<HTMLTextAreaElement|null> = ref(null);
const contentInputIsInvalid:Ref<boolean>=ref(false);
const typeSelect:Ref<HTMLSelectElement|null> = ref(null);
const qualityInput:Ref<HTMLInputElement|null> = ref(null);
const errorCorrectionSelect:Ref<HTMLSelectElement|null> = ref(null);
const maskPatternSelect:Ref<HTMLSelectElement|null> = ref(null);
const scaleInput:Ref<HTMLInputElement|null> = ref(null);
const widthInput:Ref<HTMLInputElement|null> = ref(null);
const marginInput:Ref<HTMLInputElement|null> = ref(null);
const darkInput:Ref<HTMLInputElement|null> = ref(null);
const darkInputIsInvalid:Ref<boolean>=ref(false);
const lightInput:Ref<HTMLInputElement|null> = ref(null);
const lightInputIsInvalid:Ref<boolean>=ref(false);
//const createBtn:Ref<HTMLButtonElement|null> = ref(null);

const qrcodeOutput_imgDiv:Ref<HTMLDivElement|null> = ref(null);
const qrcodeOutput_img:Ref<HTMLImageElement|null>=ref(null);
const qrcodeOutput_imgDiv_a:Ref<HTMLAnchorElement|null> = ref(null);
const qrcodeOutput_svgDiv:Ref<HTMLDivElement|null> = ref(null);
const qrcodeOutput_div_svg:Ref<HTMLDivElement|null> = ref(null);
const qrcodeOutput_svgDiv_a:Ref<HTMLAnchorElement|null> = ref(null);
const qrcodeOutput_div_text:Ref<HTMLTextAreaElement|null> = ref(null);

function createBtn_click(){
  if (
      qrcodeOutput_imgDiv.value
      &&qrcodeOutput_img.value
      &&qrcodeOutput_imgDiv_a.value
      &&qrcodeOutput_svgDiv.value
      &&qrcodeOutput_div_svg.value
      &&qrcodeOutput_svgDiv_a.value
      &&qrcodeOutput_div_text.value
      &&contentInput.value
      &&typeSelect.value
      &&qualityInput.value
      &&errorCorrectionSelect.value
      &&maskPatternSelect.value
      &&marginInput.value
      &&scaleInput.value
      &&widthInput.value
      &&darkInput.value
      &&lightInput.value
  ) {
    qrcodeOutput_imgDiv.value.style.display="none";
    qrcodeOutput_svgDiv.value.style.display="none";

    const opt:QRCodeRenderersOptions={
      quality: Number(qualityInput.value.value),
      errorCorrectionLevel: errorCorrectionSelect.value.value as QRCodeErrorCorrectionLevel,
      maskPattern: ((maskPatternSelect.value.value!='undefined')?maskPatternSelect.value.value:undefined) as unknown as (QRCodeMaskPattern | undefined),//undefined,
      margin: Number(marginInput.value.value),
      scale: Number(scaleInput.value.value),
      width: Number(widthInput.value.value),//256,//undefined,
      color: {
        dark: darkInput.value.value,
        light: lightInput.value.value,
      },
    };
    function onErr(err:Error){
      if (isDev) console.error('[QRCode.vue] 生成时出现错误：', err);
      if (err.message.includes('No input text')) {
        contentInputIsInvalid.value = true;
      } else if (err.message.includes('color')) {
        darkInputIsInvalid.value = true;
        lightInputIsInvalid.value = true;
      }
    }
    function done(){
      contentInputIsInvalid.value = false;
      darkInputIsInvalid.value = false;
      lightInputIsInvalid.value = false;
    }
    if (
        typeSelect.value.value=="image/png"
        ||typeSelect.value.value=="image/jpeg"
        ||typeSelect.value.value=="image/webp"
    ) {
      QRCode.toDataURL(
          contentInput.value.value,
          {
            type: typeSelect.value.value as QRCodeDataURLType,
            ...opt,
          },
          function (err, url) {
            if (err) {
              onErr(err);
            } else {
              qrcodeOutput_img.value!.src = url;
              qrcodeOutput_imgDiv_a.value!.download=`qrcode.${typeSelect.value!.value.slice(6)}`;
              //qrcodeOutput_imgDiv_a.value!.href=url;
              (async ()=>{
                const downloadUrl:string=URL.createObjectURL(
                    await (
                        await fetch(url)
                    ).blob()
                );
                qrcodeOutput_imgDiv_a.value!.href=downloadUrl;
                tempDownloadUrl.push(downloadUrl);
              })().then(()=>{
                qrcodeOutput_imgDiv.value!.style.display = '';

                done();
              });
            }
          },
      );
    }else if (
        typeSelect.value.value=="svg"
        ||typeSelect.value.value=="terminal"
        ||typeSelect.value.value=="utf8"
    ) {
      QRCode.toString(
          contentInput.value.value,
          {
            type: typeSelect.value.value as QRCodeStringType,
            ...opt,
          },
          function (err, string) {
            if (err) {
              onErr(err);
            }else{
              qrcodeOutput_div_svg.value!.innerHTML = string;
              qrcodeOutput_svgDiv_a.value!.download = `qrcode.${(typeSelect.value!.value=="svg")?"svg":"txt"}`;
              {
                const downloadUrl:string=URL.createObjectURL(new Blob([string], { type: 'text/plain;charset=utf-8' }));
                qrcodeOutput_svgDiv_a.value!.href=downloadUrl;
                tempDownloadUrl.push(downloadUrl);
              }
              qrcodeOutput_div_text.value!.value =string;
              qrcodeOutput_svgDiv.value!.style.display = '';
              done();
            }
          },
      );
    }
  }
}

onMounted(()=>{
  qrcodeOutput_imgDiv.value!.style.display='none';
  qrcodeOutput_svgDiv.value!.style.display="none";

  typeSelect_change();
  widthInput_input();
});

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
          <span class="input-group-text">{{ t(`${lp}.contentInput_label`) }}</span>
          <textarea ref="contentInput" class="form-control" :class="{ 'is-invalid': contentInputIsInvalid }"></textarea>
        </div>
      </div>
      <div class="mb-1 col-12 col-md-6">
        <div class="input-group">
          <span class="input-group-text">{{ t(`${lp}.typeSelect_label`) }}</span>
          <select ref="typeSelect" class="form-select" @change="typeSelect_change">
            <option value="image/png" selected>png</option>
            <option value="image/jpeg">jpeg</option>
            <option value="image/webp">webp</option>
            <option value="svg">svg</option>
            <!--<option value="terminal">terminal</option>
            <option value="utf8">utf8</option>-->
          </select>
          <span class="input-group-text">{{ t(`${lp}.qualityInput_label`) }}</span>
          <input ref="qualityInput" type="number" max="1" min="0" step="0.1" class="form-control" placeholder="0-1" value="0.92"/>
        </div>
      </div>
      <div class="mb-1 col-12 col-md-6">
        <div class="input-group">
          <span class="input-group-text">{{ t(`${lp}.errorCorrectionSelect_label`) }}</span>
          <select ref="errorCorrectionSelect" class="form-select">
            <option value="H">30%</option>
            <option value="Q">25%</option>
            <option value="M" selected>15%</option>
            <option value="L">7%</option>
          </select>
          <span class="input-group-text">{{ t(`${lp}.maskPatternSelect_label`) }}</span>
          <select ref="maskPatternSelect" class="form-select">
            <option value="undefined" selected>{{t(`${lp}.auto`)}}</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>
      </div>
      <div class="mb-1 col-12 col-lg-6">
        <div class="input-group">
          <span class="input-group-text">{{ t(`${lp}.scaleInput_label`) }}</span>
          <input ref="scaleInput" type="number" min="0" step="1" class="form-control" value="4"/>
          <span class="input-group-text">{{ t(`${lp}.widthInput_label`) }}</span>
          <input ref="widthInput" @input="widthInput_input" type="number" min="0" step="16" class="form-control"/>
        </div>
      </div>
      <div class="mb-1 col-12 col-lg-6">
        <div class="input-group">
          <span class="input-group-text">{{ t(`${lp}.marginInput_label`) }}</span>
          <input ref="marginInput" type="text" class="form-control" value="1"/>
          <span class="input-group-text">{{ t(`${lp}.darkInput_label`) }}</span>
          <input ref="darkInput" type="text" class="form-control" :class="{ 'is-invalid': darkInputIsInvalid }" value="#000"/>
          <span class="input-group-text">{{ t(`${lp}.lightInput_label`) }}</span>
          <input ref="lightInput" type="text" class="form-control" :class="{ 'is-invalid': lightInputIsInvalid }" value="#fff"/>
        </div>
      </div>
      <div class="mb-3 col-12 d-flex justify-content-center">
        <button @click="createBtn_click" type="button" class="btn btn-primary">{{t(`${lp}.createBtn`)}}</button><!--ref="createBtn"-->
      </div>
      <div class="col-12 d-flex justify-content-center">
        <div ref="qrcodeOutput_imgDiv" id="qrcodeOutput_imgDiv">
          <img ref="qrcodeOutput_img" src="" alt="qrcode error"/>
          <br>
          <a ref="qrcodeOutput_imgDiv_a">
            <button type="button" class="btn btn-primary">{{ t(`${lp}.downloadBtn`) }}</button>
          </a>
        </div>
      </div>
      <div class="col-12 d-flex justify-content-center">
        <div ref="qrcodeOutput_svgDiv" id="qrcodeOutput_svg-div">
          <div ref="qrcodeOutput_div_svg" id="qrcodeOutput_div_svg">
          </div>
          <a ref="qrcodeOutput_svgDiv_a">
            <button type="button" class="btn btn-primary">{{ t(`${lp}.downloadBtn`) }}</button>
          </a>
          <textarea ref="qrcodeOutput_div_text" id="qrcodeOutput_div_text" class="form-control" disabled></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container{
  padding: 0;
}

#qrcodeOutput_imgDiv{
  text-align: center;
}
#qrcodeOutput_svg-div{
  width: 100%;
  text-align: center;
  #qrcodeOutput_div_svg{
    text-align: center;
  }
  #qrcodeOutput_div_text{
    height: 10rem;
  }
}
</style>
<style scoped lang="scss" src="@/views/tools/scss/shared.scss">
</style>