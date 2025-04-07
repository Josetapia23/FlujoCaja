import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import { colores } from '../componentes/Colors';
import { colors } from '../componentes/Colors';

import { useNavigation } from '@react-navigation/native';

const Privacidad = () => {
    
    const navegacion = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerSuperior}>
            <TouchableOpacity style={styles.atras} onPress={()=>navegacion.goBack()}>
                <AntDesign name='arrow-left' size={25} color={colores.color7}/>
            </TouchableOpacity>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:20, color:colores.color7, textAlign:'center', }}>{`Privacidad`}</Text>
        </View>
        <ScrollView>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'center', marginTop: 18, marginLeft: 18,marginRight: 18, }}>
            Política de Privacidad de la Aplicación Móvil de Gestión de Flujo de Caja de Tecnoparque SENA Nodo Atlántico
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 25, marginLeft: 18, }}>
            Introducción
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 12, marginLeft: 20, marginRight: 20, textAlign: 'justify' }}>
            Tecnoparque SENA Nodo Atlántico (en adelante, "Nosotros") se compromete a proteger la privacidad de los usuarios
            (en adelante, "el Usuario" o "los Usuarios") de nuestra aplicación móvil de gestión de flujo de caja (en adelante, "la Aplicación").
            Esta Política de Privacidad establece las bases sobre las cuales cualquier dato personal que recopilamos de los Usuarios, 
            o que estos nos proporcionan, será procesado por nosotros. Al utilizar la Aplicación, el Usuario consiente el tratamiento 
            de sus datos conforme a esta Política de Privacidad.
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 25, marginLeft: 18, }}>
            Datos Recopilados
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 12, marginLeft: 20, marginRight: 20, textAlign: 'justify' }}>
            La Aplicación recopila información personal y de negocio necesaria para ofrecer sus servicios de gestión de flujo 
            de caja. Esto incluye, pero no se limita a, nombre, dirección de correo electrónico, información financiera
            y transaccional, y otros datos relevantes para la prestación de nuestros servicios. 
            Nos comprometemos a utilizar esta información exclusivamente para los fines establecidos y a 
            no compartirla con terceros sin el consentimiento explícito del Usuario, excepto 
            en los casos en que sea necesario para la prestación del servicio o por requerimiento legal.
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 25, marginLeft: 18, }}>
            Uso de la Información
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 12, marginLeft: 20, marginRight: 20, textAlign: 'justify' }}>
            La información recopilada se utiliza para proveer, mantener, proteger y mejorar la Aplicación; 
            desarrollar nuevos servicios; y proteger los derechos o propiedad de Tecnoparque SENA Nodo Atlántico 
            y de nuestros Usuarios. Esto puede incluir el uso de la información para fines de investigación 
            interna, análisis de datos y para mejorar la efectividad de la Aplicación. Nos comprometemos a 
            tomar todas las medidas necesarias para garantizar que sus datos se traten de manera segura y 
            de acuerdo con esta Política de Privacidad.
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 25, marginLeft: 18, }}>
            Compartir y Divulgar Información
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 12, marginLeft: 20, marginRight: 20, textAlign: 'justify' }}>
            No compartiremos información personal con empresas, organizaciones ni 
            individuos fuera de Tecnoparque SENA Nodo Atlántico, excepto en las siguientes 
            circunstancias: con consentimiento del Usuario, por motivos legales, para la protección de 
            Tecnoparque SENA Nodo Atlántico y terceros, y para el procesamiento externo bajo
            nuestras instrucciones y en conformidad con nuestra Política de Privacidad y 
            cualquier otra medida de seguridad y confidencialidad adecuada.
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 25, marginLeft: 18, }}>
            Acceso y Actualización de la Información Personal
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 12, marginLeft: 20, marginRight: 20, textAlign: 'justify' }}>
            Los Usuarios tienen derecho a acceder, corregir, actualizar o solicitar la eliminación de
            su información personal en cualquier momento. Para ejercer estos derechos, los Usuarios
            pueden contactarnos a través de los canales proporcionados dentro de la Aplicación.
            Nos comprometemos a proporcionar acceso a la información personal que poseemos sobre 
            el Usuario o a actualizarla según sea solicitado.
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 25, marginLeft: 18, }}>
            Seguridad
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 12, marginLeft: 20, marginRight: 20, textAlign: 'justify' }}>
            Nos comprometemos a proteger la seguridad de los datos personales de los Usuarios. 
            Implementamos medidas técnicas y administrativas adecuadas para proteger
            la información contra el acceso no autorizado, la alteración, la divulgación 
            o la destrucción. Sin embargo, ningún método de transmisión por Internet o 
            de almacenamiento electrónico es 100% seguro. Por lo tanto, aunque nos 
            esforzamos por usar medios comercialmente aceptables para proteger 
            la información personal, no podemos garantizar su seguridad absoluta.
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 25, marginLeft: 18, }}>
            Cambios en la Política de Privacidad
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 12, marginLeft: 20, marginRight: 20, textAlign: 'justify' }}>
            Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento.
            Se anima a los Usuarios a revisar periódicamente esta página para cualquier 
            cambio. Los cambios en la Política de Privacidad son efectivos cuando se 
            publican en esta página.
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 25, marginLeft: 18, }}>
            Contacto
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 12, marginLeft: 20, marginRight: 20, textAlign: 'justify' }}>
            Para cualquier pregunta o consulta sobre esta Política de Privacidad, los Usuarios 
            pueden contactarnos a través de los medios proporcionados dentro de la Aplicación.
            </Text>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:16, color:colors.color9, textAlign:'Start', marginTop: 12, marginLeft: 20, marginRight: 20, marginBottom: 20, textAlign: 'justify' }}>
            Esta Política de Privacidad se rige por las leyes de la República de Colombia.
            En caso de disputa, los Usuarios se someterán a la jurisdicción exclusiva de
            los tribunales del departamento del Atlántico, Colombia.
            </Text>
        </ScrollView>
    </View>
  )
}

export default Privacidad

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