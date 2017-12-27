<template>

<div class="">
  <div :class="{show: show, hide: !show }" class="error">
    {{errorMessage}}
  </div>
  <div class="icon">
    <span class="fa fa-user"></span>
  </div>
  <div class="inner">
    <input v-model="twitterHandle" class="twitter_input" placeholder="Add by Twitter handle" type="text">
    <button @click="addContributor" class="btn btn-xs btn-primary" type="button">Add</button>
  </div>
</div>

</template>


<script>
export default {
  name: 'AddContributor',
  // lifecycle methods

  components: {},
  data() {
    return {
      errorMessage: 'Enter a valid twitter handle',
      contributor: {},
      twitterHandle: '',
      show: false
    };
  },
  methods: {
    addContributor() {
      if (this.twitterHandle === '') {
        this.show = true;
        return;
      }
      this.show = false;
      // Not intuitive this also calls the appropriate method based on response
      // Hopefully change later
      this.getHandleDetails(this.twitterHandle);
    },
    getHandleDetails(handle) {
      let url = `/miscs/twitterprofile/${handle}`;
      this.$axios
        .$get(url)
        .then(res => {
          if (res.error) {
            this.showErrors(res.error);
            return;
          }
          this.emitContributor(res.data);
        })
        .catch(e => {
          if (e.response && e.response.status === 400) {
            this.showErrors(e.response.data.error);
          }
        });
    },
    emitContributor(contributor) {
      let profileImage = contributor.profile_image_url_https.replace(
        /_normal/,
        ''
      );
      this.contributor = {
        name: contributor.name,
        screen_name: contributor.screen_name,
        description: contributor.description,
        profile_image: profileImage,
        twitter_url: `https://twitter.com/${contributor.screen_name}`
      };
      this.$emit('add', this.contributor);
      this.twitterHandle = '';
    },
    showErrors(errors) {
      this.errorMessage = errors[0].message;
      this.show = true;
    }
  }
};
</script>

<style>
.error {
  color: #f00;
}

.hide {
  display: none;
}

,
.show {
  display: block;
}

.inner {
  margin-left: 61px;
}

.twitter_input {
  border: none;
  border-bottom: dotted rgba(0, 0, 0, 0.2) 3px;
  display: inline-block;
  font-size: 2.10588em;
  line-height: 1.64706em;
  margin-bottom: 0.82353em;
  width: 80%;
  height: 48px;
  color: #000;
  background-color: transparent;
}
</style>
