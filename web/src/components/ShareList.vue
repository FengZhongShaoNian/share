<template>
  <div>
    <v-list>
      <v-list-item-group color="primary">
        <div v-for="(item, i) in items"
             :key="i"
        >
          <v-list-item
            @click="()=>download(item.url)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.fileName"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-download</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>

import { getShareList } from '../api/shares'
import { isAuthRequired } from '../api/auth'

export default {
  name: 'ShareList',

  data: () => ({
    items: [
      // { fileName: 'Real-Time', icon: 'mdi-clock', url: 'http://172.16.1.27:12345/shares/1' }
      // { fileName: 'Audience', icon: 'mdi-account', url: 'http://172.16.1.27:12345/shares/2' },
      // { fileName: 'Conversions', icon: 'mdi-flag', url: 'http://172.16.1.27:12345/shares/3' }
    ]

  }),

  created () {
    this.loadData()
  },

  methods: {
    loadData () {
      isAuthRequired().then(requireAuth => {
        if (requireAuth) {
          if (sessionStorage.getItem('password')) {
            return Promise.resolve(sessionStorage.getItem('password'))
          }
          return this.$requirePassword()
        }
        return Promise.resolve()
      }).catch(e => {
        console.log(e.message)
      }).then(password => {
        sessionStorage.setItem('password', password)
        return getShareList(password)
      }).then(data => {
        this.$data.items = data
      }).catch(e => {
        sessionStorage.setItem('password', '')
        this.$showError(e.message)
      })
    },
    download (url) {
      window.open(url)
    },
    getAllDownloadUrl () {
      const urls = this.items.map(item => item.url)
      for (let i = 0; i < urls.length; ++i) {
        const url = urls[i]
        if (!url.startsWith('http://')) {
          const host = window.location.origin
          urls[i] = host + url
        }
      }
      return urls
    }
  }
}
</script>
