<template>
  <!-- Page content -->
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <button type="button" @click="openAddModal">Add Country</button>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <b-card :header="caption">
          <b-table :hover="true" :striped="true" :bordered="true" :fixed="true" class="table-responsive-sm" :items="countries" :fields="fields" :current-page="meta.page" :per-page="meta.perPage">
            <template slot="active" scope="data">
              <b-badge :variant="getBadge(data.item.active)">{{getStatus(data.item.active)}}</b-badge>
            </template>
          </b-table>
          <nav>
            <b-pagination :total-rows="getRowCount(countries)" :per-page="meta.perPage" v-model="meta.page" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
          </nav>
        </b-card>
      </b-col>
    </b-row>
    <add-country :show="show" :closed="closeAddModal"></add-country>
  </div>
  <!-- Page content -->

</template>

<script>
import AddCountry from '~/components/admin/countries/AddCountry.vue';

export default {
  name: 'Countries',
  components: {
    AddCountry
  },
  // lifecycle methods
  mounted() {},

  data() {
    return {
      show: false,
      caption: "<i class='fa fa-align-justify'></i> Countries",
      fields: ['name', 'active', 'timezone'],
      countries: [],
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
      .$get(`/countries`)
      .then(res => {
        return { countries: res.data };
      })
      .catch(e => {
        console.log('error', e.response);
        return {};
      });
  },
  methods: {
    getBadge(active) {
      return active ? 'success' : 'warning';
    },
    getStatus(active) {
      return active ? 'active' : 'inactive';
    },
    getRowCount(items) {
      return items.length;
    },
    openAddModal() {
      this.show = true;
    },
    closeAddModal() {
      this.show = false;
      this.fetchData();
    },
    fetchData() {
      return this.$axios
        .$get(`/countries`)
        .then(res => {
          return (this.countries = res.data);
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
