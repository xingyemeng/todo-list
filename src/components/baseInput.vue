<template>
  <input type="text" class="input" v-bind:value="value" v-on="inputListeners">
</template>

<script>
export default {
  name: 'base-input',
  props: ['value'],
  computed: {
    inputListeners: function () {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/variables";
  .input{
    width: 100%;
    padding: 8px 10px;
    border: 1px solid $vue-blue;
  }
</style>
