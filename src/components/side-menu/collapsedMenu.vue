<template>
  <Dropdown>
    <dropdown transfer placement="right-end">
      <a href="javascript:void(0)">
        <icon :type="parentItem.icon"></icon>
      </a>
      <dropdown-menu slot="list">
        <dropdown-item>驴打滚</dropdown-item>
        <dropdown-item>炸酱面</dropdown-item>
        <dropdown-item>豆汁儿</dropdown-item>
        <dropdown placement="right-start">
          <dropdown-item>
            北京烤鸭
            <icon type="ios-arrow-forward"></icon>
          </dropdown-item>
          <dropdown-menu slot="list">
            <dropdown-item>挂炉烤鸭</dropdown-item>
            <dropdown-item>焖炉烤鸭</dropdown-item>
          </dropdown-menu>
        </dropdown>
        <dropdown-item>冰糖葫芦</dropdown-item>
      </dropdown-menu>
    </dropdown>
  </Dropdown>
</template>

<script>
  export default {
    name: "collapsedMenu",
    props: ['parentItem']
  }
</script>

<style scoped>

</style>
