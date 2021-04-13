<template>
    <component :is="layout">
      <router-view/>
    </component>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'main') + '-layout'
    }
  },
  components: {
    MainLayout
  }
}
</script>
<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import "@/assets/style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
