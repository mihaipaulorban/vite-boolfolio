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
  <header class="bg-primary text-white text-center p-2">
    <h1>I Miei Progetti</h1>
  </header>

  <div class="container mt-4">
    <div class="row">
      <div v-for="project in projects" :key="project.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h3 class="card-title fw-bold">{{ project.title }}</h3>
            <p class="card-text text-muted">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  height: 100%;
}
</style>
