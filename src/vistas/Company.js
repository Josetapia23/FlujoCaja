import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { colores } from '../componentes/Colors'
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Imputs from '../componentes/Imputs';
import { useForm } from 'react-hook-form';
import Botones from '../componentes/Botones';
import axios from 'axios';
import SplashScreens from './SplashScreens';


const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
const NOMBRES_REGEX = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s']{1,40}$/; //letras y espacios;
const TELEFONO_REGEX = /^[0-9]{7,10}$/;
const NIT_REGEX = /^[0-9]{1,10}-[0-9]{1}$/;
const DIRECCION_REGEX = /^[0-9A-Za-z\s#áéíóúÁÉÍÓÚñÑ.,-/]+$/;

const Company = () => {
  const {userInfo, companyInfo, obtenerEmpresa} = useContext(AuthContext);
  const datosEmpresa = companyInfo.datos;
  const [activeImput, setActiveImput] = useState(false);
  const [nombreEmpresa, setEmpresa] = useState(datosEmpresa.nombreEmprendimiento);
  const [nit, setNit] = useState(datosEmpresa.nit);
  const [direccion, setDireccion] = useState(datosEmpresa.direccion);
  const [telefonoEmpresarial, setTelefono] = useState(datosEmpresa.telefonoEmpresarial);
  const [emailEmpresarial, setEmail] = useState(datosEmpresa.emailEmpresarial);
  const [cargando, setCargando] = useState(false);


  const editCompany = () => { 
    setCargando(true);
    return new Promise((resolve, reject) => {
      axios
        .post(
          'https://www.plataforma50.com/pruebas/gestionP/EditEmpresa.php',
          {
            idEmpresa: datosEmpresa.id,
            nombreEmpresa: nombreEmpresa,
            direccion: direccion,
            emailEmpresarial: emailEmpresarial,
            telefonoEmpresarial : telefonoEmpresarial
          },
        )
        .then(res => {
          if (res.data.result === 'success') {
            setActiveImput(false);
            console.log('Datos de empresa Actualizados');
            obtenerEmpresa()
            setCargando(false);

          } else if (res.data.result === 'error') {
            // Error en el registro
            setActiveImput(false);
            console.log('Error en la actualizacion:', res.data.message);
            reject('Error en el registro: ' + res.data.message);
            setCargando(false);
          } 
          else {
            // Otro caso no manejado
            setActiveImput(false);
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

  
  
  const navegacion = useNavigation();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
  return (
    <SafeAreaView>
      <View style={styles.containerSuperior}>
            <TouchableOpacity style={styles.atras} onPress={()=>navegacion.goBack()}>
                <AntDesign name='arrow-left' size={25} color={colores.color7}/>
            </TouchableOpacity>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:20, color:colores.color7, textAlign:'center', }}>{`Datos Empresariales`}</Text>
        </View>
        {cargando ? (
            <View style={{marginTop:150}}>
              <SplashScreens />
            </View>  
          ) :
          (
            <>
            <ScrollView style={{height:560}}>
          <View style={{marginVertical:20}}>
            <View 
              style={{paddingBottom:10}}
              >
                <View 
                  style={{paddingBottom:10}}                      
                  >
                  <Text style={styles.txt}>Nit:</Text>
                  <Imputs
                      imagen={require('../../assets/iconos/nit.png')}
                      name="nit"
                      placeholder=" # Nit"
                      datos={nit}
                      setDatos={setNit}
                      control={control}
                      margin={30}
                      editable={false}
                      />
                </View>
              <Text style={styles.txt}>Nombre:<Text style={{color:'red'}}>*</Text></Text>
              <Imputs
                  imagen={require('../../assets/iconos/iconUsuario.png')}
                  name="nombre"
                  placeholder=" Nombre de la empresa"
                  datos={nombreEmpresa}
                  setDatos={setEmpresa}
                  control={control}
                  rules={{
                    pattern:{value: NOMBRES_REGEX,message: "Caracter No Permitido"},
                    required: 'Nombre Requerido',
                    maxLength:{value: 40,  message: 'El nombre de la empresa no puede tener más de 40 caracteres' }
                  }}
                  margin={30}
                  editable={activeImput}
                  />
            </View>
            <View 
                style={{paddingBottom:10}}                      
                >
              <Text style={styles.txt}>Direccion:<Text style={{color:'red'}}>*</Text></Text>
              <Imputs
                    imagen={require('../../assets/iconos/direccion.png')}
                    name="direccion"
                    placeholder=" Direccion de la empresa"
                    datos={direccion}
                    setDatos={setDireccion}
                    control={control}
                    rules={{
                    pattern:  {value: DIRECCION_REGEX, message: "Direccion o Caracter No Permitido" },
                    minLength: { value: 8, message: "Debe contener 8 caracteres minimo" },
                    maxLength:{value: 30,  message: 'La direccion no puede tener más de 30 caracteres' },
                    required: 'Direccion Requerida',
                    }}
                    margin={30}
                    editable={activeImput}
                    />
            </View>
            <View 
                style={{paddingBottom:10}}                      
                >
              <Text style={styles.txt}>Telefono:<Text style={{color:'red'}}>*</Text></Text>
              <Imputs
                  imagen={require('../../assets/iconos/telefono.png')}
                  name="telefono"
                  placeholder=" Telefono de la empresa"
                  datos={telefonoEmpresarial}
                  setDatos={setTelefono}
                  control={control}
                  keyboardType='numeric'
                  rules={{
                    pattern:
                  {
                      value: TELEFONO_REGEX,
                      message: "Caracter No Permitido"
                  },
                  minLength: { value: 7, message: "Debe contener 7 caracteres minimo" },
                  maxLength:{value: 10,  message: 'El telefono no puede tener más de 10 caracteres' },
                      required: 'Telefono Requerida',
                  }}
                  margin={30}
                  editable={activeImput}
                  />
            </View>
            <View 
                style={{paddingBottom:20}}                      
                >
              <Text style={styles.txt}>Email:<Text style={{color:'red'}}>*</Text></Text>
              <Imputs
                  imagen={require('../../assets/iconos/iconEmail.png')}
                  name="email"
                  placeholder=" Email de la empresa"
                  datos={emailEmpresarial}
                  setDatos={setEmail}
                  keyboardType='email-address'
                  control={control}
                  rules={{
                    pattern:
                  {
                      value: EMAIL_REGEX,
                      message: "Caracter No Permitido"
                  },
                  maxLength:{value: 59,  message: 'El correo no puede tener más de 59 caracteres' },
                      required: 'Telefono Requerida',
                  }}
                  margin={30}
                  editable={activeImput}
                  />
            </View>
          </View>
          {
                  activeImput ? 
                  (
                      <View style={{flexDirection:'row', justifyContent:'space-around', paddingBottom:20}}>
                          <Botones
                            name='Cancelar'
                            funcion={()=>{setActiveImput(false)}}
                            margin={130}/>
                          <Botones
                              name='Actualizar'
                              funcion={handleSubmit(editCompany)}
                              margin={130}/>
                      </View>
                  ):(
                      <View style={{paddingBottom:20}}>
                          <Botones
                                name='Editar'
                                funcion={()=>{setActiveImput(true)}}
                                margin={130}/>
                      </View>
                  )
              }
        </ScrollView>
            </>
          )
        }
        

    </SafeAreaView>
  )
}

export default Company

const styles = StyleSheet.create({
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
txt:{
    fontFamily:'Roboto-Medium',
    color:colores.color9,
    marginHorizontal:30
  },
})