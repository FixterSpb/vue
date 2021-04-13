<template>
    <ul class="sidenav app-sidebar" :class="{open: isOpen}">
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

  /*.sidebar{*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  height: 100%;*/
  /*  top: 64px;*/
  /*  width: 200px;*/
  /*}*/

  /*.sidebar__menu{*/
  /*  width: 100%;*/
  /*}*/

  /*.sidebar__item{*/
  /*  display: block;*/
  /*  text-align: left;*/
  /*  width: 100%;*/
  /*  float: none;*/
  /*}*/


</style>
