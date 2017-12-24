<template>
  <b-card :title="sponsor.name"
        :img-src="sponsor.image_url"
        :img-alt="sponsor.name"
        img-top
        tag="article"
        style="width: 10rem;"
        class="mb-2">
    <b-button href="#" variant="primary">Edit</b-button>
  </b-card>
</template>

<script>
export default {
  name: 'Sponsor',
  // lifecycle methods

  props: ['sponsor'],
  methods: {}
};
</script>

<style>

</style>
