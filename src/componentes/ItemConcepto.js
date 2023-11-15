import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colores } from './Colors'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';


const ItemConcepto = ({nombre}) => {
  return (
    <View style={styles.cardView}>
        <TouchableOpacity>
            <Text style={{textTransform:'uppercase', fontFamily:'Roboto-Bold', fontSize:25, color:colores.color7}}>{nombre}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Material name='delete-circle-outline' size={30} color='red'/>
        </TouchableOpacity>
    </View>
  )
}

export default ItemConcepto

const styles = StyleSheet.create({
    cardView:{
        backgroundColor:colores.color3,
        borderRadius:20,
        marginVertical:8,
        padding:40,
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 4,
        flexDirection:'row',
        justifyContent:'space-between'
        }
})