<template>
  <div>
    <input type="file" ref="fileInput" class="hidden-input" multiple/>
    <v-btn
      class="floating-button"
      v-if="!upload.displayDialog"
      color="pink"
      fixed
      dark
      small
      absolute
      bottom
      right
      fab
      @click="upload.displayDialog = true"
    >
      <v-icon>mdi-water</v-icon>
    </v-btn>
    <v-dialog v-model="upload.displayDialog"
              width="600"
              :persistent="true"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          文件上传
        </v-card-title>

        <v-card-text class="no-content-text" v-if="upload.items.length === 0">no content</v-card-text>

        <v-card-text class="no-padding">
          <v-list>
            <div v-for="(item, i) in upload.items"
                 :key="i"
            >
              <v-progress-linear
                background-opacity="0"
                color="rgba(200,200,200,0.4)"
                height="45"
                :value="item.uploadProgress"
                class="list-item-progress-bar"
              >
                <v-list-item
                  :key="item.fileName"
                  class="list-item"
                >
                  <v-list-item-avatar>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content class="list-item-content">
                    <v-list-item-title v-html="item.fileName"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.uploadProgressText"></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-icon color="green" :dense="true" v-if="isUploadFinished(item)" >mdi-checkbox-marked-circle</v-icon>
                    <v-icon color="red" :dense="true" v-if="isUploadAbort(item)" >mdi-alert-circle</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-progress-linear>
            </div>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="upload.displayDialog = false"
          >
            Hide
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>

</template>

<script>

import { UploadStatus, Uploader } from '@/api/upload'
import { isAuthRequired, validatePassword } from '../api/auth'
import StorageUnit from '../util/storage-unit'
import Decimal from 'decimal.js'

export default {
  name: 'FileUpload',
  data: () => ({
    upload: {
      displayDialog: false,
      items: [],
      password: ''
    }

  }),

  methods: {
    selectFiles () {
      const fileInput = this.$refs.fileInput
      const self = this
      return new Promise((resolve) => {
        fileInput.value = ''
        fileInput.click()
        fileInput.addEventListener('change', () => {
          self.appendItems(fileInput.files)
          fileInput.value = ''
          resolve(self.upload.items)
        })
      })
    },

    appendItems (files) {
      for (let i = 0; i < files.length; ++i) {
        const uploadProgressText = this.getProgressText(0, files[i].size)

        this.upload.items.push({
          file: files[i],
          icon: 'mdi-file',
          fileName: files[i].name,
          size: files[i].size,
          uploadProgressText: uploadProgressText,
          uploadProgress: 0,
          uploader: null,
          status: UploadStatus.NOT_YET_START
        })
      }
    },

    uploadFiles () {
      const self = this
      isAuthRequired().then(requireAuth => {
        if (requireAuth && !sessionStorage.getItem('password')) {
          return self.$requirePassword()
        }
        return Promise.resolve(sessionStorage.getItem('password'))
      }).then(password => {
        sessionStorage.setItem('password', password)
        self.upload.password = password
        return Promise.resolve(password)
      }).then((password) => {
        return validatePassword(password)
      }).catch(e => {
        self.upload.items = []
        sessionStorage.setItem('password', '')
        return Promise.reject(e)
      }).then(() => {
        self.upload.displayDialog = true
        for (let i = 0; i < this.upload.items.length; ++i) {
          const item = this.upload.items[i]
          if (item.status === UploadStatus.NOT_YET_START) {
            this.uploadFile(i)
          }
        }
      }).catch(e => {
        self.$showError(e.message)
      })
    },

    uploadFile (index) {
      const item = this.upload.items[index]
      item.status = UploadStatus.UPLOADING
      item.uploader = new Uploader()
      const self = this
      item.uploader.onUploadProgress = (progressEvent) => {
        if (!progressEvent.lengthComputable) {
          return
        }
        const loadedSize = new Decimal(progressEvent.loaded)
        const totalSize = new Decimal(progressEvent.total)
        item.uploadProgressText = self.getProgressText(progressEvent.loaded, progressEvent.total)
        item.uploadProgress = loadedSize.div(totalSize).mul(100).toNumber()
        if (loadedSize.equals(totalSize)) {
          item.status = UploadStatus.FINISHED
        }
      }
      item.uploader.password = self.upload.password
      item.uploader.upload(item.file).catch(e => {
        self.$showError(e.message)
        item.status = UploadStatus.ABORTED
      })
    },

    cancel () {
      for (let i = 0; i < this.upload.items.length; ++i) {
        const item = this.upload.items[i]
        if (item.status === UploadStatus.UPLOADING) {
          item.uploader.cancel()
          item.status = UploadStatus.ABORTED
        }
      }
      this.upload.items = []
      this.upload.displayDialog = false
    },

    getProgressText (uploaded, total) {
      const uploadedSize = StorageUnit.toHumanFriendlyFormat(uploaded)
      const totalSize = StorageUnit.toHumanFriendlyFormat(total)
      return `${uploadedSize}/${totalSize}`
    },

    isUploadFinished (item) {
      return item.status === UploadStatus.FINISHED
    },

    isUploadAbort (item) {
      return item.status === UploadStatus.ABORTED
    }
  }
}
</script>

<style scoped>
.hidden-input {
  display: none;
}

.floating-button {
  top: 90% !important;
}

.no-padding {
  padding: 0px !important;
}

.no-content-text {
  margin-top: 25px;
  text-align: center;
  font-size: 26px;
  color: rgba(200, 200, 200, 0.6) !important;
}

.list-item-progress-bar{
  margin-top: 2px;
  margin-bottom: 2px;
}

.list-item {
  overflow:hidden;
}

.list-item-content {
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
</style>
