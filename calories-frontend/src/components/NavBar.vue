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
          >
            <font-awesome-icon :icon="['fas', 'house']" />
          </router-link>
        </v-btn>
        <v-spacer />
        <!-- <v-btn>
          <router-link
            class="custom-link"
            to="/bmi"
          >
            <span>健康計算機</span>
          </router-link>
        </v-btn> -->
        <!-- <v-btn>
            <router-link class="custom-link" to="/">
              <span>每日熱量紀錄</span>
            </router-link>
          </v-btn> -->
        <!-- <v-btn>
          <router-link
            class="custom-link"
            to="/profile"
          >
            <span>個人資料</span>
          </router-link>
        </v-btn> -->
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
  import { useStore } from 'vuex';
  import { removeLocalStorageItem } from '@/service/authService';
  
  const store = useStore();
  
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
  </style>
  