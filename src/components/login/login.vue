<template>
  <div class="login">
    <div class="login-con">
      <Card>
        <p slot="title">精时恒达工单系统</p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline"  @keydown.enter.native="handleSubmit">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
            <Icon type="ios-person" size="16" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="ios-lock" size="16" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit" long>登录</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 4, message: 'The password length cannot be less than 5 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions([ 'handleLogin' ]),
    handleSubmit () {
      this.$refs['formInline'].validate((valid) => {
        if (valid) {
          this.handleLogin(this.formInline)
            .then((res) => {
              this.$router.push({name: 'home'})
            })
            .catch((error) => {
              this.$Message.error(error.data)
            })
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>

<style scoped>
  .login{
    position: relative;
    background: url("../../assets/images/login-bg.jpg");
    height: 100%;
  }
  .login-con{
    position: absolute;
    width: 300px;
    right: 200px;
    top: 400px;
  }
</style>
