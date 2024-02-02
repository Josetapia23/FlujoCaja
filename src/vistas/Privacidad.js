import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import { colores } from '../componentes/Colors';
import { useNavigation } from '@react-navigation/native';

const Privacidad = () => {
    
    const navegacion = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerSuperior}>
            <TouchableOpacity style={styles.atras} onPress={()=>navegacion.goBack()}>
                <AntDesign name='arrow-left' size={25} color={colores.color7}/>
            </TouchableOpacity>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:20, color:colores.color7, textAlign:'center', }}>{`Privaciadad`}</Text>
        </View>
    </View>
  )
}

export default Privacidad

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    containerSuperior:{
        //flexDirection:'row',
        backgroundColor:colores.color5,
        alignItems:'center',
        justifyContent:'center',
        height:100
    },
    atras:{
        position:'absolute',
        left:15,
        top:35
    },
})