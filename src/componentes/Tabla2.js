import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { colores, colors } from './Colors'
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tabla2 = ({datos, columnas, Total, onEliminar, onEditar, generarPDF, compartirPDF}) => {

    const funcion1 = (id) => {
        // const movimiento = {
        //     id: id
        //   };
        const movimiento = datos.find((item) => item.id === id);
        // Almacena los datos en el estado local o en variables temporales según tus necesidades
        // Puedes usar el prop onEliminar para pasar los datos al componente padre (Ingresos)
        onEliminar(movimiento);
        // Luego, puedes comentar o eliminar la siguiente línea
        // AsyncStorage.setItem('idMovimientoIngreso', id);
      };
    
      const funcion2 = (id, descripcion, monto) => {
        const movimiento = {
          id: id,
          descripcion: descripcion,
          monto: monto,
        };
        // Almacena los datos en el estado local o en variables temporales según tus necesidades
        // Puedes usar el prop onEditar para pasar los datos al componente padre (Ingresos)
        onEditar(movimiento);
        // Luego, puedes comentar o eliminar las siguientes líneas
        // AsyncStorage.setItem('idMov', id);
        // AsyncStorage.setItem('descripcionMov', descripcion);
        // AsyncStorage.setItem('montoMov', monto);
      };

    const eliminarMovimiento = ()=>{

    }

  return (
    <View>
        <View style={{alignItems:'flex-end', marginHorizontal:20}}>
            <TouchableOpacity
                style={{backgroundColor:colors.color11,
                alignItems:'center', 
                paddingVertical:7,
                borderRadius:50,
                padding:5}} 
                onPress={compartirPDF}>
                < AntDesign name='share-variant' size={20} color={colores.color8}/>
            </TouchableOpacity>
        </View>
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
                                    <Text style={[styles.txtContenidoTabla2,{textAlign:'justify' ,paddingHorizontal:2}]}>{item.descripcion}</Text>
                                    <Text style={[styles.txtContenidoTabla2,{textAlign:'center'}]}>{item.nombreConcepto}</Text>
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
                    columnas===4 ? (
                        <>
                        <View style={styles.row}>
                        <Text style={ styles.conceptos}>Fecha</Text>
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
                                    <Text style={[styles.txtContenidoTabla2,{textAlign:'center', }]}>{item.fecha}</Text>
                                    <Text style={[styles.txtContenidoTabla2,{textAlign:'justify' ,paddingHorizontal:2}]}>{item.descripcion}</Text>
                                    <Text style={[styles.txtContenidoTabla2,{textAlign:'center',}]}>{item.nombreConcepto}</Text>
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
                                <Text style={ styles.conceptos}>Descripcion</Text>
                                <Text style={ styles.conceptos}>Monto</Text>
                                <Text style={ styles.conceptos}>Acciones</Text>
                        </View>
                        <FlatList
                            data={datos}
                            keyExtractor={(item) => item.id.toString()}
                            nestedScrollEnabled
                            renderItem={({ item }) => (
                                <>
                                <View style={styles.contenedorLista}>
                                    <Text style={[styles.txtContenidoTabla2,{textAlign:'justify', paddingHorizontal:2}]}>{item.descripcion}</Text>
                                    <Text style={[styles.txtContenidoTabla2,{textAlign:'center'}]}>${item.monto}</Text>
                                    <View style={[styles.txtContenidoTabla,{textAlign:'center', flexDirection:'row', justifyContent:'space-evenly'}]}>
                                        <TouchableOpacity style={{backgroundColor:colors.color10, borderRadius:20, padding:3}}
                                         onPress={()=>{funcion2(item.id, item.descripcion, item.monto)}}>
                                            < AntDesign name='pencil' size={15} color={colores.color8}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{backgroundColor:colors.color11, borderRadius:20, padding:3}}
                                         onPress={()=>{funcion1(item.id)}}>
                                            < AntDesign name='delete' size={15} color={colores.color8}/>
                                        </TouchableOpacity>
                                    </View>
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
                    
                )
            }
            
        </View>

    </View>
  )
}

export default Tabla2

const styles = StyleSheet.create({
    container:{
        marginVertical:10,
        backgroundColor:colores.color8,
        marginHorizontal:10,
        borderRadius:5,
        borderColor:colores.color5,
        height:260,
        borderWidth:1,
        borderColor:colores.color5
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
        color: colores.color6,
        flex:1,
        textAlign:'center'
    },
    contenedorLista: {
        flexDirection: 'row',
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: colores.color5,
        color: 'black',
        paddingHorizontal:5,
        alignItems:'center',
        justifyContent:'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        color: 'black',
        backgroundColor:colores.color5,
        paddingHorizontal:5,
        //justifyContent:'center',
        alignItems:'center'
    },
    txtContenidoTabla:{
        color:colors.color6,
        fontFamily: 'Roboto-Regular',
        flex:1,
    },
    txtContenidoTabla2:{
        color:colors.color6,
        fontFamily: 'Roboto-Regular',
        flex:1,
        borderRightWidth: 1, 
        borderRightColor: 'black', 
        height:'100%',
    }
})