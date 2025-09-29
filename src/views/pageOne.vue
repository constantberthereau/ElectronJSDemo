

<template>
  <h1>PageOne</h1>
  <button @click="callApi" class="uk-button uk-button-primary">Call Api</button>/

  <div v-for="movie in movies">
    {{movie.title}}
  </div>
</template>

<style scoped>

</style>

<script setup>
import {ref} from 'vue';
const movies = ref([]);

async function callApi(){
  console.log("cc");
  const res = await fetch('https://raw.githubusercontent.com/Chocolaterie/EniWebService/main/api/movies.json');
  const data = await res.json();
  movies.value = data;
}
</script>