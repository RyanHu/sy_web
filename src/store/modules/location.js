/**
 * 定位相关的数据存储
 * @type {{location: {name: string, longitudeLatitude: string}}}
 */
const state = {
  location: {
    name: '', //定位的汉字名称
    longitudeLatitude: '' //定位的经纬度
  }
}
/**
 * 只取一次，不做为全局变量一直保存
 * @type {{location: (function(*): ({}|*))}}
 */
const getters = {
  location: state => {
    return state.location
  },
}

const mutations = {
  setLocation(state, location) {
    state.location = location
  },

}

const actions = {
  updateLocation({commit}, location) {
    commit('setLocation', location)
  },
  getLocationOnce({commit, state}) {
    let tmp = state.location
    let emptyLocation = {
      name: '',
      longitudeLatitude: ''
    }
    commit('setLocation',emptyLocation)
    return tmp
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
