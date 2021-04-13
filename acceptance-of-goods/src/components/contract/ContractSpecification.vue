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
        <ContractSpecificationItem
            @pushGood="pushGood"
            v-for="(item, idx) of goods"
            :key=item.id
            :number="idx + 1"
            :good=item
            :units="dictionaries.units"
            :taxes="dictionaries.taxes"
        />
        <ContractSpecificationItem
            @pushGood="pushGood"
            @showLastElement="showLastElement"
            :number="goods.length + 1"
            :good="undefined"
            :key="'specification-item-' + goods.length + 1"
            :defaultNDS="defaultTax"
            :defaultUnit="defaultUnit"
            :units="dictionaries.units"
            :taxes="dictionaries.taxes"
            :setFocus="setFocus"
        />
        <ContractSpecificationItem
            @pushGood="pushGood"
            :number="goods.length + 2"
            :good="undefined"
            :key="'specification-item-' + goods.length + 2"
            :noShow ="true"
            :class="{hide: isHide}"
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
import ContractSpecificationItem from "@/components/contract/ContractSpecificationItem";
import {formatFloat} from '@/formats/format';
export default {
  name: "ContractSpecification",
  data: () => ({
    goods : [
      {
        id: 1,
        name: 'Горох',
        unit: 'кг',
        NDS: 10,
        priceWithoutNDS: 10.95,
        sumNDS: 1.10,
        price: 12.05,
        quantity: 264
      },
      {
        id: 2,
        name: 'Картофель',
        unit: 'кг',
        NDS: 10,
        priceWithoutNDS: 15.50,
        sumNDS: 1.55,
        price: 17.05,
        quantity: 264
      }
    ],
    dictionaries: {
      units: ['кг', 'шт', 'л'],
      taxes: [0, 10, 20]
    },
    defaultTax: 0,
    defaultUnit: '',
    isHide: true,
    setFocus: false,
  }),
  components: {
    ContractSpecificationItem
  },
  methods: {
    pushGood(good){
      if (good){
        if(good.id === 0){
          good.id = this.goods.length + 1;
          this.goods.push(good)
        }else{
          this.goods[this.goods.findIndex(el => el.id === good.id)] = good;
        }
        this.setFocus= true;
        this.isHide = true;
        console.log(this.goods)
      }
    },
    formatCurrency(value) {
      return formatFloat(value);
    },
    showLastElement(isHide){
      this.isHide = isHide;
      console.log("Specification.isHide: ", this.isHide);
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
        result.total += good.price * good.quantity;
        result.totalNDS += good.sumNDS * good.quantity;
        result.totalWithoutNDS += good.priceWithoutNDS * good.quantity;

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
