
import http from '../util/http'

// 是否需要密码
export function isAuthRequired () {
  return new Promise((resolve, reject) => {
    http.get('/auth/auth-config').then(response => {
      if (response.status === 200) {
        const data = response.data
        resolve(data.requireAuth)
        return
      }
      reject(new Error(response.statusText))
    }).catch(reject)
  })
}

// 是否允许上传
export function isAllowUpload () {
  return new Promise((resolve, reject) => {
    http.get('/auth/allow-upload').then(response => {
      if (response.status === 200) {
        const data = response.data
        resolve(data.allowUpload)
        return
      }
      reject(new Error(response.statusText))
    }).catch(reject)
  })
}

// 验证密码
export function validatePassword (password) {
  return new Promise((resolve, reject) => {
    http.post('/auth/validate', {}, {
      headers: {
        token: btoa(password)
      }
    }).then(resolve)
      .catch((e) => {
        if (e.response.status === 403) {
          const msg = e.message + '. wrong password!'
          reject(new Error(msg))
          return
        }
        reject(new Error(e.message))
      })
  })
}
