import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

import {
    LineChart,
    ProgressChart
  } from "react-native-chart-kit";
import { colores, colors } from './Colors';

const Graficos = ({labels, datos, v}) => {

  //const datosNumeros = Array.isArray(datos) ? datos.map(Number) : []; //Aqui si por alguna casualidad el array trae algun string lo convierte a numero y se guardaria un nuevo array en la constante
  return (
    <View>
      {v === 'i'? (
        <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: datos,
            },
          ],
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
            backgroundColor: colores.color9,
            backgroundGradientFrom: colores.color8,
          backgroundGradientTo: colores.color8,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 10) => colors.color8,
          labelColor: (opacity = 5) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "3",
            stroke: 'green'
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 7,
        }}
    />
      ):(
        v === 'g' ? (
          <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: datos,
              },
            ],
          }}
          width={Dimensions.get("window").width - 20} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
              backgroundColor: colores.color9,
              backgroundGradientFrom: colores.color8,
            backgroundGradientTo: colores.color8,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 10) => colors.color8,
            labelColor: (opacity = 5) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: colores.color10
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 7,
          }}
      />
        ):(
          <></>
        )
        
      )}
  </View>
  )
}

export default Graficos

const styles = StyleSheet.create({})