<template>
  <tr>
    <td :id="'number-' + item_id">{{number}}</td>
    <td><input :id="'name-' + item_id" type="text" class="validate" v-model="name"></td>
    <td><input :id="'unit-' + item_id" type="text" class="validate" v-model="unit"></td>
    <td :id="'price-' + item_id">{{ price }}</td>
    <td><input :id="'price-NDS-' + item_id" type="text" class="validate" v-model="NDS"></td>
    <td><input :id="'price-with-NDS-' + item_id" type="text" class="validate" v-model="priceWithNDS"></td>
    <td><input :id="'quantity-' + item_id" type="text" class="validate" v-model="quantity"></td>
    <td :id="'total-' + item_id" >{{ total }}</td>
    <td :id="'total-NDS' + item_id" >100</td>
    <td :id="'total-with-NDS' + item_id">{{ totalWithNDS }}</td>
  </tr>
</template>

<script>
export default {
  props:[
    'number',
    'item_id'
  ],
  data: () => ({
    name: '',
    unit: '',
    NDS: '',
    priceWithNDS: '',
    quantity: ''
  }),
  computed: {
    price () {
      return Math.round( this.priceWithNDS / (1 + this.NDS / 100) * 100) / 100
    },
    total () {
      return this.price * this.quantity;
    },
    totalWithNDS () {
      return this.priceWithNDS * this.quantity;
    }

  },

  name: "ContractSpecificationItem"
}
</script>

<style scoped>

</style>