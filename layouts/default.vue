<template>
  <div>
    <app-bar></app-bar>
    <nuxt/>
    <app-footer></app-footer>
  </div>
</template>


<script>
import AppBar from '~/components/site/AppBar.vue';
import AppFooter from '~/components/site/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppBar,
    AppFooter
  }
};
</script>

<style lang="scss">
@import '~assets/sass/app.scss';
</style>
