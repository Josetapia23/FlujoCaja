import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState(false);
    const [txtErrorEmail, setTxtErrorEmail] = useState('');
    const [ok, setOk] = useState(false);
    const [success, setSuccess] = useState('no');
    const [activo, setActivo] = useState(false);
    const [tokenUsuario, setTokenUsuario] = useState(0);
    const [splashLoading, setSplashLoading] = useState(false);

    //Registro, Logeo y Variable de sesion (En esta parte)
    const register = (nombre, edad, email, contrasena) => {
        return new Promise((resolve, reject) => {
            setIsLoading(true);
            axios.post("https://www.plataforma50.com/pruebas/Amamanta/php/registro2.php", {
                nombre,
                edad,
                email,
                contrasena,
            })
                .then(res => {
                    let userInfo = res.data;
                    setUserInfo(userInfo);
                    console.log(userInfo);
                    setIsLoading(false);
                    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                    if (userInfo.result === "success") {
                        // Registro exitoso, muestra un mensaje o realiza una acción adicional
                        console.log("Registro exitoso");
                        setOk(true); // Puedes utilizar esta variable de estado según sea necesario
                        resolve(); // Resuelve la promesa si el registro es exitoso
                    } else if (userInfo.result === "error") {
                        // Error en el registro, muestra un mensaje de error
                        console.log("Error en el registro:", userInfo.message);
                        setErrorMessage(userInfo.message); // Almacena el mensaje de error en el estado
                        setTxtErrorEmail(true);
                        reject(userInfo.message); // Rechaza la promesa si hay un error en el registro
                        // Aquí puedes mostrar el mensaje de error al usuario o realizar una acción adicional
                    }

                    if (email === userInfo.email) {
                        console.log("El email existe");
                        setTxtErrorEmail("El email existe");
                    }
                })
                .catch(error => {
                    console.error("Error al registrar usuario con axios:", error.message);
                    setIsLoading(false);
                    reject(error.message); // Rechaza la promesa si hay un error en la solicitud
                });
        });
    }

    const login = (email, contrasena) => {
        return new Promise((resolve, reject) => {
            setIsLoading(true);
            axios
                .post("https://www.plataforma50.com/pruebas/Amamanta/login3.php", {
                    email,
                    contrasena,
                })
                .then((res) => {
                    // const device = OneSignal.User.pushSubscription.getPushSubscriptionId();
                    // AsyncStorage.setItem("tokenDispositivo", device);
                    let userInfo = res.data;
                    setIsLoading(false);
                    setUserInfo(userInfo);
                    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                    if (userInfo.email == email && userInfo.contrasena == contrasena) {
                        setTokenUsuario(1);
                        setSuccess('si');
                        resolve(userInfo); // Resuelve la promesa en caso de éxito
                        console.log('Ingreso');
                        AsyncStorage.setItem("id", userInfo.id);
                    } else {
                        setSuccess(null);
                        setActivo(true);
                        console.log("Credenciales incorrectas");
                        reject("Credenciales incorrectas"); // Rechaza la promesa en caso de credenciales incorrectas
                    }
                })
                .catch((error) => {
                    setSuccess(null);
                    console.error("Error del Axios" + error);
                    setIsLoading(false);
                    reject(error); // Rechaza la promesa en caso de error
                });
        });
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem('userInfo');
            //await AsyncStorage.removeItem('seno');
            //await AsyncStorage.removeItem('tokenDispositivo');
            await AsyncStorage.removeItem('id');

            setTokenUsuario(0);
            setUserInfo({});
            setIsLoading(false);
            console.log('salio');
        } catch (e) {
            console.error("Error " + e)
            setIsLoading(false);
        }
    }

    const isLogged = async () => {
        try {
            setSplashLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo)

            if (userInfo) {
                setUserInfo(userInfo);
                setTokenUsuario(1);
            }
            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
            console.error("Error de isLogged" + e)

        }
    }

    useEffect(() => {
        isLogged()
    }, []); //Fin


    return (
        <AuthContext.Provider value={{
            errorMessage,
            txtErrorEmail,
            isLoading,
            userInfo,
            tokenUsuario,
            ok,
            success,
            activo,
            splashLoading,
            register,
            login,
            logout
        }}>{children}</AuthContext.Provider>
    );
};