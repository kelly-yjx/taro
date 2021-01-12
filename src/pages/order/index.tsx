import React, { Component } from 'react'
import { View, Text ,Button} from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  constructor(){
    super({})
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Button>1</Button>
        <Text>order</Text>
      </View>
    )
  }
}
