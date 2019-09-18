import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedShips: []
    },
    mutations: {},
    actions: {},
    getters: {
        selectedShips: (state) => state.selectedShips
    }
});
