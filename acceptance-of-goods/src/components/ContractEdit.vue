<template>
  <div class="container">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <input id="contract_number" type="text" class="validate">
          <label for="contract_number">Номер контракта</label>
        </div>
        <div class="input-field col s6">
          <input type="text" class="datepicker" id="contract_date">
          <label for="contract_date">Дата заключения</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="contract_name" type="text" class="validate">
          <label for="contract_name">Название</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea name="contract_description" id="contract_description" class="materialize-textarea"></textarea>
          <label for="contract_description">Описание</label>
        </div>
      </div>

      <ContractSpecification />
    </form>

  </div>
</template>

<script>
import ContractSpecification from "@/components/ContractSpecification";
export default {
name: "Contract",
  components: {ContractSpecification}
}
</script>

<style scoped>
  .row{
    display: flex;
  }
</style>