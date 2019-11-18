<template>
  <div class="leftNav" :class="{ 'isShrink': isCollapse }">
    <div class="leftNav-header">
      <div><img src="../../assets/images/common/logo_white.png" alt=""></div>
      <div><img src="../../assets/images/common/project_name_white.png" alt=""></div>
    </div>
    <div class="leftNav-menu el-menu-vertical-demo" ref="leftPage" style="background-color: rgb(0, 21, 41);">
      <el-menu
        router
        :default-active= currentRouter
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        class="el-menu-vertical-demo"
        background-color="rgb(0, 21, 41)"
        text-color="rgba(255, 255, 255, 0.65)"
        active-text-color="rgba(255,255,255,1)"
      >
        <template v-for="(el, idx) in pathRouter">
          <el-menu-item v-if="el.children === undefined" :index="el.path" :key="idx">
            <i :class="el.icon"></i>
            <span slot="title">{{el.name}}</span>
          </el-menu-item>

          <el-submenu :index="el.path" router v-else :key="idx">
            <template slot="title">
              <i :class="el.icon"></i>
              <span>{{el.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="e.path" :class="e.icon" v-for="(e, index) in el.children" :key="index">
                <template slot="title">
                  <i :class="el.icon" style="opacity: 0;"></i>
                  <span>{{e.name}}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  props:['isCollapse'],
  data() {
      return {
        currentRouter: '',
        pathRouter: [{
          path: '/Home',
          name: '首页',
          icon: "le-menu icon-home",
          children: undefined
        }, {
          path: '/System',
          name: '系统管理',
          icon: "le-menu icon-count",
          children: [{
            path: '/UserList',
            name: '用户管理',
          }]
        }],
        clientHeight: '',
        ruleForm: {},
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      changeFixed(clientHeight) { // 动态修改样式
        this.$refs.leftPage.style.height = (clientHeight - 71) + 'px'
      },
      init () {
        this.pathRouter = []
        this.commonAxios.get("system/queryPcList.do",({
          params: this.ruleForm
        }))
        .then(res => {
          if (res.code === 0) {
            for (let i in res.data) {
              let routerList = {
                'path': res.data[i].url,
                'name': res.data[i].name,
                'children': [],
                'icon': "le-menu" + " " + "icon-" + res.data[i].url.split('/')[1]
              }
              if (res.data[i].childMenus.length !== 0) {
                for (let j in res.data[i].childMenus) {
                  let childRouter = {
                    'path': res.data[i].childMenus[j].url,
                    'name': res.data[i].childMenus[j].name,
                    'icon': ''
                  }
                  routerList.children.push(childRouter)
                }
              } else {
                routerList.children = undefined
              }
              this.pathRouter.push(routerList)
            }
            this.currentRouter = this.$route.path.split('Manager')[0]
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      }
    },
    mounted() {
      // 获取浏览器可视区域高度
      this.clientHeight = `${document.documentElement.clientHeight}`
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`
      }
      // this.init()
    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function() {
        this.changeFixed(this.clientHeight)
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.le-menu {
  display: inline-block;
  width: r(21);
  margin-left: r(50);
  margin-right: r(17);
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: margin-left .3s;
}

.icon-home::after {
  display: block;
  width: r(21);
  height: r(21);
  content: '';
  background-image: url('../../assets/images/icon/icon_shouye.png');
  background-size: 100%;
  background-repeat: no-repeat;
}

.icon-match::after {
  display: block;
  width: r(21);
  height: r(21);
  content: '';
  background-image: url('../../assets/images/icon/icon_moshi.png');
  background-size: 100%;
  background-repeat: no-repeat;
}

.icon-question::after {
  display: block;
  width: r(21);
  height: r(21);
  content: '';
  background-image: url('../../assets/images/icon/icon_moshi.png');
  background-size: 100%;
  background-repeat: no-repeat;
}

.icon-users::after {
  display: block;
  width: r(21);
  height: r(21);
  content: '';
  background-image: url('../../assets/images/icon/icon_guanli.png');
  background-size: 100%;
  background-repeat: no-repeat;
}

.icon-count::after {
  display: block;
  width: r(21);
  height: r(21);
  content: '';
  background-image: url('../../assets/images/icon/icon_tongji.png');
  background-size: 100%;
  background-repeat: no-repeat;
}

.icon-userInfo::after {
  display: block;
  width: r(21);
  height: r(21);
  content: '';
  background-image: url('../../assets/images/icon/icon_userInfo.png');
  background-size: 100%;
  background-repeat: no-repeat;
}

.leftNav-header {display: flex;flex: 1;justify-content: center;height: r(99);background: #002140;margin: 0;}
.leftNav-header div:first-child {flex: 0 0 r(44);margin-right: r(10);}
.leftNav-header div:first-child img {display: block;width: 100%;margin-top: r(28);}
.leftNav-header div:last-child {flex: 0 0 r(238);}
.leftNav-header div:last-child img {display: block;width: 100%;height: r(34);margin-top: r(34);}

.leftNav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: r(338);
    float: left;
    background:rgb(0, 21, 41);
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
    transition: width .3s;
}

.leftNav.isShrink {
  width: 64px;
  transition: width .3s;
  .le-menu {
    margin-left: 0;
    transition: margin-left .3s;
  }
  .leftNav-header div:last-child {
    display: none;
    transition: display .3s;
  }
}

.leftNav .el-menu {
  border-right: none;
  padding-top: r(11);
}

.leftNav .el-menu > .el-menu-item {
  text-align: left;
  // padding: 0 !important;
}

.leftNav .el-menu .el-menu-item.is-active {
  font-weight: 600;
  color:rgba(51,51,51,1) !important;
  background:rgba(255,255,255,1) !important;
  .icon-home::after {
    background-image: url('../../assets/images/icon/icon_shouye_active.png');
  }
  .icon-match::after {
    background-image: url('../../assets/images/icon/icon_moshi_active.png');
  }
  .icon-users::after {
    background-image: url('../../assets/images/icon/icon_guanli_active.png');
  }
}

.leftNav .el-menu .el-submenu.is-active {
  .el-submenu__title {
    color:rgba($color: #333, $alpha: .65);
    .icon-count::after {
      background-image: url('../../assets/images/icon/icon_tongji.png');
    }
    .icon-userInfo::after {
      background-image: url('../../assets/images/icon/icon_userInfo_active.png');
    }
  }
}

.leftNav .el-menu-item-group__title {
  padding: 0 !important;
}

.leftNav .el-menu > .el-menu-item:hover {
  color: rgba($color: #333, $alpha: .65) !important;
  background:rgba(255,255,255,1) !important;
}

.leftNav .el-submenu__title {
  text-align: left;
  // padding: 0 !important;
}

.leftNav .el-submenu__title:hover {
  color: rgba($color: #333, $alpha: .65) !important;
  background:rgba(255,255,255,1) !important;
}

.leftNav .el-menu-item-group > ul > li:hover {
  color: rgba($color: #333, $alpha: .65) !important;
  background:rgba(255,255,255,1) !important;
}

.leftNav .el-submenu__title i.el-icon-arrow-down::before {
  content: "\E790" !important;
  font-size: 17px;
}

.left-suojin {
  position: absolute;
  right: r(22);
  bottom: r(26);
  width: r(39);
  height: r(36);
  width: r(29);
  cursor: pointer;
  transform: rotate(0deg);
  transition: all .3s;
  img {
    display: block;
    width: 100%;
  }
}

.left-suojin.isShrink {
  right: 50%;
  margin-right: r(-9);
  transform: rotate(-180deg);
  transition: all .3s;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 400px;
}

.el-menu--vertical {
  .el-menu {
    .el-menu-item-group {
      .el-menu-item-group__title {
        padding: 0;
      }
      .el-menu-item.is-active {
        color: rgba(255, 255, 255, 0.65) !important;
        font-weight: bold;
      }
    }
  }
}
</style>

