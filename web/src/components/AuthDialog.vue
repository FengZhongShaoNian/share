<template>
  <v-dialog
    v-model="open"
    width="500"
    :persistent="true"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        需要密码
      </v-card-title>

      <v-card-text class="bottom-no-padding">
        <v-text-field
          :autofocus="true"
          v-model="password"
          @keyup="handleKeyboardEvent"
          placeholder="请输入密码"
        ></v-text-field>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="handleCancelButtonClick"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="handleOkButtonClick"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AuthDialog',
  props: {
    open: Boolean
  },
  data: function () {
    return {
      password: ''
    }
  },
  methods: {
    handleCancelButtonClick () {
      this.$emit('cancel')
    },
    handleOkButtonClick () {
      this.$emit('ok', this.password)
    },
    handleKeyboardEvent (event) {
      // 用户敲了回车键
      if (event.keyCode === 13) {
        this.handleOkButtonClick()
        return
      }
      // 用户敲了ESC键
      if (event.keyCode === 27) {
        this.handleCancelButtonClick()
      }
    }
  }
}
</script>

<style scoped>
  .bottom-no-padding {
    padding-bottom: 0px !important;
  }
</style>
