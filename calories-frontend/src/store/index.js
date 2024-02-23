import { createStore } from 'vuex';
import user from './modules/user.module';

const store = createStore({
  modules: {
    user,
  },
  state() {
    return {
    };
  },
  mutations: {
  },
});

export default store;
