<template>
  <v-app>
    <div class="home">

      <table-planet
          :createBtn="true"
          @clickCreateBtn="clickCreateBtn"
          :actions="actionsIn"
          @clickAction="actionClick"
          @slectorClick="clickSelector"
          :selectors="selectors"
          :items="itemsIn"
          v-if="items"
          :headers="headers"
      ></table-planet>
      <div v-if="!items"> Идет загрузка</div>
    </div>
<simply-dialog/>
  </v-app>
</template>

<script>
import TablePlanet from "@/components/TablePlanet";
import {mapActions, mapGetters, mapMutations} from "vuex";
import SimplyDialog from "@/components/Dialog/SimplyDialog";


export default {
  name: 'Home',
  components: {
    SimplyDialog,
    TablePlanet,
  },
  data() {
    return {
      itemsIn: [],
      selectors: [
        {id: 1, name: 'Только панеты', color: '#2c3e50'},
        {id: 2, name: 'Только с лунами', color: '#2c3e50'},
        {id: 3, name: 'Все', color: 'blue'}
      ],
      headers: [
        {text: 'Наименование', value: 'name', width: 150, align: 'center'},
        {text: 'Планета', value: 'isPlanet', width: 150, align: 'center'},
        {text: 'Дата открытия', value: 'discoveryDate', width: 150, align: 'center'},
        {text: 'Открыл', value: 'discoveredBy', width: 150, align: 'center'},
        {text: 'Кол-во Лун', value: 'moons', width: 150, align: 'center'},
        {text: '', value: 'actions', width: 150, align: 'center'},
      ],
      actionsIn: [
        {id: 1, name: 'Подробнее', icon: 'mdi-eye', color:'green'},
        {id: 2, name: 'Редактировать', icon: 'mdi-pencil'},
        {id: 3, name: 'Удалить', icon: 'mdi-delete', color:'red'},
      ]
    }
  },
  methods: {
    ...mapMutations('dialogStore',['setDialogOpen']),
    ...mapMutations(['setOptions']),
    clickCreateBtn(){
      this.setDialogOpen({
        open:true,
        title:'Cоздаем объект',
        component:'CreateItem'
      })
    },
    editeItem(val){
      this.setOptions(val)
      this.setDialogOpen({
        open:true,
        title:'Редактируем объект',
        component:'EditeItem'
      })
    },
    deleteItem(val){
      this.setOptions(val)
      this.setDialogOpen({
        open:true,
        title:'Удаление объекта',
        component:'DeleteItem'
      })
    },
    actionClick(val) {
      console.log(val)
      switch (val.id) {
        case 1:
          this.$router.push({name:'About', params:{'id':val.payload}})
          break;
        case 2 :
          this.editeItem(val.payload)
          break;
        case 3 :
          this.deleteItem(val.payload)
          break;
        default:
          this.$router.push({name:'About', params:{'id':val.payload}})
      }
    },
    clickSelector(val) {
      switch (val) {
        case 1:
          this.itemsIn = this.items.filter((element) => element.isPlanet)
          break;
        case 2 :
          this.itemsIn = this.items.filter((element) => element.moons)
          break;
        case 3 :
          this.itemsIn = this.items
          break;
        default:
          this.itemsIn = this.items
      }

    },
    ...mapActions(['getPlanetsApi'])
  },
  computed: {
    ...mapGetters({items: 'getPlanets'})
  },
  created() {
    this.getPlanetsApi().then(() => {
      this.itemsIn = this.items
    })
  }
}
</script>
