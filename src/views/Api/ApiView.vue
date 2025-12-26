<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const response = ref('');

async function loadApi() {
  let apiUrl;{
    const beforePath = ([...route.params.beforePath || []]).join('/');
    const afterPath = route.params.afterPath || '';
    apiUrl = `/${beforePath}/api`;
    if (afterPath) {
      apiUrl += `/${afterPath}`;
    }
    const queryString = new URLSearchParams(route.query as any).toString();
    if (queryString) {
      apiUrl += `?${queryString}`;
    }
  }

  const res = await fetch(apiUrl);
  const contentType = res.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    response.value = JSON.stringify(await res.json(), null, 2);
  } else {
    response.value = await res.text();
  }
}

onMounted(loadApi);
watch(() => route.params, loadApi);
watch(() => route.query, loadApi);
</script>

<template>
  <p>{{response}}</p>
</template>

<style scoped lang="scss">

</style>