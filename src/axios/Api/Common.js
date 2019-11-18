import commonAxios from '../index'
import store from '@/store/index'

/**
 * 登录
 * params {
 *     userNumber,
 *     password
 * }
 */
export function Login (obj) {
  return commonAxios.get('user/login.do', {
    params: {
      userNumber: obj.userNumber,
      password: obj.password
    }
  })
}

/**
 * 登出
 * params {
 * }
 */
export function Exit (obj) {
  return commonAxios.get('oauser/exit.do', {
    params: {}
  })
}

/**
 * 修改密码
 * params {
 *     id
 *     password
 * }
 */
export function ResetPassword (obj) {
  return commonAxios.get('oauser/resetPWD.do', {
    params: {
      id: obj.id,
      password: obj.password
    }
  })
}

/**
 * 获取数据列表
 * params {
 * }
 */
export function GetDataList (obj) {
  return commonAxios.get('age/query/QueryDataDetail/v1.0', {
    params: {
    }
  })
}