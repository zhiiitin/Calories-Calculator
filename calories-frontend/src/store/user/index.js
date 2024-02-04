import { registerUser, login } from '@/service/authService';

export default {
  state() {
    return {
      user: null,
    };
  },
  mutations: {
    setUserData(state, userData) {
      state.user = userData;
    },
  },
  actions: {
    async registerUser({ commit }, data) {
      const { email, userName, password } = data;
      const response = await registerUser(email, userName, password);
      if (response.status === 200) {
        commit('setUserData', response.data.user);
      }
      return response;
    },
    async loginUser({ commit }, data) {
      const { email, password } = data;
      const response = await login(email, password);
      if (response.status === 200) {
        commit('setUserData', response.data.user);
      }
      return response;
    },
  },
};
