<template>
  <div class="wrapper">
    <navbar />
    <sidebar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
export default {
  name: "MainLayout",
  components: {Sidebar, Navbar}
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