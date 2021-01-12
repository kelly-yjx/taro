import React, { Component } from 'react'
import {
  View, Text, Image, Button
} from '@tarojs/components'
import Taro from "@tarojs/taro"
import './index.scss'
import { getUserInfo } from '../../util/api'

interface stateType {
  isShow: boolean
}
export default class Index extends Component<stateType, any> {
  constructor(props: stateType | Readonly<stateType>) {
    super(props)
    this.state = {
      isShow: false,
      tabList: [
        { name: '房型管理', img: require('../../images/meRomMng.png') },
        { name: '门店管理', img: require('../../images/meStoreManger.png') },
        { name: '订单日志', img: require('../../images/meOderMasg.png') },
      ],
      navList:[
        {text:'打印门贴',icon:'iconmePrintPose'},
        {text:'开具发票',icon:'iconmeDrawBill'},
        {text:'房东指南',icon:'iconmeGuide'},
        {text:'反馈意见',icon:'iconfeedbackfk'},
        {text:'联系我们',icon:'iconcontactusfk'},
        {text:'关于我们',icon:'iconaboutusfk'}
      ]
    }
  }
  componentDidMount() {
    console.log(this.state.isShow)
    console.log(this.state.tabList)
  }
  ToLogin() {
    Taro.navigateTo({
      url: '/pages/mind/login/index'
    })
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
                  <Text className='fs-34 c-4c4'>HI</Text>
                  <Text className='pl-26 fs-34 c-4c4'>张三</Text>
                  <View className='to-Pauth flex-mid pl-26'>
                    <Text className='fs-26 c-b3b'>去认证</Text>
                    <Text className='icon c-b3b iconback1 pl-5'></Text>
                  </View>
                  <View className='isAuth'>已认证</View>
                </View>
                <View className='phone fs-26'>15107049757</View>
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
            {this.state.tabList.map((item, index:number) => {
              return <View key={index} className='li flex-col-mid'>
                <Image src={item.img} />
                <Text>{item.name}</Text>
              </View>
            })}
          </View>
          <View className='nav-list list '>
            {this.state.navList.map((item,index:number)=>{
              return <View key={index} className='li flex-mid'>
                <Text className={'icon'+' '+ item.icon}></Text>
                <Text>{item.text}</Text>
                <Text className='icon static-icon iconback1'></Text>
              </View>
            })}
          </View>
          <View className='change-to-record'>切换到房客端</View>
        </View>
      </View>

    )
  }
}
