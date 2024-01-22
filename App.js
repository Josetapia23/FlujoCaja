import { StyleSheet, Text, View , StatusBar, Platform} from 'react-native'
import React, { useEffect } from 'react'
import Navegacion from './src/componentes/Navegacion'
import { AuthProvider } from './src/context/AuthContext'
import SplashScreen from 'react-native-splash-screen';
import { colores, colors } from './src/componentes/Colors';


StatusBar.setBackgroundColor(colors.color10); // Color de la barra de estado

const App = () => {

  useEffect(()=>{
    if(Platform.OS === 'android') SplashScreen.hide();
  },[])

  return (
    <AuthProvider>
        {/* <StatusBar translucent backgroundColor='rgba(0,0,0,0.1)'/> */}
        <Navegacion/>
    </AuthProvider>
  )
}

export default App

const styles = StyleSheet.create({})
