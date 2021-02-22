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

    <v-main class="app-content app-content-scrollbar">
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

  /*针对平板和PC 显示自定义的滚动条*/
  @media screen and (min-width:600px){
    .app-content {
      height: 100vh;
      overflow-y: auto;
    }
    /*垂直滚动条的宽度*/
    .app-content-scrollbar::-webkit-scrollbar{
      width: 10px !important
    }
    /*滚动条里面小方块*/
    .app-content-scrollbar::-webkit-scrollbar-thumb{
      background: #535353;
    }
    /*滚动条里面轨道*/
    .app-content-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
  }

</style>

<style>

/* 隐藏窗口滚动条 */
html::-webkit-scrollbar,body::-webkit-scrollbar {
  width: 0 !important
}
</style>
