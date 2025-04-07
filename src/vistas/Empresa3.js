import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Botones from '../componentes/Botones';
import { colores } from '../componentes/Colors';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';


const Empresa3 = () => {
    const { isLoading, userInfo, registerEmpresa, companyInfo, logout} = useContext(AuthContext);
    console.log(companyInfo);
    const datosEmpresa = companyInfo.datos;

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
    
  return (
    <SafeAreaView style={styles.containForm}>
          <View style={{marginBottom:40, marginTop:10}}>
          <View style={{alignItems:'center', marginBottom:20}}>
            <AntDesign name='account-circle' size={150} color={colores.color5}/>
            <Text style={{color:'black', marginBottom:5, fontFamily:'Roboto-Medium'}}>Nombre Emprendedor: {userInfo.nombre}</Text>
            <Text style={{color:'black', marginBottom:5, fontFamily:'Roboto-Medium'}}>Correo Emprendedor: {userInfo.email}</Text>
          </View>
          <View style={{alignItems:'center', marginBottom:20}}>
            <AntDesign name='domain' size={150} color={colores.color2}/>
            <Text style={{color:'black', marginBottom:5, fontFamily:'Roboto-Medium'}}>Nombre Empresa: {datosEmpresa.nombreEmprendimiento}</Text>
            <Text style={{color:'black', marginBottom:5, fontFamily:'Roboto-Medium'}}>Nit: {datosEmpresa.nit}</Text>
            <Text style={{color:'black', marginBottom:5, fontFamily:'Roboto-Medium'}}>Direccion: {datosEmpresa.direccion}</Text>
            <Text style={{color:'black', marginBottom:5, fontFamily:'Roboto-Medium'}}>Tel Empresa: {datosEmpresa.telefonoEmpresarial}</Text>
            <Text style={{color:'black', marginBottom:5, fontFamily:'Roboto-Medium'}}>Correo Empresa: {datosEmpresa.emailEmpresarial}</Text>
          </View>
          </View>
          <Botones name='Cerrar Sersion'
            funcion={salir} margin={100} padding={4}>
            <AntDesign name='logout-variant' size={35} color={colores.color8}/>
          </Botones>
      </SafeAreaView>
  )
}

export default Empresa3

const styles = StyleSheet.create({})