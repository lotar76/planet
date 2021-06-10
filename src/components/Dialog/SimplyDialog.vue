<template>
  <div class="text-center">
    <v-dialog
        transition="dialog-bottom-transition"
        persistent
        v-model="GET_DIALOG_OPEN"
        width="800"
    >
      <v-toolbar
          dark
          color="primary"
      >
        <v-btn
            icon
            dark
            @click="setDialogOpen({open:false, title:''})"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title> {{GET_DIALOG_TITLE }}</v-toolbar-title>
        <v-spacer></v-spacer>

      </v-toolbar>
      <v-card>


        <v-card-text>
      <component :is="GET_DIALOG_COMPONENT"></component>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import NoneForm from "@/components/Forms/NoneForm";
import EditeItem from "@/components/Forms/EditeItem";
import CreateItem from "@/components/Forms/CreateItem";
import DeleteItem from "@/components/Forms/DeleteItem";

export default {
  components:{NoneForm,EditeItem,
    CreateItem,
    DeleteItem},
  name: "SimplyDialog",
  data () {
    return {
      dialog: false,
    }
  },
  computed:{
    ...mapGetters('dialogStore',['GET_DIALOG_OPEN','GET_DIALOG_TITLE','GET_DIALOG_COMPONENT'])
  },
  methods:{
    ...mapMutations('dialogStore',['setDialogOpen'])
  }

}
</script>

<style scoped>

</style>
