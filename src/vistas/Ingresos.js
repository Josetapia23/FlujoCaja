import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity } from 'react-native'; // Añade FlatList a los imports
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
import ItemConcepto from '../componentes/ItemConcepto';



const Ingresos = () => {
  const [visible, setVisible] = useState(false);
  const [nombreIngreso, setNombreIngreso] = useState('');
  const [errorNombre, setErrorNombre] = useState('');
  const [listaConceptos , setListaConceptos] = useState([]);
  const { isLoading, userInfo, registerEmpresa, companyInfo} = useContext(AuthContext);
  //const [idUser, setIdUser] = useState(0);

  const idUser = userInfo.id;

  const addIngreso = () => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          'http://192.168.216.76/flujoCaja/addIngreso.php',
          {
            nombreIngreso: nombreIngreso,
            idTipo: 1,
            idUser: idUser,
          },
        )
        .then(res => {
          if (res.data.result === 'success') {
            // Registro exitoso
            setVisible(!visible);
            setErrorNombre('');
            console.log('Registro exitoso');
            resolve('Registro exitoso');
          } else if (res.data.result === 'error') {
            // Error en el registro
            setErrorNombre('');
            console.log('Error en el registro:', res.data.message);
            reject('Error en el registro: ' + res.data.message);
          } else if (res.data.result === 'error1') {
            // Nombre ya existe
            setErrorNombre(res.data.message);
            console.log('Este nombre ya existe:', res.data.message);
            reject('Este nombre ya existe: ' + res.data.message);
          } else {
            // Otro caso no manejado
            setErrorNombre('');
            console.log('Respuesta inesperada del servidor:', res.data);
            reject('Error inesperado del servidor');
          }
        })
        .catch(error => {
          console.error('Error al registrar usuario con axios:', error.message);
          reject('Error al registrar usuario con axios: ' + error.message);
        });
    });
  };

  useEffect(()=>{
    //setIdUser(userInfo.id)
    getConceptos();
    console.log(idUser);
  },[])

  const getConceptos = () => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          'http://192.168.216.76/flujoCaja/getNombresIngresos.php',
          {
            id: idUser,
          },
        )
        .then(res => {
          if (res.data.result === 'success') {
            // Registro exitoso
            setListaConceptos(res.data.listConceptos)
            console.log(res.data.listConceptos)
          } else if (res.data.result === 'error') {
            // Error en la consulta
            console.log('Error en el registro:', res.data.message);
            reject('Error en el registro: ' + res.data.message);
          } else {
            console.log('Respuesta inesperada del servidor:', res.data);
            reject('Error inesperado del servidor');
          }
        })
        .catch(error => {
          console.error('Error de axios:', error.message);
          reject('Error con axios: ' + error.message);
        });
    });
  };
  
  const {
    control,
    handleSubmit,
    formState: { errors },
} = useForm();

const renderItem = ({item}) =>{
  return(
    <ItemConcepto
    nombre = {item.nombreConcepto}
    />
  )
}

const navegacion = useNavigation();
  return (
    <View>
      <View style={styles.BarraSuperior}>
        <ImgPress2 funcion={()=>{}}>
          <Material name='database-search' size={35} color={colores.color4}/>
        </ImgPress2>
        <Text style={styles.txtSuperior}>Ingresos</Text>
        <ImgPress2 funcion={()=>{
          setVisible(!visible)
          setErrorNombre('')}}>
          <Material name='plus-thick' size={35} color={colores.color4}/>
        </ImgPress2>
      </View>
          <FlatList
          style={styles.listaConceptos}
          data={listaConceptos}
          renderItem={renderItem}
          keyExtractor={item => item.id}/>
      
      <View>
        <Modal 
        visible={visible}>
          <View style={styles.modal}>
            <View style={styles.modalView}>
              <TouchableOpacity style={styles.closeButton}
              onPress={()=>{
                setVisible(!visible);
              }}
              >
                  <Text style={{fontSize:20}}>X</Text>
              </TouchableOpacity>
              <Text style={styles.txtTitulo}>Nuevo Ingreso</Text>
              
              <View 
                  style={{paddingBottom:30}}
                  >
                  <Text style={styles.txt}>Tipo de ingreso:<Text style={{color:'red'}}>*</Text></Text>
                  <Imputs
                  imagen={require('../../assets/iconos/lista.png')}
                            name="nombre"
                            placeholder=" Nombre del tipo de ingreso"
                            datos={nombreIngreso}
                            setDatos={setNombreIngreso}
                            control={control}
                            rules={{
                                required: 'Nombre de ingreso requerido',
                            }}
                        />
                  <Text style={{color:'red'}}>{errorNombre}</Text>
              </View>
              <Botones 
              name='Guardar'
              funcion={handleSubmit(addIngreso)}
              margin={50}/>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default Ingresos;

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
  marginTop:10,
  padding:10,
  paddingBottom:20
}
})
