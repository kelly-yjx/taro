import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import {getUserInfo} from '../../util/api'

export default class Index extends Component {

  componentWillMount () { 
    // getUserInfo().then(res=>{console.log(res)})
    console.log(1)
  }

  componentDidMount () { 
    console.log(2)
  }

  componentWillUnmount () {
    console.log(3)
   }

  componentDidShow () {
    console.log(4)

   }
 
  componentDidHide () {
    console.log(5)

   }
   ToLogin(){
    Taro.navigateTo({
      url:'/pages/mind/login/index'
    })
   }

  render () {
    return (
      <View className='index'>
        <Text onClick={this.ToLogin}>登录</Text>
      </View>
    )
  }
}
