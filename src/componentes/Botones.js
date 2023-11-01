import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colores } from './Colors'

const Botones = ({funcion, name, margin}) => {
  return (
    <View >
        <TouchableOpacity style={[styles.btnIngreso,{marginHorizontal:margin}]}
            onPress={funcion}
        ><Text style={styles.txtInferior}>{name}</Text>
        </TouchableOpacity>

    </View>
  )
}

export default Botones

const styles = StyleSheet.create({
    btnIngreso: {
        marginTop: 20,
        backgroundColor: colores.color4,
        textAlign: 'center',
        borderRadius: 10,
    },
    txtInferior: {
        padding: 10,
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        padding: 10,
        fontFamily: 'Roboto-Medium'
    },
})