<template>
<div class="pa-2">
  <v-alert
      dense
      outlined
      type="error"
  >
   Отменить действие будет не возможно!
  </v-alert>
  <v-btn color="error" @click="deleteItem">
    Подтвердите удаление
  </v-btn>
</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "DeleteItem",
  methods:{
    ...mapActions(['deleteItems']),
    ...mapMutations('dialogStore',['setDialogOpen']),
    deleteItem(){
     this.deleteItems(this.getOptions)
      this.setDialogOpen({
        open:false
      })
    }
  },
  computed:{
    ...mapGetters(['getOptions'])
  }
}
</script>

<style scoped>

</style>