<template>
  <nav class="sidebar blue lighten-3">
    <ul class="sidebar__menu left">
      <li class="sidebar__item"><a href="#">Sass</a></li>
      <li class="sidebar__item active"><a href="#">Components</a></li>
      <li class="sidebar__item"><a href="#">JavaScript</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style scoped>
  .sidebar{
    position: fixed;
    left: 0;
    height: 100%;
    top: 64px;
    width: 200px;
  }

  .sidebar__menu{
    width: 100%;
  }

  .sidebar__item{
    display: block;
    text-align: left;
    width: 100%;
    float: none;
  }


</style>