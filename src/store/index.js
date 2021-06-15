import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import dialogStore from "@/store/modules/dialog";


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading:false,
        activeBtn:true,
        page: 1,
        planets: null,
        archive: [],
        planetsById: null,
        options: null
    },
    getters: {
        getLoading(state){
            return state.loading
        },
        getActiveBtn(state){
            return state.activeBtn
        },
        getOptions(state) {
            return state.options
        },
        getPlanets(state) {
            return state.planets
        },
        getArchive(state) {
            return state.archive
        }
        , getPlanetsById(state) {
            return state.planetsById
        }
    },
    mutations: {
        setOptions(state, payload) {
            state.options = payload
        },
        setPlanet(state, payload) {
            state.planets = payload
        },
        setPlanetById(state, payload) {
            state.planetsById = payload
        }
    },
    actions: {
        async getPlanetsApi({state, commit}) {
            state.loading = true
            let params = {
                order: 'id',
                page: state.page+',10'
            }
            const {data} = await axios.get('https://api.le-systeme-solaire.net/rest.php/bodies', {params})

            if(data.bodies.length){
                const result = data.bodies.map((element) => {
                    return {...element, source_app: 'api', status_app: true}
                })

                if (state.planets) {
                    commit('setPlanet', state.planets.concat(result))
                } else {
                    commit('setPlanet', result)
                }
                state.page++
            } else {
                state.activeBtn = false
            }
            state.loading = false

        },
        async getPlanetsApiById({state,commit}, payload) {
            const index = state.planets.findIndex((ele) => ele.id === payload)
            if( state.planets[index].source_app === 'api'){
                const {data} = await axios.get('https://api.le-systeme-solaire.net/rest.php/bodies/' + payload)
                commit('setPlanetById', data)
            } else {
                commit('setPlanetById', state.planets[index])
            }

        },
        deleteItems({state}, payload) {
            const index = state.planets.findIndex((ele) => ele.id === payload)
            state.planets[index].status_app = false
        },
        createItem({state}, payload) {
            state.planets.unshift({...payload, source_app: 'user', status_app: true})
            this.commit('dialogStore/clearDialogOptions')
        },
        editItem({state}, payload) {
            const index = state.planets.findIndex((ele) => ele.id === payload.id)
            state.planets.splice(index, 1, {...payload, source_app: 'user', status_app: true})
            this.commit('dialogStore/clearDialogOptions')

        }

    },
    modules: {
        dialogStore
    }
})
