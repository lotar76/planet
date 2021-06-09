export default {
    namespaced: true,
    state: {
        title: '',
        open: false,
        component:'NoneForm'
    },
    getters: {
        GET_DIALOG_COMPONENT(state) {
            return state.component
        },
        GET_DIALOG_OPEN(state) {
            return state.open
        },
        GET_DIALOG_TITLE(state) {
            return state.title
        }
    },
    mutations: {
        clearDialogOptions(state) {
            state.title = ''
            state.open = false
        },
        setDialogOpen(state, payload) {
            state.open = payload.open
            state.title = payload.title || ''
            state.component = payload.component || 'NoneForm'
        },
        setDialogTitle(state, payload) {
            state.title = payload
        }

    },
    actions: {}
}
