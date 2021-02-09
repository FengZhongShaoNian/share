import http from '../util/http'

// 获取分享列表
export function getShareList (password) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        // base64编码
        token: btoa(password)
      }
    }
    http.post('/shares', {}, config).then(response => {
      if (response.status === 200) {
        const data = response.data
        resolve(data)
        return
      }
      reject(new Error(response.statusText))
    }).catch(reject)
  })
}
