/* eslint-disable no-prototype-builtins */
import PaginationMixin from '../pagination'
export default {
  mixins: [PaginationMixin],
  data () {
    return {
      Service: null,
      list: {
        loading: false,
        data: []
      },
      filter: {},
      page: {
        path: this.$route.path,
        name: this.$route.name, // 页面名称
        params: {},
        query: {}
      },
      showEmpty: false
    }
  },
  computed: {
    finished () {
      return this.pagination.current === this.pagination.pages
    }
  },
  methods: {
    /**
     * 获取列表
     * @param {Number} page 目标页数，不传取第一页
     */
    getList (page, replace = false) {
      if (!this.Service) {
        return
      }
      this.list.loading = true
      this.Service.getList(this.$axios, {
        page: {
          page: page,
          size: this.pagination.size
        },
        filter: this.filter, // 过滤器
        sort: this.sort, // 排序
        params: this.page.params, // 附加参数
        query: this.page.query // 附加参数
      }).then(result => {
        this.list.loading = false
        if (result.isSuccess) {
          console.log(result)
          // 数据
          if (replace) {
            this.list.data.splice(0, this.list.data.length, ...result.data.list)
          } else {
            this.list.data.splice(this.list.data.length, 0, ...result.data.list) // 新增内容接在之前内容后面
          }
          // 分页
          Object.assign(this.pagination, result.data.page)
          // 映射关系
          if (result.data.KeyMap && result.data.KeyMap instanceof Object) {
            for (const key in result.data.KeyMap) {
              if (result.data.KeyMap.hasOwnProperty(key)) {
                this.KeyMap[key] = result.data.KeyMap[key]
              }
            }
          }
          if (this.list.data.length === 0) {
            this.showEmpty = true
          }
        } else {
          this.$notify(`获取数据失败,${result.message}`)
        }
      })
    }
  }
}
