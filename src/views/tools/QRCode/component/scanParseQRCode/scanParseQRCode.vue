<script setup lang="ts">
import {type Ref, ref} from 'vue';
import { QrcodeStream, type DetectedBarcode } from 'vue-qrcode-reader';
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";
import Track from "@/views/tools/QRCode/component/scanParseQRCode/ts/track.ts";
import SelectCamera from "@/views/tools/QRCode/component/scanParseQRCode/ts/selectCamera.ts";
import Fullscreen from '@/views/tools/QRCode/component/scanParseQRCode/js/fullscreen';
import {isDev} from "@/ts/env/packMode.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_tool_QRCode_comp_scanParseQRCode";
autoLoadLocale(lp,()=>{
  useTitle(`${t(`${lp}.title`)}${t('global.title')}`);
});

const {selectedConstraints,constraintOptions,onCameraReady}=SelectCamera();
const {requestFullscreen}=Fullscreen();

const optionsPanel_show:Ref<boolean> = ref(false);
const option_light:Ref<HTMLButtonElement|null> = ref(null);
const option_light_supported:Ref<boolean> = ref(false);
const option_parseOutput:Ref<HTMLTextAreaElement|null> = ref(null);

const qrcodeStream_scanning:Ref<boolean> = ref(false);
const qrcodeStream_paused:Ref<boolean> = ref(false);
const {trackFunctionSelected}=Track();
const qrcodeStream_torch:Ref<boolean>=ref(false);
const qrcodeStream_key:Ref<number> = ref(0);
const qrcodeStream_fullscreenWrapper:Ref<HTMLDivElement|null> = ref(null);

const errorShow:Ref<HTMLDivElement|null> = ref(null);
const errorShow_show:Ref<boolean> = ref(false);

function option_light_click(){
  if (option_light.value){
    const btnValue:string|null = option_light.value.getAttribute('aria-pressed');
    qrcodeStream_torch.value = btnValue=='true';
  }
}
function option_fullscreen_click(){
  if (qrcodeStream_fullscreenWrapper.value){
    requestFullscreen(qrcodeStream_fullscreenWrapper.value);
  }
}

function qrcodeStream_onDetect(detectedCodes: DetectedBarcode[]){
  if (isDev)
    console.debug('[scanParseQRCode.vue] 解码内容：', detectedCodes);
  if(option_parseOutput.value){
    const content=detectedCodes.map((code) => code.rawValue);
    if (content.length>0) {
      content.forEach((value) => {
        option_parseOutput.value!.value+=value+'\n';
      })
    }
  }
}
function qrcodeStream_onError(err:Error){
  const message = (()=>{
    const getErrMsg=t(`${lp}.qrcodeStream.errorMessage.${err.name}`);
    if (!getErrMsg.startsWith(lp))
      return getErrMsg;
    else
      return t(`${lp}.qrcodeStream.errorMessage.unknow`)
  })();
  if (isDev)
    console.error(`[scanParseQRCode.vue] 错误：${message}，源错误：`,err);
  if(errorShow.value){
    errorShow.value.innerText=message;
    errorShow_show.value = true;
  }
}
function qrcodeStream_onCameraOn(capabilities:any/*Partial<MediaTrackCapabilities>*/){
  if (isDev)
    console.debug('[scanParseQRCode.vue] 摄像头启动');

  option_light_supported.value=capabilities.torch;//检查当前设备是否支持手电筒

  onCameraReady();
  errorShow_show.value=false;
}
function qrcodeStream_onCameraOff(){
  if (isDev)
    console.debug('[scanParseQRCode.vue] 摄像头关闭');
}

function toggleScanBtn_click(){
  const targetBool=!qrcodeStream_scanning.value;
  optionsPanel_show.value = targetBool;
  qrcodeStream_scanning.value = targetBool;
  qrcodeStream_key.value++;
  if(!targetBool && option_parseOutput.value){
    option_parseOutput.value.value+="----------\n";
  }
  errorShow_show.value=false;
}

function onFullscreenChange(){

}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-center mb-5">
        <button type="button" class="btn btn-primary" @click="toggleScanBtn_click">
          {{!qrcodeStream_scanning?t(`${lp}.toggleScanBtn.start`):t(`${lp}.toggleScanBtn.stop`)}}
        </button>
      </div>
      <div id="optionsPanel"
           class="mb-2 col-12"
           :style="(optionsPanel_show)?{}:{display: 'none'}"
      >
        <div class="row">
          <div class="col-12 col-lg-6 d-flex justify-content-evenly mb-1">
            <button type="button" class="btn btn-primary" data-bs-toggle="button"
                    ref="option_light"
                    @click="option_light_click"
                    :disabled="!option_light_supported"
            >{{t(`${lp}.option_light`)}}</button>
            <button type="button" class="btn btn-primary"
                    @click="option_fullscreen_click"
            >{{t(`${lp}.option_fullscreen`)}}</button>
          </div>
          <div class="col-12 col-lg-6 d-flex justify-content-center mb-1">
            <div class="input-group">
              <span class="input-group-text">{{t(`${lp}.cameraSelection`)}}</span>
              <select v-model="selectedConstraints" class="form-select">
                <option
                    v-for="option in constraintOptions"
                    :key="option.label"
                    :value="option.constraints"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-12 mb-1">
            <div class="input-group">
              <span class="input-group-text">{{t(`${lp}.option_parseOutput`)}}</span>
              <textarea ref="option_parseOutput" class="form-control" disabled></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 d-flex justify-content-center mb-1">
        <div ref="qrcodeStream_fullscreenWrapper"
             @fullscreenchange="onFullscreenChange"
        >
          <QrcodeStream
              v-if="qrcodeStream_scanning"
              @detect="qrcodeStream_onDetect"
              @error="qrcodeStream_onError"
              @camera-on="qrcodeStream_onCameraOn"
              @camera-off="qrcodeStream_onCameraOff"
              :paused="qrcodeStream_paused"
              :track="trackFunctionSelected!.value"
              :torch="qrcodeStream_torch"
              :key="qrcodeStream_key"
          />
        </div>
      </div>
      <div class="col-12 d-flex justify-content-center">
        <div ref="errorShow" class="alert alert-danger" role="alert"
             :style="(errorShow_show)?{}:{display: 'none'}"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>