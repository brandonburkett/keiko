import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    kata: {
      list: [],
      active: null,
      previous: null,
      completed: 0,
    },
  },
  mutations: {},
  actions: {},
});
