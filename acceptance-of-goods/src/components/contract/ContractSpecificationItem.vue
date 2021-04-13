<template>
  <tr>
    <td class="center">{{number}}</td>
    <td>
      <input
          type="text"
          class='validate name'
          minlength="3"
          required
          v-model="name"
          @keyup="show"
          @change="pushGood"
          :id="'id-' + number"
      ></td>
    <td class="center" :class="{hide: isHide}">
      <select v-model="unit">
        <option
            v-for="(unit, idx) of units"
            :value="unit"
        >{{ unit }}</option>
      </select>
    </td>
    <td
        class="center"
        :class="{hide: isHide}"
        @change="pushGood"
    >
      <select v-model="NDS">
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
        @change="pushGood"
    >{{ formatCurrency(sumNDS) }}
    </td>
    <td
        class="center"
        :class="{hide: isHide}"
    ><input
        type="number"
        min="0.01"
        step="0.01"
        required
        class="validate center"
        v-model="price"
        lang="ru-RU"
        @change="pushGood"
    ></td>
    <td
        class="center"
        :class="{hide: isHide}"
    ><input
        type="number"
        min="0.001"
        step="0.001"
        required
        lang="ru-RU"
        class="validate center"
        v-model="quantity"
        @change="pushGood"
    ></td>
    <td
        class="center"
        :class="{hide: isHide}"
    >{{ formatCurrency(price * quantity) }}</td>
    <td class="center"  :class="{hide: isHide}">{{ formatCurrency(sumNDS * quantity) }}</td>
    <td class="center"  :class="{hide: isHide}">{{ formatCurrency(price * quantity) }}</td>
  </tr>
</template>

<script>

import {formatFloat} from '@/formats/format';

export default {
  name: "ContractSpecificationItem",

  props: {
    number: Number,
    good: Array,
    defaultUnit: String,
    units: Array,
    defaultNDS: Number,
    taxes: Array,
    noShow: Boolean,
    setFocus: Boolean
  },
  data: () => ({
    name: '',
    unit: '',
    NDS: 0,
    price: 0.00,
    quantity: '',
    isHide: true,
  }),
  methods: {
    show(){
      console.log(this.noShow);
      if (this.noShow){
        return
      }
      this.isHide = this.name.trim().length < 3;
      this.$emit('showLastElement', this.isHide);
    },
    formatCurrency(value){
      return formatFloat(value);
    },
    pushGood(){
      if(this.name.trim().length >= 3 && this.price > 0 && this.unit !== undefined && this.quantity > 0 && this.NDS !== undefined) {
        this.$emit('pushGood',
            {
              id: this.good ? this.good.id : 0,
              name: this.name,
              unit: this.unit,
              NDS: this.NDS,
              price: this.price,
              sumNDS: this.sumNDS,
              priceWithoutNDS: this.priceWithoutNDS,
              quantity: this.quantity
            }
        )
      }
    }
  },

  computed: {
    priceWithoutNDS () {
      return Math.round( this.price / (1 + this.NDS / 100) * 100) / 100;
    },
    sumNDS () {
      return Math.round((this.price - this.priceWithoutNDS) * 100) / 100;
    }
  },

  mounted() {
    M.updateTextFields();
    if (this.good !== undefined) {
      this.name = this.good.name;
      this.unit = this.good.unit;
      this.NDS = this.good.NDS;
      this.price = this.good.price;
      this.quantity = this.good.quantity;
      this.isHide = false
    }else{
      this.NDS = this.defaultNDS;
      this.unit = this.defaultUnit;
    };

    if (Boolean(this.setFocus)){
      console.log('setFocus: ', this.setFocus);
      document.getElementById('id-' + this.number).focus();
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
