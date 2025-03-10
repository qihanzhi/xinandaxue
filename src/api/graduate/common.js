import request from '@/utils/request'

// 公共图片上传
export function uploadImg(data) {
  return request({
    url: '/common/upload',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/common/upload',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data
  })
}

