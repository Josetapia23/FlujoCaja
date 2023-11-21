import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import ImgPress from '../componentes/ImgPress'
import { useNavigation } from '@react-navigation/native'
import { colores, colors } from '../componentes/Colors'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import Tablas from '../componentes/Tablas'
import { ScrollView } from 'react-native'
import SplashScreens from './SplashScreens'

const ingresos= require('../../assets/iconos/ingresos.png');
const perdida = require('../../assets/iconos/perdida.png');

const Despliegue = () => {
    const [cargando, setCargando] = useState(false);
    const [listaMovimientos, setListaMovimientos] = useState([]);
    const {userInfo, companyInfo} = useContext(AuthContext);
    const idUser = userInfo.id;
    const datosEmpresa = companyInfo.datos;

    useEffect(()=>{
        //setIdUser(userInfo.id)
        listarMovimientos();
        console.log(idUser);
      },[])

    const listarMovimientos = () => {
        setCargando(true);
    return new Promise((resolve, reject) => {
      axios
        .post(
          'http://192.168.40.76/flujoCaja/listaMovimientos.php',
          {
            idUser: idUser
          },
        )
        .then(res => {
          if (res.data.result === 'success') {
            // Registro exitoso
            setListaMovimientos(res.data.listaMovimientos)
            console.log("Lista", res.data.listaMovimientos)
            setCargando(false);
          } else if (res.data.result === 'error') {
            // Error en la consulta
            console.log('Error en la consulta de listar movimientos:', res.data.message);
            reject('Error en el registro: ' + res.data.message);
            setCargando(false);

          } else {
            console.log('Respuesta inesperada del servidor:', res.data);
            reject('Error inesperado del servidor');
            setCargando(false);

          }
        })
        .catch(error => {
          console.error('Error de axios para listar movimientos:', error.message);
          reject('Error con axios: ' + error.message);
            setCargando(false);

        });
    });
    }

    const navegacion = useNavigation()
  return (
            <SafeAreaView style={styles.container}>
                <View style={styles.containerSuperior}>
                    <Text style={{fontFamily:'Roboto-Medium', fontSize:30, color:colores.color7}}>Historiales</Text>
                </View>
                
                <View style={styles.view}>
                    <View style={{alignItems:'center'}}>
                        <ImgPress img={ingresos} funcion={() => navegacion.navigate('Ingresos')}/>
                        <Text style={{color:colores.color3, fontFamily:'Roboto-Medium'}}>Ingresos</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <ImgPress img={perdida} funcion={() => navegacion.navigate('Gastos')}/>
                        <Text style={{color:colores.color3, fontFamily:'Roboto-Medium'}}>Gastos</Text>
                    </View>
                </View>
                <View>
                    {
                        cargando == true ? (
                            <SplashScreens/>
                        ) :(
                            listaMovimientos.length>0?
                            (
                                listaMovimientos.length<10 ? (
                                <View>
                                    <Text style={{
                                        textAlign:'center', 
                                        color:colores.color3, 
                                        fontFamily:'Roboto-Medium',
                                        fontSize:25
                                        }}>{`Ultimos ${listaMovimientos.length} movimientos`}</Text>
                                    <Tablas datos={listaMovimientos}
                                    categoria={'Categorias-Tipo'} />
                                </View>
                                ):(
                                <View>
                                    <Text style={{
                                        textAlign:'center', 
                                        color:colores.color3, 
                                        fontFamily:'Roboto-Medium',
                                        fontSize:25
                                        }}>Ultimos 10 movimientos</Text>
                                    <Tablas datos={listaMovimientos}
                                    categoria={'Categorias  -  Tipo'}
                                    ambos={'1'} />
                                </View>
                                )
                            ):(
                                <Text>No hay Movimientos registrados</Text>
                            )
                        )
                    }
                
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
        height:250,
        flexDirection:'row'
    }
})