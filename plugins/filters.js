import Vue from 'vue';
import moment from 'moment';

Vue.filter('capitalize', val => {
  if (val) {
    return val.toUpperCase();
  }
});

Vue.filter('formatDate', function(value, format) {
  format = format || 'MM/DD/YYYY';
  if (value) {
    return moment(value).format(format);
  }
});

Vue.filter('formateDateMonthYear', function(value) {
  if (value) {
    return moment(String(value)).format('MMMM, YYYY');
  }
});
