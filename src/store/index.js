import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import dialogStore from "@/store/modules/dialog";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    planets:null,
    planetsById:null,
    options:null
  },
  getters:{
    getOptions(state){
      return state.options
    },
    getPlanets(state){
      return state.planets
    }
    ,getPlanetsById(state){
      return state.planetsById
    }
  },
  mutations: {
    setOptions(state,payload){
      state.options = payload
    },
    setPlanet(state,payload){
      state.planets = payload
    },
    setPlanetById(state,payload){
      state.planetsById = payload
    }
  },
  actions: {
    async getPlanetsApi({state,commit}){
      if(!state.planets) {
        const {data} = await axios.get('https://api.le-systeme-solaire.net/rest.php/bodies')
        commit('setPlanet', data.bodies)
      }
    },
    async getPlanetsApiById({commit}, payload){
        const {data} = await axios.get('https://api.le-systeme-solaire.net/rest.php/bodies/'+payload)
        commit('setPlanetById', data)
    },
    deleteItems({state}, payload){
      const index = state.planets.findIndex((ele) => ele.id === payload)
      state.planets.splice(index,1)
    },
    createItem({state}, payload){
      state.planets.unshift(payload)
      this.commit('dialogStore/clearDialogOptions')
    },
    editItem({state}, payload){
      const index = state.planets.findIndex((ele) => ele.id === payload.id)
      state.planets.splice(index,1,payload)
      this.commit('dialogStore/clearDialogOptions')

    }

  },
  modules: {
    dialogStore
  }
})
