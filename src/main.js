import { createApp } from 'vue';
import './assets/scss/style.scss';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
