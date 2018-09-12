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
      willList: [
        {id: 0, title: 'm.wbiao.com', text: 'm.wbiao.com添加栏目'},
        {id: 1, title: '万国手表', text: '万国手表维修流程'},
        {id: 2, title: '劳力士手表', text: '劳力士手表维修流程'},
        {id: 3, title: '浪琴手表', text: '浪琴手表维修流程'}
      ]
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
