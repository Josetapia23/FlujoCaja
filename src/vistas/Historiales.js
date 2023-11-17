import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { colores, colors } from '../componentes/Colors'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import ImgPress2 from '../componentes/ImgPress2';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';



const Historiales = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.containerSuperior}>
            <TouchableOpacity style={styles.atras}>
                <Material name='arrow-left' size={20} color={colores.color7}/>
            </TouchableOpacity>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:30, color:colores.color1}}>Historiales</Text>
        </View>
        <ScrollView>
            
        </ScrollView>
    </SafeAreaView>
  )
}

export default Historiales

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colores.color7
    },
    containerSuperior:{
        //flexDirection:'row',
        backgroundColor:colores.color5,
        alignItems:'center',
        justifyContent:'center',
        height:100
    },
    atras:{
        position:'absolute',
        left:10,
        top:20
    }
})