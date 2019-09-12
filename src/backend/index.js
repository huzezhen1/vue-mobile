import axios from 'axios'
// import store from '@mobile-common/store'
// import router from '@mobile-common/router'
import Qs from 'qs'
// import MutationTypes from '@mobile-common/store/mutation-types'
// import _ from 'lodash'

axios.defaults.baseURL = '/official-website'
// axios.defaults.baseURL = '/'
axios.defaults.paramsSerializer = function (params) {
  return Qs.stringify(params, {
    arrayFormat: 'repeat'
  })
}
/**
 * 请求处理
 */
axios.interceptors.request.use(config => {
  // // 写入地址位置信息
  // if (!config.headers) {
  //   config.headers = {}
  // }
  // // config.headers['User-Gps'] = store.getters.getGeoposition
  // switch (true) {
  //   case config.method.toLowerCase() === 'post':
  //   case config.method.toLowerCase() === 'put':
  //   case config.method.toLowerCase() === 'patch':
  //     config.data.channel = 'PC'
  //     break
  //   case config.method.toLowerCase() === 'get':
  //   case config.method.toLowerCase() === 'delete':
  //   case config.method.toLowerCase() === 'head':
  //   case config.method.toLowerCase() === 'options':
  //     // GET请求
  //     if (!config.params) {
  //       config.params = {}
  //     }
  //     config.params.channel = 'PC'
  //     break
  // }
  if (!config.params) {
    config.params = {}
  }
  config.params._t = new Date().getTime()
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应处理
 */
axios.interceptors.response.use(response => {
  let isSuccess = true
  let message = ''
  let code = response.data.code

  switch (code) {
    case 200:
      isSuccess = true
      message = response.data.message
      break
    // case
    default:
      isSuccess = false
      message = response.data.message
      // this.$message.error(message)
      break
  }

  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
    data: response.data.data
  }
}, error => {
  // HTTP 请求失败
  let response = error.response
  let message = 'HTTP请求失败:' + response.statusText
  let code = 'HTTP_ERROR'
  let status = response.status || 400
  if (response.data && response.data.message) {
    message = response.data.message
    code = response.data.statusCode
  }
  return {
    isSuccess: false,
    status: status,
    message: message,
    code: code
  }
})
export default axios
