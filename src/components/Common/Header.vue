<template>
  <div class="header" :class="{ 'isShrink': isCollapse }">
    <div class="exam-top" style="padding: 0px; width: 100%;">
      <div class="exam-top-header">
        <span class="exam-top-header-trigger" @click="handleRetract">
          <i class="el-icon el-icon-s-fold" v-if="isCollapse == false"></i>
          <i class="el-icon el-icon-s-unfold" v-else></i>
        </span>

        <div class="exam-top-header-right">
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon-menu"></i>{{nickname}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="resetPassword">重置密码</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form : {
        'access_token' : ''
      },
      isCollapse: false,
      // nickname: this.$store.state.userInfo.nickname
      nickname: 'Ferryamn'
    }
  },
  methods: {
    handleRetract() {
      if (this.isCollapse) this.isCollapse = false
      else this.isCollapse = true
      this.$emit('headerByValue', this.isCollapse)
    },
    logout() {
      console.log('submit!')
      this.commonAxios.get("admin/loginout",({
          params: this.form
      }))
      .then(res => {
        console.log('success')
        if (res.code === 200) {
          console.log('success')
          // vuex中存值
          this.$store.commit('saveAccessToken', '')
          // 在浏览器的cookie中存值
          sessionStorage.setItem("access_token", '')
          this.$router.push('/login')
        }
      })
      .catch(err => {
        console.log('error')
      })
    },
    resetPassword() {
      this.$emit('isClick', 'click')
    },
  },
  computed: {
    userInfo() {
        return this.$store.state.userInfo.nickname
    }
  },
  watch: {
    userInfo: function(val) {
      this.nickname = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.header {
  // width: 100%;
  position: fixed;
  top: 0;
  left: r(342);
  right: 0;
  height: r(99);
  transition: left .3s;
}

.header.isShrink {
  left: r(84);
  transition: left .3s;
}

.exam-top {
  padding: 0 50px;
  height: r(100);
  line-height: r(100);
}

.exam-top-header {
  height: r(100);
  padding: 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  position: relative;
}

.exam-top-header-trigger {
  float: left;
  font-size: 20px;
  height: r(64);
  cursor: pointer;
  transition: all .3s,padding 0s;
  padding: 0 r(24) r(36);
}

.anticon {
  display: inline-block;
  font-style: normal;
  vertical-align: -.125em;
  text-align: center;
  text-transform: none;
  line-height: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.exam-top-header-right {
  float: right;
}

.el-dropdown {
  display: block;
  padding: 0 r(40);
}

.el-icon-arrow-down {
  padding: 0 r(14);
}
</style>
