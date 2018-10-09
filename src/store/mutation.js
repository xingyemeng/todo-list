export default {
  changeThings (state, id) {
    state.todayList.forEach(t => {
      if (t.id === id) {
        t.done = true
      }
    })
  },
  getDeleteThings (state, data) {
    state.deleteThingsList = data
  },
  getTodayList (state, data) {
    state.todayList = data
  }
}
