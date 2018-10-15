<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu :active-name="this.$route.path" theme="dark" width="auto" :class="menuitemClasses" v-show="!isCollapsed">
      <template v-for="nav in navList">
        <template v-if="nav.children && nav.children.length === 1">
          <side-menu-item v-if="showChildren(nav)" :key="`nav-${nav.name}`" :parent-item="nav"></side-menu-item>
          <MenuItem v-else :key="`nav-${nav.children[0].name}`" :name="nav.children[0].name">
            <Icon :type="nav.children[0].icon || ''"></Icon>
            <span>{{ nav.children[0].meta.title }}</span>
          </MenuItem>
        </template>
        <template v-else>
          <side-menu-item v-if="showChildren(nav)" :key="`nav-${nav.name}`" :parent-item="nav"></side-menu-item>
          <MenuItem v-else :key="`nav-${nav.name}`" :name="nav.name">
            <Icon :type="nav.icon || ''"></Icon>
            <span>{{ nav.meta.title }}</span>
          </MenuItem>
        </template>
      </template>
    </Menu>
    <div class="side-menu-collapsed" v-show="isCollapsed">
      <template v-for="item in navList">
        <collapsed-menu v-if="item.children && item.children.length > 1 " hide-title :parent-item="item"></collapsed-menu>
        <Tooltip v-else :content="(item.meta && item.meta.title) || (item.children && item.children[0] && item.children[0].meta.title)" placement="left">
          <Icon :type="item.icon || (item.children && item.children[0].icon)" size="30" color="#fff" style="padding:6px 22px"></Icon>
        </Tooltip>
      </template>
    </div>
  </div>
</template>

<script>
  import SideMenuItem from './side-menu-item'
  import CollapsedMenu from './collapsedMenu'

  export default {
    name: "SideMenu",
    components: {
      SideMenuItem,
      CollapsedMenu
    },
    data () {
      return {

      }
    },
    props: {
      isCollapsed: Boolean,
      navList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    computed: {
      menuitemClasses () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    methods: {
      showChildren(item){
        return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
      }
    }
  }
</script>

<style scoped>
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
  .side-menu-wrapper .logo-con img{
    width: 100%;
    padding: 10%;
  }
</style>
