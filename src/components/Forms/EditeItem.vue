<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
            cols="6"

        >
          <v-text-field
              autocapitalize="none"
              v-model="item.name"
              :rules="nameRules"
              label="Наименование объекта *"
              required
          ></v-text-field>
        </v-col>


        <v-col
            v-if="item.discoveryDate && item.discoveryDate.split('/').length === 3 && item.discoveryDate.split('/')[0] !== '??'"
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
                  :value="item.discoveryDate ? item.discoveryDate : formatDate(new Date().toISOString().substr(0, 10))"
                  label="Дата открытия"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  @click="date = item.discoveryDate ? parseDate(item.discoveryDate) : formatDate(new Date().toISOString().substr(0, 10))"
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
            v-else
            cols="6"
        >
          <v-text-field
              style="width: 80%; display:inline-block;"
              v-show="!showCalendar"
              :value="item.discoveryDate || 'дата не указана'"
              disabled
              label="Дата открытия"

          >
          </v-text-field>
          <v-icon  v-show="!showCalendar" style="margin: 0 5px;" @click="showCalendar = !showCalendar">mdi-calendar</v-icon>

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
                  v-show="showCalendar"
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
              autocapitalize="none"
              v-model="item.discoveredBy"
              label="Кто открыл"
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="4"
        >
          <v-checkbox
              v-model="item.isPlanet"
              label="Планета"
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-container>
    <v-btn small color="primary" :disabled="!valid"
           @click="editItem({
    'id':getOptions,
    'name':item.name,
    'discoveredBy':item.discoveredBy,
    'discoveryDate':item.discoveryDate ,
    'isPlanet':item.isPlanet})">
      отредактировать
    </v-btn>
  </v-form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "EditeItem",
  data:(vm) =>({

    showCalendar:false,
    date:null,
    menu1:false,
      item:null,
      valid:false,
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      nameRules: [
        v => !!v || 'Это обязательное поле',
      ],

  }),
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date)
      this.item.discoveryDate = this.formatDate(this.date)
    },
  },
  methods:{
    ...mapActions(['editItem']),
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

      const [ day,month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
  computed:{
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
    ...mapGetters(['getOptions','getPlanets'])
  },
  created() {
    this.item = Object.assign({}, this.getPlanets.find((element)=>{return element.id === this.getOptions}))
    // this.dateFormatted = this.$set(this.item.discoveryDate)
  }

}
</script>

<style scoped>

</style>