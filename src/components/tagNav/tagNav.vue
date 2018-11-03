<template>
  <div class="tags-wrapper">
    <div class="btn-left" @click="scrollLeft()">
      <Button icon="ios-arrow-back" long></Button>
    </div>
    <div class="btn-right" @click="scrollRight()">
      <Button icon="ios-arrow-forward" long></Button>
    </div>
    <div class="btn-close">
      <Button icon="ios-close-circle-outline" long></Button>
    </div>
    <div class="tags-group" ref="scrollGroup">
      <div class="scroll-wrap" ref="scrollWrap" :style="{left: left+'px'}">
        <Tag type="dot" closable color="primary">首页</Tag>
        <Tag type="dot" closable @on-close="handleCloseTag()">标签二</Tag>
        <Tag type="dot" closable color="primary">首页</Tag>
        <Tag type="dot" closable>标签二</Tag>
        <Tag type="dot" closable color="primary">首页</Tag>
        <Tag type="dot" closable>标签二</Tag>
        <Tag type="dot" closable color="primary">首页</Tag>
        <Tag type="dot" closable>标签二</Tag>
        <Tag type="dot" closable color="primary">首页</Tag>
        <Tag type="dot" closable>标签二</Tag>
        <Tag type="dot" closable color="primary">首页</Tag>
        <Tag type="dot" closable>标签二</Tag>
        <Tag type="dot" closable color="primary">首页</Tag>
        <Tag type="dot" closable>标签二</Tag>
        <Tag type="dot" closable color="primary">首页</Tag>
        <Tag type="dot" closable>标签二</Tag>
        <Tag type="dot" closable color="primary">首页</Tag>
        <Tag type="dot" closable>标签二</Tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tagNav',
  data () {
    return {
      left: 0,
      speed: 300
    }
  },
  methods: {
    scrollLeft () {
      let divScrool = this.$refs.scrollWrap
      let divGroup = this.$refs.scrollGroup
      let wGroup = divGroup.offsetWidth
      let wScroll = divScrool.offsetWidth
      let lRemainWidth = wGroup - wScroll
      if (this.left > lRemainWidth) {
        if ((this.left - this.speed) > lRemainWidth) {
          this.left -= this.speed
        } else {
          this.left = lRemainWidth
        }
      }
    },
    scrollRight () {
      if (this.left < 0) {
        if ((this.left + this.speed) < 0) {
          this.left += this.speed
        } else {
          this.left = 0
        }
      }
    }
  }
}
</script>

<style scoped>
.tags-wrapper{
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;
}
.tags-wrapper button{
  outline: none;
}
.tags-group{
  position: absolute;
  top: 0;
  bottom: 0;
  white-space: nowrap;
  left: 28px;
  right: 61px;
  box-shadow: 0 0 3px 2px rgba(130,130,130,.2) inset;
  padding: 2px 4px 0;
}
.btn-left{
  position: absolute;
  left: 0;
  top: 0;
  width: 28px;
  height: 100%;
  z-index: 2;
}
.btn-left button{
  border-radius: 0;
  height: 100%;
  font-size: 20px;
  padding: 0;

}
.btn-right{
  position: absolute;
  right: 33px;
  top: 0;
  width: 28px;
  height: 100%;
  z-index: 2;
}
.btn-right button{
  border-radius: 0;
  height: 100%;
  font-size: 20px;
  padding: 0;
}
.btn-close{
  position: absolute;
  right: 0px;
  top: 0;
  width: 33px;
  height: 100%;
  z-index: 2;
}
.btn-close button{
  border-radius: 0;
  height: 100%;
  font-size: 20px;
  padding: 0;
  border-left: 0;
}
.scroll-wrap{
  position: absolute;
  transition: left 0.5s ease-in;
}
</style>
