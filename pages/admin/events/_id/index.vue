<template>

  <!-- page content -->
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <h2>{{ event.title }}</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <b-card :header="caption">
          <b-form @submit.prevent="save">
            <router-link :to="eventUrl" target="_blank">Event Url</router-link>
            </b-form-group>
            <b-form-group id="titleGroup1"
                          label="Title:"
                          description="Event's Title">
              <b-form-input id="titleInput1"
                            type="text"
                            v-model="event.title"
                            required
                            placeholder="Enter Title">
              </b-form-input>
            </b-form-group>
            <b-form-group id="publishedGroup1">
              <b-form-checkbox v-model="event.published" id="publishedInput1">
                Published
              </b-form-checkbox>
            </b-form-group>
            <b-form-group id="dateGroup1" label="Date:">
              <no-ssr>
                <vue-datepicker format="D MMM d" v-model="eventTime" placeholder="When is it happening?" required></vue-datepicker>
              </no-ssr>
            </b-form-group>
            <b-form-group id="timeGroup1" label="Enter Time:">
              <no-ssr>
              <vue-timepicker format="h:mm A" v-model="event.when.from" placeholder="From what time?"></vue-timepicker>
              </no-ssr>
              <no-ssr>
              <vue-timepicker format="h:mm A" v-model="event.when.to" placeholder="To what time?"></vue-timepicker>
              </no-ssr>
            </b-form-group>
            <b-form-group id="locationGroup1" label="Location:">
              <b-form-input id="locationNameInput1"
                            type="text"
                            v-model="event.location.name"
                            required
                            placeholder="Name the place e.g CCHub Building">
              </b-form-input>
              <no-ssr>
                <places v-model="event.location.address" placeholder="Address of the place"></places>
              </no-ssr>
            </b-form-group>
            <b-form-group id="countryGroup1"
                          label="Country:">
              <b-form-select v-model="event.country" :options="countryOptions" class="mb-3">
                <template slot="first">
                  <!-- this slot appears above the options from 'options' prop -->
                  <option :value="null" disabled>-- Please select an option --</option>
                </template>
              </b-form-select>
            </b-form-group>
            <b-form-group id="bgImageGroup1" label="Background Image:">
              <b-form-file id="event_background" v-model="tempBackground" accept="image/jpeg,image/x-png,.png" placeholder="Change background"></b-form-file>
            </b-form-group>
            <b-form-group id="descGroup1" label="Description:">
              <b-form-textarea id="descInput1"
                            type="text"
                            v-model="event.description"
                            required
                            :rows="4"
                            :max-rows="6"
                            placeholder="Enter event description">
              </b-form-textarea>
            </b-form-group>
            <b-form-group id="speakersGroup1">
              <b-card header="Speakers">
                <div v-for="(speaker, index) in event.speakers" class="speaker_content" :key="speaker.screen_name">
                  <div class="icon">
                    <img :src="speaker.profile_image" width="48" height="48">
                  </div>
                  <div class="inner">
                    <a :href="speaker.twitterURL">{{speaker.name}}</a><button @click="removeSpeaker(index)" class="btn btn-xs btn-danger">X</button>
                    <input v-model="speaker.topic" type="text" placeholder="Speaker topic" :style="{ width: '100%' }">
                    <textarea v-model="speaker.description" placeholder="Description">

                    </textarea>
                  </div>
                </div>
                <add-contributor @add="addSpeaker"></add-contributor>
              </b-card>
            </b-form-group>
            <b-form-group id="hostsGroup1">
              <b-card header="Hosts">
                <div v-for="(host, index) in event.hosts" class="host_content" :key="host.screen_name">
                  <div class="icon">
                    <img :src="host.profile_image" width="48" height="48">
                  </div>
                  <div class="inner">
                    <a :href="host.twitterURL">{{host.name}}</a><button @click="removeHost(index)" class="btn btn-xs btn-danger">X</button>
                    <textarea v-model="host.description" placeholder="Description">

                    </textarea>
                  </div>
                </div>
                <add-contributor @add="addHost"></add-contributor>
              </b-card>
            </b-form-group>
            <b-form-group id="sponsorsGroup1">
              <b-card header="Sponsors">
                <div v-for="(sponsor, index) in event.sponsors" class="host_content" :key="index">
                  <div class="icon">
                    <img :src="sponsor.image" width="48" height="48">
                  </div>
                  <div class="inner">
                    <button @click="removeSponsor(index)" class="btn btn-xs btn-danger">X</button>
                    <textarea v-model="sponsor.image" placeholder="Image Url">

                    </textarea>
                  </div>
                </div>
                <div class="inner">
                  <input v-model="imageLink" class="twitter_input" placeholder="Image Url" type="text">
                  <button @click="addSponsor" class="btn btn-xs btn-primary">Add</button>
                </div>
              </b-card>
            </b-form-group>
            <b-button type="submit" variant="primary">Update</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
  <!-- /page content -->

