export default function({ app, store, redirect }) {
  // If the admin user is not authenticated
  const user = store.state.currentUser;
  if (
    !user ||
    (store.state.currentUser.role !== 'superadmin' &&
      store.state.currentUser.role !== 'admin')
  ) {
    store.dispatch('logout');
    return redirect('/secure/login');
  }
}
