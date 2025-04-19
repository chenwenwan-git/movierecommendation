import request from '@/utils/request'


//获取用户评价
export function getUserComment(params) {
  return request.post(`/users/getComments`, params);
}

//修改用户评价
export function updateUserComment(commentId, comment, params) {
  return request.post(`/users/updateComment?commentId=${commentId}&comment=${comment}`, params);
}

//添加用户评价
export function insertUserComment(params) {
  return request.post(`/users/addComment`, params);
}