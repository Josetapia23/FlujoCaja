import { ScrollView, StyleSheet, Text, View , RefreshControl } from 'react-native'
import React, { useContext, useState } from 'react'
import {colores, colors} from '../componentes/Colors'
import { TouchableOpacity } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Alert } from 'react-native'
import Botones from '../componentes/Botones'
import Graficos from '../componentes/Graficos'
import { useEffect } from 'react'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';



const Home = () => {
  const { isLoading, logout, userInfo, montosGenerales, arrayIngresos, arrayGastos, companyInfo, obtenerEmpresa, montos } = useContext(AuthContext);
  const [arrayIngresos2, setArrayIngresos2] = useState([]);
  const [arrayGastos2, setArrayGastos2] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [fechaFormateada, setFechaFormateada] = useState('');
  const ingresoDiario = montosGenerales.ingresoDiario; //Cantidad de ingresos en el dia actual
  const ingresoMensual = montosGenerales.ingresoMensual;//Cantidad de ingresos en el mes actual
  const gastoDiario = montosGenerales.gastoDiario;//Cantidad de gastos en el dia actual
  const gastoMensual = montosGenerales.gastoMensual; //Cantidad de gastos en el mes actual
  const nombreUsuario = userInfo.nombre;

  const companyActive = companyInfo.pasar;


  const arrayIngresosNumeros = arrayIngresos2?.map(val => Number(val.replace(/,/g, ''))) || [0,0,0,0,0,0];
  const arrayGastosNumeros = arrayGastos2?.map(val => Number(val.replace(/,/g, ''))) || [0,0,0,0,0,0];
  
  
  const ingresoDiarioNumerico = ingresoDiario ? Number(ingresoDiario.replace(/,/g, '')) : 0;
  const gastoDiarioNumerico = gastoDiario ? Number(gastoDiario.replace(/,/g, '')) : 0;
  
  const ingresoMensualNumerico = ingresoMensual ? Number(ingresoMensual.replace(/,/g, '')) : 0;
  const gastoMensualNumerico = gastoMensual ? Number(gastoMensual.replace(/,/g, '')) : 0;
  const balanceMensual2 = ingresoMensualNumerico - gastoMensualNumerico;
  const balanceMensual = balanceMensual2.toLocaleString();
  

  useFocusEffect( //Este se utiliza para que renderice las funciones de inmediato en las vistas que hacen parte de los bootom tabs
        React.useCallback(()=>{
          obtenerEmpresa();
          if(companyActive == 'si') montos();
        }, [])
    )

  const onRefresh = async () => {
    setRefreshing(true);
    await montos(); // Llamamos a la función montos para actualizar los datos
    setRefreshing(false);
  };
  
  useEffect(() => {
    if (arrayIngresos) {
      setArrayIngresos2(arrayIngresos);
    }
    if (arrayGastos) {
      setArrayGastos2(arrayGastos);
    }
  }, [arrayIngresos, arrayGastos]);


console.log(arrayIngresosNumeros, "  ", balanceMensual, "  ",arrayGastosNumeros)

  

  const salir = () => {
    Alert.alert(
        'Cerrar Sesion',
        `Confirma salir de sesion?`,
        [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    logout();
                }
            }
        ]
    );
}

useEffect(() => {
  // Obtener la fecha actual
  const fechaActual = new Date();

  // Opciones de formato para el objeto Intl.DateTimeFormat
  const opcionesFormato = {
    weekday: 'long', // día de la semana (nombre completo)
    year: 'numeric', // año (numérico)
    month: 'long', // mes (nombre completo)
    day: 'numeric', // día del mes (numérico)
  };

  // Formatear la fecha usando Intl.DateTimeFormat
  const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato);
  const fechaFormateadaTexto = formatoFecha.format(fechaActual);

  setFechaFormateada(fechaFormateadaTexto);
}, []); 

