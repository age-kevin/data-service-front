<template>
    <div class="login" ref="newLogin">
      <div class="content">
        <div>
          <div class="head">
            <!-- <i></i> -->
            <span>后台管理系统</span>
          </div>
          <div class="title">账号密码登录</div>
          <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm" @submit.native.prevent>
            <el-form-item prop="userName" class="userName">
              <el-input
                inline
                type="text"
                placeholder="请输入账号"
                v-model="ruleForm.userName"
                autocomplete="off"
              >
                <span slot="prefix" class="icon-user"></span>
              </el-input>
            </el-form-item>
            <el-form-item prop="password" class="password" style="margin-bottom: 10px;">
              <el-input
                inline
                :type="inputType"
                placeholder="请输入密码"
                v-model="ruleForm.password"
                autocomplete="off"
              >
                <span slot="prefix" class="icon-lock"></span>
                <span slot="suffix" @click="switchPass" :class="inputType=='password'?'eye-close':'eye-open'"></span>
              </el-input>
            </el-form-item>
            <el-form-item class="checked_line">
              <label style="flex: 1; text-align: left;">
                <el-checkbox v-model="ruleForm.checked" style="display: none;">记住密码</el-checkbox>
              </label>
              <label style="flex: 1; text-align: right;">
                <router-link to='/Regist' style="text-decoration: none;color: rgba(16, 67, 159, 0.8);">注&nbsp;&nbsp;册</router-link>
              </label>
            </el-form-item>
            <el-form-item>
              <el-button
                class="login-btn"
                type="primary"
                style="width:100%;"
                native-type="submit"
                :loading="loadingState"
                @click.native="onSubmit('ruleForm')"
              >登&nbsp;&nbsp;录</el-button>
            </el-form-item>
            <!-- <div class="login-link" @click="$router.push('/Regist')">立即注册</div> -->
          </el-form>
        </div>
      </div>
      <div class="footer"></div>
    </div>
</template>

