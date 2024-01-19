import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import { colores } from '../componentes/Colors';
import { AuthContext } from '../context/AuthContext';
import Imputs from '../componentes/Imputs';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Botones from '../componentes/Botones';
import axios from 'axios';
import SplashScreens from './SplashScreens';

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
const NOMBRES_REGEX = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s']{1,40}$/; //letras y espacios;
const EDAD_REGEX = /^[0-9]{1,2}$/;

const Perfil = () => {
    const {userInfo, updateUserInfo} = useContext(AuthContext)
    const [userName, setUserName] = useState(userInfo.nombre);
    const [userEmail, setUserEmail] = useState(userInfo.email);
    const [userAge, setUserAge] = useState(userInfo.edad);
    const [activeImput, setActiveImput] = useState(false);
    const [cargando, setCargando] = useState(false);


    const editUser = () => { 
        setCargando(true);
        return new Promise((resolve, reject) => {
          axios
            .post(
              'https://www.plataforma50.com/pruebas/gestionP/EditUser.php',
              {
                idUser: userInfo.id,
                nombreUser: userName,
                edad: userAge,
                emailUser: userEmail
              },
            )
            .then(res => {
              if (res.data.result === 'success') {
                setActiveImput(false);
                console.log('Datos de usuario Actualizados');
                setCargando(false);
                updateUserInfo();
    
              } else if (res.data.result === 'error') {
                // Error en el registro
                setActiveImput(false);
                console.log('Error en la actualizacion:', res.data.message);
                reject('Error en el registro: ' + res.data.message);
                setCargando(false);
              } else if (res.data.result === 'error1') {
                // Nombre ya existe
                setActiveImput(false);
                console.log('Este nombre ya existe:', res.data.message);
                reject('Este nombre ya existe: ' + res.data.message);
                setCargando(false);
    
              } else {
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
    <SafeAreaView style={styles.container}>
        <View style={styles.containerSuperior}>
            <TouchableOpacity style={styles.atras} onPress={()=>navegacion.navigate('Logout')}>
                <AntDesign name='arrow-left' size={25} color={colores.color7}/>
            </TouchableOpacity>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:25, color:colores.color7, textAlign:'center', }}>{`Datos personales`}</Text>
        </View>
            {
                cargando ? (
                    <View style={{marginTop:150}}>
                        <SplashScreens />
                    </View>   
                ):
                (
                    <View style={{marginVertical:20}}>
                        <View style={{paddingBottom:10}}>
                            <Text style={styles.txt}>Nombre:<Text style={{color:'red'}}>*</Text></Text>
                            <Imputs
                                imagen={require('../../assets/iconos/iconUsuario.png')}
                                name="nombre"
                                placeholder=" Nombre"
                                datos={userName}
                                setDatos={setUserName}
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
                        <View style={{paddingBottom:10}}>
                            <Text style={styles.txt}>Correo Electronico:<Text style={{color:'red'}}>*</Text></Text>
                            <Imputs
                                imagen={require('../../assets/iconos/iconEmail.png')}
                                name="email"
                                placeholder="Email"
                                datos={userEmail}
                                setDatos={setUserEmail}
                                keyboardType='email-address'
                                control={control}
                                rules={{
                                    pattern:
                                    {
                                        value: EMAIL_REGEX,
                                        message: "Email Invalido"
                                    },
                                    maxLength: { value: 60, message: "El correo debe contener 60 caracteres maximo" },
                                    required: 'El Email es obligatorio',
                                }}
                                margin={30}
                                editable={activeImput}
                            />
                        </View>
                        <View style={{paddingBottom:10}}>
                            <Text style={styles.txt}>Edad:<Text style={{color:'red'}}>*</Text></Text>
                            <Imputs
                                imagen={require('../../assets/iconos/edad.png')}
                                name="edad"
                                placeholder="Edad"
                                datos={userAge}
                                setDatos={setUserAge}
                                keyboardType="numeric"
                                control={control}
                                rules={{
                                    required: 'La Edad es obligatoria',
                                    pattern:
                                    {
                                        value: EDAD_REGEX,
                                        message: "Edad ó Caracter No Permitido"
                                    },
                                    min: {
                                        value: 15,
                                        message: "Debe ser mayor de 15 años"
                                    }
                                }}
                                margin={30}
                                editable={activeImput}
                            />
                        </View>
                        {
                            !activeImput ? 
                            (
                                <View>
                                    <Botones
                                        name='Editar'
                                        funcion={()=>{setActiveImput(true)}}
                                        margin={130}/>
                                </View>
                                
                            ):(
                                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                                    <Botones
                                        name='Cancelar'
                                        funcion={()=>{setActiveImput(false)}}
                                        margin={130}/>
                                    <Botones
                                        name='Actualizar'
                                        funcion={handleSubmit(editUser)}
                                        margin={130}/>
                                </View>
                            )
                        }
                </View>
                )
            }
               
    </SafeAreaView>
  )
}

export default Perfil

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
    txt:{
        fontFamily:'Roboto-Medium',
        color:colores.color9,
        marginHorizontal:30
      },
})