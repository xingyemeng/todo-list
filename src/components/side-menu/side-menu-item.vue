<template>
  <Submenu :name="parentItem.name">
    <template slot="title">
      <Icon :type="parentItem.icon"></Icon>
      <span>{{ parentItem.meta.title }}</span>
    </template>
    <template v-for="item in parentItem.children">
      <template v-if="item.children && item.children.length ===1">
        <side-menu-item v-if="showChildren(item)" :key="`nav-${item.name}`" :parent-item="item"></side-menu-item>
        <MenuItem v-else :key="`nav-${item.children[0].name}`" :name="item.children[0].name">
          <Icon :type="item.children[0].icon || ''"></Icon>
          <span>{{ item.children[0].meta.title }}</span>
        </MenuItem>
      </template>
      <template v-else>
        <side-menu-item v-if="showChildren(item)" :key="`nav-${item.name}`" :parent-item="item"></side-menu-item>
        <MenuItem v-else :key="`nav-${item.name}`" :name="item.name">
          <Icon :type="item.icon || ''"></Icon>
          <span>{{ item.meta.title }}</span>
        </MenuItem>
      </template>
    </template>
  </Submenu>
</template>

<script>
  export default {
    name: "side-menu-item",
    props: ['parentItem'],
    methods: {
      showChildren(item){
        return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
      }
    }
  }
</script>

<style scoped>

</style>
