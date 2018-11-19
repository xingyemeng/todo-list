<template>
  <div class="workview">
    <Table border :columns="columns7" :data="$store.state.app.worksList"></Table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'workView',
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
              }, 'View'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, 'Delete')
            ])
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions(['handleGetWorkList']),
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.worksList[index].title}<br>内容：${this.worksList[index].content}`
      })
    }
  },
  mounted () {
    this.handleGetWorkList()
  }
}
</script>

<style scoped>

</style>
