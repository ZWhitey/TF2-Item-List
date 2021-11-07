<template>
  <div>
    <div v-if="ItemData.UnusualEn.length != 0">
      <b-table
        id="itemTable"
        small
        hover
        head-variant="light"
        :fields="fields"
        :items="getTable"
      >
        <template v-slot:cell(NameEN)="data" >
          <a href="#" :id="`upov-${data.item.Id}`">{{data.item.NameEN}}</a>
          <b-popover 
            :target="`upov-${data.item.Id}`"
            triggers="hover"
            :title="`${data.item.NameEN}`"
          >
            <template v-slot:default>
              <b-img-lazy :src="`https://backpack.tf/images/440/particles/${data.item.Id}_188x188.png`"/>
            </template>
          </b-popover>
        </template>
      </b-table>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MyData from "../interface/myData";
import uTableItem from "../interface/uTableItem";

@Component
export default class ItemTable extends Vue {
  @Prop() ItemData!: MyData;
  public fields = [
    {key:'Id',label:'ID'},
    {key:'NameEN',label:'Name'},
    {key:'NameTW',label:'名稱'},
    {key:'System',label:'Particle System'}
  ]
  
  get rows() {
    return this.ItemData.UnusualEn.length;
  }

  getImage(cls: string){
    return `imgs/classes/${cls}.png`;
  }
  getTable() {
    const r = Array<uTableItem>();

    for (let i = 0; i < this.ItemData.UnusualEn.length; ++i) {
      r.push({
        Id:this.ItemData.UnusualEn[i].Id,
        NameEN:this.ItemData.UnusualEn[i].Name,
        NameTW:this.ItemData.UnusualTw[i].Name,
        System:this.ItemData.UnusualEn[i].System
      });
    }
    return r;
  }
}
</script>
