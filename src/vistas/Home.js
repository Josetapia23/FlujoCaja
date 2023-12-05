import { ScrollView, StyleSheet, Text, View } from 'react-native'
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


const Home = () => {
  const { isLoading, logout, userInfo, montosGenerales, arrayIngresos, arrayGastos, tokenEmpresa } = useContext(AuthContext);
  const ingresoDiario = montosGenerales.ingresoDiario; //Cantidad de ingresos en el dia actual
  const ingresoMensual = montosGenerales.ingresoMensual;//Cantidad de ingresos en el mes actual
  const gastoDiario = montosGenerales.gastoDiario;//Cantidad de gastos en el dia actual
  const gastoMensual = montosGenerales.gastoMensual; //Cantidad de gastos en el mes actual
  const nombreUsuario = userInfo.nombre;
  const [arrayIngresos2, setArrayIngresos2] = useState([]);
  const [arrayGastos2, setArrayGastos2] = useState([]);


  useEffect(() => {
    if (arrayIngresos) {
      setArrayIngresos2(arrayIngresos);
    }
    if (arrayGastos) {
      setArrayGastos2(arrayGastos);
    }
  }, [arrayIngresos, arrayGastos]);

  const arrayIngresosNumeros = arrayIngresos2?.map(val => Number(val.replace(/,/g, ''))) || [0,0,0,0,0,0];
  const arrayGastosNumeros = arrayGastos2?.map(val => Number(val.replace(/,/g, ''))) || [0,0,0,0,0,0];


console.log(arrayIngresosNumeros, "  ", arrayGastosNumeros)

  //const arrayIngresos = montosGenerales.ingresoPorIntervalo;
  // useEffect(()=>{
  //   setArryIngresos(montosGenerales.ingresoPorIntervalo)
  //   setArrayGastos(montosGenerales.gastoPorIntervalo)
  // },[])



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

const xx = useNavigation();

  return (
    <View style={styles.container}>
            <Spinner visible={isLoading} />
            
            <ScrollView>
            <View>
                {
                  ingresoDiario !== null?
                  (
                    <>
                    <Text>{`El monto total de ingresos de hoy son de: ${ingresoDiario}`}</Text>
                  {arrayIngresosNumeros.length > 0 ? (<Graficos labels={['0-4H','4-8H','8-12H','12-16H','16-20H','20-24H']} datos={arrayIngresosNumeros} v='i'/>):(<></>)}
                    </>
                  ):(
                    <Text>{`El dia de hoy no ha registrado ingresos`}</Text>
                  )
                }
                {
                  ingresoMensual !== null?
                  (
                    <Text>{`El monto total de ingresos de este mes es de: ${ingresoDiario}`}</Text>
                  ):(
                    <Text>{`En este mes no tiene ingresos registrados`}</Text>
                  )
                }
                {
                  gastoDiario !== null?
                  (
                    
                    <>
                    <Text>{`El monto total de gastos de hoy son de: ${gastoDiario}`}</Text>
                    {arrayGastosNumeros.length > 0 ? (<Graficos labels={['0-4H','4-8H','8-12H','12-16H','16-20H','20-24H']} datos={arrayGastosNumeros} v='g'/>):(<></>)}
                    </>
                    ):(
                    <Text>{`El dia de hoy no ha registrado gastos`}</Text>
                  )
                }
                {
                  gastoMensual !== null?
                  (
                    <Text>{`El monto total de gastos de hoy son de: ${gastoMensual}`}</Text>
                  ):(
                    <Text>{`El dia de hoy no ha registrado gastos`}</Text>
                  )
                }
                <Botones name='Cerrar Sersion'
                    funcion={salir} margin={100} padding={4}></Botones>
                
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
    alignItems:'center',
    justifyContent:'space-around'
  }
})