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
              <BreadcrumbItem v-for="breadItem in breadList" :key="breadItem.name" v-if="breadItem.name && breadItem.meta.title !== '首页'">{{breadItem.meta.title || breadItem.name}}</BreadcrumbItem>
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
          <tag-nav :list="tagsList" @on-close="closeTag" @close-tag="closeMoreTag"></tag-nav>
        </div>
        <Content :style="{background: '#fff', minHeight: '260px', padding: '20px'}">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
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
import {removeLocalStorage} from '@/libs/util.js'

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
    ...mapMutations(['addTagsList', 'getTagsFromLocal']),
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
    },
    turnToName (name) {
      this.$router.push({name: name})
    },
    handleUserLogout () {
      this.userLogout().then(res => {
        this.$router.push({name: this.conf.LoginPage})
        // 退出用户store的状态会缓存起来，以至于下一个用户登录可以看到上一个用户的tagsList标签
        this.$router.go(0)
      })
    },
    closeTag (tagLink) {
      /**
       * 根据子组件传递过来的标签的连接（因为链接是唯一的，名字可能会重复）
       * 匹配tagsLink数组中的包含改link的元素，然后删除
       *
       * */
      let index = this.tagsList.findIndex(function (item, index) {
        return item.link === tagLink
      })
      removeLocalStorage(index, 'this')
      // 检测改标签是否是打开状态
      if (this.tagsList[index].link === this.$route.fullPath) {
        this.tagsList.splice(index, 1)
        if (index > 1) {
          this.$router.push(this.tagsList[index - 1].link)
        } else {
          if (this.tagsList.length > 1) {
            this.$router.push(this.tagsList[index].link)
          } else {
            this.$router.push('/home')
          }
        }
      } else {
        // 标签是未打开状态，所以直接关闭，路由不跳转
        this.tagsList.splice(index, 1)
      }
    },
    closeMoreTag (link) {
      if (typeof (link) === 'string') {
        let index = this.tagsList.findIndex(function (item, index) {
          return item.link === link
        })
        removeLocalStorage(index, 'others')
        const arr = this.tagsList.splice(index, 1)
        this.tagsList.splice(1, this.tagsList.length - 1, arr[0])
      } else {
        removeLocalStorage()
        this.tagsList.splice(1, this.tagsList.length - 1)
        this.$router.push('/home')
      }
    }
  },
  watch: {
    '$route' (newRoute) {
      const item = {
        name: '',
        link: ''
      }
      item.name = newRoute.meta.title
      item.link = newRoute.fullPath
      item.rName = newRoute.name
      let arr = this.tagsList.filter(function (item) {
        return item.link === newRoute.fullPath
      })
      if (arr.length === 0) {
        this.addTagsList(item)
      }
    }
  },
  mounted () {
    // 从localStorage获取tagsList
    if (JSON.parse(localStorage.getItem('tagsList')) !== null) {
      this.getTagsFromLocal(JSON.parse(localStorage.getItem('tagsList')))
    }
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagsList.find(item => item.link === this.$route.fullPath)) {
      this.$router.push('/home')
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
