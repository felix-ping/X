const search = {
  state: {

    searchlistTw: null,
    searchlistQz: null,
    searchlistIdea: null,
    searchlistHy: null,
    searchlistSc: null
  },
  mutations: {
    setSearchlistTw(state, aload) { //
      state.searchlistTw = aload
    },
    setSearchlistQz(state, aload) {
      state.searchlistQz = aload
    },
    setSearchlistIdea(state, aload) {
      state.searchlistIdea = aload
    },
    setSearchlistHy(state, aload) {
      state.searchlistHy = aload
    },
    setSearchlistSc(state, aload) {
      state.searchlistSc = aload
    }
  },
  actions: {

  }
}

export default search