<script>
  import { Base64 } from 'js-base64';
  import { Login } from '../axios/Api/Common'
  import { setCookie, getCookie, clearCookie } from '../utils/cookie'

  export default {
    name: "login",
    data () {
      return {
        inputType: 'password',
        ruleForm: {
          userName: '',
          password: '',
          checked: false // 是否选中记住密码 true为选中
        },
        rules: {
          userName: [
            { required: true, message: '请输入账号', trigger: 'change' },
            { min: 6, max: 18, message: '账号长度控制在 6 到 18 位之间', trigger: 'change' },
            { message: '账号为字母或数字', pattern: '^[A-Za-z0-9]+$', trigger: 'change'},
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { message: '密码以字母开头、可带数字、“_”、“.”', pattern: '^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,17}$', trigger: 'change'},
          ]
        },
        interval: null,
        loadingState: false
      }
    },
    methods: {
      switchPass () {
        if (this.inputType == 'password') {
          this.inputType = 'text'
        } else {
          this.inputType = 'password'
        }
      },
      onSubmit(formName) {
        this.loadingState = true
        this.$refs[formName].validate((valid) => {
          // 校验是否通过
          if (valid) {
            // 校验通过后base64加密
            Login({
              userName: this.ruleForm.userName,
              password: Base64.encode(this.ruleForm.password) // 校验通过后base64加密
            }).then(res => {
              let that = this // this指向vue实例失效
              if (res.rcCode == 200) {
                this.loadingState = false
                let items = res.data
                // vuex中存值
                this.$store.commit('saveAccessToken', items.token)
                // 在浏览器的cookie中存值
                sessionStorage.setItem("access_token", items.token)
                if (items == '1') {
                  this.$message({
                    message: res.message,
                    type: 'error'
                  })
                } else {
                  this.$message({
                    message: '登录成功！',
                    type: 'success'
                  })
                  setTimeout(function(){
                    that.$router.push('/home')
                  }, 1000)
                }
                // // 判断是否选择记录密码
                // if (this.ruleForm.checked == true) {
                //   // 传入账号，密码，保存天数
                //   let userName = this.ruleForm.userName
                //   let password = Base64.encode(this.ruleForm.password)
                //   // 保存cookie
                //   setCookie('userName', userName, 30)
                //   setCookie('password', password, 30)
                //   setCookie('checked', this.ruleForm.checked, 30)
                // } else {
                //   // 清空Cookie
                //   clearCookie('userName')
                //   clearCookie('password')
                //   clearCookie('checked')
                // }
                
              } else {
                this.loadingState = false
                this.$message({
                  message: res.message,
                  type: 'error'
                })
              }
            }).catch(res => {
              this.loadingState = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/bg/bg_all.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .bg-img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    object-fit: cover;
    font-family: 'object-fit: cover;';
  }
  .content {
    position: absolute;
    right: r(150);
    top: 50%;
    width: r(388);
    // height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-transform: translate(0,-50%);
    -moz-transform: translate(0,-50%);
    transform:translate(0,-50%);
    background-color: #fff;
    padding: r(50) r(100);
    border-radius: 4px;
    .head {
      margin: 0 auto r(30);
      font-size: 0;
      i {
        display: inline-block;
        width: r(50);
        height: r(48);
        background: url('../assets/images/common/logo_black.png') center no-repeat;
        background-size: contain;
        vertical-align: middle;
        margin-right: r(13);
      }
      span {
        font-size: r(34);
        line-height: r(34);
        color: #333333;
        // color: #10439f;
        font-weight: bold;
        vertical-align: middle;
        font-family:MicrosoftYaHei-Bold;
      }
    }
    .title {
      max-width: r(250);
      font-size: r(18);
      // color: #333;
      color: rgba($color: #10439f, $alpha: 0.8);
      font-weight: bold;
      font-family:MicrosoftYaHei-Bold;
      border-bottom: 2px solid rgba($color: #10439f, $alpha: 0.8);
      padding-bottom: r(20);
      margin: 0 auto r(30);
      text-align: center;
    }
    .userName {
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: r(36);
      .icon-user {
        display: inline-block;
        width: r(18);
        height: r(18);
        background: url('../assets/images/icon/icon_user.png') center no-repeat;
        background-size: contain;
        margin-left: r(15);
      }
    }
    .password {
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: r(50);
      .icon-lock {
        display: inline-block;
        width: r(18);
        height: r(20);
        background: url('../assets/images/icon/icon_lock.png') center no-repeat;
        background-size: contain;
        margin-left: r(15);
      }
    }
    .login-btn {
      background:rgba(16,67,159,1);
      border-radius:6px;
      font-size: r(22);
    }
    .login-link {
      text-align: left;
      color: #10439F;
      font-size: r(22);
      cursor: pointer;
    }
  }
  .eye-open {
    display: inline-block;
    width: r(24);
    height: r(16);
    background: url('../assets/images/icon/eye_open.png') center no-repeat;
    background-size: contain;
  }
  .eye-close {
    display: inline-block;
    width: r(24);
    height: r(16);
    background: url('../assets/images/icon/eye_close.png') center no-repeat;
    background-size: contain;
  }
  .footer {
    position: fixed;
    left: 50%;
    bottom: r(25);
    font-size: r(16);
    color: #999;
    -webkit-transform: translate(-50%,0);
    -moz-transform: translate(-50%,0);
    transform:translate(-50%,0);
  }
</style>
<style lang="scss">
  .login {
    .el-input__inner {
      font-size: r(22);
      background: #F8F8F8;
      border: none;
      padding-left: r(65) !important;
    }
    .el-input__prefix, .el-input__suffix {
      display: flex;
      align-items: center;
    }
  }
  .checked_line {
    margin-bottom: 10px;
    .el-form-item__content {
      display: flex;
      justify-content: space-around;
    }
  }
</style>
