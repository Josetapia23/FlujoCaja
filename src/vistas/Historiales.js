import { Alert, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { colores, colors } from '../componentes/Colors'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import Tablas from '../componentes/Tablas';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import SplashScreens from './SplashScreens';
import Tabla2 from '../componentes/Tabla2';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Botones from '../componentes/Botones';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { request, PERMISSIONS } from 'react-native-permissions';
import Botones2 from '../componentes/Botones2';




const Historiales = () => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [idConcepto, setIdConcepto] = useState('');
    const [date, setDate] = useState('');
    const [date2, setDate2] = useState('');
    const [dateFormatted, setDateFormatted] = useState('');
  const [date2Formatted, setDate2Formatted] = useState('');
    const [tipo, setTipo] = useState(1);
    const [cargando, setCargando] = useState(false);
    const [cargando2, setCargando2] = useState(false);
    const [montoTotal, setMontoTotal] = useState('');
    const [montoTotal2, setMontoTotal2] = useState('');
    const [montoTotal3, setMontoTotal3] = useState('');
    const [selectedValue, setSelectedValue] = useState("filtros");
    const [listaMovimientos, setListaMovimientos] = useState([]); //Ultimos 10 movimientos
    const [listaMovimientos2, setListaMovimientos2] = useState([]); //Lista de movimientos del mes
    const [listaMovimientos3, setListaMovimientos3] = useState([]); //Lista de movimientos por fecha estimada
    const [listaMovimientos4, setListaMovimientos4] = useState([]); //Lista de movimientos completa por categoria
    const [listaConceptos, setListaConceptos] = useState([]); //Lista de movimientos del mes
    const {userInfo, companyInfo} = useContext(AuthContext);
    const idUser = userInfo.id;
    const datosEmpresa = companyInfo.datos;


    useEffect(()=>{
        //setIdUser(userInfo.id)
        listarMovimientos();
        obtenerConceptos();
      },[])

      const obtenerConceptos = async () => {
        try {
          const conceptos = await AsyncStorage.getItem('conceptos1');
          if (conceptos !== null) {
            // Tenemos datos
            const listaConceptos = JSON.parse(conceptos);
            setListaConceptos(listaConceptos);
          }
        } catch (error) {
          console.log("Error al obtener conceptos: ", error);
          // Manejar el error de obtener datos
        }
      };

      useEffect(() => {
        // Establecer idConcepto con el primer id de la listaConceptos
        if (listaConceptos.length > 0) {
          setIdConcepto(listaConceptos[0].id);
        }
      }, [listaConceptos]);

      

    const listarMovimientos = () => {
        setCargando(true);
      return new Promise((resolve, reject) => {
      axios
        .post(
          'https://www.plataforma50.com/pruebas/gestionP/lis_mov_ingresos.php',
          {
            idUser: idUser,
            idTipo: tipo,
          },
        )
        .then(res => {
          if (res.data.result === 'success') {
            // Registro exitoso
            setListaMovimientos(res.data.listaMovimientos) //Ultimos 10 movimientos
            setListaMovimientos2(res.data.listMovimientos2) //Movimientos totales por mes 
            setMontoTotal(res.data.montoTotal);
            //console.log(res.data.listaMovimientos)
            setCargando(false);
          } else if (res.data.result === 'error') {
            // Error en la consulta
            console.log('Error en la consulta de listar movimientos Ingresos1:', res.data.message);
            reject('Error en el registro: ' + res.data.message);
            setCargando(false);

          } else {
            console.log('Respuesta inesperada del servidor:', res.data);
            reject('Error inesperado del servidor');
            setCargando(false);

          }
        })
        .catch(error => {
          console.error('Error de axios para listar movimientos Ingresos2:', error.message);
          reject('Error con axios: ' + error.message);
            setCargando(false);

        });
    });
    }

    const pressBuscar = () =>{
      setCargando2(true);
      console.log(date, date2)
      listarMovimientos2();
    }

    const listarMovimientos2 = () => {
      setCargando(true);
    return new Promise((resolve, reject) => {
    axios
      .post(
        'https://www.plataforma50.com/pruebas/gestionP/lis_mov_ingresos3.php',
        {
          idUser: idUser,
          idTipo: tipo,
          fecha1: date,
          fecha2: date2,
        },
      )
      .then(res => {
        if (res.data.result === 'success') {
          // Registro exitoso
          setListaMovimientos3(res.data.listaMovimientos3);
          setMontoTotal2(res.data.montoTotal);
          console.log(res.data.listaMovimientos3);
          setCargando(false);
        } else if (res.data.result === 'error') {
          // Error en la consulta
          console.log('Error en la consulta de listar movimientos Ingresos1:', res.data.message);
          reject('Error en el registro: ' + res.data.message);
          setCargando(false);

        } else {
          console.log('Respuesta inesperada del servidor:', res.data);
          reject('Error inesperado del servidor');
          setCargando(false);

        }
      })
      .catch(error => {
        console.error('Error de axios para listar movimientos Ingresos2:', error.message);
        reject('Error con axios: ' + error.message);
          setCargando(false);

      });
  });
  }

  useEffect(()=>{
    listarMovimientos3();
    console.log(idConcepto)
  },[selectedValue]);

  
  useEffect(() => {
    console.log("Este es el primer id de la lista conceptos ", idConcepto);
    listarMovimientos3();
  }, [idConcepto]);
  
  useEffect(() => {
    console.log(listaConceptos, "Fin");
  }, [listaConceptos]);

  const listarMovimientos3 = () => {
    setCargando(true);
    setListaMovimientos4([]);
  return new Promise((resolve, reject) => {
  axios
    .post(
      'https://www.plataforma50.com/pruebas/gestionP/lis_mov_ingresos3.php',
      {
        idUser: idUser,
        idTipo: tipo,
        idConcepto : idConcepto
      },
    )
    .then(res => {
      if (res.data.result === 'success') {
        // Registro exitoso
        setListaMovimientos4(res.data.listaMovimientos4);
        setMontoTotal3(res.data.monTotal2);
        setCargando(false);
        console.log(listaMovimientos4);
      } else if (res.data.result === 'error') {
        // Error en la consulta
        console.log('Error en la consulta de listar movimientos Ingresos1:', res.data.message);
        reject('Error en el registro: ' + res.data.message);
        setCargando(false);

      } else {
        console.log('Respuesta inesperada del servidor:', res.data);
        reject('Error inesperado del servidor');
        setCargando(false);

      }
    })
    .catch(error => {
      console.error('Error de axios para listar movimientos Ingresos2:', error.message);
      reject('Error con axios: ' + error.message);
        setCargando(false);

    });
});
}


    const handleOnPress = () => {
      setOpen(!open);
  }
  const handleOnPress2 = () => {
      setOpen2(!open2);
  }
  function handleChange(fecha) {
      setDate(fecha)

  } function handleChange2(fecha) {
      setDate2(fecha)
  }

  //

  const generarContenidoTabla1 = () => {
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

const generarContenidoTablaMes = () => {
  const contenidoHTML = listaMovimientos2.map(item => {
    return `
      <tr>
        <td style="border: 1px solid #000; text-align: center;">${item.descripcion}</td>
        <td style="border: 1px solid #000; text-align: center;">${item.nombreConcepto} ${
          item.nombreTipo ? `- ${item.nombreTipo}` : ''
        }</td>
        <td style="border: 1px solid #000; text-align: center;">${item.monto}</td>
      </tr>
    `;
  });

  return `
    <table style="width: 100%; border-collapse: collapse; margin: 0 auto;">
      <thead>
        <tr>
          <th style="border: 1px solid #000; text-align: center;">Descripcion</th>
          <th style="border: 1px solid #000; text-align: center;">Categoría</th>
          <th style="border: 1px solid #000; text-align: center;">Monto</th>
        </tr>
      </thead>
      <tbody>
        ${contenidoHTML.join('')}
      </tbody>
    </table>
    <p>Total: ${montoTotal}</p>
  `;
};

const generarContenidoPorFecha = () => {
  const contenidoHTML = listaMovimientos3.map(item => {
    return `
      <tr>
        <td style="border: 1px solid #000; text-align: center;">${item.fecha}</td>
        <td style="border: 1px solid #000; text-align: center;">${item.descripcion}</td>
        <td style="border: 1px solid #000; text-align: center;">${item.nombreConcepto} ${
          item.nombreTipo ? `- ${item.nombreTipo}` : ''
        }</td>
        <td style="border: 1px solid #000; text-align: center;">${item.monto}</td>
      </tr>
    `;
  });

  return `
    <table style="width: 100%; border-collapse: collapse; margin: 0 auto;">
      <thead>
        <tr>
          <th style="border: 1px solid #000; text-align: center;">Fecha</th>
          <th style="border: 1px solid #000; text-align: center;">Descripcion</th>
          <th style="border: 1px solid #000; text-align: center;">Categoría</th>
          <th style="border: 1px solid #000; text-align: center;">Monto</th>
        </tr>
      </thead>
      <tbody>
        ${contenidoHTML.join('')}
      </tbody>
    </table>
    <p>Total: ${montoTotal2}</p>
  `;
};

const compartirPDF = async () => {
  try {
    if(selectedValue == 'mes'){
      const contenidoTabla = generarContenidoTablaMes();
      const results = await RNHTMLtoPDF.convert({
        html: 
        `<html>
            <body>
                <h1>Mi Tabla</h1>
                <p style="color: #000;">Esta es una nueva tabla</p>
                ${contenidoTabla}
            </body>
        </html>`,
        fileName: 'ingresos_mes_actual',
        directory: RNFS.DocumentDirectoryPath,
      });
  
      //console.log(results.filePath);
  
      const options = {
        title: 'Compartir PDF',
        message: 'Aquí está tu PDF',
        url: `file://${results.filePath}`,
        failOnCancel: false,
        saveToFiles: true,  // Agrega esta opción para permitir la descarga directa
        type: 'application/pdf',
      };
  
      await Share.open(options);
    }
    else if(selectedValue == 'fecha'){
      const contenidoTabla = generarContenidoPorFecha();
      const results = await RNHTMLtoPDF.convert({
        html: 
        `<html>
            <body>
                <h1>Mi Tabla</h1>
                <p style="color: #000;">Esta es una nueva tabla</p>
                ${contenidoTabla}
            </body>
        </html>`,
        fileName: 'ingresos_por_fecha',
        directory: RNFS.DocumentDirectoryPath,
      });
  
      //console.log(results.filePath);
  
      const options = {
        title: 'Compartir PDF',
        message: 'Aquí está tu PDF',
        url: `file://${results.filePath}`,
        failOnCancel: false,
        saveToFiles: true,  // Agrega esta opción para permitir la descarga directa
        type: 'application/pdf',
      };
  
      await Share.open(options);

    }
    else{
      const contenidoTabla = generarContenidoTabla1();
      const results = await RNHTMLtoPDF.convert({
        html: 
        `<html>
            <body>
                <h1>Mi Tabla</h1>
                <p style="color: #000;">Esta es una nueva tabla</p>
                ${contenidoTabla}
            </body>
        </html>`,
        fileName: 'ultimos_10_ingresos',
        directory: RNFS.DocumentDirectoryPath,
      });
  
      //console.log(results.filePath);
  
      const options = {
        title: 'Compartir PDF',
        message: 'Aquí está tu PDF',
        url: `file://${results.filePath}`,
        failOnCancel: false,
        saveToFiles: true,  // Agrega esta opción para permitir la descarga directa
        type: 'application/pdf',
      };
  
      await Share.open(options);
    }
  } catch (error) {
    console.error(error);
  }
};

const generarPDF = async () => {
  try {
    // Solicitar permiso WRITE_EXTERNAL_STORAGE
    const writePermission = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (writePermission === 'granted') {
      if(selectedValue == 'mes'){
      console.log('Entro al mes');

        const contenidoTabla = generarContenidoTablaMes();
        const results = await RNHTMLtoPDF.convert({
          html: `<html><body><h1>Mi Tabla</h1>${contenidoTabla}</body></html>`,
          fileName: 'tabla_pdf',
          directory: RNFS.DocumentDirectoryPath,
        });
        console.log(results.filePath);
        // Copiar el archivo a la carpeta Descargas
        const destinationPath = `${RNFS.DownloadDirectoryPath}/ingresosDelMesActual.pdf`;
        await RNFS.copyFile(results.filePath, destinationPath);
        // Mostrar un mensaje de éxito
        Alert.alert('PDF Generado', 'El PDF se ha guardado en la carpeta Descargas.');
        // Abrir el visor de PDF
        //setPdfPath(destinationPath);  // Utiliza un estado para la ruta del PDF
        // Mostrar la ruta del PDF en la consola
        console.log('Ruta del PDF:', destinationPath);
      }else if(selectedValue == 'fecha'){
        console.log('Entro fechas');
        const contenidoTabla = generarContenidoPorFecha();
        const results = await RNHTMLtoPDF.convert({
          html: `<html><body><h1>Mi Tabla</h1>${contenidoTabla}</body></html>`,
          fileName: 'tabla_pdf',
          directory: RNFS.DocumentDirectoryPath,
        });
        console.log(results.filePath);
        // Copiar el archivo a la carpeta Descargas
        const destinationPath = `${RNFS.DownloadDirectoryPath}/ingresosPorFecha.pdf`;
        await RNFS.copyFile(results.filePath, destinationPath);
        // Mostrar un mensaje de éxito
        Alert.alert('PDF Generado', 'El PDF se ha guardado en la carpeta Descargas.');
        // Abrir el visor de PDF
        //setPdfPath(destinationPath);  // Utiliza un estado para la ruta del PDF
        // Mostrar la ruta del PDF en la consola
        console.log('Ruta del PDF:', destinationPath);
      }
      else{
        console.log('Entro ultimos 10 ingresos');
        const contenidoTabla = generarContenidoTabla1();
        const results = await RNHTMLtoPDF.convert({
          html: `<html><body><h1>Mi Tabla</h1>${contenidoTabla}</body></html>`,
          fileName: 'tabla_pdf',
          directory: RNFS.DocumentDirectoryPath,
        });
        console.log(results.filePath);
        const destinationPath = `${RNFS.DownloadDirectoryPath}/ultimos10Ingresos.pdf`;
        await RNFS.copyFile(results.filePath, destinationPath);
  
        Alert.alert('PDF Generado', 'El PDF se ha guardado en la carpeta Descargas.');
  
        console.log('Ruta del PDF:', destinationPath);
        
      }
  } else {
      Alert.alert('Permisos insuficientes', 'La aplicación no tiene permiso para escribir en el almacenamiento externo.');
    }
  } catch (error) {
    console.error(error);
  }
};



    const navegacion = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.containerSuperior}>
            <TouchableOpacity style={styles.atras} onPress={()=>navegacion.goBack()}>
                <Material name='arrow-left' size={25} color={colores.color7}/>
            </TouchableOpacity>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:20, color:colores.color7, textAlign:'center'}}>{`Historial de Ingresos\nTotal`}</Text>
        </View>
        <ScrollView>
                    {
                        cargando == true ? (
                          <View style={{marginTop:100}}>
                            <SplashScreens/>
                          </View>
                        ) :(
                          <View>
                            {/* <Text style={styles.txtSubtitulos}>Filtros</Text> */}
                            <View style={styles.filaFiltro}>
                                <Text style={{width:'50%', paddingLeft:30, color:colores.color9}}>Seleccionar filtro:</Text>
                                <Picker
                                style={{width:'50%'}}
                                  selectedValue={selectedValue}
                                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                >
                                  <Picker.Item label="FILTROS" value="filtros" 
                                    style={{color:colores.color9}}
                                  />
                                  <Picker.Item label="Mes Actual" value="mes" />
                                  <Picker.Item label="Por Fecha" value="fecha" />
                                </Picker>
                            </View>
                            {selectedValue == 'filtros'?
                              (
                                <Text style={{
                                  color:'black', 
                                  textAlign:'center',
                                  marginTop:20}}>"No se ha seleccionado nada"</Text>
                                
                              ):
                              (
                                selectedValue == 'mes' ? 
                                (
                                  listaMovimientos2.length>0?(
                                    <View style={styles.containerTable}>
                                      <Text style={styles.txtSubtitulos}>{`Estos son los movimientos del mes actual`}</Text>
                                      <Tabla2 
                                    datos={listaMovimientos2} //Tabla que muestra movimientos del mes actual
                                    columnas={3}
                                    Total={montoTotal}
                                    compartirPDF={compartirPDF}/>
                                    </View>
                                  ):(
                                    <Text style={{fontFamily:'Roboto-Medium', textAlign:'center', color:colores.color5}}>"Este mes aun no tiene movimientos registrados"</Text>                                  )
                                  
                                ):
                                (
                                  selectedValue == 'fecha' ? 
                                (<>
                                  <View style={{flexDirection:'row', paddingHorizontal:70}}>
                                    <View style={{alignItems:'center'}}>
                                        <TouchableOpacity
                                            style={[styles.contenedorSubmit2]}
                                            onPress={handleOnPress}>
                                            <Text style={{ color:colores.color5, fontSize: 20, padding: 3 }}>Fecha inicial</Text>
                                        </TouchableOpacity>
                                        <Text style={{ color: colores.color4, fontSize: 14, }}>{date}</Text>
                                    </View>
                                    <View style={{alignItems:'center'}}>
                                        <TouchableOpacity
                                            style={[styles.contenedorSubmit2]}
                                            onPress={handleOnPress2}>
                                            <Text style={{ color: colores.color5, fontSize: 20, padding: 3 }}>Fecha Final</Text>
                                        </TouchableOpacity>
                                        <Text style={{ color: colores.color4, fontSize: 14 }}>{date2}</Text>
                                    </View>
                                </View>
                                <Botones funcion={()=> pressBuscar()}
                                name='Ver'
                                margin={120}/>
                                {
                                   cargando2 ==true ?
                                   (
                                   listaMovimientos3.length>0 ? 
                                    (
                                      <>
                                      <View style={[styles.containerTable,{ marginTop:5}]}>
                                      <Text style={styles.txtSubtitulos}>{`Entre ${date} y ${date2} estos son los movimientos de ingresos`}</Text>
                                        <Tabla2 
                                        datos={listaMovimientos3} //Tabla que muestra movimientos del mes actual
                                        columnas={4}
                                        Total={montoTotal2}
                                        compartirPDF={compartirPDF}/>
                                      </View>
                                      </>
                                    ):
                                    (
                                      <Text style={{textAlign:'center', paddingTop:10, color:colores.color9}}>
                                        "En ese lapso de fechas no hay registros"</Text>
                                    )
                                   ):(
                                    <></>
                                   )
                                  
                                }

                                </>
                                ):
                                (
                                  selectedValue == 'categoria' ? 
                                  (
                                    <>
                                    <View style={styles.filaFiltro}>
                                      <Text style={{width:'50%', paddingLeft:80}}>Seleccionar Categoria:</Text>
                                      <Picker
                                        style={{width:'50%', marginHorizontal:50, color:colores.color4, }}
                                        selectedValue={idConcepto}
                                        onValueChange={(itemValue) => {
                                          setIdConcepto(itemValue);
                                          listarMovimientos3();
                                        }}
                                        >
                                        {listaConceptos.map((concepto) => (
                                        <Picker.Item label={concepto.nombreConcepto} value={concepto.id} key={concepto.id} />
                                        ))}
                                      </Picker>
                                    </View>
                                    {
                                      listaMovimientos4.length>0?
                                      (
                                        <Tabla2 columnas={2}
                                          datos={listaMovimientos4}
                                          Total={montoTotal3}
                                        />
                                      ):
                                      (
                                        <Text style={{fontFamily:'Roboto-Medium', textAlign:'center'}}>"En esta categoria no hay movimientos registrados aún"</Text>
                                      )
                                    }
                                    </>
                                  ):
                                  (
                                    <Text style={{color:'black'}}></Text>
                                  )
                                )
                                )
                                
                              )
                            }
                            {listaMovimientos.length>0?
                            (
                                listaMovimientos.length<10 ? (
                                <View style={{paddingTop:5}}>
                                    <Text style={styles.txtSubtitulos}>{`Ultimos ${listaMovimientos.length} movimientos`}</Text>
                                    <Tablas datos={listaMovimientos}
                                    categoria={'Categorias'} />
                                    <TouchableOpacity style={{backgroundColor:colores.color5, marginHorizontal:90}}
                                     onPress={compartirPDF}>
                                      <Text style={{color:colores.color6}}>Generar y Descargar PDF</Text>
                                  </TouchableOpacity>
                                </View>
                                ):(
                                <View style={{paddingTop:5}}>
                                    <Text style={styles.txtSubtitulos}>Ultimos 10 movimientos de ingresos en general</Text>
                                    <Tablas datos={listaMovimientos}
                                    categoria={'Categorias'} />
                                    <Botones2 name='Compartir'
                                      funcion={compartirPDF} margin={130} padding={6}>
                                      < Material name='share-variant' size={25} color={colores.color8}/>
                                  </Botones2>
                                </View>
                                )
                            ):(
                                <Text style={{
                                  textAlign:'center', 
                                        color:colores.color3, 
                                        fontFamily:'Roboto-Medium',
                                        fontSize:15,
                                        marginTop:100
                                }}>No hay Movimientos registrados</Text>
                            )
                            }
                            </View>
                            
                        )
                    }
        </ScrollView>

                <Modal
                    visible={open}
                    animationType='slide'
                    transparent={true}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <DatePicker
                                mode='calendar'
                                selected={date}
                                onDateChange={handleChange}
                            />
                            <TouchableOpacity
                                style={styles.contenedorSubmit}
                                onPress={handleOnPress}>
                                <Text  style={{color:colores.color8, padding:5}}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={open2}
                    animationType='slide'
                    transparent={true}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <DatePicker
                                mode='calendar'
                                selected={date2}
                                onDateChange={handleChange2}
                            />
                            <TouchableOpacity
                                style={styles.contenedorSubmit}
                                onPress={handleOnPress2}>
                                <Text style={{color:colores.color8, padding:5}}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
    </SafeAreaView>
  )
}

export default Historiales

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colores.color6
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
    txtSubtitulos:{
      color:colores.color5,
      fontSize:18, 
      textAlign:'center',
      fontFamily:'Roboto-Medium',
      paddingTop:20,
      marginHorizontal:30
    },
    filaFiltro:{
      flexDirection:'row', 
      width:'100%', 
      paddingHorizontal:30,
      justifyContent:'center',
      alignItems:'center',
      marginTop:10
    },
    contenedorSubmit2: {
      backgroundColor: colores.color8,
      textAlign: 'center',
      borderRadius: 10,
      marginHorizontal: 8,
      padding:3
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30
    },
    modalView: {
        margin: 20,
        borderBlockColor: colores.color4,
        borderRadius: 20,
        width: '90%',
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#FFF'
    },
    contenedorSubmit: {
      marginTop: 20,
      backgroundColor: colores.color4,
      textAlign: 'center',
      borderRadius: 10,
      marginHorizontal: 8,
    },
    containerTable:{
      paddingBottom:5, 
      borderBottomColor:colores.color5, 
      borderBottomWidth:1,
      hadowColor: colores.color5,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 6,
    }
})