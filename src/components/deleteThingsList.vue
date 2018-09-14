<template>
  <div>
    <Table border :columns="columns7" :data="deleteThingsList"></Table>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'deleteThingsList',
  methods: {
    show (index) {
      console.log(this.$router)
      this.$Modal.info({
        title: 'User Info',
        content: `Id：${this.deleteThingsList[index].id}<br>事件名：${this.deleteThingsList[index].title}<br>事情简介：${this.deleteThingsList[index].text}`
      })
    },
    remove (index) {
      this.deleteThingsList.splice(index, 1)
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
      ],
      deleteThingsList: this.$store.state.deleteThingsList
    }
  }
}
</script>

<style scoped>

</style>
