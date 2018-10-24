<template>
  <div class="post-work">
    <Row>
      <Col span="8" offset="1">
        <Card>
          <p slot="title">今天计划</p>
          <ul class="todayThings">
            <li v-for="todo in filterTodayList" :key="todo.id">{{ todo.title }} <span><Rate disabled allow-half v-model="todo.rate" /></span></li>
          </ul>

        </Card>
      </Col>
      <Col span="13" offset="1">
        <Card dis-hover>
          <p slot="title">提交工单</p>
          <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
            <FormItem label="标题" prop="title">
              <Input v-model="formItem.title" placeholder="输入计划名" />
            </FormItem>
            <FormItem label="工单描述" prop="text">
              <Input v-model="formItem.text" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="计划详述..."></Input>
            </FormItem>
            <FormItem label="期待完成时间" prop="date">
              <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
            </FormItem>
            <FormItem label="计划优先级" prop="rate">
              <InputNumber :max="5" :min="1" v-model="formItem.rate"></InputNumber>
            </FormItem>
            <FormItem :style="{position: 'relative'}">
              <Button type="primary" @click="handleSubmit('formItem')">提交</Button>
              <Button style="margin-left: 8px" @click="handleReset('formItem')">重置</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "PostWork",
  data () {
    return {
      formItem: {
        title: '',
        text: '',
        date: '',
        rate: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
