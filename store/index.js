import Vuex from 'vuex';
import firebase from 'firebase';

import { setToken, unsetToken } from '~/utils/auth';

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
      },
      logout(state) {
        state.authenticated = false;
        state.currentUser = null;
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
        const response = await this.$axios.$post(
          '/auth/admin/verify',
          credentials
        );
        const data = response.data;
        setToken(data.token);
        this.$axios.setToken(data.token, 'Bearer');
        commit('login_success', data.user);
        return data;
      },
      async firebaseLogin({ commit, dispatch }) {
        const provider = new firebase.auth.TwitterAuthProvider();
        provider.setCustomParameters({ screen_name: 'forLoopAfrica' });
        return firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            const user = result.user;
            return user.getIdToken();
          })
          .then(token => {
            return dispatch('login', { token });
          });
      },
      logout({ commit }) {
        unsetToken();
        this.$axios.setToken(false);
        commit('logout');
      }
    }
  });

export default createStore;
