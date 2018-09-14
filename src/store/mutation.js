export default {
  changeThings (state, id) {
    state.todayList.forEach(t => {
      if (t.id === id) {
        t.done = true
      }
    })
  },
  deleteThings (state, id) {
    state.todayList = state.todayList.filter(item => {
      if (item.id === id) {
        state.deleteThingsList.push(item)
      }
      return item.id !== id
    })
  }
}
