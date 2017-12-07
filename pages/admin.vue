<template>
  <div>
    <nuxt-child/>
  </div>
</template>

<script>
export default {
  name: 'AdminRoot',
  layout: 'admin-default',
  middleware: 'admin-authenticated'
};
</script>
