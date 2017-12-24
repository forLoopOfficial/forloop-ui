<template>
    <div>
      <!-- About Section -->
      <section class="about">
          <div class="container">
              <h1 class="about__title">About forLoop</h1>
              <p class="about__content">{{about_page.metadata.description}}</p>
          </div>
      </section>

      <!-- Images -->

      <section class="images__section">
          <!-- Grid container -->
          <div class="outer-container">
            <no-ssr>
              <flickity ref="flickity" :options="flickityOptions">
                <img v-for="(image, index) in about_page.metadata.images" :src="image.image_url" :key="index" class="images__section__left hidden--xxs"/>
              </flickity>
            </no-ssr>
          </div>
      </section>
      <add-subscriber></add-subscriber>
    </div>
</template>


<script>
import AddSubscriber from '~/components/site/AddSubscriber.vue';

export default {
  name: 'AboutPage',
  components: {
    AddSubscriber
  },
  data() {
    return {
      about_page: {},
      flickityOptions: {
        initialIndex: 3,
        prevNextButtons: true,
        pageDots: true,
        wrapAround: true
      }
    };
  },
  asyncData({ app }) {
    return app.$axios
      .$get(`/pages/about`)
      .then(res => {
        return { about_page: res.data };
      })
      .catch(e => {
        console.log('error', e.config);
        return {};
      });
  }
};
</script>

<style lang="scss">
@import 'node_modules/flickity/dist/flickity.min.css';
</style>
