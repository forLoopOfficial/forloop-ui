<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <nuxt/>
        </div>
      </main>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import nav from '~/utils/_nav';
import {
  Header as AppHeader,
  Sidebar,
  Aside as AppAside,
  Footer as AppFooter,
  Breadcrumb
} from '~/components/admin/template';

export default {
  name: 'AppAdmin',
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    AppFooter,
    Breadcrumb
  },
  head() {
    return {
      metaInfo: {
        bodyAttrs: {
          class:
            'app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden sidebar-hidden'
        }
      }
    };
  },
  data() {
    return {
      nav: nav.items
    };
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched;
    }
  }
};
</script>

<style lang="scss">
@import "~assets/admin/scss/style.scss";
</style>
