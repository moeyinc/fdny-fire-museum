const store = {
  state: {
    paths: []
  },
  getSharedPaths () {
    return this.state.paths
  },
  setSharedPaths (_paths) {
    this.state.paths = _paths
  },
  clearSharedPaths () {
    this.state.paths = []
  }
}

export default {
  store
}
