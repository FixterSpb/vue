<template>
    <h3 class="class">Новый контракт</h3>
  <ContractEdit />
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MainLayout from "@/layouts/MainLayout";
import ContractEdit from "@/components/ContractEdit";

export default {
  name: 'Home',
  components: {
    ContractEdit,
    MainLayout,
    HelloWorld
  }
}
</script>
