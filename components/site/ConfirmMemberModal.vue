<template>

  <!-- Component content -->
  <b-modal :closeOnBackdrop='false'>
    <div slot="modal-header">
      <h4 class="modal-title" id="myModalLabel" style="text-align:center">Confirm Member Details</h4>
    </div>
    <div slot="modal-body">
      <form @submit.prevent="confirmMember" class="form-horizontal form-label-left">

        <div class="form-group">
          <div class="members__avatar" style="display:flex">
              <img :src="user.photoUrl" alt="" class="img-circle" height="72" width="72" style="margin: 0 auto">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-3 col-sm-3 col-xs-12">Full Name</label>
          <div class="col-md-9 col-sm-9 col-xs-12">
            <input v-model="user.displayName" type="text" class="form-control" placeholder="Full Name">
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
            <input v-model="user.role" type="text" class="form-control" placeholder="Role">
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
            <input v-model="user.github_link" type="text" class="form-control" placeholder="Github Profile Link">
          </div>
        </div>
        <div class="form-group has-feedbacl">
          <label class="control-label col-md-3 col-sm-3 col-xs-12">Twitter Profile</label>
          <div class="col-md-9 col-sm-9 col-xs-12">
            <input v-model="user.twitter_link" type="text" class="form-control has-feedback-left col-md-10" placeholder="Twitter Profile Link">
            <span class="fa fa-at form-control-feedback left"></span>
          </div>
        </div>

      </form>
    </div>
    <div slot="modal-footer">
      <button @click="save" type="button" class="btn btn-primary">Save changes</button>
    </div>
  </b-modal>
  <!-- /Component content -->

</template>


<script>
export default {
  name: 'ConfirmMember',

  props: ['show', 'user'],
  watch: {
    show: function(val, old) {
      if (val) this.$children[0].show();
    }
  },
  methods: {
    confirmMember() {},
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
    save() {
      // this.user.skills = this.skills.split(",");
      this.user.github_link = this.parseLink(
        this.user.github_link,
        'github.com'
      );
      this.user.twitter_link = this.parseLink(
        this.user.twitter_link,
        'twitter.com'
      );
      // membersRef
      //   .child(this.user.uid)
      //   .set(this.user)
      //   .then(() => {
      //     if (this.user.email) {
      //       let formData = new FormData();
      //       formData.append('email', this.user.email);
      //       let url = `/api/subscribe`;
      //       this.$http
      //         .post(url, formData)
      //         .then(res => {
      //           console.log(res);
      //         })
      //         .catch(err => {
      //           console.log(err);
      //         });
      //     }
      //   });
      this.close();
    },
    close() {
      this.$children[0].hide();
    }
  },
  computed: {
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
