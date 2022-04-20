import axios from 'axios'

// 网络层的封装
export function request(config) {
  // 1、创建axios实例
  const instance1 = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  // 2、axios拦截器
  instance1.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
    // return err
  })

  instance1.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
    // return err
  })

  // instance1(config) 本身返回就是一个Promise
  // 3、发送真正的网络请求，将数据回调
  return instance1(config)

}