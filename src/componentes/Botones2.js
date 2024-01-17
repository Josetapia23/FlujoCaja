import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colores } from './Colors'

const Botones2 = ({children, funcion, name, margin, padding}) => {
  return (
        <TouchableOpacity style={[styles.btnIngreso,{marginHorizontal:margin, paddingHorizontal:padding}]}
        onPress={funcion}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {children}
            <Text style={styles.txtInferior}>{name}</Text>
            </View>
        </TouchableOpacity>
  )
}

export default Botones2

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
        fontSize: 17,
        color: '#fff',
        padding: 10,
        fontFamily: 'Roboto-Medium'
    },
})