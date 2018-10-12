<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <side-menu :isCollapsed = 'isCollapsed' :navList="navList"></side-menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
        </Header>
        <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
          <router-view></router-view>
        </Content>
      </Layout>
      <Layout>
        <Header :style="{position: 'fixed', width: '100%', zIndex: 999}">
          <Menu ref="menu" mode="horizontal" theme="dark" :active-name="this.$route.path">
            <div class="layout-logo">My Todo App</div>
            <div class="layout-nav">
              <MenuItem name="/home" to="/home">
                <Icon type="ios-navigate"></Icon>
                首页
              </MenuItem>
              <MenuItem name="/undoneThings/1" to="/undoneThings/1">
                <Icon type="ios-keypad"></Icon>
                <Badge dot class="demo-badge" v-if="undoneThings.length !== 0"></Badge>
                待完成
              </MenuItem>
              <MenuItem name="/doneThings/1" to="/doneThings/1">
                <Icon type="ios-analytics"></Icon>
                已完成
              </MenuItem>
              <MenuItem name="/deleteThingsList/1" to="/deleteThingsList/1">
                <Icon type="ios-paper"></Icon>
                已删除
              </MenuItem>
            </div>
          </Menu>
        </Header>
        <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
          <router-view></router-view>
        </Content>
        <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SideMenu from './side-menu/side-menu'
export default {
  name: 'Main',
  data () {
    return {
      activemenu: '',
      isCollapsed: false,
      navList: this.$store.getters.navList
    }
  },
  components: {
    SideMenu
  },
  computed: {
    ...mapGetters(['undoneThings']),
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
    }
  },
  mounted () {
    this.$store.dispatch('getTodayList')
    this.$store.dispatch('getDeleteThings')
    console.log(this.$store.getters.navList)
  }
}
</script>

<style scoped>
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
.layout-header-bar{
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon{
  transition: all .3s;
}
.rotate-icon{
  transform: rotate(-90deg);
}
.menu-item span{
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}
.menu-item i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span{
  width: 0px;
  transition: width .2s ease;
}
.collapsed-menu i{
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
