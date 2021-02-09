<template>
  <v-snackbar
    v-model="display"
    :timeout="timeout"
    :color="color"
    :top="true"
  >
    {{text}}
    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="display = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
      display: this.show,
      text: '',
      color: '#2196f3',
      timeout: 6000
    }
  },
  methods: {
    showMessage (message) {
      this.text = message
      this.color = '#2196f3'
      this.display = true
    },
    showSuccess (message) {
      this.text = message
      this.color = '#4caf50'
      this.display = true
    },
    showWarning (message) {
      this.text = message
      this.color = '#ff9800'
      this.display = true
    },
    showError (message) {
      this.text = message
      this.color = '#f44336'
      this.display = true
    }
  }
}
</script>

<style scoped>

</style>
