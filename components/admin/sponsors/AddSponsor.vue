<template>
  <!-- Component content -->
  <b-modal ref="addSponsorRef" id="addSponsor" title="Add Sponsor(s)">
    <button class="fa fa-plus" type="button" @click="newGroup"></button>
    <b-form @submit.prevent="save">
      <template v-for="(sponsor, index) in sponsors">
        <b-form-group id="nameGroup1"
                      label="Name:"
                      description="Sponsor's name"
                      :key="index">
          <b-form-input id="nameInput1"
                        type="text"
                        v-model="sponsor.name"
                        required
                        placeholder="Enter Name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="websiteGroup1" label="Website:" :key="index">
          <b-form-input id="websiteInput1"
                        type="text"
                        v-model="sponsor.website"
                        required
                        placeholder="Enter Website">
          </b-form-input>
        </b-form-group>
        <b-form-group id="frontPageGroup1" :key="index">
          <b-form-checkbox v-model="sponsor.front_page" id="frontPageInput1">
            Front Page
          </b-form-checkbox>
        </b-form-group>
        <b-form-group id="imageGroup1" :key="index">
          <b-form-file id="file_input1" v-model="files[index]"></b-form-file>
          <br> Selected file: {{files[index] && files[index].name}}
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
import firebase from 'firebase';
const storage = firebase.storage().ref('sponsors');
export default {
  name: 'AddSponsor',

  props: ['show', 'closed'],
  data() {
    return {
      sponsors: [
        {
          name: '',
          website: '',
          image_url: '',
          front_page: true
        }
      ],
      files: [null]
    };
  },
  watch: {
    show: function(val, old) {
      if (val) this.$refs.addSponsorRef.show();
    }
  },
  methods: {
    newGroup() {
      this.sponsors.push({});
    },
    remove(index) {
      this.sponsors.splice(index, 1);
    },
    save() {
      let imageName = `${new Date().getTime()}_${this.imageFile.name}`;
      let imageRef = storage.child(imageName);
      imageRef
        .put(this.imageFile)
        .then(snapshot => {
          this.newSponsor.image_url = snapshot.downloadURL;
          alert('Sponsor successfully added');
        })
        .catch(error => {
          console.log(error);
          alert('Issue Uploading Images');
        });
      const formData = {
        items: this.sponsors
      };
      return this.$axios
        .$post(`/sponsors`, formData)
        .then(res => {
          this.close();
        })
        .catch(e => {
          console.log('error', e.response);
          alert('Unable to create sponsors');
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
