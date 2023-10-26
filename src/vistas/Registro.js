import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native'
import React, {useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import Imputs from '../componentes/Imputs'
import { AuthContext } from '../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
import { colores } from '../componentes/Colors'

const iconUsuario = require('../../assets/iconos/iconUsuario.png')
const icoEdad = require('../../assets/iconos/edad.png')
const icoEmail = require('../../assets/iconos/iconEmail.png');
const icoContrasena = require('../../assets/iconos/iconContrasena.png');

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/
const NOMBRES_REGEX = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s']{1,40}$/ //letras y espacios
const EDAD_REGEX = /^[0-9]{1,2}$/

const Registro2 = () => {
    const [nombre, setNombre] = useState('')
    const [edad, setEdad] = useState(0)
    const [email, setEmail] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [contrasenarepet, setContrasenarepet] = useState('')
    const [enviar, setEnviar] = useState(false)

    // Variables y funciones del Context
    const { isLoading, txtErrorEmail, register } = useContext(AuthContext);

    //Temas de validaciones
    const { control, handleSubmit, watch } = useForm()
    const conRep = watch('contrasena')

    //funcion Registrar
    const registrar = () => {
        register(nombre, edad, email, contrasena)
            .then(() => {
                // Registro exitoso, navega a la pantalla deseada
                navigation.navigate('Login'); // Reemplaza 'PantallaDespuesDelRegistro' con el nombre de la pantalla a la que deseas navegar después del registro exitoso.
            })
            .catch(error => {
                // Manejar el error si es necesario
            });
    }
    
    const navigation = useNavigation();
    return (

        <SafeAreaView style={styles.container}>
            <Spinner visible={isLoading} />
            <ScrollView>
                <View>
                    <View style={{flex:30, alignItems:'center'}}>
                       <Image
                              source={require('../../assets/Logo.png')}
                              style={styles.imgLogo}
                          /> 
                    </View>
                    <View style={{flex:70}}>
                        {/* Formulario De Login*/}
                        <Text style={styles.txtRegistarse}>Crear una cuenta</Text>

                        <Imputs
                            imagen={iconUsuario}
                            name="nombre"
                            placeholder="Nombre"
                            datos={nombre}
                            setDatos={setNombre}
                            control={control}
                            rules={{
                                pattern:
                                {
                                    value: NOMBRES_REGEX,
                                    message: "Caracter No Permitido"
                                },
                                required: 'El Nombre es obligatorio',
                            }}
                        />
                        <Imputs
                            imagen={icoEdad}
                            name="edad"
                            placeholder="Edad"
                            datos={edad}
                            setDatos={setEdad}
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
                        />
                        <Imputs
                            imagen={icoEmail}
                            name="email"
                            placeholder="Email"
                            datos={email}
                            setDatos={setEmail}
                            control={control}
                            rules={{
                                pattern:
                                {
                                    value: EMAIL_REGEX,
                                    message: "Email Invalido"
                                },
                                required: 'El Email es obligatorio',
                            }}
                        />
                        {txtErrorEmail && (
                            <Text style={{
                                color: 'red',
                                paddingLeft: 60
                            }}>
                                El email que ingresaste ya fue usado
                            </Text>)
                        }
                        <Imputs
                            imagen={icoContrasena}
                            name="contrasena"
                            placeholder="Contraseña"
                            control={control}
                            setDatos={setContrasena}
                            rules={{
                                required: 'La Contraseña es obligatoria',
                                minLength: { value: 5, message: "Contraseña debe contener 5 caracteres minimos" }
                            }}
                            secureTextEntry
                        />
                        <Imputs
                            imagen={icoContrasena}
                            style={{ fontFamily: 'Roboto-Light' }}
                            name="contrasena_repetida"
                            placeholder="Verificar Contraseña"
                            datos={contrasenarepet}
                            setDatos={setContrasenarepet}
                            control={control}
                            rules={{
                                required: 'La Contraseña es obligatoria',
                                validate: value => value === conRep || 'La contraseña no coincide'
                            }}
                            secureTextEntry
                        />
                        <View>
                          <View style={styles.containerButtoms}>
                              <TouchableOpacity style={styles.btnIngreso}
                              onPress={
                                  handleSubmit(registrar)
                              }
                              >
                                  <Text style={styles.txtInferior}>Registrarse</Text>
                              </TouchableOpacity>
                          </View>
                          <TouchableOpacity
                              style={styles.enlace}
                              onPress={() => { navigation.navigate("Login") }} >
                              <Text style={[styles.btnEnlaces, { textDecorationLine: 'underline' }]}>Ya tengo cuenta de ingreso</Text>
                          </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.color6,
    paddingTop: 20,
    alignItems: 'center'
},
imgLogo: {
  width: 220,
  height: 200,
  objectFit: 'fill',
  marginVertical: 20,
},
txtRegistarse: {
    fontSize: 30,
    textAlign: 'center',
    color: colores.color4,
    marginBottom: 20,
    marginHorizontal: 25,
    fontFamily: 'Roboto-Bold'
},
btnIngreso: {
    marginTop: 20,
    backgroundColor: colores.color4,
    textAlign: 'center',
    borderRadius: 10,
    marginHorizontal: 130
},
txtInferior: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    padding: 10,
    fontFamily: 'Roboto-Medium'
},
enlace: {
    marginTop: 60,
    marginHorizontal: 100,
    paddingBottom:30
},
btnEnlaces: {
    color: colores.color5,
    fontWeight: '600',
    textAlign: 'center',
},
})


export default Registro2
