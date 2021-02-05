import Taro, { getUserInfo } from '@tarojs/taro'
import * as Api from './api'
import * as Interface from '../util/interface.d'
import { getStorage } from '../util/util'



// 使用默认参数，当数据不传入指定字段时替代
const NormalRquestData: Interface.RequestBase = {
  url: Api.DOMAIN, // 默认请求地址
  method: 'POST', // 默认get请求
  header: { // 默认使用的header头
    "content-type": 'application/x-www-form-urlencoded',
    token: ''
  },
  data: {}, // 默认没有参数，传入空对象
  loading: true, //默认开启loading层
  mask: true, //请求时不需要点击
  title: '加载中', //loading提示文字
  failToast: false // 错误提示
}



const doRequestAction = (reqData: Interface.Request): Promise<any> => {
  let req: Interface.RequestBase = { ...NormalRquestData, ...reqData }
  let token = getStorage('token')
  if (token) {
    req.header.token = token
  }
  return new Promise((resolve, reject) => {
    if (req.loading) Taro.showLoading({ title: req.title })
    Taro.request({
      url: req.url,
      data: req.data,
      header: req.header,
      method: req.method
    }).then(res => {
      if (res.statusCode == 200) {
        resolve(res.data)
      }
    }).catch((err) => {
      if (req.failToast) Taro.showToast({ title: '请求失败！' })
      reject(err)
    }).finally(() => {
      if (req.loading) Taro.hideLoading()
    })

  })
}

//登录
export const loginRequest = {
  //获取token
  wechatLogin(data: Interface.WECHATLOGIN) {
    return doRequestAction({
      url: Api.wechatlogin,
      data
    })
  },
  //更新用户信息
  userInfo(data) {
    return doRequestAction({
      url: Api.userInfo,
      data
    })
  },
  //获取用户信息
  getUserInfo(data) {
    return doRequestAction({
      url: Api.getUserInfo,
      data
    })
  }
}
//房源
export const roomRequest = {
  getRoomList(data){
    return doRequestAction({
      url:Api.getRoomList,
      data
    })
  }
}



export default doRequestAction



