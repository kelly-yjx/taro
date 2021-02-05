import React, { Component } from 'react'
import {
  View, Text, Image, Button
} from '@tarojs/components'
import Taro from "@tarojs/taro"
import './index.scss'
import { loginRequest } from '../../util/require'

interface stateType {
  isShow: boolean,
  state: object
}
export default class Index extends Component<stateType, any> {
  constructor(props: stateType) {
    super(props)
    this.state = {
      userInfo: {},
      isShow: false,
      tabList: [
        { name: '房型管理', img: require('../../images/meRomMng.png') },
        { name: '门店管理', img: require('../../images/meStoreManger.png') },
        { name: '订单日志', img: require('../../images/meOderMasg.png') },
      ],
      navList: [
        { text: '打印门贴', icon: 'iconmePrintPose' },
        { text: '开具发票', icon: 'iconmeDrawBill' },
        { text: '房东指南', icon: 'iconmeGuide' },
        { text: '反馈意见', icon: 'iconfeedbackfk' },
        { text: '联系我们', icon: 'iconcontactusfk' },
        { text: '关于我们', icon: 'iconaboutusfk' }
      ],

    }
  }
  async componentDidShow() {
    await this.getUserMsg()
    await console.log(this.state)
  }
  ToLogin() {
    Taro.navigateTo({
      url: '/pages/mind/login/index'
    })
  }
  async getUserMsg() {
    let opt = {
      user_type: 'owner'
    }
    let res = await loginRequest.getUserInfo(opt)
    this.setState({
      userInfo: res.data
    })
  }
  getUserInfo(e) {
    console.log(e)
  }
  render() {
    return (
      <View className='index'>
        <View className='header'>
          <Text className='title'>我的</Text>
          <View className='top'>
            {/* 登录信息 */}
            <View className='top-user flex-mid'>
              <View className='img'>
                <Image src={require('../../images/userImageNnLogin.png')} />
              </View>
              <View className='name flex-col-start'>
                <View className='name-top flex-mid'>
                  <View style={{ display: (!this.state.userInfo.nickname && !this.state.userInfo.idcardname) ? '' : 'none' }}>
                    <View className='login-btn flex-mid' onClick={this.ToLogin}>点击登录</View>
                  </View>
                  <View style={{ display: (!this.state.userInfo.nickname && this.state.userInfo.idcardname) ? '' : 'none' }}>
                    <Button openType='getUserInfo' onGetUserInfo={this.getUserInfo} className='pl-10'>点击获取微信昵称</Button>
                  </View>
                  <View style={{ display: (this.state.userInfo.nickname && !this.state.userInfo.idcardname) ? '' : 'none' }}>
                    <Text className='fs-34 c-4c4'>HI</Text>
                    <Text className='pl-10 fs-34 c-4c4'>{this.state.userInfo.nickname}</Text>
                  </View>
                  <View style={{ display: (this.state.userInfo.idcardname) ? '' : 'none' }}>
                    <Text className='fs-34 c-4c4'>HI</Text>
                    <Text className='pl-10 fs-34 c-4c4'>{this.state.userInfo.idcardname}</Text>
                  </View>
                  <View className='to-Pauth flex-mid pl-10' style={{ display: (this.state.userInfo.user_id && !this.state.userInfo.is_cert) ? '' : 'none' }}>
                    <Text className='fs-26 c-b3b'>去认证</Text>
                    <Text className='icon c-b3b iconback1 pl-5'></Text>
                  </View>
                  <View className='isAuth' style={{ display: (this.state.userInfo.is_cert) ? '' : 'none' }}>已认证</View>
                </View>
                <View className='phone fs-26' style={{ display: (this.state.userInfo.mobile) ? '' : 'none' }}>{this.state.userInfo.mobile}</View>
              </View>
            </View>
            {/* 今日数据 */}
            <View className='static-data flex-sb border1'>
              <View className='flex-col-mid'>
                <Text className='num'>10</Text>
                <Text className='fs-26'>今日入住</Text>
              </View>
              <View className='flex-col-mid'>
                <Text className='num'>10</Text>
                <Text className='fs-26'>今日退房</Text>
              </View>
              <View className='flex-col-mid'>
                <Text className='num'>10</Text>
                <Text className='fs-26'>今日空房</Text>
              </View>
            </View>
            {/* 门店选择 */}
            <View className='select-store'>
              <View className='flex-mid-mid add-store' style={{ display: this.state.isShow ? '' : 'none' }}>
                <Text>123</Text>
                <Text className='icon iconroomStatetrueDown01'></Text>
              </View>
              <View className='flex-mid-mid add-store' style={{ display: this.state.isShow ? 'none' : '' }}>
                <Text>添加门店</Text>
                <Text className='icon iconadd1'></Text>
              </View>
            </View>
          </View>
        </View>
        <View className='content'>
          <View className='tab-list list flex-sb'>
            {this.state.tabList.map((item, index: number) => {
              return <View key={index} className='li flex-col-mid'>
                <Image src={item.img} />
                <Text>{item.name}</Text>
              </View>
            })}
          </View>
          <View className='nav-list list '>
            {this.state.navList.map((item, index: number) => {
              return <View key={index} className='li flex-sb'>
                <View className='flex-mid'>
                  <Text className={'icon' + ' ' + item.icon}></Text>
                  <Text className='pl-10'>{item.text}</Text>
                </View>
                <View>
                  <Text className='icon static-icon iconback1'></Text>
                </View>
              </View>
            })}
          </View>
          <View className='change-to-record'>切换到房客端</View>
        </View>
      </View>

    )
  }
}
