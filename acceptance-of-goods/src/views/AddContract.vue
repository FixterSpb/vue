<template>
    <h3 class="class">Новый контракт</h3>
  <ContractEdit />
</template>

<script>
import ContractEdit from "@/components/contract/ContractEdit";

export default {
  name: 'Home',
  components: {
    ContractEdit,
  }
}
</script>
