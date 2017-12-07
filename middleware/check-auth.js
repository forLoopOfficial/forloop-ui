import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth';

export default function({ app, isServer, store, req }) {
  // If nuxt generate, pass this middleware
  if (isServer && !req) return;
  const loggedUser = isServer
    ? getUserFromCookie(req)
    : getUserFromLocalStorage();
  if (loggedUser && loggedUser.user) {
    store.commit('login_success', loggedUser.user);
    app.$axios.setToken(loggedUser.token, 'Bearer');
  }
}
