/* eslint-disable prettier/prettier */
import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [montosGenerales, setMontosGenerales] = useState({});
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
      axios
        .post(
          'https://www.plataforma50.com/pruebas/gestionP/registro.php',
          {
            nombre,
            edad,
            email,
            contrasena,
          },
        )
        .then(res => {
          let userInfo = res.data;
          setUserInfo(userInfo);
          console.log(userInfo);
          setIsLoading(false);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          if (userInfo.result === 'success') {
            // Registro exitoso, muestra un mensaje o realiza una acción adicional
            console.log('Registro exitoso');
            setOk(true); // Puedes utilizar esta variable de estado según sea necesario
            resolve(); // Resuelve la promesa si el registro es exitoso
          } else if (userInfo.result === 'error') {
            // Error en el registro, muestra un mensaje de error
            console.log('Error en el registro:', userInfo.message);
            setErrorMessage(userInfo.message); // Almacena el mensaje de error en el estado
            setTxtErrorEmail(true);
            reject(userInfo.message); // Rechaza la promesa si hay un error en el registro
            // Aquí puedes mostrar el mensaje de error al usuario o realizar una acción adicional
            //https://www.plataforma50.com/pruebas/gestionP/login.php
          }

          if (email === userInfo.email) {
            console.log('El email existe');
            setTxtErrorEmail('El email existe');
          }
        })
        .catch(error => {
          console.error('Error al registrar usuario con axios:', error.message);
          setIsLoading(false);
          reject(error.message); // Rechaza la promesa si hay un error en la solicitud
        });
    });
  };

  const login = (email, contrasena) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      axios
        .post('https://www.plataforma50.com/pruebas/gestionP/login.php', {
          email,
          contrasena,
        })
        .then(res => {
          // const device = OneSignal.User.pushSubscription.getPushSubscriptionId();
          // AsyncStorage.setItem("tokenDispositivo", device);
          //https://www.plataforma50.com/pruebas/gestionP/login.php
          let userInfo = res.data;
          setIsLoading(false);
          setUserInfo(userInfo);
          console.log(userInfo)
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          if (userInfo.email == email && userInfo.contrasena == contrasena) {
            setTokenUsuario(1);
            setSuccess('si');
            resolve(userInfo); // Resuelve la promesa en caso de éxito
            console.log('Ingreso');
            AsyncStorage.setItem('id', userInfo.id);
          } else {
            setSuccess(null);
            setActivo(true);
            console.log('Credenciales incorrectas');
            reject('Credenciales incorrectas'); // Rechaza la promesa en caso de credenciales incorrectas
          }
        })
        .catch(error => {
          setSuccess(null);
          console.error('Error del Axios' + error);
          setIsLoading(false);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  };

  const obtenerEmpresa = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
    axios
    .post('https://www.plataforma50.com/pruebas/gestionP/getDatosEmpresa.php', { id: userInfo.id })
    .then(respuesta => {
      // Procesa la respuesta adicional
      let emprendimientoData = respuesta.data;
      console.log('Información adicional:', emprendimientoData);
      if(emprendimientoData.success== true){
          //AsyncStorage.setItem('emprendimientoInfo', JSON.stringify(emprendimientoData));
          setCompanyInfo({
            "pasar":"si",
            "datos": emprendimientoData.emprendimiento
          });
      }else{
        //AsyncStorage.setItem('emprendimientoInfo', "Sin datos");
        setCompanyInfo({
          "pasar":"no"
        })
      }
      //console.log(companyInfo);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error al obtener información adicional:', error.response || error.message || error);
      setIsLoading(false);
      reject(error); // Rechaza la promesa en caso de error al obtener información adicional
    });
  })
  };

  const montos = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
    axios
    .post('http://192.168.39.180/flujoCaja/montosPorHora.php', { 
      idUser: userInfo.id,
      idEmprendimiento: companyInfo.datos.id })
    .then(respuesta => {
      // Procesa la respuesta adicional
      let montosData = respuesta.data;
      setMontosGenerales(montosData);
      console.log('Información de montos:', montosData);
      //console.log(companyInfo);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error al obtener montos de la empresa:', error.response || error.message || error);
      setIsLoading(false);
      reject(error); 
    });
  })
  };


 useEffect(() => {
    montos();
  }, [companyInfo]);

  useEffect(() => {
    obtenerEmpresa();
  }, [userInfo]);

  const registerEmpresa = (nombreEmpresa, nit, direccion, telefonoEmpresarial, emailEmpresarial, idUser, idDepartamento, idMunicipio, registroEmpresa) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      axios
        .post(
          'https://www.plataforma50.com/pruebas/gestionP/registEmpresa.php',
          {
            nombreEmpresa,
            nit,
            direccion,
            telefonoEmpresarial,
            emailEmpresarial,
            idUser,
            idDepartamento,
            idMunicipio,
            registroEmpresa
          },
        )
        .then(res => {
          let companyData = res.data;
          setCompanyInfo(companyData);
          console.log(companyData);
          setIsLoading(false);
          AsyncStorage.setItem('companyInfo', JSON.stringify(companyData));
          if (companyData.result === 'success') {
            // Registro exitoso, muestra un mensaje o realiza una acción adicional
            //https://www.plataforma50.com/pruebas/gestionP/registro.php
            setCompanyInfo({
              "pasar":"si",
              "datos": companyData.emprendimiento
            });
            console.log('Registro de empresa exitoso');
            
            resolve(); // Resuelve la promesa si el registro es exitoso
          } else if (companyData.result === 'error') {
            // Error en el registro, muestra un mensaje de error
            console.log('Error en el registro:', userInfo.message);
            setErrorMessage(companyData.message); // Almacena el mensaje de error en el estado
            reject(companyData.message); // Rechaza la promesa si hay un error en el registro
            // Aquí puedes mostrar el mensaje de error al usuario o realizar una acción adicional
          }

          if (nit === companyData.nit) {
            console.log('El Nit ya existe');
            setTxtErrorEmail('El email existe');
            setTxtErrorNit('El email existe');
          }
        })
        .catch(error => {
          console.error('Error al registrar Empresa con axios:', error.message);
          setIsLoading(false);
          reject(error.message); // Rechaza la promesa si hay un error en la solicitud
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
      await AsyncStorage.removeItem('companyInfo');
      await AsyncStorage.removeItem('emprendimientoInfo');
      await AsyncStorage.removeItem('conceptos1');
      await AsyncStorage.removeItem('conceptos2');

      

      setTokenUsuario(0);
      setUserInfo({});
      setIsLoading(false);
      setCompanyInfo({});
      console.log('salio');
    } catch (e) {
      console.error('Error ' + e);
      setIsLoading(false);
    }
  };

  const isLogged = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
        setTokenUsuario(1);
      }
      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.error('Error de isLogged' + e);
    }
  };

  useEffect(() => {
    isLogged();
  }, []); //Fin
  return (
    <AuthContext.Provider
      value={{
        errorMessage,
        txtErrorEmail,
        isLoading,
        userInfo,
        companyInfo,
        tokenUsuario,
        ok,
        success,
        activo,
        splashLoading,
        montosGenerales,
        register,
        login,
        logout,
        registerEmpresa,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
