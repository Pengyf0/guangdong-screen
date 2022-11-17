// 封装axios实例的拦截器(请求, 响应)
import axios from 'axios';


// 1. 创建axios实例 （运营数据大屏）
const instance = axios.create({
    timeout: 15000, // 超时时间15s
    // baseURL: 'http://10.206.194.11:8088', //生产地址 ip+端口, 公用的前缀路径
    baseURL: 'http://62qzsn.natappfree.cc/', // ip+端口, 公用的前缀路径
});

// 重写实例请求前拦截器
instance.interceptors.request.use((config) => {

    return config;
}, (err) => {
    return Promise.reject(err);
})

// 重写实例响应后拦截器
instance.interceptors.response.use((result) => {

    return result.data;
}, (err) => {
    return Promise.reject(err);
})




// 导出axios实例
export default instance