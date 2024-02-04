import { createStore } from 'vuex'
import user from './user/index';

const store = createStore({
    modules : {
        user
    },
  state () {
    return {
    }
  },
  mutations: {
  }
})

export default store;