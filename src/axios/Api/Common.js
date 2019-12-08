import commonAxios from '../index'
import store from '@/store/index'

/**
 * 登录
 * params {
 *     userName,
 *     password
 * }
 */
export function Login (obj) {
  return commonAxios.get('age/login', {
    params: {
      userName: obj.userName,
      password: obj.password
    }
  })
}

/**
 * 注册
 * params {
 *     userName,
 *     password
 *     group
 * }
 */
export function Regist (obj) {
  return commonAxios.get('age/register/UserRegister/v1.0', {
    params: {
      userName: obj.userName,
      password: obj.password,
      group: obj.group
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