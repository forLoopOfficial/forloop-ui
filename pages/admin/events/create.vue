<template>

  <!-- Component content -->
  <div class="animated fadeIn">
    <b-form @submit.prevent="createEvent">
      <b-row>
        <div class="pull-left">
          <b-button type="submit" variant="primary" :disabled="saving">Save</b-button>
        </div>
      </b-row>
      <b-row>
        <b-col>
          <div class="event_main">
            <div class="event_main_content">
              <b-form-input id="titleInput1"
                            type="text"
                            v-model="event.title"
                            required
                            placeholder="Start by editing this title"
                            class="event_main_content_title">
              </b-form-input>
            </div>
          </div>
          <div class="event_bar">
            <b-row>
              <b-col md="6">
                <b-row>
                  <b-col md="4">
                    <no-ssr>
                      <vue-datepicker format="D MMM d" v-model="date" placeholder="When is it happening?" required></vue-datepicker>
                    </no-ssr>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12">
                    <no-ssr>
                      <vue-timepicker format="h:mm A" v-model="event.when.from" placeholder="From what time?" required></vue-timepicker>
                    </no-ssr>
                    <no-ssr>
                      <vue-timepicker format="h:mm A" v-model="event.when.to" placeholder="To what time?" required></vue-timepicker>
                    </no-ssr>
                  </b-col>
                </b-row>
              </b-col>
              <b-col md="6">
                <b-row>
                  <b-col md="4" offset-md="8">
                    <b-form-input id="locationNameInput"
                                type="text"
                                v-model="event.location.name"
                                required
                                placeholder="Name the place e.g CCHub Building"
                                style="width:100%">
                    </b-form-input>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12">
                    <no-ssr>
                      <places v-model="event.location.address" placeholder="Address of the place"></places>
                    </no-ssr>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row class="event_contributors_section">
        <b-col sm="12">
          <b-form-group id="countryGroup1"
                        label="Country:">
            <b-form-select v-model="event.country" :options="countryOptions" class="mb-3" required>
              <template slot="first">
                <!-- this slot appears above the options from 'options' prop -->
                <option :value="null" disabled>-- Please select an option --</option>
              </template>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="event_contributors_section">
        <b-col sm="12">
          <b-row class="event_contributors_section">
            <b-col md="4" offset-md="3">
              <b-form-file id="event_background" @change="changeBackground" v-model="tempBackground" accept="image/jpeg,image/x-png,.png" placeholder="Change background" required></b-form-file>
            </b-col>
          </b-row>
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
        </b-col>
      </b-row>
      <b-row class="event_contributors_section">
        <b-col sm="12">
          <b-form-group id="speakersGroup1">
            <b-card header="Speakers">
              <div v-for="(speaker, index) in event.speakers" class="speaker_content" :key="speaker.screen_name">
                <div class="icon">
                  <img :src="speaker.profile_image" width="48" height="48">
                </div>
                <div class="inner">
                  <a :href="speaker.twitterURL">{{speaker.name}}</a><button @click="removeSpeaker(index)" type="button" class="btn btn-xs btn-danger">X</button>
                  <input v-model="speaker.topic" type="text" placeholder="Speaker topic" :style="{ width: '100%' }">
                  <textarea v-model="speaker.description" placeholder="Description">

                  </textarea>
                </div>
              </div>
              <add-contributor @add="addSpeaker"></add-contributor>
            </b-card>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="event_contributors_section">
        <b-col sm="12">
          <b-form-group id="hostsGroup1">
            <b-card header="Hosts">
              <div v-for="(host, index) in event.hosts" class="host_content" :key="host.screen_name">
                <div class="icon">
                  <img :src="host.profile_image" width="48" height="48">
                </div>
                <div class="inner">
                  <a :href="host.twitterURL">{{host.name}}</a><button @click="removeHost(index)" type="button" class="btn btn-xs btn-danger">X</button>
                  <textarea v-model="host.description" placeholder="Description">

                  </textarea>
                </div>
              </div>
              <add-contributor @add="addHost"></add-contributor>
            </b-card>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="event_contributors_section">
        <b-col sm="12">
          <b-form-group id="sponsorsGroup1">
            <b-card header="Sponsors">
              <div v-for="(sponsor, index) in event.sponsors" class="host_content" :key="index">
                <div class="icon">
                  <img :src="sponsor.image" width="48" height="48">
                </div>
                <div class="inner">
                  <button @click="removeSponsor(index)" type="button" class="btn btn-xs btn-danger">X</button>
                  <textarea v-model="sponsor.image" placeholder="Image Url">

                  </textarea>
                </div>
              </div>
              <div class="inner">
                <input v-model="imageLink" class="twitter_input" placeholder="Image Url" type="text">
                <button @click="addSponsor" class="btn btn-xs btn-primary" type="button">Add</button>
              </div>
            </b-card>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </div>
  <!-- /Component content -->

</template>

<script>
/* global google:true $:true */

import firebase from 'firebase';
import moment from 'moment';
import { isEmpty, isNil } from 'lodash';

