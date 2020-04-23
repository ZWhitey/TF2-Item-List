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
import Paint from './interface/paint';
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
  private ItemData: MyData = {
      Items: new Array<Item>(),
      Paints: new Array<Paint>(),
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
      Items : new Array<Item>(),
      Paints: new Array<Paint>(),
      UnusualEn : new Array<Unusual>(),
      UnusualTw : new Array<Unusual>()
    };
    for (let i = 1; i < 8; ++i) {
      const resEn = await axios.get(`item_data/en_${i}.json`);
      const resTw = await axios.get(`item_data/tw_${i}.json`);

      const resDataEn = resEn.data.result.items;
      const resDataTw = resTw.data.result.items;

      for(let i=0;i<resDataEn.length;++i){
        let cls = resDataEn[i].used_by_classes;
        if(!cls){
          cls = ['Scout','Soldier','Pyro','Demoman','Heavy','Engineer','Medic','Sniper','Spy'];
        }
        let img = resDataEn[i].image_url;
        if(!img){
          img = '';
        }
        data.Items.push({
          DefIndex: resDataEn[i].defindex,
          ItemClass: resDataEn[i].item_class,
          NameEN: resDataEn[i].item_name,
          NameTW: resDataTw[i].item_name,
          ImageUrl: img,
          UsedByClasses: cls
        });
        if(resDataEn[i].name.includes('Paint Can') && resDataEn[i].item_name !== 'Paint Can'){
          const getColorHax = function(color: any){
            const r = (color & 0xff0000) >>> 16;
            const g = (color & 0x00ff00) >>> 8;
            const b = (color & 0x0000ff) >>> 0;
            const rs = (r.toString(16).length < 2)?`0${r.toString(16)}`:r.toString(16);
            const gs = (g.toString(16).length < 2)?`0${g.toString(16)}`:g.toString(16);
            const bs = (b.toString(16).length < 2)?`0${b.toString(16)}`:b.toString(16);
            return `#${rs}${gs}${bs}`;
          }
          if(resDataEn[i].attributes.length < 2){
            const cr = getColorHax(resDataEn[i].attributes[0].value);
            data.Paints.push({
              DefIndex: resDataEn[i].defindex,
              NameEN: resDataEn[i].item_name,
              NameTW: resDataTw[i].item_name,
              ColorRed: cr,
              ColorBlue: cr,
              CodeRed: resDataEn[i].attributes[0].value,
              CodeBlue: resDataEn[i].attributes[0].value
            })
          }
          else{
            const cr = getColorHax(resDataEn[i].attributes[0].value);
            const cb = getColorHax(resDataEn[i].attributes[1].value);
            data.Paints.push({
              DefIndex: resDataEn[i].defindex,
              NameEN: resDataEn[i].item_name,
              NameTW: resDataTw[i].item_name,
              ColorRed: cr,
              ColorBlue: cb,
              CodeRed: resDataEn[i].attributes[0].value,
              CodeBlue: resDataEn[i].attributes[1].value
            })
          }
        }
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

