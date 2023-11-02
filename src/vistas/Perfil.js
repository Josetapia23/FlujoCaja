import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import { colores } from '../componentes/Colors';
import { AuthContext } from '../context/AuthContext';


const Perfil = () => {
    const {userInfo} = useContext(AuthContext)
  return (
    <SafeAreaView style={styles.container}>
        <AntDesign name='account-circle' size={150} color={colores.color1}/>
        <Text>{userInfo.nombre}</Text>
        <Text>{userInfo.email}</Text>
        <View>
            <Text>Datos de empresa</Text>
        </View>
    </SafeAreaView>
  )
}

export default Perfil

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    }
})