<template>
  <div class="wrapper">
    <navbar @showSideBar="showSideBar"/>
    <sidebar :isOpen="sidebarIsOpen"/>
    <main class="app-content" :class="{full: !sidebarIsOpen}">
      <router-view />
    </main>
    <div class="before-footer"></div>
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
  methods: {
    showSideBar () {
      this.sidebarIsOpen = !this.sidebarIsOpen;
    }
  }

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
