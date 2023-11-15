import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colores, colors } from '../componentes/Colors'
import { SafeAreaView } from 'react-native'
import { Image } from 'react-native'
import ImgPress from '../componentes/ImgPress'
import { ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ingresos= require('../../assets/iconos/ingresos.png');
const perdida = require('../../assets/iconos/perdida.png');

const Despliegue = () => {
    const navegacion = useNavigation()
  return (
            <SafeAreaView style={styles.container}>
                <View style={styles.view}>
                    <ImgPress img={ingresos} funcion={() => navegacion.navigate('Ingresos')}/>
                    <ImgPress img={perdida} funcion={() => navegacion.navigate('Gastos')}/>
                </View>
            </SafeAreaView>
  )
}

export default Despliegue

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colores.color6,
    },
    view:{
        alignItems:'center',
        justifyContent:'space-around',
        height:400
    }
})