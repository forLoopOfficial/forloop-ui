<template>

  <!-- Page content -->
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-button variant="primary" type="button" @click="openAddModal">Add Admin</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <b-card :header="caption">
          <b-table :hover="true" :striped="true" :bordered="true" :fixed="true" class="table-responsive-sm" :items="users" :fields="fields" :current-page="meta.page" :per-page="meta.perPage">
            <template slot="full_name" scope="data">
              {{data.item.first_name}}, {{data.item.last_name}}
            </template>
            <template slot="active" scope="data">
              <b-badge :variant="getBadge(data.item.active)">{{getStatus(data.item.active)}}</b-badge>
            </template>
            <template slot="country" scope="data">
              <p>{{data.item.country && data.item.country.name}}</p>
            </template>
          </b-table>
          <nav>
            <b-pagination :total-rows="getRowCount(users)" :per-page="meta.perPage" v-model="meta.page" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
          </nav>
        </b-card>
      </b-col>
    </b-row>
    <add-user :show="show" :closed="closeAddModal" :countries="countries"></add-user>
  </div>
  <!-- /Page content -->

</template>


<script>
import { assign } from 'lodash';

import AddUser from '~/components/admin/users/AddUser.vue';
export default {
  name: 'Users',
  // lifecycle methods

  components: {
    AddUser
  },
  data() {
    return {
      show: false,
      caption: "<i class='fa fa-align-justify'></i> Admins",
      fields: ['full_name', 'username', 'role', 'email', 'active', 'country'],
      users: [],
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
    const adminsReq = app.$axios
      .$get(`/admins`)
      .then(res => {
        return { users: res.data };
      })
      .catch(e => {
        console.log('error', e.response);
        return {};
      });
    const countriesReq = app.$axios
      .$get(`/countries`)
      .then(res => {
        return { countries: res.data };
      })
      .catch(e => {
        console.log('error', e.response);
        return {};
      });
    return Promise.all([adminsReq, countriesReq]).then(
      ([admins, countries]) => {
        return assign({}, admins, countries);
      }
    );
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
        .$get(`/admins`)
        .then(res => {
          return (this.users = res.data);
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
