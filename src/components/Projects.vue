<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const projects = ref([]);
const currentPage = ref(1);

const fetchProjects = async (page) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/projects?page=${page}`
    );
    projects.value = response.data.data; // Assicurati che corrisponda alla struttura della tua risposta
    currentPage.value = response.data.current_page;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchProjects(currentPage.value);
});

const goToNextPage = () => {
  fetchProjects(currentPage.value + 1);
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    fetchProjects(currentPage.value - 1);
  }
};
</script>

<template>
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
    <button
      class="btn btn-primary mx-2"
      @click="goToPreviousPage"
      :disabled="currentPage === 1"
    >
      Pagina Precedente
    </button>
    <button class="btn btn-primary mx-2" @click="goToNextPage">
      Pagina Successiva
    </button>
  </div>
</template>

<style scoped lang="scss">
.card {
  height: 100%;
}
</style>
