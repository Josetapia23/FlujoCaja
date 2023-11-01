import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colores, colors } from './Colors'

const Tablas = ({datos}) => {

  return (
    <View>
      <View style={styles.container}>
            <Text style={styles.header}>Historial</Text>
            <View style={styles.row}>
                <Text style={[styles.cell, styles.conceptos]}>Monto</Text>
                <Text style={[styles.cell, styles.conceptos]}>Descripcion</Text>
                <Text style={[styles.cell, styles.conceptos]}>Fecha</Text>
            </View>
            <FlatList
                data={datos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <>
                        <View style={styles.contenedorLista}>
                            <Text style={styles.txtContenidoTabla}>{item.monto}</Text>
                            <Text style={styles.txtContenidoTabla}>{item.descripcion}</Text>
                            <Text style={styles.txtContenidoTabla}>{item.fecha}</Text>
                        </View>
                    </>
                )}
            />
        </View>
    </View>
  )
}

export default Tablas

const styles = StyleSheet.create({
    container:{
        marginVertical:20,
        backgroundColor:colores.color8,
        marginHorizontal:10,
        borderRadius:5,
        borderColor:colores.color5
    },
    header: {
        fontFamily: 'Roboto-Bold',
        textTransform: 'uppercase',
        color: colors.color6,
        textAlign: 'center', 
        fontSize: 20
    },
    conceptos: {
        fontFamily: 'Roboto-Bold',
        textTransform: 'uppercase',
        color: colors.color9,
    },
    contenedorLista: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: colores.color3,
        color: 'black',
        paddingHorizontal:5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colores.color5,
        color: 'black',
        backgroundColor:colores.color3,
        paddingHorizontal:5
    },
    txtContenidoTabla:{
        color:colors.color6,
        fontFamily: 'Roboto-Regular'
    }
})