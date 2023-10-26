import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
//import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import Imputs from '../componentes/imputs/Imputs'
import { AuthContext } from '../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'

const iconUsuario = require('../../assets/iconos/iconUsuario.png')
const icoEdad = require('../../assets/iconos/edad.png')
const icoEmail = require('../../assets/iconos/iconEmail.png');
const icoContrasena = require('../../assets/iconos/iconContrasena.png');

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/
const NOMBRES_REGEX = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s']{1,40}$/ //letras y espacios
const EDAD_REGEX = /^[0-9]{1,2}$/
const TELEFONO_REGEX = /^[0-9]{10}$/ //numeros

const Registro = () => {
    const [nombre, setNombre] = useState('')
    const [edad, setEdad] = useState(0)
    const [email, setEmail] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [contrasenarepet, setContrasenarepet] = useState('')
    const [enviar, setEnviar] = useState(false)
    // Variables y funciones del Context
    const { errorMessage, ok, ok2, setOk, isLoading, txtErrorEmail, userInfo, register } = useContext(AuthContext);
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


    // const autenticacion = async () => { //Declara una función asíncrona llamada 
    //     try {
    //         const response = await axios.post("http://10.1.80.72/php/registro2.php", {
    //             nombre: nombre,
    //             edad: edad,
    //             email: email,
    //             contrasena: contrasena
    //         })
    //         //console.log(response.data); // Muestra la respuesta del servidor
    //         if (response.data.result === "success") {
    //             // Registro exitoso, muestra un mensaje o realiza una acción adicional
    //             console.log("Registro exitoso");
    //             setOk(true); // Puedes utilizar esta variable de estado según sea necesario
    //         } else if (response.data.result === "error") {
    //             // Error en el registro, muestra un mensaje de error
    //             console.log("Error en el registro:", response.data.message);
    //             setErrorMessage(response.data.message); // Almacena el mensaje de error en el estado
    //             setTxtErrorEmail(true);
    //             // Aquí puedes mostrar el mensaje de error al usuario o realizar una acción adicional
    //         }

    //         /* const {nombre, edad, email, contrasena} = response.data.users;*/
    //         if (email === response.data.email) {
    //             console.log("El email existe");
    //             setErrorMessage("El email existe");
    //         }

    //     } catch (error) {
    //         console.error("Error al registrar usuario con axios:", error.message);//catch (error) { console.error(error) }: Si ocurre un error durante la solicitud, captura el error y lo muestra en la consola.
    //     } finally {
    //         setEnviar(false);// Independientemente de si la solicitud tuvo éxito o falló, este bloque se ejecutará y establecerá el estado enviar en false, lo que significa que no se realizará otra solicitud hasta que se active manualmente.
    //     }
    // };
    const navigation = useNavigation();

    return (

        <SafeAreaView style={styles.container}>
            <Spinner visible={isLoading} />
            <ScrollView>
                <View>
                    {/* Imagen De Login*/}
                    <Image
                        source={require('../../assets/imgHome/AmamantaLogo.png')}
                        style={styles.imgLogo}
                    />
                    <View>
                        {/* Formulario De Login*/}
                        <Text style={styles.txtRegistarse}>Registrarse</Text>

                        <Imputs
                            imagen={iconUsuario}
                            style={{ fontFamily: 'Roboto-Light' }}
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
                            style={{ fontFamily: 'Roboto-Light' }}
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
                            style={{ fontFamily: 'Roboto-Light' }}
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
                            style={{ fontFamily: 'Roboto-Light' }}
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
                        <View style={styles.containerButtoms}>
                            <TouchableOpacity style={styles.button}
                                onPress={
                                    handleSubmit(registrar)
                                }
                            >
                                <Text style={styles.TextBotones}>Registrarse</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.enlace}
                        onPress={() => { navigation.navigate("Login") }} >
                        <Text style={[styles.btnEnlaces, { textDecorationLine: 'underline' }]}>Ya tengo cuenta de ingreso</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF0F7',
        paddingTop: 20,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    imgLogo: {
        width: 280,
        height: 200,
        objectFit: 'fill',
        marginVertical: 50,
        marginHorizontal: 60
    },
    txtRegistarse: {
        fontSize: 30,
        textAlign: 'center',
        color: '#6A71B9',
        fontWeight: 'bold',
        marginBottom: 15,
        fontFamily: 'Roboto-Bold',
    },
    containInputs: {
        marginTop: 10,
        marginBottom: 7,
        marginHorizontal: 50,
        backgroundColor: '#FAD2E0',
        //paddingVertical:5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center'
    },
    inputs: {
        marginLeft: 10,
        width: 210
    },
    iconos: {
        width: 20,
        height: 20,
    },
    TextBotones: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Roboto-Medium'
    },
    containerButtoms: {
        flexDirection: 'row',
        justifyContent: 'center'

    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#6A71B9',
        borderRadius: 10,
    },
    enlace: {
        marginTop: 20,
        marginHorizontal: 110,
        //backgroundColor: '#fff',
    },
    btnEnlaces: {
        color: '#FF7BAC',
        textAlign: 'center',
        fontFamily: 'Roboto-Medium'
        /*textDecorationColor: '#FF7BAC' */
    },
})


export default Registro
