import { StyleSheet, Text, View , StatusBar, Platform} from 'react-native'
import React, { useEffect } from 'react'
import Navegacion from './src/componentes/Navegacion'
import { AuthProvider } from './src/context/AuthContext'
import SplashScreen from 'react-native-splash-screen';
import { colores } from './src/componentes/Colors';


StatusBar.setBackgroundColor(colores.color4); // Color de la barra de estado

const App = () => {

  useEffect(()=>{
    if(Platform.OS === 'android') SplashScreen.hide();
  },[])

  return (
    <AuthProvider>
        <Navegacion/>
    </AuthProvider>
  )
}

export default App

const styles = StyleSheet.create({})
