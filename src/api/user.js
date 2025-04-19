import request from '@/utils/request'

//注册接口
export function register(params) {
  return request.post(`/users/register`, params);
}

//登陆接口
export function login(params) {
  return request.post(`/users/login`, params);
}

//修改密码
export function updatePassword(oldPassword, newPassword, params) {
  return request.post(`/users/updatePwd?oldPassword=${oldPassword}&newPassword=${newPassword}`, params);
}