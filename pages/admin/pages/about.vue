<template>

  <!-- page content -->
  <div class="animated fadeIn">
    <h1>About Page</h1>
    <div class="row">
      <div class="col-md-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Change About Page Description</h2>
            <ul class="nav navbar-right panel_toolbox">
              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
              </li>
            </ul>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Upload Images</h2>
            <ul class="nav navbar-right panel_toolbox">
              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
              </li>
            </ul>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <form class="" @submit.prevent="uploadImages">
              <div class="row">
                <div class="col-md-6">
                  <input type="file" class="form-control" placeholder="Upload Images" multiple>
                </div>
                <div class="col-md-3">
                  <button type="submit" class="btn btn-primary" :disabled="uploadingImages">Upload Images</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Image Gallery</h2>
            <!-- <button type="button" name="button" @click="openAddSponsorModal">Add Sponsor</button> -->
            <ul class="nav navbar-right panel_toolbox">
              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
              </li>
            </ul>
            <div class="clearfix"></div>
          </div>

          <div class="x_content">
            <div class="row">
              <div v-for="(image, key) in about_page.images" class="col-md-55">
                <div class="thumbnail">
                  <div class="image view view-first">
                    <img style="width: 100%; display: block;" :src="image.image_url" alt="image" />
                    <div class="mask">
                      <p>{{ image.order }}</p>
                      <div class="tools tools-bottom">
                        <a :href="image.link" target="_blank"><i class="fa fa-link"></i></a>
                        <a href=""><i class="fa fa-pencil"></i></a>
                        <a @click="removeImage(key)"><i class="fa fa-times"></i></a>
                      </div>
                    </div>
                  </div>
                  <div class="caption">
                    <p></p>
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
  name: 'AboutPage',
  // lifecycle methods
  data() {
    return {
      updatingDescription: false,
      uploadingImages: false,
      imageFiles: [],
      about_page: {
        images: []
      }
    };
  },
  methods: {
    uploadImages() {
      this.uploadingImages = true;
    }
  }
};
</script>

<style>

</style>
