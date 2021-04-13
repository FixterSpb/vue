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
              @change="commit"
              autofocus
          >
          <label for="contract_number">Номер контракта</label>
        </div>
        <div class="input-field col s6">
          <input
              type="date"
              class="datepicker"
              id="contract_date"
              v-model="contract.date"
              @change="commit"
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
              v-model="name"
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
              v-model="description"
          ></textarea>
          <label for="contract_description">Описание</label>
        </div>
      </div>

      <ContractSpecification
          v-if="!(name.trim().length < 3 || !date || number.length < 3)"
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
export default {
name: "Contract",
  components: {ContractSpecification},
  data: () => ({
    number: '',
    date: null,
    name: '',
    description: '',
    errors: {},
    contract: {},
  }),
  methods: {
    addContract(){
      // const goods = this.$options.components.ContractSpecification.data().goods;
      // if(this.name.trim().length < 3 || !this.date || this.number.length < 3){
      //   return
      // }
      //
      // const contract = {
      //   number: this.number,
      //   date: this.date,
      //   name: this.name,
      //   description: this.description,
      //   goods: this.$options.components.ContractSpecification.data().goods
      // }
      // console.log(contract)
      this.$store.commit('newContract', {number: 0, name: 'Новый контракт', date: new Date(2021,1,11)})
      console.log(this.$store.state.newContract)
    },
    commit(){
      this.$store.commit('newContract', this.contract);
      console.log(this.$store.state.newContract);
    }
  },
  mounted() {
    console.log(this.$store.state.newContract);
    this.contract = this.$store.state.newContract ? this.$store.state.newContract.clone() : {};
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
