<template>
  <div>
    <h5>Спецификация</h5>
    <table>
      <thead>
      <tr>
        <th class="th th-number">№ п/п</th>
        <th class="th th-name">Наименование</th>
        <th class="th th-unit">Ед. изм.</th>
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
        />
        <ContractSpecificationItem
            @pushGood="pushGood"
            :item_id=Date.now()
            :number="goods.length + 1"
            :good=undefined
            :key=Date.now()
            defaultNDS=10
            defaultUnit="кг"
            :class="{hide: isHide}"
        />
        <ContractSpecificationItem
            @pushGood="pushGood"
            :item_id=Date.now()
            :number="goods.length + 1"
            :good=undefined
            :key=Date.now()
            defaultNDS=10
            defaultUnit="кг"
            :class="{hide: isHide}"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import ContractSpecificationItem from "@/components/ContractSpecificationItem";
export default {
  name: "ContractSpecification",
  data: () => ({
    goods : [
      {
        id: 1,
        name: 'Горох',
        unit: 'кг',
        NDS: 10,
        price: 12.05,
        quantity: 264
      },
      {
        id: 2,
        name: 'Картофель',
        unit: 'кг',
        NDS: 10,
        price: 17.05,
        quantity: 264
      }
    ],
    isHide: true
  }),
  components: {
    ContractSpecificationItem
  },
  methods: {
    pushGood(good){
      console.log("push good: ", good);
      if (good){
        if(good.id === 0){
          this.goods.push(good)
        }else{
          this.goods.find(el => el.id === good.id)
        }
      }
    },
    show(){
      this.isHide = false
    }
  }
}
</script>

<style scoped>

</style>
