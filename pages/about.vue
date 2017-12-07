<template>
    <div>
      <!-- About Section -->
      <section class="about">
          <div class="container">
              <h1 class="about__title">About forLoop</h1>
              <p class="about__content">{{about_page.description}}</p>
          </div>
      </section>

      <!-- Images -->

      <section class="images__section">
          <!-- Grid container -->
          <div class="outer-container">
            <slick v-if="about_page.images" ref="slick" :options="slickOptions">
              <img v-for="(image, index) in about_page.images" :src="image.image_url" :key="index" class="images__section__left hidden--xxs"/>
            </slick>
          </div>
      </section>

      <add-subscriber></add-subscriber>
    </div>
</template>


<script>
import Slick from 'vue-slick';
import AddSubscriber from '~/components/site/AddSubscriber.vue';

export default {
  name: 'AboutPage',
  components: {
    Slick,
    AddSubscriber
  },
  data() {
    return {
      about_page: {},
      slickOptions: {
        slidesToShow: 3,
        dots: true,
        infinite: true,
        speed: 300,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 3000
      }
    };
  }
};
</script>

<style>

</style>
