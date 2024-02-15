<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const projects = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/projects');
    projects.value = response.data;
    console.log(projects.value);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <h1>Elenco Progetti</h1>
  <div v-for="project in projects" :key="project.id">
    <h2>{{ project.name }}</h2>
    <p>{{ project.description }}</p>
  </div>
</template>

<style scoped></style>
