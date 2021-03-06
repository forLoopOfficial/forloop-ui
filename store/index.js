import Vuex from 'vuex';
import firebase from 'firebase/app';
import jwtDecode from 'jwt-decode';
import { isEmpty } from 'lodash';

import { setToken, unsetToken } from '~/utils/auth';
const cookieparser = require('cookieparser');

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
        setToken(token);
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
      nuxtServerInit({ commit }, { req, app }) {
        let token = '';
        let user = null;
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie);
          token = parsed.jwt;
        }

        if (!isEmpty(token)) {
          user = jwtDecode(token);
        }

        commit('login_success', user);
        commit('set_token', token);
        app.$axios.setToken(token, 'Bearer');
      },
      async login({ commit }, credentials) {
        const response = await this.$axios.$post(
          '/auth/member/verify',
          credentials
        );
        const data = response.data;
        commit('login_success', data.user);
        commit('set_token', data.token);
        this.$axios.setToken(data.token, 'Bearer');
        this.$raven.setUserContext(data.user);
        return data;
      },
      async adminLogin({ commit }, credentials) {
        const response = await this.$axios.$post(
          '/auth/admin/verify',
          credentials
        );
        const data = response.data;

        commit('login_success', data.user);
        commit('set_token', data.token);
        this.$axios.setToken(data.token, 'Bearer');
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
        this.$axios.setToken(false);
        unsetToken();
        commit('logout');
      }
    }
  });

export default createStore;
