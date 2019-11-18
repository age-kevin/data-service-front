<template>
  <div class="home" ref="homePage">
    <!-- 基础布局 -->
    <top-nav v-on:headerByValue="headerByValue" v-on:isClick="isClick"></top-nav>
    <left-menu v-on:leftMenuByValue="leftMenuByValue" :isCollapse="isCollapse"></left-menu>
    <div class="right_content" :class="{ 'isShrink': isCollapse }">
      <router-view class="routerView" />
    </div>

    <!-- 弹窗 -->
    <reset-password v-on:close="close" :showMessageBox="showMessageBox" />
  </div>
</template>

<script>
import ResetPassword from './Common/ResetPassword'

export default {
  components: {
    ResetPassword
  },
  data () {
    return {
      showMessageBox: false,
      clientHeight:'',
      name: '',
      urlSrc: '',
      onMessage: '',
      childValue: false,
      isCollapse: false,
    }
  },
  watch: {
    childValue(val) {
      this.msgList = this.childValue
    },
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    }
  },
  methods: {
    // 修改密码的子组件传值
    isClick: function (isClick) {
      if (isClick == 'click') this.showMessageBox = true
      console.log(this.showMessageBox)
    },
    close: function (close) {
      if (close == 'close') this.showMessageBox = false
      console.log(this.showMessageBox)
    },
    headerByValue: function (headerByValue) {
      // leftMenuByValue就是导航组件传过来的值
      this.isCollapse = headerByValue
      console.log(this.isCollapse)
    },
    leftMenuByValue: function (leftMenuByValue) {
      // leftMenuByValue就是导航组件传过来的值
      this.isCollapse = leftMenuByValue
      console.log(this.isCollapse)
    },
    handleClose () {
      this.socket.close()
    },
    changeFixed(clientHeight){
      this.$refs.homePage.style.height = clientHeight+'px'
    },
    initHeight(){  //获取高度
      this.clientHeight = document.documentElement.clientHeight
      window.onresize = () => {
          this.clientHeight = document.documentElement.clientHeight
      };
    },
  },
  created () {
    // 初始化
    this.initHeight()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.home {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  font-size: 14px;
}

.right_content {
  position: fixed;
  top: r(100);
  left: r(342);
  right: r(0);
  bottom: r(0);
  overflow: auto;
  transition: left .3s;
  overflow: hidden;
  // background:rgba(255,255,255,1);
  // box-shadow:-1px 0px 0px 0px rgba(238,238,238,1);
}

.right_content.isShrink {
  left: r(84);
  transition: left .3s;
}

// .routerView {
//   margin-top: r(20);
// }
</style>

<style scoped lang="scss" type="text/css">
.el-message-box__wrapper .el-message-box {
  width: r(321);
  background:rgba(255,255,255,1);
  border-radius: r(8);
  padding: 0;
  .invite-message-box {
    display: flex;
    justify-content: center;
    margin: r(53) auto;
    span {
      font-size: 16px;
      font-weight:400;
      color:rgba(51,51,51,1);
    }
    span:first-child {
      margin-right: 10px;
    }
  }
}
</style>

