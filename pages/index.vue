<template>
    <div>
      <!-- Hero -->
      <section class="hero hero--1">
          <div class="container">
              <!-- Grid container -->
              <div class="outer-container">
                  <div class="hero__left">
                      <h1 class="hero__title hero__title--1">A community of passionate software developers and enthusiasts across Africa.</h1>
                  </div>
                  <div class="hero__right">
                      <!-- Text EDITOR -->

                      <div class="text-editor">
                          <!-- Text Editor Header -->
                          <div class="text-editor__header">
                              <div class="text-editor__header__item text-editor__header__item--close"></div>
                              <div class="text-editor__header__item text-editor__header__item--minimize"></div>
                              <div class="text-editor__header__item text-editor__header__item--full-screen"></div>
                          </div>
                          <!-- Text Editor Tab Tile -->
                          <div class="text-editor__tile">
                              <div class="text-editor__tile__item active">nextmeetup.html</div>
                              <div class="text-editor__tile__item">style.css</div>
                              <div class="text-editor__tile__item">app.js</div>
                          </div>
                          <div class="text-editor__body">

                              <!-- Text Editor Code Content -->
                              <code class="code">
                                  <div class="block">
                                      <span class="line-number">1</span>&lt;!DOCTYPE html&gt;
                                  </div>
                                  <div class="block">
                                      <span class="line-number">2</span>&lt;<span class="tag">html</span> land=“en”&gt;
                                  </div>
                                  <div class="block">
                                      <span class="line-number">3</span>&lt;<span class="tag">head</span>&gt;
                                  </div>
                                  <div class="block">
                                      <span class="line-number block__indent-1">4</span>&lt;<span class="tag">meta</span> charset=“UTF=8”&gt;
                                  </div>
                                  <div class="block">
                                      <span class="line-number block__indent-1">5</span>&lt;<span class="tag">title</span>&gt; Upcoming Event &lt;/<span class="tag">title</span>&gt;
                                  </div>
                                  <div class="block">
                                      <span class="line-number">6</span>&lt;/<span class="tag">head</span>&gt;
                                  </div>
                                  <div class="block">
                                      <span class="line-number">7</span>&lt;<span class="tag">body</span>&gt;
                                  </div>
                                  <div class="block">
                                      <span class="line-number block__indent-1">8</span>&lt;<span class="tag">ul</span>&gt;
                                  </div>
                                  <div class="block">
                                      <span class="line-number block__indent-2">9</span>&lt;<span class="tag">li</span>&gt;<span class="context">Theme: Developer’s Unite</span>&lt;/<span class="tag">li</span>&gt;
                                  </div>
                                  <div class="block">
                                      <span class="line-number block__indent-2">10</span>&lt;<span class="tag">li</span>&gt;<span class="context">Location: CCHub Building, Yaba Lagos</span>&lt;/<span class="tag">li</span>&gt;
                                  </div>
                                  <div class="block">
                                      <span class="line-number block__indent-2">11</span>&lt;<span class="tag">li</span>&gt;<span class="context">Time: 28 Sep, 11 PM</span>&lt;/<span class="tag">li</span>&gt;
                                  </div>
                                  <div class="block">
                                      <span class="line-number block__indent-1">12</span>&lt;/<span class="tag">ul</span>&gt;
                                  </div>
                                  <div class="block">
                                      <span class="line-number">13</span>&lt;/<span class="tag">body</span>&gt;
                                  </div>
                                  <div class="block">
                                      <span class="line-number">14</span>&lt;/<span class="tag">html</span>&gt;
                                  </div>
                              </code>

                          </div>
                      </div>

                  </div>
              </div>
          </div>
      </section>

      <!-- Section -->
      <section class="reasons">
          <div class="container">
              <h2 class="section__title">You should join us at our next meet-up</h2>
              <!-- Grid container -->
              <div class="outer-container">
                  <!-- Reason item -->
                  <div class="reasons__item">
                      <div class="reasons__item__number">
                          <div class="reasons__item__value">1</div>
                      </div>
                      <div class="reasons__item__icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="46px" viewBox="0 0 32 46" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-620.000000, -711.000000)" fill="#F63BA8"><g transform="translate(480.000000, 692.000000)"><g transform="translate(139.000000, 19.000000)"><path d="M27.231 28.088C25.816 29.58 25.247 31.519 25.021 32.889L24.882 33.72 9.118 33.711 8.979 32.883C8.752 31.526 8.186 29.598 6.783 28.114L6.718 28.039C3.066 24.974 0.999 20.561 0.999 15.88 0.999 7.125 8.175 0.002 16.995 0.002 25.821 0.002 33.001 7.125 33.001 15.88 33.001 20.58 30.899 25.026 27.231 28.088L27.231 28.088ZM16.995 1.986C9.277 1.986 2.998 8.219 2.998 15.88 2.998 20.004 4.832 23.892 8.031 26.546 8.125 26.613 8.211 26.71 8.278 26.797 9.72 28.341 10.433 30.212 10.785 31.729L23.213 31.735C23.572 30.176 24.311 28.249 25.824 26.678L25.905 26.602C29.144 23.918 31.002 20.01 31.002 15.88 31.002 8.219 24.719 1.986 16.995 1.986L16.995 1.986ZM10.004 37.25L23.996 37.25C24.548 37.25 24.995 37.694 24.995 38.242 24.995 38.789 24.548 39.233 23.996 39.233L10.004 39.233C9.453 39.233 9.005 38.789 9.005 38.242 9.005 37.694 9.453 37.25 10.004 37.25L10.004 37.25ZM12.37 43.035L21.63 43.035C22.182 43.035 22.629 43.479 22.629 44.027 22.629 44.575 22.182 45.019 21.63 45.019L12.37 45.019C11.819 45.019 11.371 44.575 11.371 44.027 11.371 43.479 11.819 43.035 12.37 43.035L12.37 43.035Z"/></g></g></g></g></svg>
                      </div>
                      <h3 class="reasons__item__title">Are you a tech professional?</h3>
                      <p class="reasons__item__content">With a membership that boasts an interesting mix of professions, a forLoop meet up is a great place to do some networking.</p>
                  </div>
                  <!-- Reason item -->
                  <div class="reasons__item">
                      <div class="reasons__item__number">
                          <div class="reasons__item__value">2</div>
                      </div>
                      <div class="reasons__item__icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="46px" viewBox="0 0 32 46" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-620.000000, -711.000000)" fill="#F63BA8"><g transform="translate(480.000000, 692.000000)"><g transform="translate(139.000000, 19.000000)"><path d="M27.231 28.088C25.816 29.58 25.247 31.519 25.021 32.889L24.882 33.72 9.118 33.711 8.979 32.883C8.752 31.526 8.186 29.598 6.783 28.114L6.718 28.039C3.066 24.974 0.999 20.561 0.999 15.88 0.999 7.125 8.175 0.002 16.995 0.002 25.821 0.002 33.001 7.125 33.001 15.88 33.001 20.58 30.899 25.026 27.231 28.088L27.231 28.088ZM16.995 1.986C9.277 1.986 2.998 8.219 2.998 15.88 2.998 20.004 4.832 23.892 8.031 26.546 8.125 26.613 8.211 26.71 8.278 26.797 9.72 28.341 10.433 30.212 10.785 31.729L23.213 31.735C23.572 30.176 24.311 28.249 25.824 26.678L25.905 26.602C29.144 23.918 31.002 20.01 31.002 15.88 31.002 8.219 24.719 1.986 16.995 1.986L16.995 1.986ZM10.004 37.25L23.996 37.25C24.548 37.25 24.995 37.694 24.995 38.242 24.995 38.789 24.548 39.233 23.996 39.233L10.004 39.233C9.453 39.233 9.005 38.789 9.005 38.242 9.005 37.694 9.453 37.25 10.004 37.25L10.004 37.25ZM12.37 43.035L21.63 43.035C22.182 43.035 22.629 43.479 22.629 44.027 22.629 44.575 22.182 45.019 21.63 45.019L12.37 45.019C11.819 45.019 11.371 44.575 11.371 44.027 11.371 43.479 11.819 43.035 12.37 43.035L12.37 43.035Z"/></g></g></g></g></svg>
                      </div>
                      <h3 class="reasons__item__title">Are you considering a career switch to tech?</h3>
                      <p class="reasons__item__content">Considering the switch to a new career can be daunting but attending meet-ups like forLoop’s allows you to gently immerse yourself into your chosen career before making the big leap.</p>
                  </div>
                  <!-- Reason item -->
                  <div class="reasons__item">
                      <div class="reasons__item__number">
                          <div class="reasons__item__value">3</div>
                      </div>
                      <div class="reasons__item__icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="46px" viewBox="0 0 32 46" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-620.000000, -711.000000)" fill="#F63BA8"><g transform="translate(480.000000, 692.000000)"><g transform="translate(139.000000, 19.000000)"><path d="M27.231 28.088C25.816 29.58 25.247 31.519 25.021 32.889L24.882 33.72 9.118 33.711 8.979 32.883C8.752 31.526 8.186 29.598 6.783 28.114L6.718 28.039C3.066 24.974 0.999 20.561 0.999 15.88 0.999 7.125 8.175 0.002 16.995 0.002 25.821 0.002 33.001 7.125 33.001 15.88 33.001 20.58 30.899 25.026 27.231 28.088L27.231 28.088ZM16.995 1.986C9.277 1.986 2.998 8.219 2.998 15.88 2.998 20.004 4.832 23.892 8.031 26.546 8.125 26.613 8.211 26.71 8.278 26.797 9.72 28.341 10.433 30.212 10.785 31.729L23.213 31.735C23.572 30.176 24.311 28.249 25.824 26.678L25.905 26.602C29.144 23.918 31.002 20.01 31.002 15.88 31.002 8.219 24.719 1.986 16.995 1.986L16.995 1.986ZM10.004 37.25L23.996 37.25C24.548 37.25 24.995 37.694 24.995 38.242 24.995 38.789 24.548 39.233 23.996 39.233L10.004 39.233C9.453 39.233 9.005 38.789 9.005 38.242 9.005 37.694 9.453 37.25 10.004 37.25L10.004 37.25ZM12.37 43.035L21.63 43.035C22.182 43.035 22.629 43.479 22.629 44.027 22.629 44.575 22.182 45.019 21.63 45.019L12.37 45.019C11.819 45.019 11.371 44.575 11.371 44.027 11.371 43.479 11.819 43.035 12.37 43.035L12.37 43.035Z"/></g></g></g></g></svg>
                      </div>
                      <h3 class="reasons__item__title">Are you a student?</h3>
                      <p class="reasons__item__content">We constantly have industry veterans and leaders come through to have talks and discussions in an informal setting and this always proves to be a great spot to meet mentors.</p>
                  </div>
              </div>
          </div>
      </section>

      <!-- Jumbotron -->
      <section class="jumbotron jumbotron--overlay" style="background-image: url('img/forloop-2.jpg');">
          <div class="container overlay-fix">
              <h4 class="jumbotron__title">Want to be a part of the forLoop Community?</h4>
              <div class="jumbotron__action">
                  <router-link to="/meetups" class="btn btn--primary jumbotron__btn">Attend a Meetup</router-link>
                  <router-link to="/members" class="btn btn--primary jumbotron__btn">Become a Member</router-link>
              </div>
          </div>
      </section>

      <!-- Sponsors Section -->
      <section class="sponsors">
          <div class="container">
              <h5 class="sponsors__title">Our Sponsors</h5>
              <div class="sponsors__list">
                  <div v-for="row in rows" :key="row" class="sponsors__list__row sponsors__list__row--1">
                      <div v-for="(sponsor, index) in getRowData(row)" :key="index" class="sponsors__list__item">
                          <a :href="sponsor.link" class="sponsors__list__link sponsors__list__link--capture" target="_blank">
                              <img :src="sponsor.image_url" alt="" class="sponsors-image__responsive">
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      sponsorsPerRow: 5,
      sponsors: [],
      rows: 0
    };
  },
  asyncData({ app }) {
    return app.$axios
      .$get(`/sponsors`)
      .then(res => {
        const rows = Math.ceil(res.data.length / 5); // allow only five items per row
        return { sponsors: res.data, rows };
      })
      .catch(e => {
        console.log('error', e.config);
        return {};
      });
  },
  methods: {
    getRowData(row) {
      const start = (row - 1) * this.sponsorsPerRow;
      const end = start + this.sponsorsPerRow;
      console.log(start, end);
      return this.sponsors.slice(start, end);
    }
  }
};
</script>

<style>
</style>
