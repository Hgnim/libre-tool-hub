<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";
import {onUnmounted, type Ref, ref} from "vue";
import jsQR from 'jsqr';

const {gt:t}=autoUseI18n();
const lp:string="view_tool_QRCode_comp_parseQRCode";
autoLoadLocale(lp,()=>{
  useTitle(`${t(`${lp}.title`)}${t('global.title')}`);
});

const tempObjUrl:string[]=[];
onUnmounted(()=>{
  tempObjUrl.forEach((url)=>{
    URL.revokeObjectURL(url);//释放临时url
  });
});

const qrcodeFileInput:Ref<HTMLInputElement|null> = ref(null);
const qrcodeFileInputIsInvalid:Ref<boolean>=ref(false);
const uploadImage:Ref<HTMLImageElement|null> = ref(null);
const parseOutput:Ref<HTMLTextAreaElement|null> = ref(null);
const outputAlert:Ref<HTMLDivElement|null> = ref(null);

async function decodeQrcode(file:File){
  const imgData = await (async ()=>{
    const bitmap = await createImageBitmap(file);
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const context = canvas.getContext('2d')!;
    context.drawImage(bitmap, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
  })();

  return jsQR(imgData.data, imgData.width, imgData.height);
}

async function parseQrcode_click(){
  if(
        qrcodeFileInput.value
      &&parseOutput.value
      &&outputAlert.value
  ){
    try{
      const file= qrcodeFileInput.value.files?.[0];
      if (file){
        const qrcode=await decodeQrcode(file);
        if (qrcode){
          parseOutput.value.value=qrcode.data

          qrcodeFileInputIsInvalid.value = false;
          outputAlert.value!.style.display='none';
        }
        else{
          outputAlert.value!.style.display='';
          outputAlert.value!.innerText=t(`${lp}.outputAlert.parseFailed`);
        }
      }else{
        qrcodeFileInputIsInvalid.value = true;
      }
    }catch {
      outputAlert.value!.style.display='';
      outputAlert.value!.innerText=t(`${lp}.outputAlert.error`);
    }
  }
}
function qrcodeFileInput_change(){
  if (
        uploadImage.value
      &&parseOutput.value
  ){
    try {
      const file = qrcodeFileInput.value!.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        uploadImage.value.src = url;
        tempObjUrl.push(url);

        uploadImage.value.style.display = '';
        qrcodeFileInputIsInvalid.value = false;
        parseOutput.value.value='';
      }
    }
    catch {
      qrcodeFileInputIsInvalid.value = true;
      uploadImage.value.style.display = 'none';
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="input-group mb-1">
          <span class="input-group-text">{{t(`${lp}.qrcodeFileInput_label`)}}</span>
          <input
              ref="qrcodeFileInput"
              :class="{ 'is-invalid': qrcodeFileInputIsInvalid }"
              @change="qrcodeFileInput_change"
              type="file" class="form-control"
              accept="image/*">
        </div>
      </div>
      <div class="col-12 d-flex justify-content-center">
        <img
            ref="uploadImage"
            class="mb-1"
            style="display: none;"
            src="" alt="upload image"/>
      </div>
      <div class="col-12 d-flex justify-content-center mb-1">
        <button type="button" class="btn btn-primary" @click="parseQrcode_click">{{t(`${lp}.parseBtn`)}}</button>
      </div>
      <div class="col-12">
        <div class="input-group mb-1">
          <span class="input-group-text">{{t(`${lp}.parseOutput_label`)}}</span>
          <textarea ref="parseOutput" class="form-control" disabled></textarea>
        </div>
      </div>
      <div class="col-12">
        <div ref="outputAlert"
             style="display: none;"
             class="mb-1 alert alert-danger" role="alert"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>