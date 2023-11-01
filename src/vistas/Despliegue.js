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
        <ImageBackground source={require('../../assets/images/fondoPesos.jpg')} 
        style={styles.backgroundImage}>
            <SafeAreaView style={styles.container}>
                    <ImgPress img={ingresos} funcion={navegacion.navigate('Ingresos')}/>
                    <ImgPress img={perdida} funcion={navegacion.navigate('Gastos')}/>
            </SafeAreaView>
        </ImageBackground>
  )
}

export default Despliegue

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    container:{
        flex: 1,
    },
})