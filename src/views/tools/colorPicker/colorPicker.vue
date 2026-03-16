<script setup lang="ts">
import {SketchPicker,ChromePicker} from "vue-color";
</script>

<template>
  <div id="color-picker">
    <SketchPicker />
    <ChromePicker />
  </div>
</template>

<style scoped lang="scss">
#color-picker {
  position: relative;
}
</style>
<style lang="css" src="vue-color/style.css"></style><!--需要全局引用，后续可能需要用到import postcssPrefixwrap from 'postcss-prefixwrap';将其包裹-->