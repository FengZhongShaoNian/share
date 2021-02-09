
import axios from 'axios'

// axios.defaults.baseURL = 'http://192.168.100.12:3000'
axios.defaults.baseURL = window.location.origin
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default axios
