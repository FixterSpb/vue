<template>
  <tr>
    <td :id="'number-' + item_id" class="center">{{number}}</td>
    <td>
      <input
          :id="'name-' + item_id"
          type="text"
          class="validate name"
          v-model="name"
          @keyup="show"
          @change="pushGood"
      ></td>
    <td class="center" :class="{hide: isHide}">
      <select :id="'unit-' + item_id" v-model="unit">
        <option value="шт">шт</option>
        <option value="кг">кг</option>
        <option value="л">л</option>
      </select>
    </td>
    <td
        :id="'price-without-nds' + item_id"
        class="center"
        :class="{hide: isHide}"
    >{{ priceWithoutNDS.toFixed(2) }}</td>

    <td
        class="center"
        :class="{hide: isHide}"
        @change="pushGood"
    >
      <select :id="'price-NDS-' + item_id" v-model="NDS">
        <option value="0">0</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </td>

<!--      <input :id="'price-NDS-' + item_id" type="text" class="validate" v-model="NDS"></td>-->
    <td
        class="center"
        :class="{hide: isHide}"
    ><input
        :id="'price' + item_id"
        type="text"
        class="validate center"
        v-model="price"
        @change="pushGood"
    ></td>
    <td
        class="center"
        :class="{hide: isHide}"
    ><input
        :id="'quantity-' + item_id"
        type="text"
        class="validate center"
        v-model="quantity"
        @change="pushGood"
    ></td>
    <td
        class="center"
        :id="'total-without-nds' + item_id"
        :class="{hide: isHide}"
    >{{ totalWithoutNDS.toFixed(2) }}</td>
    <td class="center" :id="'total-NDS' + item_id" :class="{hide: isHide}">{{ totalNDS.toFixed(2) }}</td>
    <td class="center" :id="'total' + item_id" :class="{hide: isHide}">{{ total.toFixed(2) }}</td>
  </tr>
</template>

<script>
export default {
  name: "ContractSpecificationItem",

  props:[
    'number',
    'item_id',
    'good',
    'defaultNDS',
    'defaultUnit'
  ],
  data: () => ({
    name: '',
    unit: '',
    NDS: 0,
    price: 0.00,
    quantity: '',
    isHide: true
  }),
  computed: {
    priceWithoutNDS () {
      return Math.round( this.price / (1 + this.NDS / 100) * 100) / 100;
    },
    totalWithoutNDS () {
      return Math.round(this.priceWithoutNDS * this.quantity * 100 ) / 100;
    },
    total () {
      return Math.round(this.price * this.quantity * 100 ) / 100;
    },
    totalNDS () {
      return Math.round((this.total - this.totalWithoutNDS)   * 100) / 100;
    }
  },

  methods: {
    show(){
      this.isHide = this.name === ''
    },
    pushGood(){
      if(this.name && this.price && this.unit && this.quantity && this.NDS !== undefined) {
        this.$emit('pushGood',
          {
            id: this.good ? this.good.id : 0,
            name: this.name,
            price: this.price,
            unit: this.unit,
            NDS: this.NDS,
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
