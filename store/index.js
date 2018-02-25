import Vuex from 'vuex';
import firebase from 'firebase';

import { setToken, unsetToken } from '~/utils/auth';

const createStore = () =>
  new Vuex.Store({
    state: {
      authenticated: false,
      currentUser: null,
      token: null
    },
    mutations: {
      login_success(state, user) {
        state.authenticated = true;
        state.currentUser = user;
      },
      logout(state) {
        state.authenticated = false;
        state.currentUser = null;
      },
      set_token(state, token) {
        state.token = token;
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
        setToken(data.token);
        this.$axios.setToken(data.token, 'Bearer');
        commit('login_success', data.user);
        commit('set_token', data.token);
        this.$raven.setUserContext(data.user);
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
        this.$raven.setUserContext(data.user);
        return data;
      },
      async firebaseLogin({ commit, dispatch }) {
        const provider = new firebase.auth.TwitterAuthProvider();
        provider.setCustomParameters({ screen_name: 'forLoopAfrica' });
        return firebase
          .auth()
          .signInWithPopup(provider)
          .catch(e => {
            if (e.code === 'auth/network-request-failed') {
              throw new Error('Network Error, Please try again');
            }
            throw e;
          })
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
      },
      setToken({ commit, state }) {
        const token = state.token;
        this.$axios.setToken(token, 'Bearer');
      }
    }
  });

export default createStore;
