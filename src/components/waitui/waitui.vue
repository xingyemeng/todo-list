<template>
  <div class="wattui">
    <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="handleFile(this)" ref="originFile">
    <Table border :columns="columns7" :data="data8"></Table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import XLSX from 'xlsx'
export default {
  name: 'waitui',
  data () {
    return {
      json: [],
      columns7: [
        {
          title: '标题',
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
          title: 'URl',
          key: 'url'
        },
        {
          title: '排名',
          key: 'num'
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
                    console.log(this.json)
                    this.handleWtList(this.json).then(res => {
                      console.log(res)
                      const arr = this.json.map((item, index) => {
                        item.num = res[index] + 1
                        return item
                      })
                      this.json = arr
                    })
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
  computed: {
    data8 () {
      return this.json
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data8[index].name}<br>Age：${this.data8[index].age}<br>Address：${this.data8[index].address}`
      })
    },
    remove (index) {
      this.data8.splice(index, 1)
    },
    ...mapActions(['handleWtList']),
    handleFile () {
      var rABS = true
      var files = this.$refs.originFile.files
      var f = files[0]
      var reader = new FileReader()
      reader.onload = (e) => {
        var data = e.target.result
        if (!rABS) data = new Uint8Array(data)
        var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'})
        console.log(workbook)
        /* DO SOMETHING WITH workbook HERE */
        this.json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        console.log(this.json)
        console.log(this.data8)
      }
      if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f)
    }
  }
}
</script>

<style scoped>

</style>
