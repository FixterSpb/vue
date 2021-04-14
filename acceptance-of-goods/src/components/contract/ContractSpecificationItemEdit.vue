<template>
  <tr>
    <td class="center">{{ number }}</td>
    <td>
      <input
          :id="'name-' + number"
          class='validate name'
          :class="{invalid: errors.name}"
          type="text"
          minlength="3"
          required
          v-model="good.name"
          @change="validate"
      ></td>
    <td class="center">
      <select v-model="good.unit">
        <option
            v-for="(unit, idx) of units"
            :value="unit"
        >{{ unit }}</option>
      </select>
    </td>
    <td
        class="center"
    >
      <select v-model="good.NDS">
        <option
            v-for="(tax, idx) in taxes"
            :value="tax"
        >{{ tax }}</option>
      </select>
    </td>
    <td
        class="center"
    >{{ formatCurrency(priceWithoutNDS) }}</td>
    <td
        class="center"
    >{{ formatCurrency(sumNDS) }}
    </td>
    <td
        class="center"
    ><input
        type="number"
        min="0.01"
        step="0.01"
        required
        class="validate center"
        v-model="good.price"
        lang="ru-RU"
        @change="validate"
    ></td>
    <td
        class="center"
    ><input
        type="number"
        min="1"
        step="1"
        required
        lang="ru-RU"
        class="validate center"
        v-model="good.quantity"
        @change="validate"
    ></td>
    <td
        class="center"
    >{{ formatCurrency(priceWithoutNDS * good.quantity) }}</td>
    <td class="center">{{ formatCurrency(sumNDS * good.quantity) }}</td>
    <td class="center">{{ formatCurrency(good.price * good.quantity) }}</td>
    <td class="center">
      <a href=""
        @click.prevent="deleteGood"
    ><i class="material-icons">cancel</i></a></td>
  </tr>
  <tr v-if="Object.keys(errors).length > 0">
    <td />
    <td colspan="11">
      <small class="error"  v-for="err of errors">* {{ err }}</small>
    </td>
  </tr>
</template>

<script>

import {formatFloat} from '@/formats/format';
import {validateContractSpecificationItem} from "@/helpers/validators";


export default {
  name: "ContractSpecificationItem",

  props: {
    number: Number,
    good: Object,
    units: Array,
    taxes: Array
  },
  data: () => ({
    errors: {}
  }),
  methods: {
    formatCurrency(value){
      return formatFloat(value);
    },
    validate(){
      this.errors = validateContractSpecificationItem(this.good);
      console.log('error: ', this.errors, 'Размер error: ', Object.keys(this.errors).length)
    },
    deleteGood(){
      this.$emit('deleteGood', this.number - 1)
    }
  },

  computed: {
    priceWithoutNDS () {
      return Math.round( this.good.price / (1 + this.good.NDS / 100) * 100) / 100;
    },
    sumNDS () {
      return Math.round((this.good.price - this.priceWithoutNDS) * 100) / 100;
    }
  },

  mounted() {

  },

  beforeUnmount() {
    if (M && M.destroy){
      M.destroy();
    }
  },

}
</script>

<style scoped>
  select {
    display: inline-block;
    width: 50px;
  }
</style>
