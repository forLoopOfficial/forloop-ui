<template>

  <!-- Component content -->
  <b-modal ref="addUserRef" title="Add Admin">
    <b-form @submit.prevent="save" class="form-horizontal form-label-left">
      <b-form-group id="emailGroup1"
                    label="Email:"
                    description="Admin's email">
        <b-form-input id="emailInput1"
                      type="text"
                      v-model="user.email"
                      required
                      placeholder="Enter Email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="passGroup1"
                    label="Password:">
        <b-form-input id="passInput1"
                      type="password"
                      :state="confirm"
                      v-model="user.password"
                      required
                      placeholder="Enter Password">
        </b-form-input>
      </b-form-group>
      <b-form-group id="confirmPassGroup1"
                    label="Confirm Password:">
        <b-form-input id="confirmPassInput1"
                      type="password"
                      v-model="confirmPassword"
                      required
                      placeholder="Confirm Password">
        </b-form-input>
      </b-form-group>
      <b-form-group id="roleGroup1"
                    label="Role:">
        <b-form-select v-model="user.role" class="mb-3">
          <template slot="first">
            <!-- this slot appears above the options from 'options' prop -->
            <option :value="null" disabled>-- Please select an option --</option>
          </template>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </b-form-select>
      </b-form-group>
      <b-form-group id="countryGroup1"
                    label="Country:">
        <b-form-select v-model="user.country" :options="countryOptions" class="mb-3">
          <template slot="first">
            <!-- this slot appears above the options from 'options' prop -->
            <option :value="null" disabled>-- Please select an option --</option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group id="firstNameGroup1"
                    label="First Name:">
        <b-form-input id="firstNameInput1"
                      type="text"
                      v-model="user.first_name"
                      required
                      placeholder="First Name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="lastNameGroup1"
                    label="Last Name:">
        <b-form-input id="lastNameInput1"
                      type="text"
                      v-model="user.last_name"
                      required
                      placeholder="Last Name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="twitterHandleGroup1"
                    label="Twitter Handle:">
        <b-form-input id="twitterHandleInput1"
                      type="text"
                      v-model="user.twitter_handle"
                      required
                      placeholder="Twitter Handle">
        </b-form-input>
      </b-form-group>
      <div slot="modal-ok">
        <b-button type="submit" variant="primary">Submit</b-button>
      </div>
    </b-form>
    <div slot="modal-footer" class="w-100">
      <b-btn class="float-right" variant="secondary" @click="close">
        Close
      </b-btn>
    </div>
  </b-modal>
  <!-- /Component content -->

</template>


<script>
import { isArray } from 'lodash';

export default {
  name: 'AddUser',

  props: ['show', 'closed', 'countries'],
  data() {
    return {
      user: {},
      confirmPassword: ''
    };
  },
  watch: {
    show: function(val, old) {
      if (val) this.$refs.addUserRef.show();
    }
  },
  methods: {
    save() {
      const formData = {
        items: [this.user]
      };
      return this.$axios
        .$post(`/admins`, formData)
        .then(res => {
          this.$toast.success(res.message);
          this.close();
        })
        .catch(e => {
          this.$toast.error(e.response.data.message);
          if (isArray(e.response.data.error)) {
            e.response.data.error.forEach(error =>
              this.$toast.error(error.message)
            );
          }
        });
    },
    close() {
      this.$refs.addUserRef.hide();
      // set parent show property to false
      this.closed();
    }
  },
  computed: {
    confirm() {
      return this.user.password === this.confirmPassword;
    },
    countryOptions() {
      return this.countries.map(country => ({
        value: country._id,
        text: country.name
      }));
    }
  }
};
</script>

<style>

</style>
