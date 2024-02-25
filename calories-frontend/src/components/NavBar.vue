<template>
    <v-app-bar
      flat
      color="grey-lighten-2"
    >
      <v-container class="mx-auto d-flex align-center justify-center">
        <v-btn>
          <router-link
            class="custom-link"
            to="/"
            icon="mdi-home"
          >
            <v-icon
                  icon="mdi-home"
                />
          </router-link>
        </v-btn>
        <v-spacer />
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }"> 
            <v-btn v-bind="props">
              健康計算機
            </v-btn>
          </template>  
          <v-list class="ml-n1 mt-1" rounded="lg">
            <v-list-item
              v-for="(item,index) in items"
              key="index">
                <router-link class="drop-down-menu" :to=item.path>
                  <span>{{ item.title }}</span>
                </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn>
          <router-link class="custom-link" to="/">
            <span>每日熱量紀錄</span>
          </router-link>
        </v-btn>
        <v-btn>
          <router-link
            class="custom-link"
            to="/profile"
          >
            <span>個人資料</span>
          </router-link>
        </v-btn>
        <v-btn>
          <router-link
            class="custom-link"
            to="/login"
            @click="logout"
          >
            <span>登出</span>
          </router-link>
        </v-btn>
      </v-container>
    </v-app-bar>
  </template>
<script setup>
import { removeLocalStorageItem } from '@/service/axios';
import { useStore } from 'vuex';

const store = useStore();

const items = [
  { title: '計算BMI',path: '/bmiCalculator'},
  { title: '計算BMR/TDEE',path: '/bmrAndTdeeCalculator' },
];

const logout = () => {
  store.commit('setUserData', null);
  removeLocalStorageItem('jwtToken');
};
</script>
  <style scope>
  .custom-link,
  .custom-link:hover {
    color: rgba(0, 0, 0, 87%);
  }
  .router-link-active {
    color: rgba(0, 0, 0, 87%);
  }

  .drop-down-menu {
    color: rgba(0, 0, 0, 87%);
    font-size: 13px;
  }
  </style>
