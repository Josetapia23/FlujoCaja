import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import ImgPress from '../componentes/ImgPress'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { colores, colors } from '../componentes/Colors'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import Tablas from '../componentes/Tablas'
import { ScrollView } from 'react-native'
import SplashScreens from './SplashScreens'
import Botones from '../componentes/Botones'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { request, PERMISSIONS } from 'react-native-permissions';

const ingresos= require('../../assets/iconos/ingresos.png');
const perdida = require('../../assets/iconos/perdida.png');

const Despliegue = () => {
    const [cargando, setCargando] = useState(false);
    const [listaMovimientos, setListaMovimientos] = useState([]);
    const {userInfo, companyInfo, obtenerEmpresa} = useContext(AuthContext);
    const idUser = userInfo.id;
    const datosEmpresa = companyInfo.datos;
    const companyActive = companyInfo.pasar;

    useFocusEffect( //Este se utiliza para que renderice las funciones de inmediato en las vistas que hacen parte de los bootom tabs
        React.useCallback(()=>{
            console.log(companyActive);
            listarMovimientos();
        }, [])
    )

      const listarMovimientos = async () => {
        setCargando(true);
        try {
          const res = await axios.post('https://www.plataforma50.com/pruebas/gestionP/listaMovimientos.php', {
            idUser: idUser
          });
      
          if (res.data.result === 'success') {
            setListaMovimientos(res.data.listaMovimientos);
            //console.log("Lista", res.data.listaMovimientos);
          } else {
            console.log('Error en la consulta de listar movimientos:', res.data.message);
            throw new Error('Error en la consulta: ' + res.data.message);
          }
        } catch (error) {
          console.error('Error de axios para listar movimientos:', error.message);
          throw error;
        } finally {
          setCargando(false);
        }
      };
      
     const generarContenidoTabla = () => {
        const contenidoHTML = listaMovimientos.map(item => {
            return `
            <tr>
                <td style="border: 1px solid #000; text-align: center;">${item.monto}</td>
                <td style="border: 1px solid #000; text-align: center;">${item.nombreConcepto} ${item.nombreTipo ? `- ${item.nombreTipo}` : ''}</td>
                <td style="border: 1px solid #000; text-align: center;">${item.fecha}</td>
            </tr>
            `;
        });

    return `
        <table style="width: 100%; border-collapse: collapse; margin: 0 auto;">
        <thead>
            <tr>
            <th style="border: 1px solid #000; text-align: center;">Monto</th>
            <th style="border: 1px solid #000; text-align: center;">Categoría</th>
            <th style="border: 1px solid #000; text-align: center;">Fecha-Hora</th>
            </tr>
        </thead>
        <tbody>
            ${contenidoHTML.join('')}
        </tbody>
        </table>
    `;
    };

    const compartirPDF = async () => {
        try {
          const contenidoTabla = generarContenidoTabla();
    
          const results = await RNHTMLtoPDF.convert({
            html: 
            `<html>
                <body>
                    <h1>Mi Tabla</h1>
                    <p style="color: #000;">Esta es una nueva tabla</p>
                    ${contenidoTabla}
                </body>
            </html>`,
            fileName: 'tabla_pdf',
            directory: RNFS.DocumentDirectoryPath,
          });
    
          console.log(results.filePath);
    
          const options = {
            title: 'Compartir PDF',
            message: 'Aquí está tu PDF',
            url: `file://${results.filePath}`,
            failOnCancel: false,
            saveToFiles: true,  // Agrega esta opción para permitir la descarga directa
            type: 'application/pdf',
          };
    
          await Share.open(options);
        } catch (error) {
          console.error(error);
        }
      };

    const generarPDF = async () => {
        try {
          // Solicitar permiso WRITE_EXTERNAL_STORAGE
          const writePermission = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      
          if (writePermission === 'granted') {
            const contenidoTabla = generarContenidoTabla();
      
            const results = await RNHTMLtoPDF.convert({
              html: `<html><body><h1>Mi Tabla</h1>${contenidoTabla}</body></html>`,
              fileName: 'tabla_pdf',
              directory: RNFS.DocumentDirectoryPath,
            });
      
            console.log(results.filePath);
      
            // Copiar el archivo a la carpeta Descargas
            const destinationPath = `${RNFS.DownloadDirectoryPath}/ultimos10Movimientos.pdf`;
            await RNFS.copyFile(results.filePath, destinationPath);
      
            // Mostrar un mensaje de éxito
            Alert.alert('PDF Generado', 'El PDF se ha guardado en la carpeta Descargas.');
      
            // Abrir el visor de PDF
            //setPdfPath(destinationPath);  // Utiliza un estado para la ruta del PDF
          
            // Mostrar la ruta del PDF en la consola
            console.log('Ruta del PDF:', destinationPath);
        } else {
            Alert.alert('Permisos insuficientes', 'La aplicación no tiene permiso para escribir en el almacenamiento externo.');
          }
        } catch (error) {
          console.error(error);
        }
      };

    const navegacion = useNavigation()
  return (
            <SafeAreaView style={styles.container}>
                <View style={styles.containerSuperior}>
                    <Text style={{fontFamily:'Roboto-Medium', fontSize:20, color:colores.color7, textAlign:'center', }}>{`Historiales`}</Text>
                </View>
                {
                    companyActive == 'si' ?
                    (
                        <>
                            <View style={styles.view}>
                                <View style={{alignItems:'center'}}>
                                    <ImgPress img={ingresos} funcion={() => navegacion.navigate('Ingresos')}/>
                                    <Text style={{color:colores.color5, fontFamily:'Roboto-Medium'}}>Ingresos</Text>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <ImgPress img={perdida} funcion={() => navegacion.navigate('Gastos')}/>
                                    <Text style={{color:colores.color5, fontFamily:'Roboto-Medium'}}>Gastos</Text>
                                </View>
                            </View>
                            <View>
                            <ScrollView style={{marginVertical:10, height:320}}>
                            {
                                cargando == true ? (
                                    <SplashScreens/>
                                ) :(
                                    listaMovimientos.length>0?
                                    (
                                        listaMovimientos.length<10 ? (
                                        <View>
                                            <Text style={{
                                                textAlign:'center', 
                                                color:colores.color5, 
                                                fontFamily:'Roboto-Medium',
                                                fontSize:18
                                                }}>{`Ultimos ${listaMovimientos.length} movimientos`}</Text>
                                            <Tablas datos={listaMovimientos}
                                            categoria={'Categorias'}
                                            ambos={'1'} />
                                            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                                                <TouchableOpacity onPress={generarPDF}>
                                                    <Text>Descargar PDF</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={compartirPDF}>
                                                    <Text>Compartir PDF</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        ):(
                                        <View style={{paddingBottom:30}}>
                                            <Text style={{
                                                textAlign:'center', 
                                                color:colores.color5, 
                                                fontFamily:'Roboto-Medium',
                                                fontSize:18
                                                }}>Ultimos 10 movimientos</Text>
                                            <Tablas datos={listaMovimientos}
                                            categoria={'Categorias'}
                                            ambos={'1'} />
                                            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                                                <TouchableOpacity onPress={generarPDF}>
                                                    <Text>Descargar PDF</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={compartirPDF}>
                                                    <Text>Compartir PDF</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        )
                                    ):(
                                        <Text style={{textAlign:'center', color:colores.color5, fontSize:16, marginTop:100}}>"No hay Movimientos registrados"</Text>
                                    )
                                )
                            }
                            </ScrollView>
                            </View>
                        </>
                    ):
                    (
                        <View style={{alignItems:'center', justifyContent:'center', paddingTop:40}}>
                            <Botones 
                                name='Registrar empresa'
                                funcion={()=>{navegacion.navigate('Logout')}}/>
                        </View>
                      )
                }
            </SafeAreaView>
  )
}

export default Despliegue

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colores.color6,
    },containerSuperior:{
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
    view:{
        alignItems:'center',
        justifyContent:'space-around',
        height:250,
        flexDirection:'row'
    }
})