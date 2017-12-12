<template>

  <!-- Page content -->
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card :header="caption">
          <b-table :hover="true" :striped="true" :bordered="true" :fixed="true" class="table-responsive-sm" :items="events" :fields="fields" :current-page="meta.page" :per-page="meta.perPage">
            <template slot="published" scope="data">
              <b-badge :variant="getBadge(data.item.published)">{{getStatus(data.item.published)}}</b-badge>
            </template>
            <template slot="when" scope="data">
              {{data.item.when.date_formatted}}
              <p>FROM: {{data.item.when.from.h}}:{{data.item.when.from.mm}} {{data.item.when.from.A}}</p>
              <p>TO: {{data.item.when.to.h}}:{{data.item.when.to.mm}} {{data.item.when.to.A}}</p>
            </template>
            <template slot="location" scope="data">
              <p>{{data.item.location.name}}</p>
              <p>{{data.item.location.address}}</p>
            </template>
          </b-table>
          <nav>
            <b-pagination :total-rows="getRowCount(events)" :per-page="meta.perPage" v-model="meta.page" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
          </nav>
        </b-card>
      </b-col>
    </b-row>
  </div>
  <!-- Page content -->

</template>

<script>
export default {
  name: 'Events',
  // lifecycle methods
  mounted() {},

  data() {
    return {
      caption: "<i class='fa fa-align-justify'></i> Events",
      fields: [
        'title',
        {
          key: 'when',
          label: 'Date/Time'
        },
        {
          key: 'location',
          label: 'Location'
        },
        'country',
        'published'
      ],
      events: [],
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
      .$get(`/events`)
      .then(res => {
        return { events: res.data };
      })
      .catch(e => {
        console.log('error', e.response);
        return {};
      });
  },
  methods: {
    getBadge(published) {
      return published ? 'success' : 'warning';
    },
    getStatus(published) {
      return published ? 'published' : 'unpublished';
    },
    getRowCount(items) {
      return items.length;
    }
  }
};
</script>

<style>

</style>
