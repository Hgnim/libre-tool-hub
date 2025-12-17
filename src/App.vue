<script setup lang="ts">
import testCp from "@/components/test/testCp.vue";
</script>

<template>
  <div id="view">
    <router-view/>
  </div>
  <testCp/>
  <p class="bc">demo by hgnim :)</p>
</template>

<style scoped lang="scss">
.bc {
  color: blue;
}
</style>
