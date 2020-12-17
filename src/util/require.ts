import Taro from '@tarojs/taro'
import * as Api from './api'
import * as Interfance from '../util/interface'



// 使用默认参数，当数据不传入指定字段时替代
const NormalRquestData: Interfance.RequestBase = {
  url: Api.DOMAIN, // 默认请求地址
  method: 'GET', // 默认get请求
  header: { // 默认使用的header头
    "content-type": 'application/x-www-form-urlencoded',
    token: ''
  },
  data: {}, // 默认没有参数，传入空对象
  loading: true, //默认开启loading层
  mask: true, //请求时不需要点击
  title: '加载中', //loading提示文字
  failToast: false // 一般我们会处理相应业务逻辑，就不直接提示阻断流程
}
type Request = {
  [K in keyof Interfance.RequestBase]?: Interfance.RequestBase[K]
}

const doRequestAction = (reqData: Request): Promise<any> => {
  let req: Interfance.RequestBase = { ...NormalRquestData, ...reqData }
  return new Promise((resolve, reject) => {
    if (req.loading) Taro.showLoading({ title: req.title})
    Taro.request({
      url: req.url,
      data: req.data,
      header: req.header
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

export default doRequestAction



