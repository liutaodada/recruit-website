import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000, //5秒超时
})

//请求拦截器
instance.interceptors.request.use(
  config => {
    // config.headers["token"] = ""
    return config
  },
  error => {
    Promise.reject(error)
  }
)

//响应拦截器
instance.interceptors.response.use(
  response => {
    // if (response) {
    //   return response.data
    // } else {
    //   Promise.reject(new Error("error"))
    // }
    return response
  },
  error => {
    if (JSON.stringify(error).includes("401")) {
      alert('登录已过期，请重新登录')
    } else {
      alert(error)
    }
    return Promise.reject(error)
  }
);

export default instance