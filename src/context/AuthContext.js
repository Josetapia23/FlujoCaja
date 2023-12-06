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
  const [arrayIngresos, setArrayIngresos] = useState([]);
  const [arrayGastos, setArrayGastos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [txtErrorEmail, setTxtErrorEmail] = useState('');
  const [ok, setOk] = useState(false);
  const [success, setSuccess] = useState('no');
  const [activo, setActivo] = useState(false);
  const [tokenUsuario, setTokenUsuario] = useState(0);
  const [tokenEmpresa, setTokenEmpresa] = useState(0);
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
          //AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
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

  const obtenerEmpresa = async () => {
    try {
      setIsLoading(true);
      const respuesta = await axios.post(
        'https://www.plataforma50.com/pruebas/gestionP/getDatosEmpresa.php',
        { id: userInfo.id }
      );
      const emprendimientoData = respuesta.data;
      AsyncStorage.setItem('companyinfo', JSON.stringify(emprendimientoData));

      console.log('Información adicional:', emprendimientoData);
      if (emprendimientoData.success) {
        setTokenEmpresa(1);
        setCompanyInfo({
          pasar: 'si',
          datos: emprendimientoData.emprendimiento,
        });
      } else {
        setCompanyInfo({
          pasar: 'no',
        });
      }

      setIsLoading(false);
    } catch (error) {
      console.error(
        'Error al obtener información adicional:',
        error.response || error.message || error
      );
      setIsLoading(false);
      throw error; // Lanza el error para que pueda ser manejado por la llamada de la promesa
    }
  };

  const montos = async () => {
    try {
      setIsLoading(true);
      const respuesta = await axios.post(
        'https://www.plataforma50.com/pruebas/gestionP/montosPorHora.php',
        {
          idUser: userInfo.id,
          idEmprendimiento: companyInfo.datos.id,
        }
      );

      const montosData = respuesta.data;
      setMontosGenerales(montosData);
      setArrayIngresos(montosData.ingresoPorIntervalo);
      setArrayGastos(montosData.gastoPorIntervalo);
      console.log('Información de montos:'," ",montosData.ingresoPorIntervalo, " ",montosData.gastoPorIntervalo);

      setIsLoading(false);
    } catch (error) {
      console.error(
        'Error al obtener montos de la empresa:',
        error.response || error.message || error
      );
      setIsLoading(false);
      throw error; // Lanza el error para que pueda ser manejado por la llamada de la promesa
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        await obtenerEmpresa();
      } catch (error) {
        // Manejar el error aquí si es necesario
      }
    };

    fetchData();
  }, [userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await montos();
      } catch (error) {
        // Manejar el error aquí si es necesario
      }
    };

    fetchData();
  }, [companyInfo]);

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
            setTokenEmpresa(1);
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
      await AsyncStorage.removeItem('id');
      await AsyncStorage.removeItem('companyInfo');
      await AsyncStorage.removeItem('emprendimientoInfo');
      await AsyncStorage.removeItem('conceptos1');
      await AsyncStorage.removeItem('conceptos2');

      setTokenUsuario(0);
      setTokenEmpresa(0);
      setUserInfo({});
      setCompanyInfo({});
      setMontosGenerales({});
      setArrayGastos([]);
      setArrayIngresos([]);
      setIsLoading(false);
      setErrorMessage(false);
      setActivo(false);
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

      let companyInfo = await AsyncStorage.getItem('companyInfo');
      companyInfo = JSON.parse(companyInfo);

      if (userInfo) {
        setUserInfo(userInfo);
        setTokenUsuario(1);
      }

      if (companyInfo) {
        setCompanyInfo({
          pasar: 'si',
          datos: companyInfo.emprendimiento,
        });
        setTokenEmpresa(1);
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
        tokenEmpresa,
        ok,
        success,
        activo,
        splashLoading,
        montosGenerales,
        arrayIngresos,
        arrayGastos,
        register,
        login,
        logout,
        registerEmpresa,
        montos
      }}>
      {children}
    </AuthContext.Provider>
  );
};
