<template>
  <div class="layout">
    <Layout style="height: 100%">
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <side-menu :isCollapsed = 'isCollapsed' :navList="navList" @on-select="turnToName">
          <div class="logo-con">
            <img v-show="!isCollapsed" :src="maxLogo" key="max-logo" />
            <img v-show="isCollapsed" :src="minLogo" key="min-logo" />
          </div>
        </side-menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
          <div class="bread">
            <Breadcrumb>
              <BreadcrumbItem :to="'/' + conf.HomePage">首页</BreadcrumbItem>
              <BreadcrumbItem v-for="breadItem in breadList" :key="breadItem.name">{{breadItem.meta.title || breadItem.name}}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="logout" style="float: right;margin-right: 30px">
            <Dropdown style="margin-left: 20px">
              <a href="javascript:void(0)">
                {{ $store.state.user.userName }}
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem><span @click="handleUserLogout">退出</span></DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Header>
        <div class="tags-nav">
          <tag-nav :list="tagsList" :on-close="closeTag()"></tag-nav>
        </div>
        <Content :style="{background: '#fff', minHeight: '260px'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import SideMenu from './side-menu/side-menu'
import tagNav from './tagNav/tagNav'
import minLogo from '../assets/images/logo-min.jpg'
import maxLogo from '../assets/images/logo.jpg'
import conf from '@/config/conf'

export default {
  name: 'Main',
  data () {
    return {
      activemenu: '',
      isCollapsed: false,
      tagsList: this.$store.state.app.tagsList,
      maxLogo,
      minLogo,
      conf
    }
  },
  components: {
    SideMenu,
    tagNav
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    navList () {
      return this.$store.getters.navList
    },
    breadList () {
      return this.$route.matched
    }
  },
  methods: {
    ...mapActions(['userLogout']),
    ...mapMutations(['addTagsList']),
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
    },
    turnToName (name) {
      this.$router.push({name: name})
    },
    handleUserLogout () {
      this.userLogout().then(res => {
        this.$router.push({name: this.conf.LoginPage})
      })
    },
    closeTag (tagLink) {
      /**
       * 根据子组件传递过来的标签的连接（因为连接是唯一的，名字可能会重复）
       * 匹配tagsLink数组中的包含改link的元素，然后删除
       *
       * */
    }
  },
  beforeRouteUpdate (to, from, next) {
    const item = {
      name: '',
      link: ''
    }
    item.name = to.meta.title
    item.link = to.fullPath
    let arr = this.tagsList.filter(function (item) {
      return item.link === to.fullPath
    })
    if (arr.length !== 0) {
      next()
    } else {
      this.addTagsList(item)
      next()
    }
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
  height: 100%;
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
.layout-header-bar>i{
  float: left;
  margin: 20px !important;
}
.bread{
  float: left;
}
.tags-nav{
  position: relative;
  width: 100%;
  height: 40px;
}
</style>
