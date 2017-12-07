import Vuex from 'vuex';

import { setToken } from '~/utils/auth';

const createStore = () =>
  new Vuex.Store({
    state: {
      authenticated: false,
      currentUser: null
    },
    mutations: {
      login_success(state, user) {
        state.authenticated = true;
        state.currentUser = user;
      }
    },
    getters: {
      isAuthenticated(state) {
        return !!state.currentUser;
      },
      currentUser(state) {
        return state.currentUser;
      }
    },
    actions: {
      async login({ commit }, credentials) {
        console.log(credentials);
        const response = await this.$axios.$post(
          '/auth/member/verify',
          credentials
        );
        const data = response.data;
        console.log('data', data);
        setToken(data.token);
        this.$axios.setToken(data.token, 'Bearer');
        commit('login_success', data.user);
        return data;
      },
      async adminLogin({ commit }, credentials) {
        console.log(credentials);
        const response = await this.$axios.$post(
          '/auth/admin/verify',
          credentials
        );
        const data = response.data;
        console.log('data', data);
        setToken(data.token);
        this.$axios.setToken(data.token, 'Bearer');
        commit('login_success', data.user);
        return data;
      }
    }
  });

export default createStore;
