export default {
  data () {
    return {
      page: {
        pNum: 1,
        pCount: 10
      }
    }
  },
  methods: {

    pNumChange (index) {
      this.page.pNum = index
      this.handleGetWorkList(this.page)
    },
    pCountChange (num) {
      this.page.pCount = num
      this.handleGetWorkList(this.page)
    }
  },
  mounted () {
    this.handleGetWorkList(this.page)
    this.handleWorkCount()
  }
}
