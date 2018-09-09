<template>
  <li>
    {{item.text}}
    <Button type="primary" shape="circle" icon="md-close" @click="$emit('removeItem',item.id)"></Button>
  </li>
</template>

<script>
export default {
  name: 'todoItem',
  props: ['item']
}
</script>

<style scoped>
  li{
    font-size: 16px;
    margin-left: 25px;
  }
</style>
