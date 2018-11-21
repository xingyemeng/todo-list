<template>
  <div class="workview">
    <Table border :columns="columns7" :data="worksList"></Table>
    <Page :total="workCount" :style="{margin: '20px 0'}" size="small" show-elevator show-sizer @on-change="pNumChange" @on-page-size-change="pCountChange"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import mixin from '../mixin/work'

export default {
  name: 'workView',
  mixins: [mixin],
  data () {
    return {
      columns7: [
        {
          title: 'Name',
          key: 'title',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.title)
            ])
          }
        },
        {
          title: '提交人',
          key: 'author'
        },
        {
          title: '技术',
          key: 'getter'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '查看详细')
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['worksList'])
  },
  methods: {
    ...mapActions(['handleGetWorkList', 'handleWorkCount']),
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.worksList[index].title}<br>内容：${this.worksList[index].content}`
      })
    }
  }
}
</script>

<style scoped>

</style>
