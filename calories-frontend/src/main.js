import './style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from './router';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

import VueApexCharts from 'vue3-apexcharts';
import App from './App.vue';
import store from './store/index';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

const app = createApp(App);

app.use(createPinia())
  .use(router)
  .use(vuetify)
  .use(store)
  .use(VueApexCharts);

app.mount('#app');
