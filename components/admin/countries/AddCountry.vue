<template>
  <!-- Component content -->
  <b-modal ref="addCountryRef" id="addCountry" title="Add Country">
    <button class="fa fa-plus" type="button" @click="newGroup"></button>
    <b-form @submit="save">
      <template v-for="(country, index) in countries">
        <b-form-group id="nameGroup1"
                      label="Name:"
                      description="Country's name"
                      :key="index">
          <b-form-input id="nameInput1"
                        type="text"
                        v-model="country.name"
                        required
                        placeholder="Enter Name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="timeGroup1" label="Timezone:" :key="index">
          <b-form-input id="timeInput1"
                        type="text"
                        v-model="country.timezone"
                        required
                        placeholder="Enter Timezone">
          </b-form-input>
        </b-form-group>
        <b-form-group id="activeGroup1" :key="index">
          <b-form-checkbox v-model="country.active" id="activeInput1">
            Active
          </b-form-checkbox>
        </b-form-group>
        <button class="fa fa-minus" type="button" @click="remove(index)" :key="index"></button>
      </template>
      <div slot="modal-ok">
      <b-button type="submit" variant="primary">Submit</b-button>
      </div>
    </b-form>
    <div slot="modal-footer" class="w-100">
      <b-btn size="sm" class="float-right" variant="secondary" @click="close">
        Close
      </b-btn>
    </div>
  </b-modal>
  <!-- /Component content -->

</template>


<script>
export default {
  name: 'AddCountry',

  props: ['show', 'closed'],
  data() {
    return {
      countries: [
        {
          name: '',
          timezone: '',
          active: true
        }
      ]
    };
  },
  watch: {
    show: function(val, old) {
      if (val) this.$refs.addCountryRef.show();
    }
  },
  methods: {
    newGroup() {
      this.countries.push({});
    },
    remove(index) {
      this.countries.splice(index, 1);
    },
    save() {
      const formData = {
        items: this.countries
      };
      return this.$axios
        .$post(`/countries`, formData)
        .then(res => {
          this.close();
        })
        .catch(e => {
          console.log('error', e.response);
          alert('Unable to create countries');
        });
    },
    close() {
      this.$refs.addCountryRef.hide();
      // set parent show property to false
      this.closed();
    }
  }
};
</script>

<style>

</style>
