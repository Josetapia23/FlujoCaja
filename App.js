import { StyleSheet, Text, View , StatusBar} from 'react-native'
import React from 'react'
import Navegacion from './src/componentes/Navegacion'
import { AuthProvider } from './src/context/AuthContext'


StatusBar.setBackgroundColor('#69C2E3'); // Color de la barra de estado

const App = () => {

  return (
    <AuthProvider>
        <Navegacion/>
    </AuthProvider>
  )
}

export default App

const styles = StyleSheet.create({})
