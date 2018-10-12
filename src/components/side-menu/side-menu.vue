<template>
  <div class="side-menu-wrapper">
    <Menu :active-name="this.$route.path" theme="dark" width="auto" :class="menuitemClasses" v-if="!isCollapsed">
      <template v-for="nav in navList">
        <template v-if="nav.children && nav.children.length === 1">
          <MenuItem v-if="nav.meta && nav.meta.hide" :name="nav.children[0].name">
            <Icon type="ios-navigate"></Icon>
            <span>{{ nav.children[0].name }}</span>
          </MenuItem>
          <Submenu v-else :name="nav.children[0].name">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              <span>{{ nav.children[0].name }}</span>
            </template>
            <MenuItem :name="nav.children[0].name">{{ nav.children[0].name }}</MenuItem>
          </Submenu>
        </template>
        <template v-else>
          <Submenu :name="nav.name">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              <span>{{ nav.name }}</span>
            </template>
            <template v-for="item in nav.children">
              <MenuItem :name="item.name">{{ item.name }}</MenuItem>
            </template>
          </Submenu>
        </template>
      </template>
    </Menu>
    <div v-else>
      <p :style="{color: '#ffffff'}">123123123123123122</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SideMenu",
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
</style>
