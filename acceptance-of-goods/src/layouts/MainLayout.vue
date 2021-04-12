<template>
  <div class="wrapper">
    <navbar />
    <sidebar :is-open="sidebarIsOpen"/>
    <main class="app-content" :class="{full: !sidebarIsOpen}">
      <router-view />
    </main>
    <footer class="purple darken-1"></footer>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
export default {
  name: "MainLayout",
  data: () => ({
    sidebarIsOpen: true
  }),
  components: {Sidebar, Navbar},

}
</script>

<style scoped>
  .wrapper{
    min-height: 100vh;
    min-width: 700px;
  }

  main{
    margin-left: 200px;
  }
</style>
