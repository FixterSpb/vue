<template>
  <tr>
    <td class="center">{{number}}</td>
    <td>
      <input
          :id="'name-' + number"
          class='name'
          type="text"
          minlength="3"
          required
          v-model="good.name"
          @keyup="show"
          @focusout="changeField"

      ></td>
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
        class="validate center"
        v-model="good.price"
        lang="ru-RU"
        @focusout="changeField"
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
        @focusout="changeField"
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
      <small class="error"  v-for="err of errors">* {{ err }}</small>
    </td>
  </tr>
</template>

<script>

import {formatFloat} from '@/formats/format';

export default {
  name: "ContractSpecificationItem",

  props: {
    number: Number,
    defaultUnit: String,
    units: Array,
    defaultNDS: Number,
    taxes: Array,
    noShow: Boolean,
    setFocus: Boolean
  },
  data: () => ({
    good: {},
    isHide: true,
    errors: {},
  }),
  methods: {
    clearGood() {
       this.good.name = '';
       this.good.price = 0;
       this.good.quantity = 0;
       this.good.unit = this.defaultUnit;
       this.good.NDS = this.defaultNDS;
       this.show();
    },
    show(){
      this.isHide = this.good.name.trim().length < 3;
    },
    formatCurrency(value){
      return formatFloat(value);
    },
    validate(key){
      if (key == undefined) return this.good.name.length >= 3 && this.good.price > 0 && this.good.quantity > 0;
      if (this.isHide) return false;
      switch (key){
        case 'name':
          if (this.good.name.length < 3){
            this.errors.name = "Некорректное наименование позиции. Длина наименования должна превышать 2 символа";
            return true;
          }else{
            delete this.errors.name;
            return false;
          }

        case 'price':
          if (!this.good.price || this.good.price <= 0){
            this.errors.price = "Некорректная цена позиции. Введите цену";
            return true;
          }else{
            delete this.errors.price;
            return false;
          }

        case 'quantity':
          if (!this.good.quantity || this.good.quantity <= 0){
            this.errors.quantity = "Некорректное количество позиции. Введите количество";
            return true;
          }else{
            delete this.errors.quantity;
            return false;
          }
      }
    },
    changeField(event){
      this.validate(event.target.id.split('-')[0]);
      if (this.validate())
      {
        this.$emit('pushGood', this.good);
      }
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
