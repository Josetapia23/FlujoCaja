import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import Imputs from '../componentes/Imputs';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { colores, colors } from '../componentes/Colors';
import { ScrollView } from 'react-native';
import Botones from '../componentes/Botones';


const icoEmail = require('../../assets/iconos/iconEmail.png');
const icoContrasena = require('../../assets/iconos/iconContrasena.png');

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/


const Login = () => {
    const [id, setId] = useState(0);
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');

    const { activo, success, isLoading, userInfo, login } = useContext(AuthContext);
    //const [isNavigating, setIsNavigating] = useState(false); // Nuevo estado para controlar la navegación




    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm(); //Hacemos un object destructuring en el cual obtenemos dos funciones de la clase useForm()

    console.log(errors);



    // useEffect(() => {
    //     if (success === 'si') {
    //         //setIsNavigating(true); // Evitar múltiples navegaciones
    //         xx.navigate('Home'); // Realizar la navegación cuando success sea 'si'
    //     }
    // }, [success]);

    const Login = () => {
        login(email, contrasena)
            .catch(error => {
                // Manejar el error si es necesario
            });
    };


    const xx = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <Spinner visible={isLoading} />
            <ScrollView>
            <View >
                  <View style={{flex:30, alignItems:'center'}}>
                   <Image
                        source={require('../../assets/Logo.png')}
                        style={styles.imgLogo}
                    />  
                  </View>

                  <View style={{flex:70}}>
                    <Text style={styles.txtRegistarse}>Ingresa con tu cuenta</Text>

                    <Imputs
                        imagen={icoEmail}
                        name="email"
                        placeholder="Email"
                        datos={email}
                        keyboardType='email-address'
                        setDatos={setEmail}
                        control={control}
                        rules={{
                            pattern:
                            {
                                value: EMAIL_REGEX,
                                message: "Email Invalido"
                            },
                            required: 'Email Requerido',
                        }}
                        margin={50}
                    />
                    <Imputs
                        imagen={icoContrasena}
                        name="contrasena"
                        placeholder="Contraseña"
                        datos={contrasena}
                        setDatos={setContrasena}
                        secureTextEntry
                        rules={{
                            required: 'Contraseña Requerida',
                            minLength: { value: 5, message: "Contraseña debe contener 5 caracteres minimos" },
                            maxLength: { value: 14, message: "Contraseña debe contener 14 caracteres maximo" }
                        }}
                        control={control}
                        margin={50}
                    />
                    {activo && (
                        <Text style={{
                            color: 'red',
                            paddingLeft: 60,
                            fontFamily: 'Roboto-Regular'
                        }}>
                            Email y o contraseña incorrectos
                        </Text>)
                    }
                    <View>
                        <Botones 
                            name='Ingresar'
                            funcion={handleSubmit(Login)}
                            margin={130}
                            />
                        <TouchableOpacity
                            onPress={() => { xx.navigate("Registro") }}
                            style={styles.enlace}
                        >
                            <Text style={[styles.btnEnlaces, { textDecorationLine: 'underline' }]}>Crear una cuenta</Text>
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
        marginBottom: 25,
        marginHorizontal: 25,
        fontFamily:'Roboto-Bold'
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
    },
    btnEnlaces: {
        color: colores.color5,
        fontWeight: '600',
        textAlign: 'center',
    },
})

export default Login

