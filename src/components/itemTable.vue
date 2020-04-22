<template>
  <div>
    <div v-if="ItemData.En.length != 0">
      <b-table
        id="itemTable"
        small
        hover
        head-variant="light"
        :fields="fields"
        :busy="busy"
        :items="getTable"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template v-slot:cell(UsedByClasses)="data" >
          <div v-if="data.item.UsedByClasses.length !== 9">
            <b-img-lazy height="25px" width="25px" :src="getImage(cls)" v-for="cls in data.item.UsedByClasses" v-bind:key="cls"/>
          </div>
          <div v-else>
            全職業
          </div>
        </template>
        <template v-slot:cell(NameEN)="data" >
          <a href="#" :id="`pov-${data.item.DefIndex}`">{{data.item.NameEN}}</a>
          <b-popover 
            :target="`pov-${data.item.DefIndex}`"
            triggers="hover"
            :title="`${data.item.NameEN}`"
          >
            <template v-slot:default>
              <b-img-lazy :src="data.item.ImageUrl"/>
            </template>
          </b-popover>
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="itemTable"
        align="center"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MyData from "../interface/myData";
import TableItem from "../interface/tableItems";

@Component
export default class ItemTable extends Vue {
  @Prop() ItemData!: MyData;
  public currentPage = 1;
  public perPage = 50;
  public fields = [
    {key:'DefIndex',label:'Index'},
    {key:'NameEN',label:'Name'},
    {key:'NameTW',label:'名稱'},
    {key:'ItemClass',label:'Class'},
    {key:'UsedByClasses',label:'可用職業'}
  ]
  get rows() {
    return this.ItemData.En.length;
  }
  get busy() {
    return this.ItemData.En.length === 0;
  }

  getImage(cls: string){
    return `imgs/classes/${cls}.png`;
  }
  getTable() {
    const r = Array<TableItem>();

    const start = (this.currentPage - 1) * this.perPage;
    let end = start + this.perPage;
    if (end > this.ItemData.En.length - 1) end = this.ItemData.En.length - 1;
    for (let i = start; i < end; ++i) {
      r.push({
        DefIndex: this.ItemData.En[i].DefIndex,
        NameEN: this.ItemData.En[i].ItemName,
        NameTW: this.ItemData.Tw[i].ItemName,
        ItemClass: this.ItemData.En[i].ItemClass,
        ImageUrl: this.ItemData.En[i].ImageUrl,
        UsedByClasses: this.ItemData.En[i].UsedByClasses
      });
    }

    return r;
  }
}
</script>
