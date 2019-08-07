import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.headers = {
  'Access-Control-Allow-Origin': '*',
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ships: [],
    count: 0,
    current: {},
    info: {},
  },
  getters: {
    SHIPS: state => state.ships,
    COUNT: state => state.count,
    CURRENT: state => state.current,
    INFO: state => state.info,
  },
  mutations: {
    SET_SHIPS(state, data) {
      if (state.ships.length <= state.count) {
        state.ships.push(data);
        state.ships = state.ships.flat();
      }
    },
    SET_COUNT(state, data) {
      state.count = data;
    },
    SET_CURRENT(state, data) {
      state.current = data;
    },
    SET_INFO(state, data) {
      state.info = data;
    },
  },
  actions: {
    async GET_SHIPS({ commit, dispatch }, url) {
      const target = url || 'https://swapi.co/api/starships/';
      try {
        const res = await axios.get(target);
        commit('SET_SHIPS', res.data.results);
        if (res.data.next) {
          dispatch('GET_SHIPS', res.data.next);
        }
        commit('SET_COUNT', res.data.count);
      } catch (e) {
        console.log(e.message);
      }
    },
    async GET_SHIP({ commit }, id) {
      const target = `https://swapi.co/api/starships/${id}/`;
      try {
        const res = await axios.get(target);
        commit('SET_CURRENT', res.data);
      } catch (e) {
        console.log(e.message);
      }
    },
    async GET_INFO({ commit }, url) {
      try {
        const res = await axios.get(url);
        commit('SET_INFO', res.data);
      } catch (e) {
        console.log(e.message);
      }
    },
  },
});
