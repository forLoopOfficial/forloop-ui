export default ({ store, app: { $axios } }) => {
  $axios.setToken(store.state.token, 'Bearer');
};
