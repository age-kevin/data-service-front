<template>
  <div class="breadcrumb">
    <p class="breadcrumb_pos">位置：</p>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(el, idx) in routerPath" :key="idx" :to="{ path: el }">{{routerMessage[el]}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      topTabActive:'',
      routerPath: [],
      routerMessage: {
        "/Home": '首页',
        "/System": '系统管理',
        "/UserList": '用户管理列表',
      }
    };
  },
  created() {
    // 页面载入时，动态执行路由匹配方法
    this.matchRoute();
  },
  watch:{
    // 路由变换时，动态执行路由匹配方法
    $route(to,from){
      console.log(to.path);
      this.matchRoute();
    }
  },
  methods: {
    // 路由匹配方法
    matchRoute() {
      // 路由匹配前，清除之前保存的路由
      this.routerPath = [];
      for (let i = 1; i < this.$route.matched.length; i++) {
        console.log(this.$route.matched[i].path);
        this.routerPath.push(this.$route.matched[i].path);
        this.urlType = this.$route.matched[i].path;
      }
      console.log(this.routerPath)
    }
  }
};
</script>
<style lang="scss" type="text/css">
.breadcrumb_pos {
  font-size: 14px;
  font-weight: 400;
  color: #606266;
  margin: 0;
  cursor: text;
}

.breadcrumb {
  height: r(60);
  line-height: r(60);
  margin: r(20);
  display: flex;
  font-size: r(16);
  color: #666;
  background-color: #fff;
  border-radius: 4px;
  padding-left: r(30);
  -webkit-box-shadow: 0px 5px 5px -5px rgba(0, 21, 41, 0.35);
  box-shadow: 0px 5px 5px -5px rgba(0, 21, 41, 0.35);
  .el-breadcrumb{
    line-height: r(60);
  }
}

</style>
