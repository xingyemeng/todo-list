<template>
  <div>
    <Table border :columns="columns7" :data="undoneThings"></Table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'undoneThings',
  methods: {
    show (index) {
      console.log(this.$router)
      this.$Modal.info({
        title: 'User Info',
        content: `Id：${this.undoneThings[index].id}<br>事件名：${this.undoneThings[index].title}<br>事情简介：${this.undoneThings[index].text}`
      })
    },
    remove (index) {
      this.undoneThings.splice(index, 1)
    },
    ...mapMutations(['changeThings'])
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
          width: 200,
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
                    this.changeThings(params.row.id)
                  }
                }
              }, '确定完成')
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['undoneThings'])
  }
}
</script>

<style scoped>

</style>
