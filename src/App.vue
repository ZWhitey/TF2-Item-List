<template>
  <div id="app">
    <Top />
    <b-container>
      <b-row>
        <b-col>
        <myTab v-bind:ItemData="ItemData" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Item from "./interface/Item";
import MyData from './interface/myData'
import Unusual from './interface/Unusual';
import Top from "./components/Top.vue";
import MyTab from "./components/myTab.vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

@Component({
  components: {
    Top,
    MyTab
  }
})
export default class App extends Vue {
  private ItemData = {
      En : new Array<Item>(),
      Tw : new Array<Item>(),
      UnusualEn : new Array<Unusual>(),
      UnusualTw : new Array<Unusual>()
    };
  created() {
    this.getData().then(data => {
      this.ItemData = data;
    });
  }

  public async getData() {
    const data: MyData = {
      En : new Array<Item>(),
      Tw : new Array<Item>(),
      UnusualEn : new Array<Unusual>(),
      UnusualTw : new Array<Unusual>()
    };
    for (let i = 1; i < 8; ++i) {
      const resEn = await axios.get(`item_data/en_${i}.json`);
      const resTw = await axios.get(`item_data/tw_${i}.json`);

      for (const i of resEn.data.result.items) {
        let cls = i.used_by_classes;
        if(!cls){
          cls = ['Scout','Soldier','Pyro','Demoman','Heavy','Engineer','Medic','Sniper','Spy'];
        }
        let img = i.image_url;
        if(!img){
          img = '';
        }
        data.En.push({
          DefIndex: i.defindex,
          ItemClass: i.item_class,
          ItemName: i.item_name,
          ImageUrl: img,
          UsedByClasses: cls
        });
      }
      for (const i of resTw.data.result.items) {
        data.Tw.push({
          DefIndex: i.defindex,
          ItemClass: i.item_class,
          ItemName: i.item_name,
          ImageUrl: i.image_url,
          UsedByClasses: i.used_by_classes
        });
      }
    }
    const resUEn = await axios.get('item_data/en_schema.json');
    const resUTw = await axios.get('item_data/tw_schema.json');
    for (const i of resUEn.data.result.attribute_controlled_attached_particles) {
        data.UnusualEn.push({
          System: i.system,
          Id: i.id,
          Name: i.name
        });
    }
    for (const i of resUTw.data.result.attribute_controlled_attached_particles) {
        data.UnusualTw.push({
          System: i.system,
          Id: i.id,
          Name: i.name
        });
    }


    return data;
  }
}
</script>

