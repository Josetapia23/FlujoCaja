import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import ImgPress from '../componentes/ImgPress'
import { useNavigation } from '@react-navigation/native'
import { colores, colors } from '../componentes/Colors'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native'

const ingresos= require('../../assets/iconos/ingresos.png');
const perdida = require('../../assets/iconos/perdida.png');

const Despliegue = () => {
    const navegacion = useNavigation()
  return (
            <SafeAreaView style={styles.container}>
                <View style={styles.containerSuperior}>
                    <TouchableOpacity style={styles.atras}>
                        <Material name='arrow-left' size={20} color={colores.color7}/>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Roboto-Medium', fontSize:30, color:colores.color1}}>Historiales</Text>
                </View>
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
    },containerSuperior:{
        //flexDirection:'row',
        backgroundColor:colores.color5,
        alignItems:'center',
        justifyContent:'center',
        height:100
    },
    atras:{
        position:'absolute',
        left:10,
        top:20
    },
    view:{
        alignItems:'center',
        justifyContent:'space-around',
        height:400
    }
})