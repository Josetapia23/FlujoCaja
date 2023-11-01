import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native'; // Añade FlatList a los imports
import Tablas from '../componentes/Tablas';

const Ingresos = () => {
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
    }
  ];

  return (
    <View>
      <Tablas datos={array} />
    </View>
  );
}

export default Ingresos;

const styles = StyleSheet.create({})
