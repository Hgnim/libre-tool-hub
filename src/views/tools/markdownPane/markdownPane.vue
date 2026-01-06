<script setup lang="ts">
import {onMounted, onUnmounted, type Ref, ref} from "vue";
import markpane from "markpane";

const inputBox:Ref<HTMLTextAreaElement|null> = ref(null);
const outputBox:Ref<HTMLDivElement|null> = ref(null);

function inputBox_input(){
  if (inputBox.value && outputBox.value){
    outputBox.value.innerHTML=markpane.parse(inputBox.value.value);
  }
}
function inputBox_resize(){
  if (inputBox.value && outputBox.value){
    //outputBox.value.style.width=inputBox.value.style.width;
    outputBox.value.style.height=inputBox.value.style.height || `${inputBox.value.offsetHeight}px`;
  }
}

let inputBox_resizeObserver:ResizeObserver|null = null;
onMounted(()=>{
  inputBox_resizeObserver = new ResizeObserver(inputBox_resize);
  inputBox_resizeObserver.observe(inputBox.value!);

  inputBox_resize();
});
onUnmounted(() => {
  if (inputBox_resizeObserver) {
    inputBox_resizeObserver.disconnect()
  }
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <div class="input-group">
          <textarea
              ref="inputBox"
              id="inputBox"
              class="form-control"
              placeholder="输入"
              @input="inputBox_input"
          ></textarea>
        </div>
      </div>
      <div class="col-6">
        <div ref="outputBox" class="form-control">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container{
  padding: 0;
}

#inputBox{
  height: 5rem;
}
</style>