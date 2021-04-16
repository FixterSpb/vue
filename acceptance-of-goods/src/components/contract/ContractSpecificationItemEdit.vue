<template>
  <tr>
    <td class="center">{{ number }}</td>
    <td>
      <input
          :id="'name-' + number"
          class='name'
          :class="{invalid: errors.name}"
          type="text"
          :minlength="getRules().name.minLength.value"
          required
          v-model="good.name"
      ></td>
    <td class="center">
      <select v-model="good.unit">
        <option
            v-for="unit of units"
            :value="unit"
        >{{ unit }}</option>
      </select>
    </td>
    <td
        class="center"
    >
      <select v-model="good.taxRate">
        <option
            v-for="tax in taxes"
            :value="tax"
        >{{ tax }}</option>
      </select>
    </td>
    <td
        class="center"
    >{{ formatPrice(priceWithoutTax) }}</td>
    <td
        class="center"
    >{{ formatPrice(priceTax) }}
    </td>
    <td
        class="center"
    ><input
        type="number"
        :min="getRules().price.minValue.value"
        step="0.01"
        required
        class="center"
        :class="{invalid: errors.price}"
        v-model="good.price"
    ></td>
    <td
        class="center"
    ><input
        type="number"
        :min="getRules().quantity.minValue.value"
        step="1"
        required
        lang="ru-RU"
        class="center"
        :class="{invalid: errors.quantity}"
        v-model="good.quantity"
    ></td>
    <td
        class="center"
    >{{ formatPrice(totalWithoutTax) }}</td>
    <td class="center">{{ formatPrice(totalTax) }}</td>
    <td class="center">{{ formatPrice(total) }}</td>
    <td class="center">
      <a href="#"
        @click.prevent="deleteGood"
    ><i class="material-icons">cancel</i></a></td>
  </tr>
  <tr v-if="Object.keys(errors).length > 0">
    <td />
    <td colspan="11">
      <small class="error" v-for="err of errors">* {{ err }}</small>
    </td>
  </tr>
</template>

<script>

import {formatPrice, formatQuantity} from '@/formats/format';
import {validateContractSpecification, rulesContractSpecification} from "@/helpers/validators";
import PriceCalc from "@/helpers/PriceCalc";


export default {
  name: "ContractSpecificationItemEdit",

  props: {
    number: Number,
    good: Object,
    units: Array,
    taxes: Array
  },
  emits: [
    'delete-good',
  ],
  methods: {
    formatPrice(value){
      return formatPrice(value);
    },
    deleteGood(){
      this.$emit('delete-good', this.number - 1)
    },
    getRules(){
      return rulesContractSpecification;
    }
  },

  computed: {
    errors() {
      const errors = validateContractSpecification(this.good);
      console.log(errors);
      return errors;
    },

    priceWithoutTax() {
      debugger
      return PriceCalc.getPriceWithoutTax(this.good.price, this.good.taxRate);
    },
    priceTax(){
      return PriceCalc.getPriceTax(this.good.price, this.good.taxRate);
    },
    totalWithoutTax() {
      return this.priceWithoutTax * this.good.quantity
    },
    totalTax() {
      return this.priceTax * this.good.quantity
    },
    total() {
      return this.good.price * this.good.quantity;
    }
  },
  mounted() {
    window.good = this.good;
  }
}
</script>

<style scoped>
  select {
    display: inline-block;
    width: 50px;
  }
</style>
