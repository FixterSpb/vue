<template>
    <form class="container col s12">
      <div class="row">
        <div class="input-field col s6">
          <input
              id="contract_number"
              type="text"
              minlength="3"
              required
              class="validate"
              v-model="contract.number"
              autofocus
          >
          <label for="contract_number">Номер контракта</label>
        </div>
        <div class="input-field col s6">
          <input
              type="date"
              class="validate datepicker"
              id="contract_date"
              required
              v-model="contract.date"
          >
          <label for="contract_date">Дата заключения</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input
              id="contract_name"
              type="text"
              class="validate"
              minlength="3"
              required
              v-model="contract.name"
          >
          <label for="contract_name">Название</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea
              name="contract_description"
              id="contract_description"
              class="materialize-textarea"
              v-model="contract.description"
          ></textarea>
          <label for="contract_description">Описание</label>
        </div>
      </div>

      <ContractSpecification
          v-if="!(contract.name.trim().length < 3 || !contract.date || contract.number.length < 3)"
          :goods="contract.goods"
      />
      <div class="clear">
      <button class="btn waves-effect waves-light right" type="submit" @click.prevent="addContract">Добавить
        <i class="material-icons right">send</i>
      </button>
      </div>
    </form>

</template>

<script>
import ContractSpecification from "@/components/contract/ContractSpecification";
import {validateContract} from "@/helpers/validators";

export default {
  name: "Contract",
  components: {ContractSpecification},
  data: () => ({
    errors: {},
    contract: {
      number: '',
      date: "",
      name: '',
      description: '',
      goods : [ ],
    },
  }),
  methods: {
    addContract() {
      if (validateContract(this.contract)){
        const contracts = JSON.parse(localStorage.getItem('contracts')) || [];

        if (!this.contract.id || !contracts[this.contract.id]){
          this.contract.id = contracts.length;
          contracts.push(this.contract)
        }else{
          contracts[this.contract.id] = this.contract
        }

        localStorage.setItem('contracts', JSON.stringify(contracts));
        console.log(contracts);
        console.log('Валидация прошла успешно!', this.contract);
      }
      console.log('Валидация не прошла!', this.contract);
    }
  },
  mounted() {
    M.updateTextFields();
  }
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
