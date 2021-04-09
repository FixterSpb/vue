<template>
  <div>
    <h5>Спецификация</h5>
    <table>
      <thead>
      <tr>
        <th>№ п/п</th>
        <th>Наименование</th>
        <th>Единица измерения</th>
        <th>Цена</th>
        <th>НДС</th>
        <th>Цена с НДС</th>
        <th>Количество</th>
        <th>Стоимость</th>
        <th>НДС</th>
        <th>Стоимость с НДС</th>
      </tr>
      </thead>

      <tbody>
        <ContractSpecificationItem
            item_id="1"
            number="1"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import ContractSpecificationItem from "@/components/ContractSpecificationItem";
export default {
  name: "ContractSpecification",
  components: {
    ContractSpecificationItem
  }
}
</script>

<style scoped>

</style>