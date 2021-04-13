<template>
  <nav class="navbar blue lighten-1">
    <div class="nav-wrapper">
      <a href="#" class="left" @click.prevent="$emit('showSideBar')"><i class="material-icons">dehaze</i></a>
      <ul id="nav-mobile" class="right">
        <li><a href="#">Sass</a></li>
        <li><a href="#">Components</a></li>
        <li><a href="#">JavaScript</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
name: "Navbar"
}
</script>

<style scoped>
  .navbar{
    position: relative;
    z-index: 1;
    padding-left: 20px;
    padding-right: 20px;
  }
</style>