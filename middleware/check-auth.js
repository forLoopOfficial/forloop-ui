import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth';

export default function({ app, isServer, store, req }) {
  // If nuxt generate or is client, pass this middleware
  // we are only setting auth token with cookies on the server side
  if ((isServer && !req) || !isServer) return;
  const loggedUser = isServer
    ? getUserFromCookie(req)
    : getUserFromLocalStorage();
  if (isServer && loggedUser && loggedUser.user) {
    store.commit('login_success', loggedUser.user);
    store.commit('set_token', loggedUser.token);
    app.$axios.setToken(loggedUser.token, 'Bearer');
  }
}
