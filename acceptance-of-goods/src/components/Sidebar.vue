<template>
    <ul class="sidenav app-sidebar blue lighten-4" :class="{open: isOpen}">
      <li class="sidenav__item"><a href="#">Sass</a></li>
      <li class="sidenav__item active"><a href="#">Components</a></li>
      <li class="sidenav__item"><a href="#">JavaScript</a></li>
    </ul>
</template>

<script>
export default {
  name: "Sidebar",
  props: [
    'isOpen'
  ]
}
</script>

<style scoped>

</style>
