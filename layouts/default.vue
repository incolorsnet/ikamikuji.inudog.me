<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  mounted() {
    this.isSmartPhone()
  },
  methods: {
    ...mapActions(['isSmartPhone'])
  }
}
</script>
