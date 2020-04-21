<template>
  <div>
    <b-tabs>
      <b-tab title="物品" active>
        <br>
        <ItemTable v-bind:ItemData="ItemData" />
      </b-tab>
      <b-tab title="異常效果">
        <br>
        <UnusualTable v-bind:ItemData="ItemData"/>
      </b-tab>
      <b-tab title="油漆" disabled>
        <p>I'm a disabled tab!</p>
      </b-tab>
      <b-tab title="金屬計算機" disabled>
        <p>I'm a disabled tab!</p>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MyData from "../interface/myData";
import ItemTable from "./itemTable.vue";
import UnusualTable from './unusualTable.vue';

@Component({
  components: {
    ItemTable,
    UnusualTable
  }
})
export default class MyTab extends Vue {
  @Prop() ItemData!: MyData;
}
</script>