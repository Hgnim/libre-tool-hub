<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";
import {type Ref, ref} from "vue";
import {QrcodeDropZone, QrcodeCapture, type DetectedBarcode, type EmittedError} from 'vue-qrcode-reader'
import {isDev} from "@/ts/env/packMode.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_tool_QRCode_comp_parseQRCode";
autoLoadLocale(lp,()=>{
  useTitle(`${t(`${lp}.title`)}${t('global.title')}`);
});

const parseOutput:Ref<HTMLTextAreaElement|null> = ref(null);

function onDetectOutput(detectedCodes:DetectedBarcode[]){
  if (parseOutput.value){
    detectedCodes.forEach((dc:DetectedBarcode) => {
      parseOutput.value!.value+=dc.rawValue+'\n';
    })
    parseOutput.value.value+='----------\n';
  }
}

const qdzContainer_drag:Ref<boolean> = ref(false);
function qrcodeDropZone_onDetect(detectedCodes:DetectedBarcode[]){
  onDetectOutput(detectedCodes);
}
function qrcodeDropZone_onDragOver(isDraggingOver: boolean){
  qdzContainer_drag.value=isDraggingOver;
}
function qrcodeDropZone_onError(error: EmittedError){
  if (isDev)
    console.error('[parseQRCode.vue] QrcodeDropZone出现错误：',error);
  if (parseOutput.value){
    parseOutput.value.value+=(()=> {
      const getErrMsg = t(`${lp}.qrcodeDropZone.errorMessage.${error.name}`);
      if (!getErrMsg.startsWith(lp))
        return getErrMsg;
      else
        return t(`${lp}.qrcodeDropZone.errorMessage.unknow`);
    })()+'\n';
  }
}

function qrcodeCapture_onDetect(detectedCodes: DetectedBarcode[]){
  onDetectOutput(detectedCodes);
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="input-group mb-1">
          <span class="input-group-text">{{t(`${lp}.qrcodeFileInput_label`)}}</span>
          <QrcodeCapture
              class="form-control"
              @detect="qrcodeCapture_onDetect"
          />
        </div>
      </div>
      <div class="col-12 d-flex justify-content-center">
        <QrcodeDropZone
            @detect="qrcodeDropZone_onDetect"
            @dragover="qrcodeDropZone_onDragOver"
            @error="qrcodeDropZone_onError"
        >
          <div id="qdz-container" :class="{ 'drag': qdzContainer_drag}">
            <span class="unSelectable">{{t(`${lp}.qdz-container.text`)}}</span>
          </div>
        </QrcodeDropZone>
      </div>
      <div class="col-12">
        <div class="input-group mb-1">
          <span class="input-group-text">{{t(`${lp}.parseOutput_label`)}}</span>
          <textarea ref="parseOutput" class="form-control" disabled></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#qdz-container{
  width: 30vw;
  height: 30vh;
  border-radius: 14px;
  border: 2px solid var(--bs-border-color);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bs-tertiary-bg);
  &.drag{
    background-color: var(--bs-secondary-bg);
  }
  span{
    pointer-events:none;
  }
}
</style>