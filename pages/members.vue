<template>
    <div>
      <!-- About Section -->
      <section class="about">
          <div class="container">
              <h1 class="about__title">forLoop Members</h1>
              <p class="about__content">
                {{membersPage.description}}
              </p>
              <div class="section__form">
                  <form @submit.prevent action="" class="form">
                      <div class="outer-container">
                          <div class="input-section position-relative">
                              <input v-model="query" type="text" class="form__input form__input--iconPresent" placeholder="Search for forLoop Members" />
                              <div class="input-section__icon position-absolute">
                                  <svg class="icon-ios-search-strong icon-md"><use xlink:href="img/icons.svg#icon-ios-search-strong"></use></svg>
                              </div>
                          </div>
                          <div class="submit-button">
                              <button type="submit" class="btn btn--primary btn--block">Search</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </section>

      <!-- Members Section -->
      <section class="members">
          <div class="container">
              <!-- Members List -->
              <div class="members__list" style="overflow: auto;">
                  <!-- Members List Item -->
                  <div @click="becomeMember" v-if="!currentUser" class="members__list__item add-member text-center">
                      <div class="members__item__container">
                          <div class="members__icon">
                              <svg class="icon-adduser icon-lg"><use xlink:href="img/icons.svg#icon-adduser"></use></svg>
                          </div>
                          <div class="members__text">Become a Member</div>
                      </div>
                  </div>

                  <!-- Members List Item -->
                  <div v-for="(member, index) in members" :key="index" class="members__list__item text-center">
                      <div class="members__list__item__top">
                          <div class="members__avatar">
                              <img :src="member.photoUrl" alt="" class="img-circle" height="72" width="72">
                          </div>
                          <div class="members__name">{{member.displayName}}</div>
                          <div class="members__location">{{member.location}}</div>
                          <div class="members__social">
                              <a :href="parseLink(member.github_link, 'github.com')" class="members__social__item" target="_blank">
                                  <svg class="icon-social-github icon-md"><use xlink:href="img/icons.svg#icon-social-github"></use></svg>
                              </a>
                              <a :href="parseLink(member.twitter_link, 'twitter.com')" class="members__social__item" target="_blank">
                                  <svg class="icon-social-twitter icon-md"><use xlink:href="img/icons.svg#icon-social-twitter"></use></svg>
                              </a>
                          </div>
                      </div>
                      <div class="members__list__item__bottom">
                          <div class="members__title">{{member.role}}</div>
                          <div class="members__skilllist">{{ displaySkills(member.skills) }}</div>
                      </div>
                  </div>
                  <no-ssr>
                    <infinite-loading force-use-infinite-wrapper="true" @infinite="loadMore" ref="infiniteLoader"></infinite-loading>
                  </no-ssr>
              </div>
          </div>
      </section>

      <add-subscriber></add-subscriber>
    </div>
</template>


<script>
import Algolia from 'algoliasearch';
import { debounce, isEmpty } from 'lodash';
import { mapActions, mapGetters } from 'vuex';

import InfiniteLoading from 'vue-infinite-loading';

const algoliaClient = new Algolia(
  process.env.algoliaAppId,
  process.env.algoliaSearchKey
);
export default {
  name: 'MembersPage',
  components: {
    InfiniteLoading
  },
  beforeCreate() {
    this.membersSearch = algoliaClient.initIndex('members');
    this.membersSearch
      .search({
        query: '',
        page: 0,
        hitsPerPage: 8
      })
      .then(results => {
        this.members = results.hits;
      })
      .catch(err => console.log(err));
  },

  data() {
    return {
      membersPage: {},
      member: {},
      members: [],
      query: '',
      search: {
        query: '',
        page: 0,
        hitsPerPage: 16
      }
    };
  },
  methods: {
    ...mapActions(['firebaseLogin']),
    displaySkills(skills) {
      if (skills) return skills.join(', ');
      return '';
    },
    parseLink(token, type) {
      if (token === undefined) return;

      let url = '';
      if (token.indexOf(type) === 0 || token.indexOf('www') === 0) {
        url = `https://${token}`;
      } else if (token.indexOf(type) === -1) {
        url = `https://${type}/${token}`;
      } else {
        url = token;
      }
      return url;
    },
    searchMembers: debounce(function() {
      return this.membersSearch
        .search(this.search)
        .then(results => {
          // replace content of array
          this.members = results.hits;
          this.$refs.infiniteLoader.$emit('$InfiniteLoading:reset');
        })
        .catch(err => {
          console.log(err);
        });
    }, 500),
    becomeMember() {
      this.query = '';
      return this.firebaseLogin()
        .then(() => {
          this.$toast.success('Succesfully registered');
          this.$router.push('/profile');
        })
        .catch(function(error) {
          console.log(error);
          this.$toast.error(`${error.message}`);
        });
    },
    loadMore($state) {
      this.search.page += 1;
      return this.membersSearch
        .search(this.search)
        .then(results => {
          // needed to trigger vue update
          this.members = this.members.concat(results.hits);
          if (isEmpty(results.hits)) {
            $state.complete();
          } else {
            $state.loaded();
          }
        })
        .catch(err => {
          console.log(err);
          $state.complete();
        });
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  watch: {
    query(query) {
      // reset paramemeter during search
      this.search = {
        query,
        page: 0,
        offset: 0,
        hitsPerPage: 8
      };
      this.searchMembers();
    }
  }
};
</script>

<style>

</style>
