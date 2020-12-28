import Taro from '@tarojs/taro'
function Toast(title: any,duration=1500,mask=true,icon:any='none'){
  Taro.showToast({
    title,
    duration,
    mask,
    icon
  })
}

export default {
  Toast,
}