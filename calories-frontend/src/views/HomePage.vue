<template>
    <v-container>
      <v-row
        no-gutters
        class="mt-8 d-flex align-center justify-center"
      >
        <v-col
          cols="12"
          class="pa-2 text-h6 font-weight-bold"
        >
          本週每日熱量變化
        </v-col>
        <div>
          <apexchart
            width="700"
            type="line"
            :options="options"
            :series="series"
            class="mt-12"
          />
        </div>
      </v-row>
    </v-container>
  </template>
  <script setup>
  import { ref } from 'vue';
  
  const options = ref({
    chart: {
      id: 'vuechart-example',
    },
    xaxis: {
      categories: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    },
  });
  
  const series = ref([{
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70],
  }]);
  </script>
  <style scoped>
  </style>
  