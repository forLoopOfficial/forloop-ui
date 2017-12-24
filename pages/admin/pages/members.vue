<template>

  <!-- page content -->
  <div class="">
    <h1>Members Page</h1>
    <div class="row">
      <div class="col-md-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Public Members</h2>
            <ul class="nav navbar-right panel_toolbox">
              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
              </li>
            </ul>
            <div class="clearfix"></div>
          </div>

          <div class="x_content">
            <div class="row">
              <div v-for="(member, key) in members" :key="key" class="col-md-4 col-sm-4 col-xs-12 profile_details">
                <div class="well profile_view">
                  <div class="col-sm-12">
                    <div class="left col-xs-7">
                      <h2>{{member.displayName}}</h2>
                    </div>
                    <div class="right col-xs-5 text-center">
                      <img :src="member.photoUrl" alt="" class="img-circle img-responsive" width="48" height="48">
                    </div>
                  </div>
                  <div class="col-xs-12 bottom text-center">
                    <button @click="removeMember(key)" class="btn btn-xs btn-danger" name="button">X</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /page content -->

</template>

<script>
export default {
  name: 'MembersPage',
  // lifecycle methods

  data() {
    return {
      members: []
    };
  },
  methods: {
    changeMembersDescription() {}
  }
};
</script>

<style>

</style>
