import React, { Component } from 'react'
import { View, Text, Button, Image, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { loginRequest } from '../../../util/require'
import { WECHATLOGIN, USERINFO } from '../../../util/interface.d'
import { setStorage, Toast, getStorage, Loading } from '../../../util/util'
import './index.scss'
import { userInfo } from 'src/util/api'

interface stateType {
  token: string,
  openId: string
}
export default class Index extends Component<stateType, any> {
  constructor(props) {
    super(props)
    this.state = {
      iconData: {
        foot: require('../../../images/xmLOGO.png'),
        logo: require('../../../images/logo.png'),
      },
      token: '',
      openId: '',
      userInfo: ''
    }
  }


  componentDidShow() {
    this.login()
  }

  componentDidHide() { }
  // 获取用户信息
  getUserInfo = () => {
    Loading('登录中')
    setStorage('token', this.state.token)
    setTimeout(()=>{
      Taro.switchTab({
        url: '/pages/mind/index'
      })
    },1500)
  }
  // 登录
  login() {
    let data: WECHATLOGIN = {
      user_type: 'owner',
      code: ''
    }
    Taro.login({
      success: res => {
        if (res.errMsg == 'login:ok') {
          data.code = res.code
          loginRequest.wechatLogin(data).then(res1 => {
            console.log(res1)
            this.setState({
              token: res1.data.token,
              openId: res1.data.open_id,
              userInfo: res1.data
            })
            setStorage('userInfo', res1.data)

          })
        }
        console.log(this)
      }
    })
    console.log(this.state)
  }
  //获取手机号
  async getPhoneNumber(e: { detail: any }) {
    console.log(this)
    let self = this
    let data = e.detail
    let reqData: USERINFO = {
      type: 'phone',
      iv: '',
      encryptedData: '',
      user_type: 'owner',
      open_id: this.state.openId
    }
    if (data.errMsg == 'getPhoneNumber:ok') {
      Taro.setStorageSync('token', self.state.token)
      reqData.iv = data.iv
      reqData.encryptedData = data.encryptedData
      let res = await loginRequest.userInfo(reqData)
      if (res.code == 1) {
        setTimeout(() => {
          Taro.switchTab({
            url: '/pages/mind/index'
          })
        }, 1000)
        setStorage('userInfo', res.data)

        Toast('登录成功')
      }

    }
  }
  // 点击登录


  //暂不登录
  noLogin() {
    Taro.navigateBack({
      delta: 1
    })
  }

  render() {
    return (
      <View className='index'>
        <View className='img'>
          <Image src={this.state.iconData.logo} />
        </View>
        <View className='btn'>
          <Button type='primary' className='long-btn' openType='getPhoneNumber' onGetPhoneNumber={this.getPhoneNumber.bind(this)} style={{ display: this.state.userInfo.mobile ? 'none' : '' }}>登录</Button>
          <Button type='primary' className='long-btn' onClick={this.getUserInfo} style={{ display: this.state.userInfo.mobile ? '' : 'none' }}>登录</Button>
          <View className='long-btn no-login' onClick={this.noLogin}>暂不登录</View>
        </View>
        <View className='footer flex-mid-mid'>
          <Text className=''>兴民智能提供服务</Text>
        </View>
      </View>
    )
  }
}
