<template>
  <tr @focusout="changeField">
    <td class="center">{{number}}</td>
    <td>
      <input
          :id="'name-' + number"
          class='name'
          :class="{invalid: errors.name && isChanged.name}"
          type="text"
          minlength="3"
          required
          v-model="good.name"
          @input="show"
          @change="isChanged.name = true"
      />
    </td>
    <td class="center" :class="{hide: isHide}">
      <select
          v-model="good.unit"
      >
        <option
            v-for="(unit, idx) of units"
            :value="unit"
        >{{ unit }}</option>
      </select>
    </td>
    <td
        class="center"
        :class="{hide: isHide}"
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
        :class="{hide: isHide}"
    >{{ formatCurrency(priceWithoutNDS) }}</td>
    <td
        class="center"
        :class="{hide: isHide}"
    >{{ formatCurrency(sumNDS) }}
    </td>
    <td
        class="center"
        :class="{hide: isHide}"
    ><input
        :id="'price-' + number"
        type="number"
        min="0.01"
        step="0.01"
        required
        class="center"
        :class="{invalid: errors.price && isChanged.price}"
        v-model="good.price"
        lang="ru-RU"
    ></td>
    <td
        class="center"
        :class="{hide: isHide}"
    ><input
        :id="'quantity-' + number"
        type="number"
        min="1"
        step="1"
        required
        lang="ru-RU"
        class="validate center"
        v-model="good.quantity"
    ></td>
    <td
        class="center"
        :class="{hide: isHide}"
    >{{ formatCurrency(good.price * good.quantity) }}</td>
    <td class="center"  :class="{hide: isHide}">{{ formatCurrency(sumNDS * good.quantity) }}</td>
    <td class="center"  :class="{hide: isHide}">{{ formatCurrency(good.price * good.quantity) }}</td>
    <td class="center">
      <a href=""
         :class="{hide: isHide}"
         @click.prevent="clearGood"
      ><i class="material-icons">cancel</i></a></td>
  </tr>
  <tr v-if="Object.keys(errors).length > 0 && !isHide">
    <td />
    <td colspan="11">
      <small class="error" v-for="err of errors">* {{ err }}</small>
    </td>
  </tr>
</template>

<script>

import {formatPrice} from '@/formats/format';
import {rulesContractSpecification, validateContractSpecification} from "@/helpers/validators";

export default {
  name: "ContractSpecificationItem",

  props: {
    number: Number,
    defaultUnit: String,
    units: Array,
    defaultTaxRate: Number,
    taxes: Array,
    noShow: Boolean,
    setFocus: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    good: {},
    isHide: true,
    isChanged: {},
  }),
  methods: {
    clearGood() {
       this.good.name = '';
       this.good.price = 0;
       this.good.quantity = 0;
       this.good.unit = this.defaultUnit;
       this.good.NDS = this.defaultTaxRate;
       this.show();
    },
    show(){
      this.isHide = this.good.name.trim().length < 3;
    },
    formatCurrency(value){
      return formatPrice(value);
    },
    changeField(event){
      console.log(!Object.keys(this.errors));
      if (Object.keys(this.errors).length === 0)
      {
        console.log(this.errors)
        this.$emit('push-good', this.good);
      }
    }
  },

  computed: {
    priceWithoutNDS () {
      return Math.round( this.good.price / (1 + this.good.NDS / 100) * 100) / 100;
    },
    sumNDS () {
      return Math.round((this.good.price - this.priceWithoutNDS) * 100) / 100;
    },
    errors() {
      return validateContractSpecification(this.good);
    }
  },

  mounted() {
    this.clearGood();

    if (Boolean(this.setFocus)){
      document.getElementById('name-' + this.number).focus();
    }
  },

  beforeUnmount() {
    if (M && M.destroy){
      M.destroy();
    }
  }
}
</script>

<style scoped>
  select {
    display: inline-block;
    width: 50px;
  }
</style>