</template>

<script>
/* global google:true  */
import { assign, omit } from 'lodash';
import firebase from 'firebase';
import moment from 'moment';
import AddContributor from '~/components/admin/events/AddContributor.vue';

const resourceStorage = firebase
  .app('AdminApp')
  .storage()
  .ref('events');
export default {
  name: 'EventDetails',
  components: {
    AddContributor
  },
  data() {
    return {
      caption: "<i class='fa fa-align-justify'></i> Event Details",
      tempResource: '',
      tempBackground: '',
      imageLink: null,
      updating: false,
      event: {},
      omit: [
        '_id',
        'url_slug',
        'attendees',
        'created_at',
        'updated_at',
        'created_by'
      ] // fields to omit in event object
    };
  },
  asyncData({ app, route }) {
    const id = route.params.id;
    const eventReq = app.$axios
      .$get(`/events/${id}`)
      .then(res => {
        return { event: res.data };
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
    return Promise.all([eventReq, countriesReq]).then(([event, countries]) => {
      return assign({}, event, countries);
    });
  },

  methods: {
    save() {
      this.updating = true;
      this.setEventLatLng()
        .then(() => this.uploadBackgroundImage())
        .then(() => this.uploadResources())
        .then(() => {
          // send to api to create
          const changes = omit(this.event, this.omit);
          const url = `/events/${this.event._id}`;
          return this.$axios.$put(url, changes);
        })
        .then(() => {
          this.$toast.success('Event successfully updated');
        })
        .catch(error => {
          this.updating = false;
          console.log(error.response.data);
          this.$toast.error(error.message);
        });
    },
    async setEventLatLng() {
      if (google) {
        let geocoder = new google.maps.Geocoder();
        return new Promise((resolve, reject) => {
          geocoder.geocode(
            { address: this.event.location.address },
            (results, status) => {
              if (status === 'OK') {
                let location = results[0].geometry.location;
                this.event.location.lat = location.lat();
                this.event.location.lng = location.lng();
                resolve();
              } else {
                reject(
                  new Error(
                    `Geocode was not successful for the following reason: ${
                      status
                    } \n Please modify location `
                  )
                );
              }
            }
          );
        });
      } else {
        this.updating = false;
        throw new Error(
          'Geocoder not found. Unable to get location lat/lng try refreshing page'
        );
      }
    },
    async uploadResources() {
      if (this.tempResource !== '') {
        let resourceName = `${new Date().getTime()}_${this.tempResource.name}`;
        let eventResRef = resourceStorage.child(
          `${this.event.id}/resources/${resourceName}`
        );
        return eventResRef
          .put(this.tempResource, { type: 'resource' })
          .then(snapshot => {
            this.event.resource_url = snapshot.downloadURL;
          })
          .catch(error => {
            console.log(error);
            throw new Error('Issue uploading resources... Please try again');
          });
      }
    },
    async uploadBackgroundImage() {
      if (this.tempBackground !== '') {
        let backgroundName = `${new Date().getTime()}_${
          this.tempBackground.name
        }`;
        let eventBackgroundRef = resourceStorage.child(
          `${this.event.id}/backgrounds/${backgroundName}`
        );
        return eventBackgroundRef
          .put(this.tempBackground, {
            type: 'background-image'
          })
          .then(snapshot => {
            this.event.background_image_url = snapshot.downloadURL;
          })
          .catch(error => {
            this.saving = false;
            throw new Error(
              `Issue uploading background image: ${error.message}`
            );
          });
      }
    },
    addSpeaker(contributor) {
      let speakers = this.event.speakers || [];
      speakers.push(contributor);
      this.event.speakers = speakers;
    },
    addHost(contributor) {
      let hosts = this.event.hosts || [];
      hosts.push(contributor);
      this.event.hosts = hosts;
    },
    addSponsor() {
      if (!this.imageLink) return;

      const sponsor = {
        image: this.imageLink
      };
      let sponsors = this.event.sponsors || [];
      sponsors.push(sponsor);
      this.event.sponsors = sponsors;
    },
    removeHost(index) {
      this.event.hosts.splice(index, 1);
    },
    removeSpeaker(index) {
      this.event.speakers.splice(index, 1);
    },
    removeSponsor(index) {
      this.event.sponsors.splice(index, 1);
    },
    changeResource(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.tempResource = files[0];
    }
  },

  computed: {
    eventTime: {
      // getter
      get: function() {
        return moment(Number(this.event.when.date)).format('YYYY-MM-DD');
      },
      // setter
      set: function(newDate) {
        this.event.when.date = newDate.getTime();
        this.event.when.date_formatted = moment(
          Number(this.event.when.date)
        ).format('dddd MMM D YYYY');
      }
    },
    eventUrl() {
      return `/events/${this.event.url_slug}`;
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
