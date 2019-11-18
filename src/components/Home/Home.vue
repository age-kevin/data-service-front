<template>
  <div>
    <el-scrollbar style="height: 100%;">
      <bread-crumb></bread-crumb>
      <div class="tablePage">
        <div class="toolbar">
          <el-row class="toolbar">
            <el-col :span="12" align="left">
              <span class="toolbar-list-header">列表数据</span>
            </el-col>
            <el-col :span="12" align="right">
              <el-button
                size="mini"
                type="info"
                @click="reset()"
              >刷新列表</el-button>
            </el-col>
          </el-row>
        </div>

        <div class="toolbarData">
          <el-table 
            :data="tableData"
            stripe style="overflow: hidden;"
            v-loading="loading"
          >
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="80px">
            </el-table-column>
            <el-table-column prop="idData" align="center" label="数据ID" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="userName" align="center" label="用户名" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="userNumber" align="center" label="用户编号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="profit" align="center" label="收益" :show-overflow-tooltip="true"></el-table-column>
            <!-- <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click.native="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  @click.native="handleUpdate(scope.$index, scope.row)"
                >更新</el-button>
                <el-button
                  size="mini"
                  @click.native="handelCancel(scope.$index, scope.row)"
                >取消</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click.native="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>

        <!-- <div class="toolbar-pagination">
          <div class="block">
            <el-pagination 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page.sync="pagedata.pageNum" 
                :page-size="pagedata.pageSize" 
                layout="prev, pager, next, jumper" 
                :page-count="totalNum"
            ></el-pagination>
          </div>
        </div> -->
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { GetDataList } from '@/axios/Api/Common'

let Page = 1
export default {
  data () {
    return {
      tableData: [],
      pagedata:{
        pageNum: Page,
        pageSize: 10
      },
      totalNum: 0,
      loading: false
    }
  },
  methods: {
    GetPageList() {
      GetDataList({
        // pageNum: this.pagedata.pageNum,
        // pageSize: this.pagedata.pageSize
      }).then(res => {
        let that = this // this指向vue实例失效
        if (res.rcCode == 200) {
          this.loading = false
          // this.totalNum = res.count
          this.tableData = res.data
        } else {
          this.loading = false
          this.tableData = []
          // this.totalNum = 0
        }
      })
    },
    reset() {
      let that = this
      this.loading = true
      setTimeout(function () {
        // that.pagedata.pageNum = 1
        // Page = that.pagedata.pageNum
        that.GetPageList()
      }, 1000)
    },
    // 点击编辑
    handleEdit(index, row) {
      console.log(index, row)
    },
    // 取消编辑
    handelCancel(index, row) {
      console.log(index, row)
      this.reset()
    },
    // 编辑更新
    handleUpdate(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagedata.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagedata.pageNum = val;
      Page = this.pagedata.pageNum
      this.GetPageList();
    },
  },
  mounted () {
    this.GetPageList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
</style>
