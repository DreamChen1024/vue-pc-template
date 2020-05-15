/** 二次封装axios */
import axios from 'axios'
import apis from './apis'
import tools from '../tool/tools'
import { Message, Loading } from 'element-ui'
import router from '../../../router'
import store from '../../../store/index'

let loadingInstance = null
/** 设置默认请求超时时间 */
axios.timeout = 10000
/** 是否允许带cookie */
axios.withCredentials = true
/** 设置请求头 */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use(
  config => {
    // 是否需要携带token
    if (config.data && config.data.vaildToken) {
      config.headers.token = store.state._token
    }
    if (config.data && config.data.loading) {
      loadingInstance = Loading.service({
        lock: true,
        text: '加载中...'
      })
    }
    // 不需要formData格式直接传JSON对象
    if (config.method === 'post' && config.data.unFormData) {
      return config
    // 传JSON字符串
    } else if (config.method === 'post' && config.data.string) {
      config.data = JSON.stringify(config.data)
      return config
    } else {
      // 默认formData格式
      console.log(123)
      config.data = tools.getFormData(config.data)
      return config
    }
  },
  error => {
    return Promise.reject(error.response)
  }
)

axios.interceptors.response.use(
  response => {
    loadingInstance && loadingInstance.close()
    console.log(response)
    if (response.data.code === 401 || response.data.code === 416) {
      router.replace({ name: 'Login' })
    }
    if(response.data.code === 0) {
      return Message({
        message: response.data.msg,
        type: 'success',
        duration: 3000
      })
    }
    Message({
      message: response.data.msg,
      type: 'error',
      duration: 3000
    })
  },
  error => {
    loadingInstance && loadingInstance.close()
    return Promise.reject(error)
  }
)

export async function login (payload = {}) {
  try {
    const { data } = await axios.post(apis.login, payload)
    return data
  } catch (e) {
  }
}
