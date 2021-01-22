import React, { Component } from 'react'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'
import { roomRequest } from '../../util/require'

export default class Room extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      roomList: []
    }
  }
  componentDidShow
  
  () {
    this.getRoomList()
    console.log(this)
  }
  // 获取房源列表
  async getRoomList() {
    let opt = {
      page: 1
    }
    let res = await roomRequest.getRoomList(opt)
    if (res.code == 1) {
      this.setState({
        roomList: res.data
      })
    }
  }
  render() {
    return (
      <View className='index'>
        <View className='list'>
          {this.state.roomList.map((item, index: number) => {
            return <View className='li box-shadow flex-mid-sb' key={index}>
              <View className='left'>
                <View className='room-name'>{item.name}</View>
                <View className='room-type'>{item.room_type_name}</View>
                <View className='room-address flex-mid line1'>
                  <Text className='icon iconposition1 pr-10'></Text>
                  <Text>{item.room_address}</Text>
                </View>
              </View>
              <View className='right flex-mid'>
                <View className='image'>
                  <Image src={item.room_image} />
                </View>
              </View>
            </View>
          })}
        </View>
      </View>
    )
  }
}
