export default {
  data () {
    return {
      // 分页数据
      pagination: {
        pageSizeOpts: [10, 20, 30, 40],
        total: 0, // 数据量
        current: 1, // 当前页数
        size: 20, // 页面数据量
        pages: 1 // 总共页数
      }
    }
  },
  methods: {
    /**
     * ===========================================================
     * 翻页
     * ===========================================================
     */
    pageChange (page) {
      this.getList(page)
    },
    /**
     * ===========================================================
     * 页面容量发生改变
     * ===========================================================
     */
    pageSizeChange (pageSize) {
      // 新的页面容量 >= 旧的页面容量
      if (this.pagination.current === 1) {
        // 当前处在第一页
        if (pageSize < this.pagination.size) {
          // 新的页面容量 < 旧的页面容量
          this.pagination.size = pageSize
          this.list.data.splice(0, this.list.data.length, ...this.list.data
            .splice(
              0, Math.min(this.pagination.size, this.pagination.total)))
          // this.getList(this.pagination.current)
          return
        }
        if (this.pagination.total > this.pagination.size) {
          // 总数据量 > 旧的页面容量
          this.pagination.size = pageSize
          this.getList(1)
        } else {
          // 总数据量 <= 旧的页面容量
          this.pagination.size = pageSize
        }
      } else {
        // 不是处在第一页，如果处在当前页是否会有数据
        if (pageSize * (this.pagination.current - 1) > this.pagination.total) {
          // 当前页的前一页的数据量 > 总数据量
          // 计算最后一页
          const targetPage = parseInt(this.pagination.total / pageSize) + 1
          this.pagination.size = pageSize
          this.getList(targetPage)
        } else {
          this.pagination.size = pageSize
          this.getList(this.pagination.current)
        }
      }
    }
  }
}
