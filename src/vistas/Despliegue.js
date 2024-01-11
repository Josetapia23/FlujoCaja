import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import ImgPress from '../componentes/ImgPress'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
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

    useFocusEffect( //Este se utiliza para que renderice las funciones de inmediato en las vistas que hacen parte de los bootom tabs
        React.useCallback(()=>{
            listarMovimientos();
        }, [])
    )

      const listarMovimientos = async () => {
        setCargando(true);
        try {
          const res = await axios.post('https://www.plataforma50.com/pruebas/gestionP/listaMovimientos.php', {
            idUser: idUser
          });
      
          if (res.data.result === 'success') {
            setListaMovimientos(res.data.listaMovimientos);
            //console.log("Lista", res.data.listaMovimientos);
          } else {
            console.log('Error en la consulta de listar movimientos:', res.data.message);
            throw new Error('Error en la consulta: ' + res.data.message);
          }
        } catch (error) {
          console.error('Error de axios para listar movimientos:', error.message);
          throw error;
        } finally {
          setCargando(false);
        }
      };
      

    const navegacion = useNavigation()
  return (
            <SafeAreaView style={styles.container}>
                <View style={styles.containerSuperior}>
                    <TouchableOpacity style={styles.atras} onPress={()=>navegacion.navigate('Inicio')}>
                        <Material name='arrow-left' size={25} color={colores.color7}/>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Roboto-Medium', fontSize:25, color:colores.color7, textAlign:'center', }}>{`Historiales`}</Text>
                </View>
                
                <View style={styles.view}>
                    <View style={{alignItems:'center'}}>
                        <ImgPress img={ingresos} funcion={() => navegacion.navigate('Ingresos')}/>
                        <Text style={{color:colores.color5, fontFamily:'Roboto-Medium'}}>Ingresos</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <ImgPress img={perdida} funcion={() => navegacion.navigate('Gastos')}/>
                        <Text style={{color:colores.color5, fontFamily:'Roboto-Medium'}}>Gastos</Text>
                    </View>
                </View>
                <View>
                    <ScrollView>
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
                                        color:colores.color5, 
                                        fontFamily:'Roboto-Medium',
                                        fontSize:25
                                        }}>{`Ultimos ${listaMovimientos.length} movimientos`}</Text>
                                    <Tablas datos={listaMovimientos}
                                    categoria={'Categorias'}
                                    ambos={'1'} />
                                </View>
                                ):(
                                <View>
                                    <Text style={{
                                        textAlign:'center', 
                                        color:colores.color5, 
                                        fontFamily:'Roboto-Medium',
                                        fontSize:25
                                        }}>Ultimos 10 movimientos</Text>
                                    <Tablas datos={listaMovimientos}
                                    categoria={'Categorias'}
                                    ambos={'1'} />
                                </View>
                                )
                            ):(
                                <Text style={{textAlign:'center', color:colores.color5, fontSize:16, marginTop:100}}>"No hay Movimientos registrados"</Text>
                            )
                        )
                    }
                    </ScrollView>
                
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
        left:15,
        top:20
    },
    view:{
        alignItems:'center',
        justifyContent:'space-around',
        height:250,
        flexDirection:'row'
    }
})