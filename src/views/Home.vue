<template>
  <v-app>
    <div>
      <table-planet
          :loadMore="loadMore"
          @clickPage="clickPage"
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
    <simply-dialog-in></simply-dialog-in>
  </v-app>
</template>

<script>
import TablePlanet from "@/components/TablePlanet";
import {mapActions, mapGetters, mapMutations} from "vuex";
import SimplyDialogIn from "@/components/Dialog/SimplyDialog";


export default {
  name: 'Home',
  components: {
    SimplyDialogIn,
    TablePlanet
  },
  data() {
    return {
      loadMore:true,
      pages:[],
      page:1,
      selector: null,
      selectors: [
        {id: 1, name: 'Только панеты', color: '#2c3e50'},
        {id: 2, name: 'Только с лунами', color: '#2c3e50'},
        {id: 3, name: 'Все', color: 'blue'},
        {id: 4, name: 'Архив', color: 'red'}
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
        {id: 1, name: 'Подробнее', icon: 'mdi-eye', color: 'green', show:true},
        {id: 2, name: 'Редактировать', icon: 'mdi-pencil', show:true},
        {id: 3, name: 'Удалить', icon: 'mdi-delete', color: 'red', show:true},
      ]
    }
  },
  methods: {
    ...mapMutations('dialogStore', ['setDialogOpen']),
    ...mapMutations(['setOptions']),
    clickPage(val){
      console.log('1111',val);
      // this.page=val
      this.getPlanetsApi(val+1 +',10')
    },
    clickCreateBtn() {
      this.setDialogOpen({
        open: true,
        title: 'Cоздаем объект',
        component: 'CreateItem'
      })
    },
    editeItem(val) {
      this.setOptions(val)
      this.setDialogOpen({
        open: true,
        title: 'Редактируем объект',
        component: 'EditeItem'
      })
    },
    deleteItem(val) {
      this.setOptions(val)
      this.setDialogOpen({
        open: true,
        title: 'Удаление объекта',
        component: 'DeleteItem'
      })
    },
    actionClick(val) {
      switch (val.id) {
        case 1:
          this.$router.push({name: 'About', params: {'id': val.payload}})
          break;
        case 2 :
          this.editeItem(val.payload)
          break;
        case 3 :
          this.deleteItem(val.payload)
          break;
        default:
          this.$router.push({name: 'About', params: {'id': val.payload}})
      }
    },
    clickSelector(newVal) {
      if(newVal === 4){
        this.loadMore = false
        this.actionsIn[2].show=false
        this.actionsIn[1].show=false
      }
      else {
        this.loadMore = true
        this.actionsIn[2].show=true
        this.actionsIn[1].show=true
      }
      this.selector = newVal
    },
    ...mapActions(['getPlanetsApi'])
  },
  computed: {
    itemsIn() {
      switch (this.selector) {
        case 1:
          return this.items.filter((element) => element.isPlanet && element.status_app)
        case 2 :
          return this.items.filter((element) => element.moons && element.status_app)
        case 3 :
          return this.items.filter((element) => element.status_app)
        case 4 :
          return this.items.filter((element) => !element.status_app)
        default:
          return this.items.filter((element) => element.status_app)
      }
    },
    ...mapGetters(
        {
          items: 'getPlanets',
          archive: 'getArchive'
        }
    )
  },
  created() {
    this.getPlanetsApi('1,10')

  }
}
</script>
