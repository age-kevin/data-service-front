<template>
  <div class="home">
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
            height="380px"
            stripe style="overflow: hidden;"
            v-loading="loading"
          >
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="80px">
            </el-table-column>
            <el-table-column prop="name" align="center" label="类型" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="name" align="center" label="类别" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="name" align="center" label="名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="name" align="center" label="任务内容" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="name" align="center" label="重要程度" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="name" align="center" label="安排时间" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="name" align="center" label="责任部门" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="name" align="center" label="责任人" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="name" align="center" label="状态" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="name" align="center" label="进度" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="!showBtn[scope.$index]"
                  size="mini"
                  @click.native="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  v-if="showBtn[scope.$index]"
                  size="mini"
                  @click.native="handleUpdate(scope.$index, scope.row)"
                >更新</el-button>
                <el-button
                  v-if="showBtn[scope.$index]"
                  size="mini"
                  @click.native="handelCancel(scope.$index, scope.row)"
                >取消</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click.native="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="toolbar-pagination">
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
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
let Page = 1
export default {
  data () {
    return {
      form: {
        id: '',
        type: '',
        groupType: '',
        qtType: 4,
        difficulty: '',
        belong: '',
        question: '',
        pageSize: 10,
        pageNum: 1
      },
      tableData: [],
      pagedata:{
        pageNum: Page,
        pageSize: 10
      },
      totalNum: 0,
      loading: false,
      addForm: {
        name : ''
      },
    }
  },
  methods: {
    GetPageList() {
      this.loading = false
    },
    add() {
      this.$router.push('/TaskAdd')
    },
    reset() {
      let that = this
      this.loading = true
      setTimeout(function () {
        that.pagedata.pageNum = 1
        Page = that.pagedata.pageNum
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
