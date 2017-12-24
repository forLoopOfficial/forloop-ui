export default function({ app, store, redirect }) {
  // If the user is not authenticated or is an admin user
  if (!store.state.authenticated) {
    return redirect('/');
  } else if (
    store.state.currentUser.role === 'superadmin' ||
    store.state.currentUser.role === 'admin'
  ) {
    store.dispatch('logout');
    return redirect('/');
  }
}
