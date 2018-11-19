<template>
  <Table border :columns="columns7" :data="verifyWorksList"></Table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'workVerify',
  data () {
    return {
      comments: {
        comment: '',
        data: null
      },
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
          title: 'author',
          key: 'author'
        },
        {
          title: 'getter',
          key: 'getter'
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
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    const data = {
                      _id: params.row._id,
                      param: 'success'
                    }
                    this.handleVerifyWork(data).then(res => {
                      this.$Message.success(res + '审核通过')
                      this.handleGetWorkList()
                    }).catch(err => {
                      this.$Message.error(err)
                    })
                  }
                }
              }, '通过'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      render: (h) => {
                        return h('Card', {}, [
                          h('p', {
                            slot: 'title'
                          }, '请说明驳回理由：'),
                          h('Input', {
                            attrs: {
                              type: 'textarea'
                            },
                            props: {
                              value: this.value,
                              autofocus: true,
                              placeholder: '驳回理由...'
                            },
                            on: {
                              input: (val) => {
                                this.comments.comment = val
                                this.comments.data = new Date()
                              }
                            }
                          })
                        ])
                      },
                      onOk: () => {
                        if (this.comments.comment === '') {
                          this.$Message.error('请输入驳回理由')
                          return
                        }
                        const data = {
                          _id: params.row._id,
                          comments: this.comments,
                          param: 'fail'
                        }
                        this.handleVerifyWork(data).then(res => {
                          this.$Message.success(res + '已被驳回')
                          this.handleGetWorkList()
                        }).catch(err => {
                          this.$Message.error(err)
                        })
                      }
                    })
                  }
                }
              }, '驳回')
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['verifyWorksList'])
  },
  methods: {
    ...mapActions(['handleGetWorkList', 'handleVerifyWork']),
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.verifyWorksList[index].title}<br>内容：${this.verifyWorksList[index].content}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    }
  },
  mounted () {
    this.handleGetWorkList()
  }
}
</script>

<style scoped>

</style>
