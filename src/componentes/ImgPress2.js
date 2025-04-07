import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { colores } from './Colors';

const ImgPress2 = ({children, funcion}) => {
  return (
    <View style={styles.contImg}>
        <TouchableOpacity onPress={funcion}>
            {children}
        </TouchableOpacity>
    </View>
  )
}

export default ImgPress2

const styles = StyleSheet.create({
    contImg:{
        alignItems:'center',
        justifyContent:'center',
        height:60,
        width:60,
        borderRadius:40,
        backgroundColor:colores.color5
    }
})