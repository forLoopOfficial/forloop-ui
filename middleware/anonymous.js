export default function({ store, redirect }) {
  if (store.state.authenticated) {
    store.dispatch('logout');
  }
}
