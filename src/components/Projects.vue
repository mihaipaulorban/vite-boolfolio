<script setup>
import { ref, computed, watch } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const projects = ref([]);
const currentPage = ref(1);
const totalProjects = ref(0);
const perPage = 3;
const route = useRoute();
const router = useRouter();
const pageParam = ref(parseInt(route.params.page) || 1);
const searchQuery = ref('');
const error = ref(null);

// Funzione per calcolare l'ultima pagina disponibile
const lastPage = computed(() => {
  return Math.ceil(totalProjects.value / perPage);
});

// Funzione per caricare i progetti
const fetchProjects = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/projects?page=${pageParam.value}&title=${searchQuery.value}`
    );
    projects.value = response.data.data;
    totalProjects.value = response.data.total;
    currentPage.value = response.data.current_page;

    error.value = null;
  } catch (error) {
    console.error(error);
    error.value = 'Si è verificato un errore durante il recupero dei progetti.';
  }
  console.log;
};

// Funzione per passare alla pagina successiva
const goToNextPage = () => {
  const nextPage = currentPage.value + 1;
  if (nextPage <= lastPage.value) {
    router.push({ name: 'Projects', params: { page: nextPage } });
  }
};

// Funzione per passare alla pagina precedente

const goToPreviousPage = () => {
  const prevPage = currentPage.value - 1;
  if (prevPage >= 1) {
    router.push({ name: 'Projects', params: { page: prevPage } });
  }
};

// Funzione per navigare alla pagina selezionata
const goToPage = (pageNumber) => {
  router.push({ name: 'Projects', params: { page: pageNumber } });
};

// Aggiorna la lista dei progetti quando cambia la pagina
watch([pageParam, searchQuery], () => {
  fetchProjects();
});

// Watcher che aggiorna la pagina ad ogni cambio
watch(
  () => route.params.page,
  (newPage) => {
    pageParam.value = parseInt(newPage) || 1;
    fetchProjects();
  }
);

fetchProjects();
</script>

<template>
  <div class="container p-3">
    <!-- Filtro di ricerca -->
    <div class="mb-3 d-flex align-items-center justify-content-between">
      <div class="form-floating">
        <input
          type="text"
          v-model="searchQuery"
          class="form-control"
          placeholder="Cerca per titolo..."
        />
        <label for="searchQuery">Cerca per titolo...</label>
      </div>
      <button @click="fetchProjects" class="btn btn-primary">Cerca</button>
    </div>

    <!-- Sezione degli errori -->
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- Visualizzazione dei progetti -->
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

    <!-- Pulsanti di navigazione -->
    <div class="mt-4 d-flex justify-content-center">
      <!-- Pulsante per la pagina precedente -->
      <button
        class="btn btn-primary mx-2"
        @click="goToPreviousPage"
        :disabled="currentPage === 1"
      >
        Pagina Precedente
      </button>

      <!-- Numeri di pagina -->
      <template v-if="lastPage > 0">
        <button
          v-for="pageNumber in lastPage"
          :key="pageNumber"
          class="btn mx-2"
          :class="{
            'btn-outline-primary': currentPage !== pageNumber,
            'btn-primary': currentPage === pageNumber,
          }"
          @click="goToPage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
      </template>

      <!-- Pulsante per la pagina successiva -->
      <button
        class="btn btn-primary mx-2"
        @click="goToNextPage"
        :disabled="currentPage === lastPage || lastPage === 0"
      >
        Pagina Successiva
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  height: 100%;
}
</style>
