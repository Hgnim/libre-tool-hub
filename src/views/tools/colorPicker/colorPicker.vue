<script setup lang="ts">
import {ChromePicker,RGBSliders,HSVSliders,HSLSliders,tinycolor} from "vue-color";
import {type Ref, ref} from "vue";
import {getRgbaString} from "@/views/tools/colorPicker/ts/util/vue-color.ts";

const colorPickerModel:Ref<string> = ref('#000');
</script>

<template>
  <div id="color-picker" class="container">
    <div class="row">
      <div class="col-12 col-md-3 col-lg-2 p-3">
        <div class="color-show" :style="{'background-color':tinycolor(colorPickerModel).toHexString()}"></div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="d-flex justify-content-center align-items-center w-100 h-100">
          <div class="text-center">
            <p>{{tinycolor(colorPickerModel).toHexString()}}</p>
            <p>{{tinycolor(colorPickerModel).toRgbString()}}</p>
            <p>{{getRgbaString(tinycolor(colorPickerModel))}}</p>
            <p>{{tinycolor(colorPickerModel).toPercentageRgbString()}}</p>
            <p>{{tinycolor(colorPickerModel).toHsvString()}}</p>
            <p>{{tinycolor(colorPickerModel).toHslString()}}</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3 col-lg-2 p-3">
        <div class="color-show" :style="{'background-color':tinycolor(colorPickerModel).toHexString()}"></div>
      </div>
      <div class="col-12 col-lg-5">
        <ChromePicker v-model="colorPickerModel"/>
      </div>
      <div class="col-12 col-lg-4">
        <RGBSliders v-model="colorPickerModel"/>
      </div>
      <div class="col-12 col-lg-4">
        <HSVSliders v-model="colorPickerModel"/>
      </div>
      <div class="col-12 col-lg-4">
        <HSLSliders v-model="colorPickerModel"/>
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