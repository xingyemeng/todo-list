<template>
  <Table border :columns="columns7" :data="failWorksList"></Table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'failWork',
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
          title: 'reason',
          key: 'comments',
          render: (h, params) => {
            const options = params.row.comments.map((item) => {
              console.log(typeof item.data)
              let year = new Date(item.data).getFullYear()
              let month = new Date(item.data).getMonth()
              let day = new Date(item.data).getDate()
              let hour = new Date(item.data).getHours()
              let minutes = new Date(item.data).getMinutes()
              let second = new Date(item.data).getSeconds()
              let date = year + '/' + month + '/' + day
              let time = hour + ':' + minutes + ':' + second
              return <p><i>时间：{date} &nbsp;{time}</i><br/>驳回理由：{item.comment}</p>
            })
            return (<div >{options}</div>)
          }
        },
        {
          title: 'Action',
          key: 'action',
          width: 180,
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
              }, '查看'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.show(params.index)
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
    ...mapGetters(['failWorksList'])
  },
  methods: {
    ...mapActions(['handleFailWorksList']),
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.failWorksList[index].title}<br>内容：${this.failWorksList[index].content}`
      })
    }
  },
  mounted () {
    this.handleFailWorksList()
  }
}
</script>

<style scoped>

</style>
