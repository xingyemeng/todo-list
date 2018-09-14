<template>
  <div>
    <Table border :columns="columns7" :data="doneThings"></Table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'doneThings',
  methods: {
    show (index) {
      console.log(this.$router)
      this.$Modal.info({
        title: 'User Info',
        content: `Id：${this.doneThings[index].id}<br>事件名：${this.doneThings[index].title}<br>事情简介：${this.doneThings[index].text}`
      })
    },
    remove (index) {
      this.doneThings.splice(index, 1)
    },
    ...mapMutations(['deleteThings'])
  },
  data () {
    return {
      columns7: [
        {
          title: 'Id',
          key: 'id',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'ios-person'
                }
              }),
              h('strong', params.row.id)
            ])
          }
        },
        {
          title: '事件名',
          key: 'title'
        },
        {
          title: '事情简介',
          key: 'text'
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
              }, '查看详细'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteThings(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['doneThings'])
  }
}
</script>

<style scoped>

</style>
