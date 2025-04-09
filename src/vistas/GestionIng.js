import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native'; // Añade FlatList a los imports
import { useNavigation } from '@react-navigation/native';
import { colores, colors } from '../componentes/Colors';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm } from 'react-hook-form';
import Imputs from '../componentes/Imputs';
import Botones from '../componentes/Botones';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import SplashScreens from '../vistas/SplashScreens';
import AsyncStorage from '@react-native-async-storage/async-storage';



const GestionIng = () => {
  const {  userInfo,  companyInfo} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [nombreCateg, setNombreCat] = useState('');
  const [errorNombre, setErrorNombre] = useState('');
  const [listaConceptos , setListaConceptos] = useState([]);
  const [idConcepto, setIdConcepto] = useState('');
  const [tipo, setTipo] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [datosEmpresa , setDatosEmpresa] = useState({});
  const [movIng, setMovIng] = useState(null);
  const [editMov, setEditMov] = useState(false);
  const [deleteMov, setDeleteMov] = useState(false);
  //const [idUser, setIdUser] = useState(0);

  const idUser = userInfo.id;

  const getDatosSesion = async () => {
    try {
      const datosString = await AsyncStorage.getItem('companyInfo');
      if (datosString) {
        const datos = JSON.parse(datosString);
        console.log('Estos son los datos de em: ', datos);
        setDatosEmpresa(datos.emprendimiento);
        console.log("datos: ", datos, ', datos empresa: ', companyInfo.datos);
      } else {
        console.log("No hay datos en AsyncStorage");
        setDatosEmpresa(companyInfo.datos);
      }
    } catch (error) {
      console.log(error);
    }
  };
  


  useEffect(()=>{
    //setIdUser(userInfo.id)
    getDatosSesion();  //Aqui se ejecuta la funcion de inmediato sin mirar las demas
    getConceptos();

  },[])


  const getConceptos = () => {
    setCargando(true);
    return new Promise((resolve, reject) => {
      axios
        .post(
          'http://192.168.1.116/backFlujoCaja/getNombresIngresos.php',
          {
            id: idUser,
            tipo: tipo
          },
        )
        .then(res => {
          if (res.data.result === 'success') {
            // Registro exitoso
            setListaConceptos(res.data.listConceptos)
            console.log(res.data.listConceptos)
            AsyncStorage.setItem("conceptos1", JSON.stringify(res.data.listConceptos));
            setCargando(false);

          } else if (res.data.result === 'error') {
            // Error en la consulta
            console.log('Error en el registro:', res.data.message);
            reject('Error en el registro: ' + res.data.message);
            setCargando(false);

          } else {
            console.log('Respuesta inesperada del servidor:', res.data);
            reject('Error inesperado del servidor');
            setCargando(false);

          }
        })
        .catch(error => {
          console.error('Error de axios:', error.message);
          reject('Error con axios: ' + error.message);
            setCargando(false);

        });
    });
  };

  const editCategory = () => { 
    setCargando(true);
    return new Promise((resolve, reject) => {
      axios
        .post(
          'http://192.168.1.116/backFlujoCaja/editConcepto.php',
          {
            newName: nombreCateg,
            idCategory: idConcepto,
          },
        )
        .then(res => {
          if (res.data.result === 'success') {
            setVisible(!visible);
            setErrorNombre('');
            getConceptos();
            console.log('Categoria Actualizada');
            setCargando(false);

          } else if (res.data.result === 'error') {
            // Error en el registro
            setErrorNombre('');
            console.log('Error en el registro:', res.data.message);
            reject('Error en el registro: ' + res.data.message);
            setCargando(false);
          } else if (res.data.result === 'error1') {
            // Nombre ya existe
            setErrorNombre(res.data.message);
            console.log('Este nombre ya existe:', res.data.message);
            reject('Este nombre ya existe: ' + res.data.message);
            setCargando(false);

          } else {
            // Otro caso no manejado
            setErrorNombre('');
            console.log('Respuesta inesperada del servidor:', res.data);
            reject('Error inesperado del servidor');
            setCargando(false);

          }
        })
        .catch(error => {
          console.error('Error al registrar usuario con axios:', error.message);
          reject('Error al registrar usuario con axios: ' + error.message);
            setCargando(false);

        });
    });
  };

  // const addMonto = () => {
  //   setCargando(true);
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post(
  //         'http://192.168.1.116/backFlujoCaja/addMovimiento.php',
  //         {
  //           monto: getValues('monto'), //De esta forma obtengo el valor de lo que tenga el imput con name:'nombre'
  //           descripcion: getValues('descripcion'),
  //           idTipo: 1,
  //           idUser: idUser,
  //           idConcepto:idConcepto,
  //           idEmprendimiento: datosEmpresa.id
  //         },
  //       )
  //       .then(res => {
  //         if (res.data.result === 'success') {
  //           setVisible2(false);
  //           setErrorNombre('');
  //           console.log('Monto registrado exitosamente');
  //           reset({ monto: '' }); // Esto reseteará el campo 'nombre' del formulario
  //           resolve('Registro exitoso');
  //           setCargando(false);

  //         } else if (res.data.result === 'error') {
  //           setErrorNombre(res.data.message);
  //           setErrorNombre('');
  //           console.log('Error en el registro:', res.data.message);
  //           reject('Error en el registro: ' + res.data.message);
  //           setCargando(false);

  //         }else {
  //           // Otro caso no manejado
  //           setErrorNombre('');
  //           console.log('Respuesta inesperada del servidor:', res.data);
  //           reject('Error inesperado del servidor');
  //           setCargando(false);

  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error al registrar usuario con axios:', error.message);
  //         reject('Error al registrar usuario con axios: ' + error.message);
  //           setCargando(false);

  //       });
  //   });
  // };


  const eliminarConcepto = (id) => {
    setCargando(true); // Comienza la carga
    return new Promise((resolve, reject) => {
      axios
        .post(
          'http://192.168.1.116/backFlujoCaja/deleteConcepto.php',
          {
            id
          },
        )
        .then(res => {
          if (res.data.result === 'success') {
            // Registro exitoso
            getConceptos();
            console.log('registro eliminado')
          setCargando(false); // Comienza la carga

          } else if (res.data.result === 'error') {
            // Error en la consulta
            console.log('Error al eliminar:', res.data.message);
            reject('Error en el registro: ' + res.data.message);
          setCargando(false); // Comienza la carga

          } else {
            console.log('Respuesta inesperada del servidor:', res.data);
            reject('Error inesperado del servidor');
          setCargando(false); // Comienza la carga

          }
        })
        .catch(error => {
          console.error('Error de axios:', error.message);
          reject('Error con axios: ' + error.message);
          setCargando(false); // Comienza la carga

        });
    });
  }

//   const listarMovimientos = (id) => {
//     setCargando(true);
//   return new Promise((resolve, reject) => {
//   axios
//     .post(
//       'http://192.168.1.116/backFlujoCaja/lis_mov_ingresos3.php',
//       {
//         idUser: idUser,
//         idTipo: tipo,
//         idConcepto : id
//       },
//     )
//     .then(res => {
//       if (res.data.result === 'success') {
//         // Registro exitoso
//         setListaMovimientos1(res.data.listaMovimientos4);
//         setMontoTotal3(res.data.monTotal2);
//         setCargando(false);
//         console.log(setListaMovimientos1);
//       } else if (res.data.result === 'error') {
//         // Error en la consulta
//         console.log('Error en la consulta de listar movimientos Ingresos1:', res.data.message);
//         reject('Error en el registro: ' + res.data.message);
//         setCargando(false);

//       } else {
//         console.log('Respuesta inesperada del servidor:', res.data);
//         reject('Error inesperado del servidor');
//         setCargando(false);

//       }
//     })
//     .catch(error => {
//       console.error('Error de axios para listar movimientos Ingresos2:', error.message);
//       reject('Error con axios: ' + error.message);
//         setCargando(false);

//     });
// });
// }

  const AlertaEliminar = (id, nombre) =>{
    Alert.alert(
      'Eliminar Categoria',
      `¿Estás seguro de que quieres eliminar ${nombre} de las categorias de ingresos?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirmar Eliminación',
              `¿Una vez eliminada esta categoria se eliminaran todos su movimientos, estas seguro?`,
              [
                {
                  text: 'Cancelar',
                  style: 'cancel',
                },
                {
                  text: 'Eliminar',
                  onPress: () => eliminarConcepto(id),
                  style: 'destructive',
                },
              ],
              { cancelable: false }
            );
          }
        },
      ],
      { cancelable: false }
    );
  }
  // const AlertaMonto = () =>{
  //   const values = getValues();
  //   const montoOne = values.monto ? Number(values.monto.replace(/,/g, '')) : 0;
  //   Alert.alert(
  //     'Confirmar Monto',
  //     `El monto es de $${montoOne.toLocaleString()}
  //     descripcion: ${getValues('descripcion')}`,
  //     [
  //       {
  //         text: 'Cancelar',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Ingresar',
  //         onPress: () => addMonto(),
  //         style: 'destructive',
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // }
  
  const {
    control,
    reset,
    handleSubmit,
    getValues, // Añade esto
    formState: { errors },
} = useForm();



const guardar = async () => {
  await addIngreso();
  await getConceptos();
  reset({ nombre: '' }); // Esto reseteará el campo 'nombre' del formulario
  console.log('se presiono guardar')
}

// const guardarMonto = async () => {
//   await addMonto();
//   reset({ monto: '' }); // Esto reseteará el campo 'nombre' del formulario
//   console.log('se presiono guardarMonto')
// }

// const add = () =>{
//   setVisible((prevVisible) => !prevVisible)
//   setErrorNombre('');
//   //setNombreIngreso(''); // Reiniciar el estado del input

// }

const ItemConcepto = ({nombre, onPressEliminar, onPressEdit, onPressConcepto, id}) => {
  return (
    <>
    <View style={styles.cardView}>
      <View style={{justifyContent:'center', alignItems:'center'}}>
        {/* <TouchableOpacity onPress={()=>{
          onPressConcepto(id, nombre)
        }}> */}
            <Text style={{textTransform:'capitalize', fontFamily:'Roboto-Bold', fontSize:13, color:colores.color5}}>{nombre}</Text>
        {/* </TouchableOpacity> */}
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-evenly', width:'20%'}}>
          <TouchableOpacity style={{backgroundColor:colors.color10, borderRadius:20, padding:3}}
         onPress={()=>{
            onPressEdit(id, nombre)
          }}>
              <Material name='pencil-circle-outline' size={20} color={colores.color8} />
          </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:colors.color11, borderRadius:20, padding:3, marginLeft:5}}
         onPress={()=>{
            onPressEliminar(id, nombre)
          }}>
              <Material name='delete-circle-outline' size={20} color={colores.color8} />
          </TouchableOpacity>
      </View>
    </View>
    </>
  )
}

const renderItem = ({item}) =>{
  return(
    <ItemConcepto
    nombre = {item.nombreConcepto}
    id = {item.id}
    onPressEliminar={AlertaEliminar}
    onPressEdit={activarModal2}
    //onPressSearch={activarModal3}
    />
  )
}

const activarModal2 = (id, nombre) => {
  console.log("El id de ",nombre," es:",id,);
  setVisible(true);
  setIdConcepto(id);
  setNombreCat(nombre);
}

// const activarModal3 = (id, nombre) => {
//   console.log("El id es:",id,);
//   listarMovimientos(id);
//   setVisible3(true);
//   setIdConcepto(id);
//   setNombreCat(nombre);
// }

// const editarMov = (id, nuevoMonto, nuevaDescripcion) => {
//   setCargando(true);
//   console.log(id, nuevoMonto, nuevaDescripcion);
// };

// const eliminarMov=(id)=>{
//   setCargando(true); // Comienza la carga
//     return new Promise((resolve, reject) => {
//       axios
//         .post(
//           'http://192.168.1.116/backFlujoCaja/deleteMovimiento.php',
//           {
//             id
//           },
//         )
//         .then(res => {
//           if (res.data.result === 'success') {
//             console.log('Movimiento eliminado')
//           setCargando(false); // Comienza la carga

//           } else if (res.data.result === 'error') {
//             // Error en la consulta
//             console.log('Error al eliminar:', res.data.message);
//             reject('Error en el registro: ' + res.data.message);
//           setCargando(false); // Comienza la carga

//           } else {
//             console.log('Respuesta inesperada del servidor:', res.data);
//             reject('Error inesperado del servidor');
//           setCargando(false); // Comienza la carga

//           }
//         })
//         .catch(error => {
//           console.error('Error de axios:', error.message);
//           reject('Error con axios: ' + error.message);
//           setCargando(false); // Comienza la carga

//         });
//     });
// }

// useEffect(()=>{
//   if(movIng){
//     if(editMov){
//       setVisible4(true);
//     }
//     if(deleteMov){
//         Alert.alert(
//           'Confirmar Eliminación',
//           '¿Estás seguro de que quieres eliminar esta movimiento?',
//           [
//             {
//               text: 'Cancelar',
//               style: 'cancel',
//             },
//             {
//               text: 'Eliminar',
//               onPress: () => eliminarMov(movIng.id),
//               style: 'destructive',
//             },
//           ],
//           { cancelable: false }
//         );
//     }
//     setEditMov(false);
//     setDeleteMov(false); 
//     setMovIng(null);
//   }
// },[movIng, editMov, deleteMov])

const navegacion = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.containerSuperior}>
            <TouchableOpacity style={styles.atras} onPress={()=>navegacion.goBack()}>
                <Material name='arrow-left' size={25} color={colores.color7}/>
            </TouchableOpacity>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:20, color:colores.color7, textAlign:'center'}}>{`Gestion De Ingresos`}</Text>
        </View>
      <View>
        {
          cargando ? (
            <View style={{marginTop:150}}>
              <SplashScreens />
            </View>            
          ) : (
            listaConceptos.length <= 0 ? (
              <Text style={[styles.txtInformativo, {marginTop:100}]}>No tienes categorías de ingresos registradas </Text>
            ) : (
              <View style={{ marginTop: 40, marginBottom: 10 }}>
               
                <View style={{backgroundColor:colores.color5, height:55, marginHorizontal:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <Text style={{color:colores.color8, fontSize:16, fontFamily:'Roboto-Bold', textTransform:'capitalize'}}>Lista de categorias sobre ingresos</Text>
                </View>
                
                <ScrollView style={{ height: '84%' }}>
                  <FlatList
                    nestedScrollEnabled
                    style={styles.listaConceptos}
                    data={listaConceptos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                  />
                </ScrollView>
              </View>
            )
          )
        }

      </View>


      <Modal 
          visible={visible}>
            <View style={styles.modal}>
              <View style={styles.modalView}>
              {
            cargando ? (
              <View style={{marginTop:150}}>
              <SplashScreens />
            </View> 
            ):(
                <>
                  <TouchableOpacity style={styles.closeButton}
                    onPress={()=>{
                      setVisible(!visible);
                      reset({ nombre: '' }); // Esto reseteará el campo 'nombre' del formulario
                    }}>
                     <Material name='close-thick' size={35} color={colores.color9}/>
                  </TouchableOpacity>
                  <Text style={styles.txtTitulo}>Actualizar categoria {'\n'}de ingresos</Text>
                  <View 
                    style={{paddingBottom:30}}
                  >
                    <Text style={styles.txt}>Nombre categoria:<Text style={{color:'red'}}>*</Text></Text>
                    <Imputs
                      imagen={require('../../assets/iconos/lista.png')}
                      name="nombre"
                      placeholder="Nombre del tipo de ingreso"
                      datos={nombreCateg}
                        setDatos={setNombreCat}
                      //keyboardType="numeric"
                      control={control}
                      rules={{
                        required: 'Nombre de ingreso requerido',
                        minLength: { value: 5, message: "Debe contener 5 caracteres minimo" },
                        maxLength: { value: 18, message: "Debe contener 18 caracteres maximo" }
                      }}
                      //margin={30}
                      editable={true}
                    />
                    <Text style={{color:'red'}}>{errorNombre}</Text>
                  </View>
                  <Botones 
                    name='Actualizar'
                    funcion={handleSubmit(editCategory)}
                    margin={50}
                  />
                </>
              )
            }
              </View>
            </View>
      </Modal>

          {/* <Modal 
              visible={visible2}>
                <View style={styles.modal}>
                  <View style={styles.modalView}>
                  {
                cargando ? (
                  <View style={{marginTop:150}}>
                  <SplashScreens />
                </View> 
                ):(
                    <>
                    <TouchableOpacity style={styles.closeButton}
                    onPress={()=>{
                      setVisible2(false);
                      reset({ monto: '' }); // Esto reseteará el campo 'nombre' del formulario
                    }}
                    >
                          <Material name='close-thick' size={35} color={colores.color9}/>

                    </TouchableOpacity>
                    <Text style={styles.txtTitulo}>{`Nuevo monto de ${nombreCateg}`}</Text>
                    
                    <View 
                        style={{paddingBottom:30}}
                        >
                        <Text style={styles.txt}>Nuevo monto:<Text style={{color:'red'}}>*</Text></Text>
                        <Imput2
                        imagen={require('../../assets/iconos/dolar.png')}
                                  name="monto"
                                  placeholder=" Ingrese el monto"
                                  control={control}
                                  rules={{
                                      required: 'Monto de ingreso requerido',
                                  }}
                                  keyboardType='numeric'
                              />
                        <Text style={[styles.txt,{marginTop:20}]}>Descripcion sobre el ingreso:<Text style={{color:'red'}}>*</Text></Text>
                        <Imput2
                        imagen={require('../../assets/iconos/lista.png')}
                                  name="descripcion"
                                  placeholder=" Describir utilidad del monto ingresado"
                                  control={control}
                                  rules={{
                                      required: 'descripcion requerida',
                                  }}
                                  keyboardType='text'
                              />
                        <Text style={{color:'red'}}>{errorNombre}</Text>
                    </View>
                    <Botones 
                    name='Guardar'
                    funcion={handleSubmit(AlertaMonto)}
                    margin={50}/>
                    </>
                  )
                }
                  </View>
                </View>
          </Modal> */}
          {/* <Modal 
          visible={visible3}>
            <View style={styles.modal}>
              <View style={styles.modalView}>
              {
            cargando ? (
              <View style={{marginTop:150}}>
              <SplashScreens />
            </View> 
            ):(
                <>
                <TouchableOpacity style={styles.closeButton}
                onPress={()=>{
                  setVisible3(false);
                  reset({ monto: '' }); // Esto reseteará el campo 'nombre' del formulario
                }}
                >
                <Material name='close-thick' size={35} color={colores.color9}/>
                </TouchableOpacity>
                <Text style={styles.txtTitulo}>{`Categoria ${nombreCateg}`}</Text>
                
                {
                  listaMovimientos1.length>0?
                  (
                    <Tabla2
                      datos={listaMovimientos1}
                      Total={montoTotal3}
                      onEliminar={(movimiento) => {
                        // Puedes hacer lo que necesites con los datos de edición
                        setMovIng(movimiento);
                        setDeleteMov(true);
                        //console.log('id a eliminar:', movIng);
                      }}
                      onEditar={(movimiento) => {
                        // Puedes hacer lo que necesites con los datos de edición
                        setMovIng(movimiento);
                        setEditMov(true);
                        //console.log('Datos a editar:', movIng);
                      }}
                    />
                  ):
                  (
                    <Text style={{fontFamily:'Roboto-Medium', textAlign:'center'}}>"En esta categoria no hay movimientos registrados aún"</Text>
                  )
                }
                </>
              )
            }
              </View>
            </View>
          </Modal> */}
          {/* <Modal 
          visible={visible4}>
            <View style={styles.modal}>
              <View style={styles.modalView}>
              {
            cargando ? (
              <View style={{marginTop:150}}>
              <SplashScreens />
            </View> 
            ):(
                <>
                <TouchableOpacity style={styles.closeButton}
                onPress={()=>{
                  setVisible4(false);
                  reset({ monto: '' }); // Esto reseteará el campo 'nombre' del formulario
                }}
                >
                     <Material name='close-thick' size={35} color={colores.color9}/>

                </TouchableOpacity>
                <Text style={styles.txtTitulo}>{`Actualizar movimiento de ${nombreCateg}`}</Text>
                
                <View 
                    style={{paddingBottom:30}}
                    >
                    <Text style={styles.txt}>Actualizar monto:<Text style={{color:'red'}}>*</Text></Text>
                    <Imput2
                    imagen={require('../../assets/iconos/dolar.png')}
                              name="monto2"
                              placeholder=" Nuevo el monto"
                              control={control}
                              rules={{
                                  required: 'Monto de ingreso requerido',
                              }}
                              keyboardType='numeric'
                          />
                    <Text style={[styles.txt,{marginTop:20}]}>Descripcion sobre el ingreso:<Text style={{color:'red'}}>*</Text></Text>
                    <Imput2
                    imagen={require('../../assets/iconos/lista.png')}
                              name="descripcion2"
                              placeholder=" Describir utilidad del monto ingresado"
                              control={control}
                              rules={{
                                  required: 'descripcion requerida',
                              }}
                              keyboardType='text'
                          />
                    <Text style={{color:'red'}}>{errorNombre}</Text>
                </View>
                <Botones 
                name='Actualizar'
                margin={50}
                funcion={()=>{
                  const nuevoMonto = getValues('monto2');
                  const nuevaDescripcion = getValues('descripcion2');
                  editarMov(movIng.id, nuevoMonto, nuevaDescripcion)
                  .then(() => {
                    setVisible4(false);
                    reset({ monto2: '' , descripcion2:''});
                  })
                  .catch(error => {
                    // Manejar el error si es necesario
                  });
                }}
                />
                </>
              )
            }
              </View>
            </View>
          </Modal> */}
    </SafeAreaView>
  );
}

export default GestionIng;

const styles = StyleSheet.create({
  conatiner:{
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
  BarraSuperior:{
    paddingTop:20,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  closeButton: {
    alignSelf:'flex-end',
    top: 8,
    right: 10,
  },
  txtSuperior:{
    fontFamily:'Roboto-Medium',
    fontSize:30,
    color:colores.color1,
    width:200,
    textAlign:'center'
  },
  modal: {
    flex:1,
    backgroundColor: colores.color6,
    justifyContent:'flex-start'
  },
  modalView: {
    marginHorizontal: 20,
    marginVertical:100,
    borderRadius: 20,
    width: '90%',
    paddingVertical: 30,
    paddingHorizontal:15,
    shadowColor: colores.color5,
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
    backgroundColor: colores.color8,
    height:500
},
txtTitulo:{
  paddingVertical:20,
  fontFamily:'Roboto-Bold',
  fontSize:20,
  color:colores.color5,
  textAlign:'center'
},
txt:{
  color:colores.color9,
  fontFamily:'Roboto-Regular',
  fontSize:15,
  paddingBottom:5
},
listaConceptos:{
  //marginTop:10,
  marginHorizontal:10
},
cardView:{
  borderBottomWidth:2, 
  borderBottomColor:colors.color7,
  //marginVertical:8,
  paddingVertical:15,
  paddingHorizontal:25,
  flex:1,
  backgroundColor:colores.color8,
  //flex:1,
  // shadowOpacity: 0.30,
  // shadowRadius: 10,
  // elevation: 2,
  flexDirection:'row',
  justifyContent:'space-between'
},
txtInformativo:{
    paddingTop:40,
    color:colores.color5,
    textAlign:'center', 
    fontFamily:'Roboto-Medium', 
    fontSize:18,
    paddingHorizontal:30
}
})
