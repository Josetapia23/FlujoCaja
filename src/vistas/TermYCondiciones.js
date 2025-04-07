import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import { colores } from '../componentes/Colors';
import { colors } from '../componentes/Colors';
import { useNavigation } from '@react-navigation/native';

const TermYCondiciones = () => {

    const navegacion = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerSuperior}>
            <TouchableOpacity style={styles.atras} onPress={()=>navegacion.goBack()}>
                <AntDesign name='arrow-left' size={25} color={colores.color7}/>
            </TouchableOpacity>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:20, color:colores.color7, textAlign:'center', }}>
                {`Terminos y Condiciones`}
            </Text>
        </View>
        <ScrollView>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'center', marginTop: 18 }}>
            Términos y Condiciones de Uso de la Aplicación Móvil de Gestión de Flujo de Caja de Tecnoparque SENA Nodo Atlántico
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 25, marginLeft: 12, }}>
            1. Aceptación de los Términos
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 12, marginLeft: 18, marginRight: 18, textAlign: 'justify' }}>
            Al descargar o utilizar la aplicación móvil de gestión de flujo de caja, propiedad de Tecnoparque 
            SENA Nodo Atlántico (en adelante, "la Aplicación"), el usuario (en adelante, "el Usuario") 
            acepta estar sujeto a estos términos y condiciones (en adelante, "los Términos"). Si el Usuario 
            no está de acuerdo con alguna de las disposiciones establecidas aquí, debe abstenerse de descargar, 
            instalar y utilizar la Aplicación. La Aplicación está dirigida exclusivamente a emprendedores residentes 
            en el departamento del Atlántico, Colombia, y su uso fuera de esta jurisdicción queda expresamente prohibido.
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 25, marginLeft: 12, }}>
            2. Uso de la Aplicación
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 12, marginLeft: 18, marginRight: 18, textAlign: 'justify' }}>
            La Aplicación tiene como objetivo principal ofrecer una herramienta para la gestión efectiva del flujo de 
            caja de los emprendedores del departamento del Atlántico. El Usuario se compromete a utilizar la Aplicación 
            únicamente para fines legítimos y de manera que no infrinja los derechos de terceros, ni restrinja o inhiba su
            uso y disfrute. El Usuario reconoce y acepta que el uso de la Aplicación se realiza bajo su propio riesgo y 
            responsabilidad, y se compromete a proporcionar información veraz y actualizada para el correcto funcionamiento
            de la misma. Tecnoparque SENA Nodo Atlántico se reserva el derecho de modificar, suspender o descontinuar 
            cualquier aspecto de la Aplicación en cualquier momento.
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 25, marginLeft: 12, }}>
            3. Propiedad Intelectual y Confidencialidad
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 12, marginLeft: 18, marginRight: 18, textAlign: 'justify' }}>
            Todos los derechos de propiedad intelectual sobre la Aplicación y su contenido pertenecen exclusivamente a 
            Tecnoparque SENA Nodo Atlántico o a sus licenciantes. El Usuario se compromete a no realizar actos de copia,
            modificación, distribución, transmisión o explotación de la Aplicación o su contenido sin el previo consentimiento
            por escrito de Tecnoparque SENA Nodo Atlántico. Asimismo, el Usuario acepta tratar toda la información a 
            la que tenga acceso a través de la Aplicación como confidencial, comprometiéndose a no divulgarla a terceros
            sin el previo consentimiento por escrito de Tecnoparque SENA Nodo Atlántico.
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 12, marginLeft: 18, marginRight: 18, textAlign: 'justify', marginBottom: 20,  }}>
            Todos los derechos de propiedad intelectual sobre la Aplicación y su contenido pertenecen exclusivamente a 
            Tecnoparque SENA Nodo Atlántico o a sus licenciantes. El Usuario se compromete a no realizar actos de copia,
            modificación, distribución, transmisión o explotación de la Aplicación o su contenido sin el previo consentimiento
            por escrito de Tecnoparque SENA Nodo Atlántico. Asimismo, el Usuario acepta tratar toda la información a 
            la que tenga acceso a través de la Aplicación como confidencial, comprometiéndose a no divulgarla a terceros
            sin el previo consentimiento por escrito de Tecnoparque SENA Nodo Atlántico.
            </Text>
        </ScrollView>
    </View>
  )
}

export default TermYCondiciones

const styles = StyleSheet.create({
    container:{
        flex:1,
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
        left:15,
        top:35
    },
})