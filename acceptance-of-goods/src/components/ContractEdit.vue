<template>
    <form class="container col s12">
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
      <div class="clear">
      <button class="btn waves-effect waves-light right" type="submit" name="action">Добавить
        <i class="material-icons right">send</i>
      </button>
      </div>
    </form>

</template>

<script>
import ContractSpecification from "@/components/ContractSpecification";
export default {
name: "Contract",
  components: {ContractSpecification}
}
</script>

<style scoped>
  .container {
    width: 90%;
  }
  .clear {
    padding: 20px;
  }
</style>
