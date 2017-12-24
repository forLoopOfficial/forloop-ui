<template>
  <div v-if="event">
    <div class="hero__container">
      <!-- Hero -->
      <section class="hero hero--3">
        <div class="container">
          <!-- Hero Content -->
          <div class="hero__content">
            <h1 class="hero__title text-center">{{ event.title }}</h1>
          </div>
        </div>
      </section>
      <!-- Hero Event details content -->
      <div class="hero__absolute">
        <div class="hero__absolute__container">
          <div class="hero__event">
            <!-- Hero Event details item -->
            <div class="hero__event__item">
              <!-- Hero Event details content icon -->
              <div class="hero__event__item__icon">
                <svg class="icon-calendar">
                  <use xlink:href="/img/icons.svg#icon-calendar"></use>
                </svg>
              </div>
              <!-- Hero Event details content content -->
              <div class="hero__event__item__content">
                <!-- Hero Event date -->
                <p class="hero__event__item__content__text">{{ Number(event.when.date) | formatDate('dddd MMM d YYYY') }}</p>
                <!-- Hero Event time -->
                <p class="hero__event__item__content__text">{{ eventTime }}</p>
              </div>
            </div>
            <!-- Hero Event details item -->
            <div class="hero__event__item">
              <!-- Hero Event details content icon -->
              <div class="hero__event__item__icon">
                <svg class="icon-pin">
                  <use xlink:href="/img/icons.svg#icon-pin"></use>
                </svg>
              </div>
              <!-- Hero Event details content content -->
              <div class="hero__event__item__content">
                <!-- Hero Event Venue -->
                <p class="hero__event__item__content__text">{{ event.location.name }}</p>
                <!-- Hero Event Venue location -->
                <p class="hero__event__item__content__text">{{ event.location.address }}</p>
              </div>
            </div>
            <!-- Hero Event details item -->
            <div class="hero__event__item">
              <!-- Hero Event details content icon -->
              <div class="hero__event__item__icon">
                <svg class="icon-capacity-icon">
                  <use xlink:href="/img/icons.svg#icon-capacity-icon"></use>
                </svg>
              </div>
              <!-- Hero Event details content content -->
              <div class="hero__event__item__content">
                <!-- Hero Event attendees -->
                <p class="hero__event__item__content__text">{{ headerAttendees }}</p>
                <!-- Hero Event attendees link -->
                <a class="hero__event__item__content__text">View All</a>
              </div>
            </div>
            <!-- Hero Event details item -->
            <div class="hero__event__item hero__event__item--margin-10 mobile-float">
              <!-- Become an attendee link -->
              <button @click="attendEvent" :disabled="isAttendant" class="btn btn--primary btn--flex btn--sm--100">
                <span class="btn--icon">
                  <svg class="icon-add icon-md">
                    <use xlink:href="/img/icons.svg#icon-add"></use>
                  </svg>
                </span>
                <span class="btn--text">I Want To Attend</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section -->
    <section class="reasons">
      <div class="container">
        <h2 class="section__title section__title--2">{{ event.title }}</h2>
        <p class="section__caption">{{ event.description }}</p>
      </div>
    </section>

    <!-- Sponsors Information -->
    <section class="info info--2" v-if="event.sponsors">
      <div class="container">
        <div class="info__title text-center">Sponsor(s)</div>
        <!-- Attendee list -->
        <div class="info__list">
          <!-- Attendee list -->
          <div v-for="(sponsor, index) in event.sponsors" class="info__list__item" :key="index">
            <img :src="sponsor.image" alt="" class="img img-block" height="150">
          </div>
        </div>
      </div>
    </section>

    <!-- that line -->
    <div class="line">
      <div class="container">
        <hr class="line--seperator" />
      </div>
    </div>

    <!-- Speakers Information -->
    <section class="info">
      <div class="container">
        <div class="info__title text-center">SPEAKERS</div>
        <!-- Host Information item -->
        <div v-for="speaker in event.speakers" class="info__item" :key="speaker.screen_name">
          <div class="info__item__left">
            <!-- Host Information user's avatar -->
            <div class="info__item__avatar">
              <img :src="speaker.profile_image" alt="" class="img-circle img-block" height="98" width="98">
            </div>
            <div class="info__item__content">
              <!-- Host Information user's name -->
              <div class="info__item__content__name">{{ speaker.name }}</div>
              <!-- Host Information user's other information -->
              <div class="info__item__content__detail">{{ speaker.description }}</div>
              <div class="info__item__content__topic">Speaking on:
                <span class="talk-topic">{{ speaker.topic }}</span>
              </div>
            </div>
          </div>
          <div class="info__item__right">
            <a class="btn btn--flex btn--primary" :href="'https://twitter.com/intent/follow?screen_name='+speaker.screen_name">
              <span class="btn--icon">
                <svg class="icon-social-twitter icon-sm">
                  <use xlink:href="/img/icons.svg#icon-social-twitter"></use>
                </svg>
              </span>
              <span class="btn--text">Follow</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Host Information -->
    <section class="info">
      <div class="container">
        <div class="info__title text-center">HOST(s)</div>
        <!-- Host Information item -->
        <div v-for="host in event.hosts" class="info__item" :key="host.screen_name">
          <div class="info__item__left">
            <!-- Host Information user's avatar -->
            <div class="info__item__avatar">
              <img :src="host.profile_image" alt="" class="img-circle img-block" height="98" width="98">
            </div>
            <div class="info__item__content">
              <!-- Host Information user's name -->
              <div class="info__item__content__name">{{ host.name }}</div>
              <!-- Host Information user's other information -->
              <div class="info__item__content__detail" style="padding-right:5px">{{ host.description }}</div>
            </div>
          </div>
          <div class="info__item__right">
            <a class="btn btn--flex btn--primary" :href="'https://twitter.com/intent/follow?screen_name='+host.screen_name">
              <span class="btn--icon">
                <svg class="icon-social-twitter icon-sm">
                  <use xlink:href="/img/icons.svg#icon-social-twitter"></use>
                </svg>
              </span>
              <span class="btn--text">Follow</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Attendees Information -->
    <section class="info info--2">
      <div class="container">
        <div class="info__title text-center">{{ contentAttendees }}ATTENDING</div>
        <!-- Attendee list -->
        <div class="info__list">
          <!-- Attendee list -->
          <div v-for="(attendee, index) in event.attendees" :key="index" class="info__list__item">
            <img :src="attendee.profile_image" alt="" class="img-circle img-block" height="90" width="90">
          </div>
        </div>

        <div class="show-more text-center">
          <button class="btn btn--primary">Show More</button>
        </div>
      </div>
    </section>

    <g-map :location="event.location"></g-map>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import { isEmpty } from 'lodash';

