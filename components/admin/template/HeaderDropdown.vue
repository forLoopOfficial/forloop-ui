<template>
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <img src="~/assets/admin/img/avatars/7.jpg" class="img-avatar" alt="admin@forloopafrica.com">
        </template>
        <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
        <b-dropdown-item><i class="fa fa-wrench"></i>Settings</b-dropdown-item>
        <b-dropdown-item @click="signout"><i class="fa fa-lock"></i> Logout</b-dropdown-item>
      </b-nav-item-dropdown>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'header-dropdown',
  data: () => {
    return { itemsCount: 42 };
  },
  methods: {
    ...mapActions(['logout']),
    signout() {
      this.logout();
      this.$router.replace('/secure/login');
    }
  }
};
</script>

