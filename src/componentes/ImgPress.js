import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { colores } from './Colors';

const ImgPress = ({img, funcion}) => {
  return (
    <View style={styles.contImg}>
        <TouchableOpacity onPress={funcion}>
            <Image source={img}
            style={styles.img}/>
        </TouchableOpacity>
    </View>
  )
}

export default ImgPress

const styles = StyleSheet.create({
    contImg:{
        width:120,
        height:120,
        backgroundColor:colores.color5,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        margin:10
    },
    img:{
        tintColor:colores.color6,
        width:100,
        height:100,
        objectFit:'fill'
    }
})