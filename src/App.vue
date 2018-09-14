<template>
  <div id="app">
    <div class="layout">
      <Layout>
        <Header :style="{position: 'fixed', width: '100%', zIndex: 999}">
          <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">My Todo App</div>
            <div class="layout-nav">
              <MenuItem name="1">
                <Icon type="ios-navigate" ></Icon>
                <router-link to="/" tag="span">首页</router-link>
              </MenuItem>
              <MenuItem name="2">
                <Icon type="ios-keypad"></Icon>
                <Badge dot class="demo-badge"></Badge>
                <router-link to="/undoneThings" tag="span"><span>待完成</span></router-link>
              </MenuItem>
              <MenuItem name="3">
                <Icon type="ios-analytics"></Icon>
                <router-link to="/doneThings" tag="span">已完成</router-link>
              </MenuItem>
              <MenuItem name="4">
                <Icon type="ios-paper"></Icon>
                <router-link to="/deleteThingsList" tag="span">已删除</router-link>
              </MenuItem>
            </div>
          </Menu>
        </Header>
        <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
          <router-view></router-view>
        </Content>
        <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
      </Layout>
    </div>
    <h1>My Todo App!</h1>
    <todo-list></todo-list>
  </div>

</template>

<script>
import todoList from './components/todoList'
import undoneThings from './components/undoneThings'

export default {
  name: 'App',
  components: {
    'todo-list': todoList,
    undoneThings
  }
}
</script>

<style>
  #app{
      width: 100%;
      margin: 0 auto;
  }
  #app h1{
    text-align: center;
    margin: 2rem 0;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    line-height: 30px;
    color: #fff;
    padding-left: 10px;
  }
  .layout-nav{
    width: 460px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
  .demo-badge{
    display: inline-block;
    position: absolute;
    top: 22px;
    right: 14px;
  }
</style>
