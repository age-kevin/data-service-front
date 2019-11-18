<template>
  <div v-show="showMessageBox">

    <transition name="top">
      <div class="el-message-box__wrapper" style="z-index: 2003;" v-show="showMessageBox">
        <div class="el-message-box invite_defined-box">
          <div class="invite_defined-box__header">
            <div class="invite_defined-box__title">
              <span>修改密码</span>
            </div>
            <button type="button" class="invite_defined-box__headerbtn" @click="handleClose()">
              <i class="invite_defined-box__close el-icon-close"></i>
            </button>
          </div>
          <div class="invite_defined-box__body">
            <el-form ref="form" :model="addForm" inline label-width="50px" class="invite_defined-box__body_form">
              <el-form-item label="新密码" label-width="120px">
                <el-input v-model="addForm.password" type="password" placeholder="请输入新密码"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="invite_defined-box__footer">
            <el-button
              type="default"
              @click="handleClose()"
            >取消</el-button>
            <el-button
              type="primary"
              @click="submit()"
            >提交</el-button>
          </div>
        </div>
      </div>
    </transition>

    <div class="v-modal" tabindex="0" style="z-index: 2002;" v-show="showMessageBox"></div>

  </div>
</template>

<script>
import { Base64 } from 'js-base64';
import { ResetPassword } from '@/axios/Api/Common'

export default {
  props:['showMessageBox'],
  data() {
    return {
      addForm: {
        id: '',
        password : ''
      },
    }
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      let that = this
      this.$emit('close', 'close')
      // 清空数据
      this.addForm.password = ''
      setTimeout( function() {
        document.body.removeAttribute("class","el-popup-parent--hidden");
      }, 300)
    },
    submit() {
      console.log('submit')
      if (this.addForm.password == '') {
        this.$message({
          message: '请输入新密码！',
          type: 'error'
        })
        return
      }
      ResetPassword({
        id: this.addForm.id,
        password: Base64.encode(this.addForm.password) // 校验通过后base64加密
      }).then(res => {
        let that = this // this指向vue实例失效
        if (res.code == 0) {
          // vuex中存值
          this.$store.commit('saveAccessToken', '')
          this.$store.commit('saveUserInfo', '')
          // 在浏览器的cookie中存值
          sessionStorage.setItem("access_token", '')
          sessionStorage.setItem("userInfo", '')
          this.$message({
            message: res.msg,
            type: 'success'
          })
          setTimeout(function(){
            that.$router.push('/Login')
          }, 1000)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    }
  },
  mounted () {
    if (this.$store.state.userInfo !== '') {
      let userInfo  = JSON.parse(this.$store.state.userInfo)
      this.addForm.id = userInfo.id
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
  transition: left .8s;
}

.header.isShrink {
  left: r(84);
  transition: left .8s;
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
