<template>
    <div>
      <Row>
        <Col span="11">
          <Card>
            <p slot="title">今天计划</p>
            <ul class="todayThings">
              <li v-for="todo in filterTodayList" :key="todo.id">{{ todo.title }} <span><Rate disabled allow-half v-model="todo.rate" /></span></li>
            </ul>
          </Card>
        </Col>
        <Col span="11" offset="2">
          <Card dis-hover>
            <p slot="title">备忘录</p>
            <ul>
              <li v-for="will in willList" :key="will.id">{{ will.text }}</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      selectedWill: '',
      willList: this.$store.state.willList
    }
  },
  computed: {
    ...mapGetters(['filterTodayList'])
  }
}
</script>

<style scoped>
  .todayThings li{
    display: flex;
    justify-content:space-between;
    line-height: 32px;
  }
</style>
