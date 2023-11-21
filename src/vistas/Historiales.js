import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { colores, colors } from '../componentes/Colors'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import Tablas from '../componentes/Tablas';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import SplashScreens from './SplashScreens';
import Tabla2 from '../componentes/Tabla2';



const Historiales = () => {
    const [tipo, setTipo] = useState(1);
    const [cargando, setCargando] = useState(false);
    const [montoTotal, setMontoTotal] = useState('');
    const [listaMovimientos, setListaMovimientos] = useState([]);
    const [listaMovimientos2, setListaMovimientos2] = useState([]);
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
          'http://192.168.40.76/flujoCaja/lis_mov_ingresos.php',
          {
            idUser: idUser,
            idTipo: tipo
          },
        )
        .then(res => {
          if (res.data.result === 'success') {
            // Registro exitoso
            setListaMovimientos(res.data.listaMovimientos)
            setListaMovimientos2(res.data.listMovimientos2)
            setMontoTotal(res.data.montoTotal);
            console.log(res.data.listaMovimientos)
            setCargando(false);
          } else if (res.data.result === 'error') {
            // Error en la consulta
            console.log('Error en la consulta de listar movimientos Ingresos1:', res.data.message);
            reject('Error en el registro: ' + res.data.message);
            setCargando(false);

          } else {
            console.log('Respuesta inesperada del servidor:', res.data);
            reject('Error inesperado del servidor');
            setCargando(false);

          }
        })
        .catch(error => {
          console.error('Error de axios para listar movimientos Ingresos2:', error.message);
          reject('Error con axios: ' + error.message);
            setCargando(false);

        });
    });
    }




    const navegacion = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.containerSuperior}>
            <TouchableOpacity style={styles.atras} onPress={()=>navegacion.navigate('Ingresos')}>
                <Material name='arrow-left' size={20} color={colores.color7}/>
            </TouchableOpacity>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:30, color:colores.color7, textAlign:'center'}}>{`Historial de Ingresos\nTotal`}</Text>
        </View>
        <ScrollView>
          <View>
              <Text >FILTROS</Text>
              <Tabla2 
              datos={listaMovimientos2}
              columnas={3}
              Total={montoTotal}/>
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
                                    categoria={'Categorias'} />
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
                                    categoria={'Categorias'} />
                                </View>
                                )
                            ):(
                                <Text>No hay Movimientos registrados</Text>
                            )
                        )
                    }
                
                </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Historiales

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colores.color6
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
        left:10,
        top:20
    }
})