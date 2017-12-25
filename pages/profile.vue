<template>
    <div>

      <section class="about">
        <div class="container">
          <form @submit.prevent="updateProfile" class="form-horizontal form-label-left">

            <div class="form-group">
              <div class="members__avatar" style="display:flex">
                  <img :src="user.profile_image" alt="" class="img-circle" height="72" width="72" style="margin: 0 auto">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Full Name</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input v-model="user.name" type="text" class="form-control" placeholder="Full Name">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Email</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input v-model="user.email" type="text" class="form-control" placeholder="Email">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Location </label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input v-model="user.location" type="text" class="form-control" placeholder="Location">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Position/Role</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input v-model="user.job_role" type="text" class="form-control" placeholder="Role">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Skills</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input v-model="skills" type="text" class="form-control" placeholder="Comma separated list of skills">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Github Profile</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input v-model="user.github" type="text" class="form-control" placeholder="Github Profile Link">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Twitter Profile</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input v-model="user.twitter" type="text" class="form-control" placeholder="Twitter Profile Link">
                <span class="fa fa-at form-control-feedback left"></span>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-4 offset-3">
                <button type="submit" class="btn btn--primary btn--block">Save</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import { pick } from 'lodash';

export default {
  name: 'ProfilePage',
  middleware: 'authenticated',
  data() {
    return {
      user: {}
    };
  },
  asyncData({ app, params, error }) {
    return app.$axios
      .$get(`/members/profile`)
      .then(res => {
        return { user: res.data };
      })
      .catch(e => {
        console.log('error', e.config);
        error({
          statusCode: e.status || 500,
          message: 'Profile not found'
        });
      });
  },
  methods: {
    updateProfile() {
      const changes = pick(this.user, [
        'name',
        'email',
        'location',
        'job_role',
        'github',
        'twitter',
        'skills'
      ]);
      console.log('updated profile', changes, tis.user);
      this.$axios
        .$put('/members/profile', changes)
        .then(response => {
          console.log('response', response);
          this.user = response.data;
        })
        .catch(e => {
          alert('Unable to update profile');
        });
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    skills: {
      get() {
        if (!this.user.skills) return '';

        return this.user.skills.join(',');
      },
      set(skills) {
        this.user.skills = skills.split(',');
      }
    }
  }
};
</script>

<style>

</style>
