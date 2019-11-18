import commonAxios from '../../index'
import store from '@/store/index'

/**
 * 获取用户列表
 * params {
 *     area
 *     orgName
 *     userNumber
 *     userName
 *     role
 *     pageSize
 *     pageNum
 * }
 */
export async function GetUserList (obj) {
    return commonAxios.get('oauser/getUserList.do', {
      params: {
        area: obj.area,
        deptId: obj.deptId,
        userNumber: obj.userNumber,
        userName: obj.userName,
        role: obj.role,
        leaderId: obj.leaderId,
        pageSize: obj.pageSize,
        pageNum: obj.pageNum
      }
    })
  }