
import http from '@/util/http'

// 上传状态
export const UploadStatus = {
  NOT_YET_START: '待上传',
  UPLOADING: '上传中',
  ABORTED: '已终止',
  FINISHED: '已完成'
}

// 上传工具
export class Uploader {
  constructor () {
    this.status = UploadStatus.NOT_YET_START
    this.onUploadProgress = null
    this.password = null
    this.source = http.CancelToken.source()
  }

  upload (file) {
    const form = new FormData()
    form.append('file', file)
    return http.put('/files', form, {
      headers: {
        token: btoa(this.password)
      },
      onUploadProgress: this.onUploadProgress
    })
  }

  cancel () {
    this.source.cancel('用户取消上传')
  }
}
