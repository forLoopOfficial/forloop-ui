<template>
    <div>
      <!-- Hero -->
      <section class="hero hero--2">
          <div class="container">
              <h1 class="hero__title hero__title--2 text-center">Find a Meetup</h1>
          </div>
      </section>

      <b-tabs class="tab__section" nav-wrapper-class="d-flex">
          <div class="container">
              <!-- Tab contents -->
              <div class="tab-content">
                  <!-- Upcoming Meetups -->
                  <b-tab id="upcomingMeetups" class="tab-content__item" title="Upcoming Meetups">

                      <div class="outer-container">
                          <!-- Meeting Item -->
                          <div v-for="(upcomingEvent, index) in upcomingEvents" :key="index" class="meeting__item">
                              <div class="meeting__item__content">
                                  <div class="meeting__item__content__top">
                                      <nuxt-link :to="{ name: 'events-id', params: { id: upcomingEvent.url_slug }}" class="meeting__item__title">{{ upcomingEvent.title }}</nuxt-link>
                                      <p class="meeting__item__location">{{ upcomingEvent.location.name }}</p>
                                      <p class="meeting__item__date">{{ upcomingEvent.when.date_formatted}}</p>
                                  </div>

                                  <div v-if="upcomingEvent.hosts" class="meeting__item__host">
                                      <div class="meeting__item__host__avatar">
                                          <img :src="upcomingEvent.hosts[0].profile_image" alt="" class="img-circle inline-block" width="40" height="40">
                                      </div>
                                      <div class="meeting__item__host__caption">Hosted by {{ upcomingEvent.hosts[0].name }}</div>
                                  </div>
                              </div>
                              <a href="" class="meeting__item__resource">
                                  <span class="meeting__item__resource__text">Add to Calendar</span>
                                  <span class="meeting__item__resource__icon">
                                      <svg class="icon-calendar-o icon-ss"><use xlink:href="img/icons.svg#icon-calendar-o"></use></svg>
                                  </span>
                              </a>
                          </div>
                          <!-- Add new meetup -->
                          <div class="meeting__item meeting__item--dashed">
                              <div class="meeting__item__add text-center">
                                  <div class="meeting__item__icon">
                                      <svg class="icon-plus"><use xlink:href="img/icons.svg#icon-plus"></use></svg>
                                  </div>
                                  <div class="meeting__item__caption">Organize a Meetup</div>
                              </div>
                          </div>
                      </div>

                  </b-tab>
                  <!-- Archived Meetups -->
                  <b-tab id="archivedMeetups" class="tab-content__item" title="Archived Meetups">

                      <div class="outer-container">
                          <!-- Meeting Item -->
                          <div v-for="(archivedEvent, index) in archivedEvents" :key="index" class="meeting__item">
                              <div class="meeting__item__content">
                                  <div class="meeting__item__content__top">
                                      <nuxt-link :to="{ name: 'events-id', params: { id: archivedEvent.url_slug }}" class="meeting__item__title">{{ archivedEvent.title }}</nuxt-link>
                                      <p class="meeting__item__location">{{ archivedEvent.location.name }}</p>
                                      <p class="meeting__item__date">{{ archivedEvent.when.date_formatted}}</p>
                                  </div>

                                  <div v-if="archivedEvent.hosts" class="meeting__item__host">
                                      <div class="meeting__item__host__avatar">
                                          <img :src="archivedEvent.hosts[0].profile_image" alt="" class="img-circle inline-block" width="40" height="40">
                                      </div>
                                      <div class="meeting__item__host__caption">Hosted by {{ archivedEvent.hosts[0].name }}</div>
                                  </div>
                              </div>
                              <a v-if="archivedEvent.resourceUrl" :href="archivedEvent.resourceUrl" class="meeting__item__resource" target="_blank">
                                  <span class="meeting__item__resource__text">Download Resources</span>
                                  <span class="meeting__item__resource__icon">
                                      <svg class="icon-downloads icon-ss"><use xlink:href="img/icons.svg#icon-downloads"></use></svg>
                                  </span>
                              </a>
                              <a v-else class="meeting__item__resource" href="#">
                                  <span class="meeting__item__resource__text">No Resource</span>
                                  <span class="meeting__item__resource__icon">
                                      <svg class="icon-downloads icon-ss"><use xlink:href="img/icons.svg#icon-downloads"></use></svg>
                                  </span>
                              </a>
                          </div>
                      </div>

                  </b-tab>
              </div>
          </div>
      </b-tabs>

      <add-subscriber></add-subscriber>
    </div>
</template>


<script>
const today = new Date().getTime();
export default {
  name: 'MeetupsPage',
  data() {
    return {
      upcomingEvents: [],
      archivedEvents: []
    };
  },
  asyncData({ app }) {
    return app.$axios
      .$get(`/events`)
      .then(res => {
        const events = res.data;
        const upcoming = events.filter(event => event.when.date >= today);
        const archived = events.filter(event => event.when.date < today);
        return { upcomingEvents: upcoming, archivedEvents: archived };
      })
      .catch(e => {
        console.log('error', e.config);
        return {};
      });
  }
};
</script>

<style>

ul.nav-tabs{
  margin: 0 auto;
}

</style>
