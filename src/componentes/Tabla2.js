import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colores, colors } from './Colors'

const Tabla2 = ({datos, columnas, Total}) => {

  return (
    <View>
      <View style={styles.container}>
            <Text style={styles.header}>Historial</Text>
            {
                columnas === 3 ? (
                    <>
                        <View style={styles.row}>
                            <Text style={ styles.conceptos}>Descripcion</Text>
                            <Text style={[styles.conceptos]}>Categoria</Text>
                            <Text style={ styles.conceptos}>Monto</Text>
                        </View>
                        <FlatList
                            data={datos}
                            keyExtractor={(item) => item.id.toString()}
                            nestedScrollEnabled
                            renderItem={({ item }) => (
                                <>
                                <View style={styles.contenedorLista}>
                                    <Text style={[styles.txtContenidoTabla,{textAlign:'justify'}]}>{item.descripcion}</Text>
                                    <Text style={[styles.txtContenidoTabla,{textAlign:'center'}]}>{item.nombreConcepto}</Text>
                                    <Text style={[styles.txtContenidoTabla,{textAlign:'center'}]}>${item.monto}</Text>
                                </View>
                                </>
                            )}
                        />
                        <View style={styles.row}>
                            <Text style={ styles.conceptos}>Total</Text>
                            <Text style={[styles.conceptos]}>${Total}</Text>
                        </View>      
                    </>
                ):(
                    <>
                    <View style={styles.row}>
                            <Text style={ styles.conceptos}>Monto</Text>
                            <Text style={ styles.conceptos}>Descripcion</Text>
                    </View>
                    <FlatList
                        data={datos}
                        keyExtractor={(item) => item.id.toString()}
                        nestedScrollEnabled
                        renderItem={({ item }) => (
                            <>
                            <View style={styles.contenedorLista}>
                                <Text style={[styles.txtContenidoTabla,{textAlign:'center'}]}>${item.monto}</Text>
                                <Text style={[styles.txtContenidoTabla,{textAlign:'justify'}]}>{item.descripcion}</Text>
                            </View>
                            </>
                        )}
                    />
                    <View style={styles.row}>
                            <Text style={ styles.conceptos}>Total</Text>
                            <Text style={[styles.conceptos]}>${Total}</Text>
                    </View>        
                </> 
                )
            }
            
        </View>
    </View>
  )
}

export default Tabla2

const styles = StyleSheet.create({
    container:{
        marginVertical:20,
        backgroundColor:colores.color8,
        marginHorizontal:10,
        borderRadius:5,
        borderColor:colores.color5,
        height:260,
        borderWidth:1,
        borderColor:colores.color3
    },
    header: {
        fontFamily: 'Roboto-Bold',
        textTransform: 'uppercase',
        color: colors.color6,
        textAlign: 'center', 
        fontSize: 20,
        padding:8
    },
    conceptos: {
        fontFamily: 'Roboto-Bold',
        textTransform: 'uppercase',
        color: colors.color9,
        flex:1,
        textAlign:'center'
    },
    contenedorLista: {
        flexDirection: 'row',
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: colores.color3,
        color: 'black',
        paddingHorizontal:5,
        alignItems:'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        color: 'black',
        backgroundColor:colores.color3,
        paddingHorizontal:5,
        //justifyContent:'center',
        alignItems:'center'
    },
    txtContenidoTabla:{
        color:colors.color6,
        fontFamily: 'Roboto-Regular',
        flex:1,
    }
})