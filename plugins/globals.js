import Vue from 'vue';
import AddSubscriber from '~/components/site/AddSubscriber.vue';

Vue.component('AddSubscriber', AddSubscriber);

/* eslint-disable */
// Include bootstrap JS only
if (process.browser) {
  const timepicker = require('vue2-timepicker').default; // hack for es6 modules
  const datepicker = require('vuejs-datepicker').default;
  const places = require('vue-places').default;
  const flickity = require('vue-flickity').default;
  Vue.component('Places', places);
  Vue.component('VueTimepicker', timepicker);
  Vue.component('VueDatepicker', datepicker);
  Vue.component('Flickity', flickity);
}
