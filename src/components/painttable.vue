<template>
  <div>
    <div v-if="ItemData.Paints.length != 0">
      <b-table
        id="itemTable"
        small
        hover
        head-variant="light"
        :fields="fields"
        :items="getTable"
      >
      <template v-slot:cell(CodeRed)="data" >
        <div v-bind:style="{background:data.item.ColorRed}">
        {{data.item.CodeRed}}
        </div>
      </template>
      <template v-slot:cell(CodeBlue)="data" >
        <div v-bind:style="{background:data.item.ColorBlue}">
        {{data.item.CodeBlue}}
        </div>
      </template>
      </b-table>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MyData from "../interface/myData";
import uTableItem from "../interface/uTableItem";
import Paint from '../interface/paint';

@Component
export default class ItemTable extends Vue {
  @Prop() ItemData!: MyData;
  public fields = [
    {key:'DefIndex',label:'DefIndex'},
    {key:'NameEN',label:'Name'},
    {key:'NameTW',label:'名稱'},
    {key:'CodeRed',label:'Red Team'},
    {key:'CodeBlue',label:'Blue Team'}
  ]

  getTable() {
    return this.ItemData.Paints;
  }
}
</script>
