<template>
  <dropdown transfer :placement="placement">
    <a href="javascript:void(0)" :class="!hideTitle ? 'drop-menu-a' : ''">
      <span v-if="!hideTitle">{{ parentItem.meta.title }}</span>
      <icon v-else :type="parentItem.icon" size="30" color="#fff" style="padding: 6px 22px"></icon>
    </a>
    <dropdown-menu slot="list">
      <template v-for="child in parentItem.children">
        <collapsedMenu v-if="child.children && (child.children.length >1 || (child.meta && child.meta.showAlways))" :parent-item="child"></collapsedMenu>
        <dropdown-item v-else>{{ child.meta.title }}</dropdown-item>
      </template>
    </dropdown-menu>
  </dropdown>
</template>

<script>
export default {
  name: "collapsedMenu",
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    parentItem: Object
  },
  data () {
    return {
      placement: 'right-start'
    }
  }
}
</script>

<style scoped>
  .ivu-dropdown-transfer .ivu-dropdown{
    width: 100%;
    margin: 0;
    line-height: normal;
    padding: 7px 0 7px 16px;
    font-size: 12px!important;
    white-space: nowrap;
    cursor: pointer;
    transition: background .2s ease-in-out;
  }
  .drop-menu-a{
    display: inline-block;
    width: 100%;
    color: #515a6e;
  }
</style>
