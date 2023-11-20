import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native'; // Añade FlatList a los imports
import Tablas from '../componentes/Tablas';
import { useNavigation } from '@react-navigation/native';
import { colores, colors } from '../componentes/Colors';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import ImgPress2 from '../componentes/ImgPress2';
import { useForm } from 'react-hook-form';
import Imputs from '../componentes/Imputs';
import Botones from '../componentes/Botones';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Imput2 from '../componentes/Imput2';
import SplashScreens from '../vistas/SplashScreens';




const Gastos = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [errorNombre, setErrorNombre] = useState('');
  const [listaConceptos , setListaConceptos] = useState([]);
  const { isLoading, userInfo, registerEmpresa, companyInfo} = useContext(AuthContext);
  const [idConcepto, setIdConcepto] = useState('');
  const [descripcion, setDescripcion] = useState('Descripcion');
  const [tipo, setTipo] = useState(2);
  const [nombreCateg, setNombreCat] = useState('');
  const [cargando, setCargando] = useState(false);



  const idUser = userInfo.id;
  const datosEmpresa = companyInfo.datos;

  useEffect(()=>{
    //setIdUser(userInfo.id)
    getConceptos();
    console.log(idUser);
  },[])


  const getConceptos = () => {
    setCargando(true);
    return new Promise((resolve, reject) => {
      axios
        .post(
          'https://www.plataforma50.com/pruebas/gestionP/getNombresIngresos.php',
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

  const addGasto = () => {
    setCargando(true);
    return new Promise((resolve, reject) => {
      axios
        .post(
          'https://www.plataforma50.com/pruebas/gestionP/addCategoria.php',
          {
            nombreIngreso: getValues('nombre'), //De esta forma obtengo el valor de lo que tenga el imput con name:'nombre'
            idTipo: 2,
            idUser: idUser,
          },
        )
        .then(res => {
          if (res.data.result === 'success') {
            // Registro exitoso
            setVisible(!visible);
            //setNombreIngreso(''); // Añade esta línea
            setErrorNombre('');
            console.log('Registro exitoso');
            reset({ nombre: '' }); // Esto reseteará el campo 'nombre' del formulario
            resolve('Registro exitoso');
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
        });
    });
  };

  const addMonto = () => {
    setCargando(true);
    return new Promise((resolve, reject) => {
      axios
        .post(
          'https://www.plataforma50.com/pruebas/gestionP/addMovimiento.php',
          {
            monto: getValues('monto'), //De esta forma obtengo el valor de lo que tenga el imput con name:'nombre'
            descripcion: descripcion,
            idTipo: 1,
            idUser: idUser,
            idConcepto:idConcepto,
            idEmprendimiento: datosEmpresa.id
          },
        )
        .then(res => {
          if (res.data.result === 'success') {
            setVisible2(false);
            setErrorNombre('');
            console.log('Monto registrado exitosamente');
            reset({ monto: '' }); // Esto reseteará el campo 'nombre' del formulario
            resolve('Registro exitoso');
            setCargando(false);

          } else if (res.data.result === 'error') {
            setErrorNombre(res.data.message);
            setErrorNombre('');
            console.log('Error en el registro:', res.data.message);
            reject('Error en el registro: ' + res.data.message);
            setCargando(false);

          }else {
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


  const eliminarConcepto = (id) => {
    setCargando(true);
    return new Promise((resolve, reject) => {
      axios
        .post(
          'https://www.plataforma50.com/pruebas/gestionP/deleteConcepto.php',
          {
            id
          },
        )
        .then(res => {
          if (res.data.result === 'success') {
            // Registro exitoso
            getConceptos();
            console.log('registro eliminado')
            setCargando(false);

          } else if (res.data.result === 'error') {
            // Error en la consulta
            console.log('Error al eliminar:', res.data.message);
            reject('Error en el registro: ' + res.data.message);
            setCargando(false);

          } else {
            console.log('Respuesta inesperada del servidor:', res.data);
            reject('Error inesperado del servidor');
            setCargando(false);

          }
        })
        .catch(error => {
          console.error('Error de axiosss:', error.message);
          reject('Error con axios: ' + error.message);
            setCargando(false);

        });
    });
  }


  const AlertaEliminar = (id) =>{
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que quieres eliminar esta categoria?',
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
  const AlertaMonto = () =>{
    Alert.alert(
      'Confirmar Monto',
      `El monto es de ${getValues('monto')}
      descripcion: ${descripcion}
      idUser: ${idUser}
      idConcepto: ${idConcepto}
      idEmprendimiento: ${datosEmpresa.id}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Ingresar',
          onPress: () => addMonto(),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  }
  
  const {
    control,
    reset,
    handleSubmit,
    getValues, // Añade esto
    formState: { errors },
} = useForm();



const guardar = async () => {
  await addGasto();
  await getConceptos();
  reset({ nombre: '' }); // Esto reseteará el campo 'nombre' del formulario
  console.log('se presiono guardar')
}

const guardarMonto = async () => {
  await addMonto();
  reset({ monto: '' }); // Esto reseteará el campo 'nombre' del formulario
  console.log('se presiono guardarMonto')
}

const add = () =>{
  setVisible((prevVisible) => !prevVisible)
  setErrorNombre('');
  //setNombreIngreso(''); // Reiniciar el estado del input

}

const ItemConcepto = ({nombre, onPressEliminar, onPressConcepto, id}) => {
  return (
    <View style={styles.cardView}>
        <TouchableOpacity onPress={()=>{
          onPressConcepto(id, nombre)
        }}>
            <Text style={{textTransform:'uppercase', fontFamily:'Roboto-Bold', fontSize:23, color:colores.color8}}>{nombre}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          onPressEliminar(id)
        }}>
            <Material name='delete-circle-outline' size={35} color='#b75555'/>
        </TouchableOpacity>
    </View>
  )
}

const renderItem = ({item}) =>{
  return(
    <ItemConcepto
    nombre = {item.nombreConcepto}
    id = {item.id}
    onPressEliminar={AlertaEliminar}
    onPressConcepto={activarModal2}
    />
  )
}

const activarModal2 = (id, nombre) => {
  console.log("El id de concepto es: ",id);
  setVisible2(true);
  setNombreCat(nombre);
  setIdConcepto(id);
}

const navegacion = useNavigation();
  return (
    <SafeAreaView>
      <View>
        <View style={styles.BarraSuperior}>
          <ImgPress2 funcion={()=>{}}>
            <Material name='database-search' size={35} color={colores.color4}/>
          </ImgPress2>
          <Text style={styles.txtSuperior}>Gastos</Text>
          <ImgPress2 funcion={add}>
            <Material name='plus-thick' size={35} color={colores.color4}/>
          </ImgPress2>
        </View>
        {
          cargando ? (
            <View style={{marginTop:150}}>
              <SplashScreens />
            </View>            
          ) : (
          listaConceptos.length<=0? (
            <Text style={styles.txtInformativo}>No tienes categorias de gastos registradas </Text>
          ) : (
          <View style={{marginTop:40, marginBottom:10}}>
            <ScrollView style={{height: '84%'}}> 
              <FlatList
                style={styles.listaConceptos}
                data={listaConceptos}
                renderItem={renderItem}
                keyExtractor={item => item.id}/>
            </ScrollView> 
          </View>
          ))
        }
      </View>


      <Modal 
          visible={visible}>
            <View style={styles.modal}>
              <View style={styles.modalView}>
                <TouchableOpacity style={styles.closeButton}
                onPress={()=>{
                  setVisible(!visible);
                  reset({ nombre: '' }); // Esto reseteará el campo 'nombre' del formulario
                }}
                >
                    <Text style={{fontSize:20}}>X</Text>
                </TouchableOpacity>
                <Text style={styles.txtTitulo}>Nueva categoria de Gastos</Text>
                
                <View 
                    style={{paddingBottom:30}}
                    >
                    <Text style={styles.txt}>Tipo de gasto:<Text style={{color:'red'}}>*</Text></Text>
                    <Imput2
                    imagen={require('../../assets/iconos/lista.png')}
                              name="nombre"
                              placeholder=" Nombre del tipo de gasto"
                              control={control}
                              rules={{
                                  required: 'Nombre de gasto requerido',
                              }}
                          />
                    <Text style={{color:'red'}}>{errorNombre}</Text>
                </View>
                <Botones 
                name='Guardar'
                funcion={handleSubmit(guardar)}
                margin={50}/>
              </View>
            </View>
      </Modal>


      <Modal 
          visible={visible2}>
            <View style={styles.modal}>
              <View style={styles.modalView}>
                <TouchableOpacity style={styles.closeButton}
                onPress={()=>{
                  setVisible2(false);
                  reset({ monto: '' }); // Esto reseteará el campo 'nombre' del formulario
                }}
                >
                <Text style={{fontSize:20}}>X</Text>
                </TouchableOpacity>
                <Text style={styles.txtTitulo}>{`Nuevo monto de ${nombreCateg}`}</Text>
                
                <View 
                    style={{paddingBottom:30}}
                    >
                    <Text style={styles.txt}>Tipo de ingreso:<Text style={{color:'red'}}>*</Text></Text>
                    <Imput2
                    imagen={require('../../assets/iconos/lista.png')}
                              name="monto"
                              placeholder=" Ingrese el monto"
                              control={control}
                              rules={{
                                  required: 'Monto de ingreso requerido',
                              }}
                              keyboardType='numeric'
                          />
                    <Text style={{color:'red'}}>{errorNombre}</Text>
                </View>
                <Botones 
                name='Guardar'
                funcion={handleSubmit(AlertaMonto)}
                margin={50}/>
              </View>
            </View>
          </Modal>
    </SafeAreaView>
  );
}

export default Gastos;

const styles = StyleSheet.create({
  conatiner:{
    flex:1,
    backgroundColor:colores.color6
  },
  BarraSuperior:{
    paddingTop:20,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  closeButton: {
    position: 'absolute',
    top: 7,
    right: 12,
    padding: 10,
  },
  txtSuperior:{
    fontFamily:'Roboto-Medium',
    fontSize:40,
    color:colores.color1
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
    paddingHorizontal:25,
    shadowColor: colores.color3,
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
    backgroundColor: colores.color8,
    height:400
},
txtTitulo:{
  paddingVertical:20,
  fontFamily:'Roboto-Bold',
  fontSize:30,
  color:colors.color1,
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
  padding:10,
},
cardView:{
  backgroundColor:colores.color1,
  borderRadius:20,
  marginVertical:8,
  paddingVertical:15,
  paddingHorizontal:25,
  flex:1,
  shadowOpacity: 0.30,
  shadowRadius: 10,
  elevation: 4,
  flexDirection:'row',
  justifyContent:'space-between'
  }, txtInformativo:{
    paddingTop:20,
    color:colores.color3,
    textAlign:'center', 
    fontFamily:'Roboto-Medium', 
    fontSize:28,
    paddingHorizontal:30
  }
})