import GMap from '~/components/site/Map.vue';

export default {
  name: 'EventPage',
  components: {
    GMap
  },
  data() {
    return {
      isAttendant: false,
      showConfirmModal: false,
      user: {},
      email: '',
      event: null
    };
  },
  asyncData({ app, params, error }) {
    return app.$axios
      .$get(`/events/slug/${params.id}`)
      .then(res => {
        return { event: res.data };
      })
      .catch(e => {
        console.log('error', e.config);
        error({
          statusCode: e.status || 500,
          message: 'Event not found'
        });
      });
  },
  methods: {
    ...mapActions(['firebaseLogin']),
    attendEvent() {
      // user already exist don't bother with twitter auth again
      if (this.currentUser) {
        return this.reserve();
      }
      return this.firebaseLogin()
        .then(() => {
          return this.reserve();
        })
        .then(() => {
          this.$toast.success('Succesfully reserved');
        })
        .catch(function(error) {
          console.log(error);
          alert(`Please try again: ${error.message}`);
        });
    },
    reserve() {
      return this.$axios
        .$post(`/events/${this.event._id}/attend`)
        .then(res => {
          alert('attending');
        })
        .catch(e => {
          console.log('error', e.config);
          // error({
          //   statusCode: e.status || 500,
          //   message: 'Issue attending event'
          // });
        });
    },
    addAttendee() {
      // check if the user is already attending
      const attending = this.event.attending.find(
        attendee => attendee._id === this.currentUser._id
      );
      if (isEmpty(attending)) {
      }
      this.isAttendant = true;
    },
    close() {
      this.email = '';
      this.$root.$emit('hide::modal', 'confirmModal');
    }
  },

  computed: {
    ...mapGetters(['currentUser']),
    eventTime() {
      let from = `${this.event.when.from.h}:${this.event.when.from.mm} ${
        this.event.when.from.A
      }`;
      let to = `${this.event.when.to.h}:${this.event.when.to.mm} ${
        this.event.when.to.A
      }`;
      return `${from} - ${to}`;
    },
    headerAttendees() {
      let attendees = this.event.attendees;
      let size = attendees ? Object.keys(attendees).length : 0;
      return size === 1 ? `${size} Attendee` : `${size} Attendees`;
    },
    contentAttendees() {
      let attendees = this.event.attendees;
      let size = attendees ? Object.keys(attendees).length : 0;
      return size === 1 ? `${size} PERSON IS ` : `${size} PEOPLE ARE `;
    }
  }
};
</script>

<style>
.info__list {
  justify-content: center;
}
</style>
