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
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Boolfolio</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/about">Contatti</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/projects"
                >Projects</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <router-view />
</template>

<style lang="scss" scoped></style>
