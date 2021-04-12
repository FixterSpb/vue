<template>
  <tr>
    <td class="center">{{number}}</td>
    <td>
      <input
          type="text"
          class="validate name"
          v-model="name"
          @keyup="show"
          @change="pushGood"
          :id="'id-' + number"
      ></td>
    <td class="center" :class="{hide: isHide}">
      <select v-model="unit">
        <option value="шт">шт</option>
        <option value="кг">кг</option>
        <option value="л">л</option>
      </select>
    </td>
    <td
        class="center"
        :class="{hide: isHide}"
        @change="pushGood"
    >
      <select v-model="NDS">
        <option value="0">0</option>
        <option value="10">10</option>
        <option value="20">20</option>
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
        class="validate center"
        v-model="price"
        lang="ru-RU"
        @keydown="validate"
        @change="pushGood"
    ></td>
    <td
        class="center"
        :class="{hide: isHide}"
    ><input
        type="number"
        min="0"
        step="0.001"
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

  props:[
    'number',
    'good',
    'defaultNDS',
    'defaultUnit',
    'noShow',
    'setfocus'
  ],
  data: () => ({
    name: '',
    unit: '',
    NDS: 0,
    price: 0.00,
    quantity: '',
    isHide: true,
    invalid: true,
  }),
  computed: {
    priceWithoutNDS () {
      return Math.round( this.price / (1 + this.NDS / 100) * 100) / 100;
    },
    sumNDS () {
      return Math.round((this.price - this.priceWithoutNDS) * 100) / 100;
    }
  },

  methods: {
    validate (event) {
      console.log(event);
      if (!/[0-9\.,]|arrow|backspace|delete/ig.test(event.key)) {
        // event.preventDefault();
      }
      if (event.key === '.'){
        // event.key = ','
      }
    },
    show(){
      console.log('noShow: ', this.noShow, this.noShow === undefined);
      if (this.noShow !== undefined){
        return
      }
      this.isHide = this.name.trim() === '';
      console.log("this.isHide: ", this.isHide);
      this.$emit('showLastElement', this.isHide);

      console.log('noShow: ', this.noShow, this.noShow === undefined);
    },
    formatCurrency(value){
      return formatFloat(value);
    },
    pushGood(){
      if(this.name && this.price && this.unit && this.quantity && this.NDS !== undefined) {
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
      }else{
        console.log(this.name, this.price, this.unit, this.quantity, this.NDS)
      }
    }
  },

  mounted() {
    M.updateTextFields();
    console.log(this.good);
    if (this.good) {
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

    if (this.setfocus){
      document.getElementById('id-' + this.number).focus();
    }

    console.log(this.NDS)
  },

  beforeUnmount() {
    console.log(this.name)
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