const xx = useNavigation();

  return (
    <View style={styles.container}>
            <Spinner visible={isLoading} />
            <View style={styles.containerSuperior}>
              <Text style={{fontFamily:'Roboto-Medium', fontSize:20, color:colores.color7, textAlign:'center'}}>{`Hola,\n ${userInfo.nombre}`}</Text>
            </View>
            <ScrollView 
            style={{marginVertical:20}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.containerBody}>

            { companyActive == 'si'?
              (
                <>
                {
                    ingresoMensualNumerico > 0 && gastoMensualNumerico > 0?(
                      <View style={{backgroundColor:colores.color5, alignItems:'center', paddingVertical:5, borderRadius:3, marginBottom:10}}>
                      <Text style={[styles.txtMontos, {marginTop:10}]}>
                        El balance total del mes actual es el siguiente:</Text>
                        {
                          balanceMensual2 > 0 ?
                          (<Text style={{color:'green', fontSize:25, fontFamily:'Roboto-Medium'}}>'${balanceMensual}'</Text>):
                          (<Text style={{color:'red', fontSize:25, fontFamily:'Roboto-Medium'}}>'${balanceMensual}'</Text>)
                        }
                        <Text
                        style={{ fontSize:13, fontFamily:'Roboto-Regular', color:colores.color6, marginHorizontal:30, paddingVertical:7}}>
                          {`Teniendo en cuenta que sus ingresos en este mes son de: $${ingresoMensual} y sus gastos $${gastoMensual}`}
                          </Text>
                      </View>
                    ):(
                      ingresoMensualNumerico > 0?
                      (
                        <View style={{backgroundColor:colores.color5, alignItems:'center', paddingVertical:5, borderRadius:3, marginBottom:10}}>
                        <Text style={[styles.txtMontos, {marginTop:10}]}>
                        El balance total del mes actual es el siguiente:</Text>
                        <Text style={{color:'green', fontSize:25, fontFamily:'Roboto-Medium'}}>'${balanceMensual}'</Text>
                        <Text
                          style={{ fontSize:13, fontFamily:'Roboto-Regular', color:colores.color6, marginHorizontal:30, paddingVertical:7}}>
                          {`Teniendo en cuenta que sus ingresos en este mes son de: $${ingresoMensual} y sus gastos $${gastoMensual}`}
                        </Text>
                        </View>
                      ):(
                        gastoMensualNumerico > 0?(
                          <View style={{backgroundColor:colores.color5, alignItems:'center', paddingVertical:5, borderRadius:3, marginBottom:10}}>
                          <Text style={[styles.txtMontos, {marginTop:10}]}>
                          El balance total del mes actual es el siguiente:</Text>
                          <Text style={{color:'red', fontSize:25, fontFamily:'Roboto-Medium'}}>'${balanceMensual}'</Text>
                          <Text
                            style={{ fontSize:13, fontFamily:'Roboto-Regular', color:colores.color6, marginHorizontal:30, paddingVertical:7}}>
                            {`Teniendo en cuenta que sus ingresos en este mes son de: $${ingresoMensual} y sus gastos $${gastoMensual}`}
                          </Text>
                          </View>
                        ):(
                          ingresoMensualNumerico >= 0 && gastoMensualNumerico >= 0?(
                            <View style={{backgroundColor:colores.color5, alignItems:'center', paddingVertical:5, borderRadius:3, marginBottom:10}}>
                              <Text style={[styles.txtMontos, {marginTop:10}]}>
                              El balance total del mes actual es el siguiente:</Text>
                              <Text style={{color:colores.color9, fontSize:25, fontFamily:'Roboto-Medium'}}>'${balanceMensual}'</Text>
                              <Text
                                style={{ fontSize:13, fontFamily:'Roboto-Regular', color:colores.color6, marginHorizontal:30, paddingVertical:7}}>
                                {`Teniendo en cuenta que sus ingresos en este mes son de: $${ingresoMensual} y sus gastos $${gastoMensual}`}
                              </Text>
                            </View>
                          ):(
                            <>
                            </>
                          )
                        )
                      )
                    )
                  }
                  {/*  */}
                  {
                    ingresoDiarioNumerico > 0?
                    (
                      <>
                      <Text style={[styles.txtMontos2,]}>
                        El monto total de ingresos de hoy son de 
                        <Text style={{color:'green'}}> ${ingresoDiario}</Text>
                      </Text>
                    {arrayIngresosNumeros.length > 0 ? (
                    <Graficos labels={['0-4H','4-8H','8-12H','12-16H','16-20H','20-24H']} datos={arrayIngresosNumeros} v='i'/>
                      ):(
                      <></>
                      )
                    }
                      </>
                    ):(
                      
                      <Text style={[styles.txtMontos2, {marginTop:20}]}>{`El dia de hoy no ha registrado ingresos`}</Text>
                    )
                  }
                  {/*  */}
                  <View style={{borderBottomColor:colors.color8, width:'100%', borderWidth:1, opacity:0.1, top:0}}></View>
                  {/*  */}
                  {
                    gastoDiarioNumerico > 0?
                    (
                      
                      <>
                      <Text style={[styles.txtMontos2, {marginTop:10}]}>
                        {`El monto total de gastos hoy '${fechaFormateada}' son:`} 
                        <Text style={{color:'red'}}> ${gastoDiario}</Text>
                      </Text>
                      {arrayGastosNumeros.length > 0 ? (
                      <Graficos labels={['0-4H','4-8H','8-12H','12-16H','16-20H','20-24H']} datos={arrayGastosNumeros} v='g'/>
                        ):(
                        <></>
                        )
                      }
                      </>
                      ):(
                      <Text style={[styles.txtMontos2, {marginTop:20}]}>{`El dia de hoy no ha registrado gastos`}</Text>
                    )
                  }
                </>
              ):
              (
                <View style={{alignItems:'center', justifyContent:'center'}}>
                  <Botones 
                    name='Registrar empresa'
                    funcion={()=>{xx.navigate('Logout')}}/>
                </View>
              )
            }

            
                
                




                {/* {
                  ingresoMensualNumerico > 0?
                  (
                    <Text style={[styles.txtMontos, {marginTop:10}]}>
                      El monto total de ingresos del mes actual es de:
                    <Text style={{color:'green'}}> ${ingresoMensual}</Text></Text>
                  ):(
                    <Text style={[styles.txtMontos, {marginTop:10}]}>{`En este mes no tienes ingresos registrados`}</Text>
                  )
                }
                <View style={{borderBottomColor:colors.color8, width:'100%', borderWidth:1, opacity:0.1, top:0}}></View>
                {
                  gastoMensualNumerico > 0?
                  (
                    <Text style={[styles.txtMontos, {marginTop:10}]}>
                      El monto total de gastos del mes actual es de:
                    <Text style={{color:'red'}}> ${gastoMensual}</Text></Text>
                  ):(
                    <Text style={[styles.txtMontos, {marginTop:10}]}>{`En este mes no tienes gastos registrados`}</Text>
                  )
                } */}
                {/* <Botones name='Consultar'
                    funcion={()=>{montos()}} margin={100} padding={4}></Botones> */}
                
              </View>
            </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: colores.color6,
  },
  containerSuperior:{
    //flexDirection:'row',
    backgroundColor:colores.color5,
    alignItems:'center',
    justifyContent:'center',
    height:100
  },
  containerBody:{
    alignItems:'center',
    marginTop:20
  },
  txtMontos:{
    fontFamily:'Roboto-Medium',
    fontSize:16,
    marginHorizontal:30,
    textAlign:'center',
    color:colores.color8,
    paddingVertical:5
  },
  txtMontos2:{
    fontFamily:'Roboto-Medium',
    fontSize:16,
    marginHorizontal:30,
    textAlign:'center',
    color:colores.color9,
    paddingVertical:5
  }
})