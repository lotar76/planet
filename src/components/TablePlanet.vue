<template>
  <v-card >
    <v-card-title>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :loading="getLoading"
        height="600"
        fixed-header
        :items-per-page="-1"
        :headers="headers"
        :items="items"
        :search="search"
        hide-default-footer>
      <template v-slot:top >
        <div class="text-left pa-2">
        <div v-for="select in selectors" :key="select.id"
             :style="{backgroundColor:select.color}"
            class="selector"
             @click="$emit('slectorClick', select.id)"
        >
          {{select.name}}
        </div>

          <div style="float: right" v-if="createBtn">
            <v-btn small color="primary" @click="$emit('clickCreateBtn')">
              создать объект
            </v-btn>
          </div>

        </div>
      </template>
      <template v-slot:item.isPlanet="{item}">
        <v-badge
            :color="item.isPlanet ? 'blue' : 'pink'"
            dot
        >
        </v-badge>
      </template>
      <template v-slot:item.moons="{item}">
        {{ item.moons ? item.moons.length : ' - ' }}
      </template>

      <template v-slot:item.actions ="{item}">
        <v-btn icon v-for="act in actions" :key="act.id" v-show="act.show"
               @click="$emit('clickAction', {id:act.id, payload:item.id})"
        :title="act.name">
        <v-icon small :color="act.color || 'primary'" >
          {{ act.icon }}
        </v-icon>
        </v-btn>
      </template>
      <template v-slot:footer>
        <v-btn class="my-2" color="primary" @click="getPlanetsApi" :disabled="!getActiveBtn" v-show="loadMore">
          {{getActiveBtn ? 'загрузить еще' : 'все объекты загружены'}}
        </v-btn>
      </template>
    </v-data-table>


  </v-card>

</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props:['items', 'headers', 'selectors','actions','createBtn','loadMore'],
  name: "TablePlanet",
  data(){
    return{
      search:''
    }
  },
  methods:{
   ...mapActions(['getPlanetsApi'])
  },
  computed:{
    ...mapGetters(['getActiveBtn','getLoading'])
  }

}
</script>

<style scoped>
.selector{
  cursor: pointer;
  display:inline-block;
  margin: 3px;
  padding: 3px 5px;
  border-radius: 3px;
  color: white;
}
</style>