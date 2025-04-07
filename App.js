import { StyleSheet, Text, View , StatusBar, Platform} from 'react-native'
import React, { useEffect } from 'react'
import Navegacion from './src/componentes/Navegacion'
import { AuthProvider } from './src/context/AuthContext'
import SplashScreen from 'react-native-splash-screen';
import { colores, colors } from './src/componentes/Colors';
import { check, request, PERMISSIONS } from 'react-native-permissions';



StatusBar.setBackgroundColor(colors.color10); // Color de la barra de estado

const App = () => {

  useEffect(()=>{
    const hideSplashScreen = () => {
      setTimeout(() => {
        SplashScreen.hide();
      }, 3000);
    };

    const requestStoragePermission = async () => {
      try {
        const storagePermission = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

        if (storagePermission === 'denied') {
          const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

          if (result === 'granted') {
            // Permiso concedido, puedes realizar acciones adicionales si es necesario
          } else {
            // Permiso denegado, manejar según sea necesario
          }
        }

        hideSplashScreen(); // Oculta la pantalla de inicio después de verificar los permisos
      } catch (error) {
        console.error(error);
      }
    };

    if (Platform.OS === 'android') {
      hideSplashScreen();
      requestStoragePermission();
    }
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
