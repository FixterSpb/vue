<template>
  <div>
    <h5>Спецификация</h5>
    <p>Ставка НДС по-умолчанию:
      <select v-model="defaultTax">
        <option
            v-for="(tax, idx) in dictionaries.taxes"
            :value="tax"
        >{{ tax }}</option>
      </select>
      Единица измерения товара по-умолчанию
      <select v-model="defaultUnit">
        <option
            v-for="(unit, idx) of dictionaries.units"
            :value="unit"
        >{{ unit }}</option>
      </select>
    </p>
    <table>
      <thead>
        <tr>
          <th class="th th-number">№ п/п</th>
          <th class="th th-name">Наименование</th>
          <th class="th th-unit">Ед. изм.</th>
          <th class="th th-price">Ставка НДС</th>
          <th class="th th-price">Цена</th>
          <th class="th th-price">НДС</th>
          <th class="th th-price">Цена с НДС</th>
          <th class="th th-quantity">Количество</th>
          <th class="th th-price">Стоимость</th>
          <th class="th th-price">НДС</th>
          <th class="th th-price">Стоимость с НДС</th>
        </tr>
      </thead>

      <tbody>
        <ContractSpecificationItemEdit
            @deleteGood="deleteGood"
            v-for="(item, idx) of goods"
            :key="'specification-item-' + idx"
            :number="idx + 1"
            :good=item
            :units="dictionaries.units"
            :taxes="dictionaries.taxes"
        />
        <ContractSpecificationItemAdd
            @pushGood="pushGood"
            @showLastElement="showLastElement"
            :number="goods.length + 1"
            :key="'specification-item-add-' + (goods.length + 1)"
            :defaultNDS="defaultTax"
            :defaultUnit="defaultUnit"
            :units="dictionaries.units"
            :taxes="dictionaries.taxes"
            :setFocus="goods.length"
        />
        <tr>
          <td colspan="8" class="right-align td-total">Итого</td>
          <td class="center td-total">{{ formatCurrency(calcTotal.totalWithoutNDS) }}</td>
          <td class="center td-total">{{ formatCurrency(calcTotal.totalNDS) }}</td>
          <td class="center td-total">{{ formatCurrency(calcTotal.total) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ContractSpecificationItemEdit from "@/components/contract/ContractSpecificationItemEdit";
import ContractSpecificationItemAdd from "@/components/contract/ContractSpecificationItemAdd";
import {formatFloat} from '@/formats/format';
export default {
  name: "ContractSpecification",
  props: [
    'goods',
  ],
  data: () => ({
    dictionaries: {
      units: ['кг', 'шт', 'л'],
      taxes: [0, 10, 20]
    },
    defaultTax: 0,
    defaultUnit: '',
    isHide: true,
    setFocus: true,
  }),
  components: {
    ContractSpecificationItemEdit,
    ContractSpecificationItemAdd,
  },
  methods: {
    pushGood(good){
      if (good){
          this.goods.push(good);
      }
    },
    deleteGood(idx){
      this.goods.splice(idx, 1);
    },
    formatCurrency(value) {
      return formatFloat(value);
    },
    showLastElement(isHide){
      this.isHide = isHide;
      console.log(isHide);
    }
  },
  computed: {
    calcTotal(){
      let result = {
        total: 0,
        totalNDS: 0,
        totalWithoutNDS: 0
      };

      this.goods.forEach(good => {
        const priceWithoutNDS = Math.round(good.price / (1 + good.NDS / 100) *100) / 100;
        result.total += good.price * good.quantity;
        result.totalNDS += Math.round( (good.price - priceWithoutNDS) * good.quantity * 100) / 100;
        result.totalWithoutNDS += priceWithoutNDS * good.quantity;

      });

      result.total = Math.round(result.total * 100 ) / 100;
      result.totalNDS = Math.round(result.totalNDS * 100 ) / 100;
      result.totalWithoutNDS = Math.round(result.totalWithoutNDS * 100 ) / 100;

      return result;
    }
  },

  beforeMount () {
    // M.updateTextFields();
    this.defaultUnit = this.dictionaries.units[0];
    this.defaultTax = this.dictionaries.taxes[0];
  }
}
</script>

<style scoped>
  select {
    display: inline-block;
    width: 75px;
  }
</style>
