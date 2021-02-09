<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-icon>mdi-share-variant</v-icon>
      <v-app-bar-title class="app-title">爱分享，我的分享</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn
        text
        v-if="allowUpload"
        @click="uploadFile"
      >
        <v-icon>mdi-cloud-upload</v-icon>
      </v-btn>

      <v-btn
        text
        @click="copyAllDownloadUrl"
      >
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <ShareList ref="shareList"/>
      <file-upload ref="fileUpload"></file-upload>
    </v-main>

  </v-app>
</template>

<script>
import ShareList from './components/ShareList'
import FileUpload from '@/components/FileUpload'
import { isAllowUpload } from './api/auth'
import * as clipboard from 'clipboard-polyfill/text'

export default {
  name: 'App',

  components: {
    ShareList,
    FileUpload
  },

  data: () => ({
    allowUpload: false
  }),

  created () {
    this.initData()
  },

  methods: {

    initData () {
      isAllowUpload().then(allowUpload => {
        this.allowUpload = allowUpload
      }).catch(e => {
        this.$showError(e.message)
      })
    },

    uploadFile () {
      const fileUpload = this.$refs.fileUpload
      fileUpload.selectFiles().then(() => {
        fileUpload.uploadFiles()
      })
    },

    copyAllDownloadUrl () {
      const self = this
      const urls = this.$refs.shareList.getAllDownloadUrl()
      if (urls.length > 0) {
        const text = urls.join('\n')
        clipboard.writeText(text).then(
          function () {
            self.$showSuccess('The download link has been copied to the clipboard')
          },
          function () {
            self.$showSuccess('Unable to copy the download link to the clipboard')
          }
        )
      } else {
        self.$showWarning('nothing copied')
      }
    }

  }
}
</script>

<style scoped>
  .app-title {
    margin-left: 28px;
  }
</style>

<style>
html,body {
  overflow-y: hidden;
}
</style>
