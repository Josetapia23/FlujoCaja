import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colores } from '../componentes/Colors'
import Tablas from '../componentes/Tablas';

const Graficos = () => {
  const array = [
    {
      "id":1,
      "monto": 100.000,
      "descripcion": "Ventas en efectivo",
      "fecha": "2023-10-31"
    },
    {
      "id":2,
      "monto": 50.000,
      "descripcion": "Cobros de ventas a crédito",
      "fecha": "2023-10-30"
    },
    {
      "id":3,
      "monto": 200.000,
      "descripcion": "Cobros por ventas de activos fijos",
      "fecha": "2023-10-29"
    },
    {
      "id":4,
      "monto": 200.000,
      "descripcion": "Cobros por ventas de activos fijos",
      "fecha": "2023-10-29"
    },
    {
      "id":5,
      "monto": 200.000,
      "descripcion": "Cobros por ventas de activos fijos",
      "fecha": "2023-10-29"
    },
    {
      "id":6,
      "monto": 200.000,
      "descripcion": "Cobros por ventas de activos fijos",
      "fecha": "2023-10-29"
    },
    {
      "id":7,
      "monto": 200.000,
      "descripcion": "Cobros por ventas de activos fijos",
      "fecha": "2023-10-29"
    }
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View>
      <Tablas datos={array} />
      </View>
    </SafeAreaView>
  )
}

export default Graficos

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: colores.color6,
  }
})