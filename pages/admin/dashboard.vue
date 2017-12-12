<template>

  <!-- page content -->
  <div class="animated">
    <b-row>
      <b-col cols="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-3 clearfix">
            <i class="fa fa-cogs bg-primary p-3 font-2xl mr-3 float-left"></i>
            <div class="h5 text-primary mb-0 mt-2">{{statistics.totalEventCount}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Total Events</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-3 clearfix">
            <i class="fa fa-laptop bg-info p-3 font-2xl mr-3 float-left"></i>
            <div class="h5 text-info mb-0 mt-2">{{statistics.currentMonthEventsCount}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Total Events This Month</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-3 clearfix">
            <i class="fa fa-moon-o bg-warning p-3 font-2xl mr-3 float-left"></i>
            <div class="h5 text-warning mb-0 mt-2">{{statistics.highestAttendanceCount}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Highest Attendance</div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
  <!-- /page content -->
</template>


<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      statistics: {}
    };
  },
  asyncData({ app }) {
    return app.$axios
      .$get(`/stats`)
      .then(res => {
        return { statistics: res.data };
      })
      .catch(e => {
        console.log('error', e.response);
        return {};
      });
  }
};
</script>

<style>

</style>
