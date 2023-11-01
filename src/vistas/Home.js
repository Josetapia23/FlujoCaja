import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import {colores, colors} from '../componentes/Colors'
import { TouchableOpacity } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Alert } from 'react-native'
import Botones from '../componentes/Botones'


const Home = () => {
  const { isLoading, tokenUsuario, logout, userInfo } = useContext(AuthContext);

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
            <Text>{`Hola ${userInfo.nombre}`}</Text>
            <Botones
            name='Cerrar Sesion'
            funcion={salir}
            margin={100}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: colores.color1,
    alignItems:'center',
    justifyContent:'space-around'
  }
})