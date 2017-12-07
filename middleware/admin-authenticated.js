export default function({ store, redirect }) {
  // If the admin user is not authenticated
  if (
    !store.state.authenticated ||
    (store.state.currentUser.role !== 'superadmin' &&
      store.state.currentUser.role !== 'admin')
  ) {
    return redirect('/secure/login');
  }
}
