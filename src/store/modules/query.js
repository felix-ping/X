
const tagsView = {
  state: {
    imgText: {}
  },
  mutations: {
    ADD_VISITED_VIEW: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    },
    SET_IMG_TEXT: (state, view) => {
      state.imgText = view
    }
  },
  actions: {
    setImgViewQuery({ commit }, view) {
      commit('SET_IMG_TEXT', view)
    }
  }
}

export default tagsView
