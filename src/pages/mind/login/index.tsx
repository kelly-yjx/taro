import React, { Component } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { loginRequest } from '../../../util/require'
import { WECHATLOGIN, USERINFO } from '../../../util/interface.d'
import {setStorage,Toast} from '../../../util/util'
import './index.scss'

interface stateType {
  token: string,
  openId:string
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
      openId: ''
    }
  }

 
  componentDidShow() {
    this.login()
  }

  componentDidHide() { }
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
            this.setState({
              token : res1.data.token,
              openId : res1.data.open_id
            })
            setStorage('token',res1.data.token)
          })
        }
        console.log(this)
      }
    })
    console.log(this.state)
  }
  //获取手机号
  async getPhoneNumber(e: { detail: any }){
    console.log(this)
    let self = this
    let data = e.detail
    let reqData: USERINFO = {
      type: 'phone',
      iv: '',
      encryptedData: '',
      user_type: 'owner',
      open_id:this.state.openId
    }
    if (data.errMsg == 'getPhoneNumber:ok') {
      Taro.setStorageSync('token', self.state.token)
      reqData.iv = data.iv
      reqData.encryptedData = data.encryptedData
      let res = await loginRequest.userInfo(reqData)
      if(res.code==1){
        setTimeout(()=>{
          Taro.switchTab({
            url:'/pages/mind/index'
          })
        },1000)
        Toast('登录成功')
      }

    }
  }

  //暂不登录
  noLogin(){
    Taro.navigateBack({
      delta:1
    })
  }

  render() {
    return (
      <View className='index'>
        <View className='img'>
          <Image src={this.state.iconData.logo} />
        </View>
        <View className='btn'>
          <Button type='primary' className='long-btn' openType='getPhoneNumber' onGetPhoneNumber={this.getPhoneNumber.bind(this)}>登录</Button>
          <View className='long-btn no-login' onClick={this.noLogin}>暂不登录</View>
        </View>
        <View className='footer flex-mid-mid'>
          <Text className=''>兴民智能提供服务</Text>
        </View>
      </View>
    )
  }
}
