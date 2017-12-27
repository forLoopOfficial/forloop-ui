<template>
  <!-- page content -->
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-button variant="primary" type="button" @click="openAddModal">Add Sponsor(s)</b-button>
      </b-col>
    </b-row>
    <b-row>
      <sponsor v-for="sponsor in sponsors" :sponsor="sponsor" :key="sponsor._id"></sponsor>
    </b-row>
    <add-sponsor :show="show" :closed="closeAddModal"></add-sponsor>
  </div>
  <!-- /page content -->
</template>

<script>
import AddSponsor from '~/components/admin/sponsors/AddSponsor.vue';
import Sponsor from '~/components/admin/sponsors/Sponsor.vue';

export default {
  name: 'Sponsors',
  components: {
    AddSponsor,
    Sponsor
  },
  // lifecycle methods

  data() {
    return {
      show: false,
      sponsors: [],
      meta: {
        page: 1,
        perPage: 10,
        previousPage: false,
        nextPage: false,
        pageCount: 1,
        total: 1
      }
    };
  },
  asyncData({ app }) {
    return app.$axios
      .$get(`/sponsors`)
      .then(res => {
        return { sponsors: res.data };
      })
      .catch(e => {
        console.log('error', e.response);
        return {};
      });
  },
  methods: {
    openAddModal() {
      this.show = true;
    },
    closeAddModal() {
      this.show = false;
      this.fetchData();
    },
    fetchData() {
      return this.$axios
        .$get(`/sponsors`)
        .then(res => {
          this.sponsors = res.data;
        })
        .catch(e => {
          console.log('error', e.response);
        });
    }
  }
};
</script>

<style>

</style>
