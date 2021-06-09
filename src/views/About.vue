<template>
  <v-app>
    <v-content class="pa-2" >
      <v-btn
          small
          color="primary"
          @click="$router.push({name:'Home'})"
      >
        Вернуться к списку
      </v-btn>
      <h1>Объект : {{ this.$route.params.id }}</h1>
      <pre>{{getPlanetsById}}</pre>
    </v-content>


  </v-app>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  computed:{
    ...mapGetters(['getPlanetsById'])
  },
  methods: {
    ...mapActions(['getPlanetsApiById'])

  },
  created() {
    this.getPlanetsApiById(this.$route.params.id)
  }
}
</script>
