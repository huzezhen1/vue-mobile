const state = () => ({
  userId: undefined
})

// commit
const mutations = {
  /**
   * 设置用户信息
   */
  setUserInfo (state, user) {
    state = Object.assign(state, {
      userId: user.userId
    })
  },
  /**
   * 清除用户信息
   */
  clearUserInfo (state) {
    state.userId = undefined
  }
}

// dispatch
const actions = {
  /**
   * 获取用户信息
   */
  getInfo ({ commit }) {
    return this.$axios.get('u/info/detail').then(result => {
      if (result.isSuccess) {
        const user = result.data
        const data = {
          userId: user.userId
        }
        result.data = data
        commit('setUserInfo', result.data)
      } else {
        // TODO: 未登陆情况
        commit('clearUserInfo')
        result.data = {}
      }
      return result
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
