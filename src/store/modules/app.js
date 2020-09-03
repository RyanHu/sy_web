const state = {
  showMask: 0,
  loginKey: '',
  loading: false,
  token:''
}

const getters = {
  showMask: state => state.showMask,
  loginKey: state => state.loginKey,
  loading: state => state.loading,
  token: state=>state.token
}

const mutations = {
  setShowMask(state, showMask) {
    state.showMask = showMask
  },
  setLoginKey(state, loginKey) {
    state.loginKey = loginKey
  },
  setLoading(state,Loading){
    state.loading = Loading
  },
  setToken(state,token){
    state.token =token
  }
}


const actions = {
  upDateShowMask({ commit }, isShow) {
    commit('setShowMask', isShow)
  },
  updateLoginKey({ commit }, loginKey) {
    commit('setLoginKey', loginKey)
  },
  updateLoadingStatus({ commit }, loading) {
    commit('setLoading', loading)
  },
  updateToken({ commit },token)
  {
    commit('setToken', token)

  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
