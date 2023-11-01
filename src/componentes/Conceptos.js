import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colores, colors } from './Colors'
import Imputs from './Imputs'


const Conceptos = () => {

  return (
    <View>
        <Imputs/>
    </View>
  )
}

export default Conceptos

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    }
})