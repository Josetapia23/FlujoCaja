import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import { colores } from '../componentes/Colors'

const SplashScreen3 = () => {

    useFocusEffect( //Este se utiliza para que renderice las funciones de inmediato en las vistas que hacen parte de los bootom tabs
        React.useCallback(()=>{
            setTimeout(()=>{
                navegacion.navigate('Inicio');
            }, 5000)
        }, [])
    )
    navegacion = useNavigation();

  return (
    <View style={styles.container}>
        <Animatable.Image
            animation='pulse'
            easing='ease-out'
            iterationCount='infinite'
            style={{
                width:200,
                height:200,
                margin:100
            }}
            source={require('../../assets/Logo.png')}
        />
        <Text>Vista del SplashScreen</Text>
    </View>
  )
}

export default SplashScreen3

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colores.color6,
      },
})