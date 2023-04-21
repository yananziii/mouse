import axios from 'axios'
import { getToken } from '@/utils/setToken.js'
import { Message } from 'element-ui'

const service = axios.create({
    baseURL: '/api' , //自动加载在请求跟路径
    timeout: 3000 //请求超时自动中断

})



//请求拦截器
service.interceptors.request.use((config) => {
    //请求前的动作（获取并设置token）
   //config.headers['session'] = getToken('admin_token');
    return config
},(error) => {
    return Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use((response) => {
    //对相应数据做什么
    let { ret, msg} = response.data
    if(ret !== 0){
        Message({message: msg || 'error', type :'warning'})
    }
    return response
},(error) => {
    return Promise.reject(error)
})

export default service