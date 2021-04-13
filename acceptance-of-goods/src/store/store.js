import { createStore } from 'vuex'

export default createStore({
  strict: true,
  state: {
    newContract: null
  },
  mutations: {
    newContract(state, contract){
      state.newContract = contract instanceof Object ? contract.clone() : null;
    }
  },
  actions: {
  },
  modules: {
  }
})
