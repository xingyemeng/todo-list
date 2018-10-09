<template>
    <div>
      <div class="bread">
        <Breadcrumb>
          <BreadcrumbItem>主页&nbsp;&nbsp;&nbsp;&nbsp;/</BreadcrumbItem>
        </Breadcrumb>
      </div>
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
            <p slot="title">添加计划</p>
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
              <FormItem label="计划" prop="title">
                <Input v-model="formItem.title" placeholder="输入计划名" />
              </FormItem>
              <FormItem label="计划详述" prop="text">
                <Input v-model="formItem.text" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="计划详述..."></Input>
              </FormItem>
              <FormItem label="期待完成时间" prop="date">
                <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
              </FormItem>
              <FormItem label="计划优先级" prop="rate">
                <InputNumber :max="5" :min="1" v-model="formItem.rate"></InputNumber>
              </FormItem>
              <FormItem :style="{position: 'relative'}">
                <div class="demo-spin-container" :style="{display: loading}">
                  <Spin fix></Spin>
                </div>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      loading: 'none',
      selectedWill: '',
      willList: this.$store.state.willList,
      formItem: {
        title: '',
        rate: null,
        date: '',
        text: ''
      },
      ruleValidate: {
        title: [
          {required: true, message: '计划名称不能为空', trigger: 'blur'}
        ],
        rate: [
          {required: true, type: 'number', message: '计划级别不能为空', trigger: 'blur'}
        ],
        date: [
          {required: true, message: '请选择期望完成时间', type: 'date', trigger: 'change'}
        ],
        text: [
          {required: true, message: '描述不能为空', trigger: 'blur'},
          {min: 10, message: '描述不能少于100字符'}
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['filterTodayList'])
  },
  methods: {
    ...mapActions(['createThing']),
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = 'inline-block'
          let ctx = this
          this.createThing({things: this.formItem, ctx: ctx, name: name})
        } else {
          this.message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style scoped>
  .todayThings li{
    display: flex;
    justify-content:space-between;
    line-height: 32px;
  }
  .demo-spin-container{
    width: 56px;
    height: 32px;
    left: 0px;
    top: 1px;
    position: absolute;
    border: 1px solid #eee;
    border-radius: 5px;
  }
</style>