import AddContributor from '~/components/admin/events/AddContributor.vue';

const storage = firebase.app('AdminApp').storage();
const eventImageRef = storage.ref('events');
export default {
  name: 'CreateEvent',
  // lifecycle methods
  components: {
    AddContributor
  },
  data() {
    return this.initialState();
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
    createEvent(evt) {
      // additional validation for custom components
      if (isNil(this.date) || isEmpty(this.event.location.address)) {
        evt.preventDefault();
        console.log('date', this.date, this.event.location.address);
        this.$toast.error('Please fill in info about date/time and location');
        return;
      }
      if (isEmpty(this.event.speakers) || isEmpty(this.event.hosts)) {
        evt.preventDefault();
        this.$toast.error('There must be atleast one host and speaker');
        return;
      }
      this.saving = true;
      this.event.when.date = this.date.getTime();
      this.event.when.date_formatted = moment(
        Number(this.event.when.date)
      ).format('dddd MMM D YYYY');
      this.uploadBackgroundImage()
        .then(() => this.setEventLatLng())
        .then(() => {
          // send to api to create
          return this.$axios.$post('/events', this.event);
        })
        .then(() => {
          this.$toast.success('Event successfully created');
          this.$data.event = this.initialState().event;
          this.$router.replace('/admin/events');
        })
        .catch(error => {
          this.saving = false;
          this.$toast.error(error.message);
        });
    },
    async uploadBackgroundImage() {
      let imageName = this.tempBackground.name;
      let imageRef = eventImageRef.child(imageName);
      return imageRef
        .put(this.tempBackground)
        .then(snapshot => {
          this.event.background_image_url = snapshot.downloadURL;
        })
        .catch(error => {
          this.saving = false;
          throw new Error(`Issue uploading background image: ${error.message}`);
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
        this.saving = false;
        throw new Error(
          'Geocoder not found. Unable to get location lat/lng try refreshing page'
        );
      }
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
    addSpeaker(contributor) {
      this.event.speakers.push(contributor);
    },
    addHost(contributor) {
      this.event.hosts.push(contributor);
    },
    removeSpeaker(index) {
      this.event.speakers.splice(index, 1);
    },
    removeHost(index) {
      this.event.hosts.splice(index, 1);
    },
    removeSponsor(index) {
      this.event.sponsors.splice(index, 1);
    },
    changeBackground(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = e => {
        let src = `url('${e.target.result}')`;
        $('.event_main').css('background-image', src);
      };
    },
    initialState() {
      return {
        saving: false,
        date: '',
        tempBackground: '',
        imageLink: null,
        countries: [],
        event: {
          title: '',
          published: false,
          url_slug: '',
          background_image_url: '/img/hero3.jpg',
          when: {
            date: '',
            date_formatted: '',
            from: {
              h: '',
              A: '',
              mm: ''
            },
            to: {
              h: '',
              A: '',
              mm: ''
            }
          },
          location: {
            name: '',
            address: '',
            lat: 0,
            lng: 0
          },
          description: '',
          hosts: [],
          speakers: [],
          sponsors: [],
          attendees: []
        }
      };
    }
  },
  computed: {
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
textarea {
  font-size: 17px;
  line-height: 1.5;
  min-height: 60px;
  width: 99%;
  margin-left: -1px;
  border: solid 1px #c4c4c4;
  height: auto;
  border-radius: 3px;
  display: inline-block;
  padding: 6px 9px;
  color: #333333;
  cursor: pointer;
}

.top_container {
  position: relative;
}

.icon {
  width: 48px;
  height: 48px;
  float: left;
  margin-top: 5px;
  text-align: center;
  line-height: 48px;
  background-color: #efefef;
  border-radius: 5px;
  color: #999999;
}

.event_main {
  width: 100%;
  padding: 140px 0 240px;
  background-color: #7787a3;
  background-image: url(/img/hero3.jpg);
  background-size: cover;
  background-position: center;
}
.event_main::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  content: ' ';
  z-index: 1;
  background-color: rgba(32, 42, 59, 0.56);
}

.event_main_content {
  position: relative;
  z-index: 2;
}
.event_main_content_title {
  display: inline-block;
  font-size: 3.10588em;
  line-height: 1.64706em;
  margin-bottom: 0.82353em;
  font-weight: 800;
  width: 100%;
  border: none;
  color: #fff;
  background-color: transparent;
  text-align: center;
}

.event_bar {
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(32, 42, 60, 0.72);
}

.event_contributors_section {
  background-color: #f5faf9;
}

.event_contributors_inner {
  margin: auto;
  margin-top: 3.29412em;
  margin-bottom: 3.29412em;
  max-width: 40em;
  display: block;
}

.event_contributors_content {
  border: dotted rgba(0, 0, 0, 0.2) 3px;
  overflow: hidden;
  padding: 20px;
  margin-bottom: 1.64706em;
  line-height: 2.5rem !important;
  border-radius: 3px;
}

.host_content {
  margin-bottom: 8px;
}

.speaker_content {
  margin-bottom: 8px;
}
</style>
