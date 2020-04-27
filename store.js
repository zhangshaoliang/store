import Store from './plugins/store/index'

export default new Store({
  state: {
    title:"",
    list:[],
  },
  mutations: {
    SET_TITLE (state, val) {
      state.title = val
    },
    SET_LIST(state,val){
      state.list = val
    }
  }
})
