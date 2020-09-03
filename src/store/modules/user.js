/* eslint-disable no-unused-vars */
const state = {
  userId: 0,
  custData: {}
}

const getters = {
  userId: state => state.userId,
  custData: state => state.custData
}

const mutations = {
  setUserId(state, userId) {
    state.userId = userId
  },
  setCustData(state, rest) {
    state.custData = rest
  }


}

const actions = {
  updateUserId({ commit, state }, userId) {
    commit('updateUserId', userId)
    localStorage.setItem('userId', userId)
  },
  getCustomerOnce({ commit, state }) {
    let tmp = state.custData
    commit('setCustData', {})
    return tmp
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
