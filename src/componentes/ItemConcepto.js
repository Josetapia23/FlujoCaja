import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colores } from './Colors'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';


const ItemConcepto = ({nombre, onPressEliminar, onPressConcepto, id}) => {
  return (
    <View style={styles.cardView}>
        <TouchableOpacity onPress={onPressConcepto(id)}>
            <Text style={{textTransform:'uppercase', fontFamily:'Roboto-Bold', fontSize:23, color:colores.color8}}>{nombre}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressEliminar(id)}>
            <Material name='delete-circle-outline' size={40} color='red'/>
        </TouchableOpacity>
    </View>
  )
}

export default ItemConcepto

const styles = StyleSheet.create({
    cardView:{
        backgroundColor:colores.color1,
        borderRadius:20,
        marginVertical:8,
        paddingVertical:15,
        paddingHorizontal:25,
        flex:1,
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 4,
        flexDirection:'row',
        justifyContent:'space-between'
        }
})