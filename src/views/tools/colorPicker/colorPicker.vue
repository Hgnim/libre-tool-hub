<script setup lang="ts">
import {ChromePicker,RGBSliders,HSVSliders,HSLSliders,tinycolor} from "vue-color";
import {type Ref, ref} from "vue";
import {getRgbaString} from "@/views/tools/colorPicker/ts/util/vue-color.ts";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";

const {lt:t,gt}=autoUseI18n();
useTitle(`${t('title')}${gt('global.title')}`);

//const hexBox:Ref<HTMLInputElement|null>=ref(null);
//const rgbBox:Ref<HTMLInputElement|null>=ref(null);
//const rgbaBox:Ref<HTMLInputElement|null>=ref(null);
//const prgbBox:Ref<HTMLInputElement|null>=ref(null);
//const hsvBox:Ref<HTMLInputElement|null>=ref(null);
//const hslBox:Ref<HTMLInputElement|null>=ref(null);

type ColorPickerModelType={
  value:string,
}
class ColorPickerModel{
  private _value:string='';
  get value():string{
    return this._value;
  }
  set value(v:string){
    this._value=v;
  }
}
const colorPickerModel:Ref<ColorPickerModelType>=ref(new ColorPickerModel());

function box_onChange(et:EventTarget|null){
  colorPickerModel.value.value=tinycolor((et as HTMLInputElement).value).toHexString();
}
</script>

<template>
  <div id="color-picker" class="container">
    <div class="row unSelectable">
      <div class="col-12 col-md-3 col-lg-2 p-3">
        <div class="color-show" :style="{'background-color':tinycolor(colorPickerModel.value).toHexString()}"></div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="d-flex justify-content-center align-items-center w-100 h-100">
          <div>
            <input :value="tinycolor(colorPickerModel.value).toHexString()" type="text" @change="box_onChange($event.target)" class="text-center"/><!--ref="hexBox" -->
            <input :value="tinycolor(colorPickerModel.value).toRgbString()" type="text" @change="box_onChange($event.target)" class="text-center mt-1"/><!--ref="rgbBox" -->
            <input  :value="getRgbaString(tinycolor(colorPickerModel.value))" type="text" @change="box_onChange($event.target)" class="text-center mt-1"/><!--ref="rgbaBox"-->
            <input  :value="tinycolor(colorPickerModel.value).toPercentageRgbString()" type="text" @change="box_onChange($event.target)" class="text-center mt-1"/><!--ref="prgbBox"-->
            <input :value="tinycolor(colorPickerModel.value).toHsvString()" type="text" @change="box_onChange($event.target)" class="text-center mt-1"/><!--ref="hsvBox" -->
            <input :value="tinycolor(colorPickerModel.value).toHslString()" type="text" @change="box_onChange($event.target)" class="text-center mt-1"/><!--ref="hslBox" -->
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3 col-lg-2 p-3">
        <div class="color-show" :style="{'background-color':tinycolor(colorPickerModel.value).toHexString()}"></div>
      </div>
      <div class="col-12 col-lg-5">
        <ChromePicker v-model="colorPickerModel.value"/>
      </div>
      <div class="col-12 col-lg-4">
        <RGBSliders v-model="colorPickerModel.value"/>
      </div>
      <div class="col-12 col-lg-4">
        <HSVSliders v-model="colorPickerModel.value"/>
      </div>
      <div class="col-12 col-lg-4">
        <HSLSliders v-model="colorPickerModel.value"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#color-picker {
}
.color-show{
  width: 100%;
  height: 100%;
  min-height: 40px;
  border: var(--bs-border-color) 2px solid;
  border-radius: var(--bs-border-radius);
}
</style>
<style lang="scss" src="@/assets/scss/vue-color/vcolor-custom.scss"></style><!--需要全局引用。经检查，基本不会全局污染，并且在路由中使用“component: () => import('@/views/tools/colorPicker/colorPicker.vue'),”以按需加载该css-->
<style scoped lang="scss" src="./scss/vue-color.scss"></style>
<style scoped lang="css" src="@/assets/css/global/unSelect.css"></style>

<i18n>
{
  "zh-CN": {
    "title": "颜色选取器 - "
  },
  "en-US": {
    "title": "Color Picker - "
  }
}
</i18n>