<template>
  <div class="workpost">
    <Form ref="worksForm" :model="formData" :rules="ruleData" :label-width="100">
      <FormItem label="文章标题：" prop="title">
        <Input v-model="formData.title" />
      </FormItem>
      <FormItem label="内容：">
        <div ref="editor"></div>
      </FormItem>
      <FormItem label="完成时间：" prop="date">
        <DatePicker type="date" placeholder="选择时间" v-model="formData.date"></DatePicker>
      </FormItem>
      <FormItem label="对应技术：" prop="getter">
        <Select v-model="formData.getter" placeholder="请选择" style="width:200px">
          <Option value="杨少鑫">杨少鑫</Option>
          <Option value="杨">杨</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">提交</Button>
        <Button type="default" @click="handleReset" style="margin-left: 20px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import E from 'wangeditor'
import { mapActions } from 'vuex'
export default {
  name: 'workPost',
  data () {
    return {
      title: '',
      formData: {
        title: '',
        content: '',
        date: '',
        getter: '',
        author: this.$store.state.user.userName,
        time: new Date(),
        group: this.$store.state.user.userGroup
      },
      ruleData: {
        title: [
          {required: true, message: '标题不能为空', trigger: 'blur'}
        ],
        date: [
          {required: true, type: 'date', message: '完成时间不能空', trigger: 'change'}
        ],
        getter: [
          {required: true, message: '请选择完成人', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    ...mapActions(['handlePostWork']),
    handleSubmit () {
      if (this.formData.content === '') {
        this.$Message.error('内容不能为空!')
        return
      }
      this.$refs.worksForm.validate(valid => {
        if (valid) {
          this.handlePostWork(this.formData).then(res => {
            console.log(res)
            this.$Message.success('工单' + res.data + '提交成功')
          }).catch(err => {
            console.error(err)
            this.$Message.error(err)
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset () {

    },
    success () {
      this.$Message.success('提交成功')
    },
    error () {
      this.$Message.error('标题或内容不能为空')
    }
  },
  mounted () {
    let editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      this.formData.content = html
    }
    editor.create()
  }
}
</script>

<style scoped>
  .title{
    margin: 20px 0;
  }
  .btn{
    margin: 20px 0;
  }
</style>
