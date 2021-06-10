<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
            cols="6"
        >
          <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Наименование объекта *"
              required
          ></v-text-field>
        </v-col>
        <v-col
            cols="6"
        >
          <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="dateFormatted"
                  label="Дата открытия"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="date"
                no-title
                @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col
            cols="12"

        >
          <v-text-field

              v-model="openPeople"
              label="Кто открыл"
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="4"
        >
          <v-checkbox
              v-model="isPlanet"
              label="Планета"
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-container>
    <v-btn small color="primary" :disabled="!valid"
           @click="createItem({
    'id':name, name:name,
    'discoveredBy':openPeople,
    'discoveryDate':date ?  formatDateIn(date): null,
    'moons':countMoon,
    isPlanet
    })">
      сохранить
    </v-btn>
  </v-form>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "CreateItem",
  data: vm => ({
    valid: false,
    name: '',
    date: null,
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    openPeople: '',
    countMoon: 0,
    isPlanet: false,
    nameRules: [
      v => !!v || 'Это обязательное поле',
    ],

  }),
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },
  methods: {
    ...mapActions(['createItem']),
    formatDateIn(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  }
}
</script>

<style scoped>

</style>