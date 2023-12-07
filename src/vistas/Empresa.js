import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Text, StyleSheet, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colores, colors } from '../componentes/Colors';
import { AuthContext } from '../context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Imputs from '../componentes/Imputs';
import Botones from '../componentes/Botones';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert } from 'react-native';
import Botones2 from '../componentes/Botones2';

//import AsyncStorage from '@react-native-async-storage/async-storage';

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
const NOMBRES_REGEX = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s']{1,40}$/; //letras y espacios;
const TELEFONO_REGEX = /^[0-9]{7,10}$/;
const NIT_REGEX = /^[0-9]{1,10}-[0-9]{1}$/;
const DIRECCION_REGEX = /^[0-9A-Za-z\s#áéíóúÁÉÍÓÚñÑ.,-/]+$/;

const Empresa2 = () => {
  const { isLoading, userInfo, registerEmpresa, companyInfo, logout} = useContext(AuthContext);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [idDepartamento, setIdDepartamen] = useState(8);
  const [idMunicipio, setIdMunicipio] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [nombreEmpresa, setEmpresa] = useState('');
  const [nit, setNit] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefonoEmpresarial, setTelefono] = useState('');
  const [emailEmpresarial, setEmail] = useState('');
  const registroEmpr = 'Si';


  const salir = () => {
    Alert.alert(
        'Cerrar Sesion',
        `Confirma salir de sesion?`,
        [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    logout();
                }
            }
        ]
    );
}


  const estado = null;

  // const estado = userInfo.RegistroEmpresa;
   const idUser = userInfo.id;
   const pasar = companyInfo.pasar;
  const datosEmpresa = companyInfo.datos;


  
  //const correoEmpresa = companyInfo.datos.emailEmpresarial;
  //const nitEmpresa = companyInfo.datos;


  useEffect(() => {
    cargarDepartamentos();
  }, [idDepartamento]);

  const cargarDepartamentos = () => {
    axios
      .post('https://www.plataforma50.com/pruebas/gestionP/deparMunicipios.php', {
        idDepar: idDepartamento,
      })
      .then((res) => {
        //console.log(res.data);
        const { departamentos, municipios } = res.data;
        //console.log(departamentos, municipios);
        setCountries(departamentos);
        let newCities = {};
        departamentos.forEach((depar) => {
          newCities[depar.id_depar] = municipios;
        });
        setCities(newCities);
      })
      .catch((error) => {
        console.error('Error del Axios' + error);
      });
  };

  useEffect(() => {
    if (selectedCountry !== null) {
      if (cities[selectedCountry]) {
        setSelectedCity(cities[selectedCountry][0].municipio);
        setIdDepartamen(selectedCountry);
        // Obtenemos el id del primer municipio del departamento seleccionado
        const id = cities[selectedCountry][0].id_municipio;
        setIdMunicipio(id);
      }
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCity !== null) {
      if (cities[selectedCountry]) {
        const city = cities[selectedCountry].find(city => city.municipio === selectedCity);
        if (city) {
          // Actualizamos el estado de idMunicipio con el id del municipio seleccionado
          setIdMunicipio(city.id_municipio);
        }
      }
    }
  }, [selectedCity]);

  const {
    control,
    handleSubmit,
    formState: { errors },
} = useForm();

const registrarEmpresa = () => {
  console.log(nombreEmpresa, nit, direccion, telefonoEmpresarial, emailEmpresarial, idUser, idDepartamento, idMunicipio, registroEmpr)
  registerEmpresa(nombreEmpresa, nit, direccion, telefonoEmpresarial, emailEmpresarial, idUser, idDepartamento, idMunicipio, registroEmpr)
      .then(() => {
          // Registro exitoso, navega a la pantalla deseada
          navegacion.navigate('Empresa'); // Reemplaza 'PantallaDespuesDelRegistro' con el nombre de la pantalla a la que deseas navegar después del registro exitoso.
      })
      .catch(error => {
          // Manejar el error si es necesario
      });
}

//console.log(pasar, datosEmpresa, idUser);
const navegacion = useNavigation();
  return (
    <View>
      <Spinner visible={isLoading} />
      {pasar == 'si' ?  
      (
        <SafeAreaView style={styles.containForm}>
          <View style={{marginBottom:40, marginTop:10}}>
          <View style={{alignItems:'center', marginBottom:20}}>
            <AntDesign name='account-circle' size={150} color={colores.color5}/>
            <Text style={{color:'black', marginBottom:5, fontFamily:'Roboto-Medium'}}>Nombre Emprendedor: {userInfo.nombre}</Text>
            <Text style={{color:'black', marginBottom:5, fontFamily:'Roboto-Medium'}}>Correo Emprendedor: {userInfo.email}</Text>
          </View>
          <View style={{alignItems:'center', marginBottom:20}}>
            <AntDesign name='domain' size={150} color={colores.color2}/>
            <Text style={{color:'black', marginBottom:5, fontFamily:'Roboto-Medium'}}>Nombre Empresa: {datosEmpresa.nombreEmprendimiento}</Text>
            <Text style={{color:'black', marginBottom:5, fontFamily:'Roboto-Medium'}}>Nit: {datosEmpresa.nit}</Text>
            <Text style={{color:'black', marginBottom:5, fontFamily:'Roboto-Medium'}}>Direccion: {datosEmpresa.direccion}</Text>
            <Text style={{color:'black', marginBottom:5, fontFamily:'Roboto-Medium'}}>Tel Empresa: {datosEmpresa.telefonoEmpresarial}</Text>
            <Text style={{color:'black', marginBottom:5, fontFamily:'Roboto-Medium'}}>Correo Empresa: {datosEmpresa.emailEmpresarial}</Text>
          </View>
          </View>
          <Botones name='Cerrar Sersion'
            funcion={salir} margin={100} padding={4}>
            <AntDesign name='logout-variant' size={35} color={colores.color8}/>
          </Botones>
      </SafeAreaView>
      ) : (
        <>
          <View>
            <Modal 
              transparent={true} // Para que el fondo sea transparente y muestre el color de fondo personalizado
            >
              <View style={styles.modal}>
                  <View style={styles.modalView}>
                  <ScrollView >
                      <View 
                      style={{paddingBottom:10}}
                      >
                        <Text style={styles.txt}>Nombre:<Text style={{color:'red'}}>*</Text></Text>
                      <Imputs
                      imagen={require('../../assets/iconos/iconUsuario.png')}
                                name="nombre"
                                placeholder=" Nombre de la empresa"
                                datos={nombreEmpresa}
                                setDatos={setEmpresa}
                                control={control}
                                rules={{
                                  pattern:
                                {
                                    value: NOMBRES_REGEX,
                                    message: "Caracter No Permitido"
                                },
                                    required: 'Email Requerido',
                                }}
                                margin={20}

                            />
                      </View>
                      <View 
                        style={{paddingBottom:10}}                      
                        >
                        <Text style={styles.txt}>Nit:<Text style={{color:'red'}}>*</Text></Text>
                      <Imputs
                                imagen={require('../../assets/iconos/nit.png')}
                                name="nit"
                                placeholder=" # Nit"
                                datos={nit}
                                setDatos={setNit}
                                control={control}
                                rules={{
                                  pattern:
                                {
                                    value: NIT_REGEX,
                                    message: "Caracter No Permitido"
                                },
                                    required: 'Nit Requerido',
                                }}
                                margin={20}
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
                                  pattern:
                                {
                                    value: DIRECCION_REGEX,
                                    message: "Direccion o Caracter No Permitido"
                                },
                                    required: 'Direccion Requerida',
                                }}
                                margin={20}
                            />
                      </View>
                      <View 
                      style={{paddingBottom:10}}
                      >
                          <Text style={styles.txt}>Departamento:<Text style={{color:'red'}}>*</Text></Text>
                          <Picker
                          style={styles.pickerStyles}
                          selectedValue={selectedCountry}
                          onValueChange={(itemValue) => setSelectedCountry(itemValue)}
                        >
                          {countries.map((country) => (
                            <Picker.Item label={country.departamento} value={country.id_depar} key={country.id_depar} />
                          ))}
                        </Picker>
                      </View>
                      <View 
                      style={{paddingBottom:10}}
                      >
                      <Text style={styles.txt}>Municipio<Text style={{color:'red'}}>*</Text></Text>
                            {selectedCountry !== null && Array.isArray(cities[selectedCountry]) && (
                          <Picker
                          style={styles.pickerStyles}
                            selectedValue={selectedCity}
                            onValueChange={(itemValue) => setSelectedCity(itemValue)}
                          >
                            {cities[selectedCountry].map((city) => (
                              <Picker.Item label={city.municipio} value={city.municipio} key={city.id_municipio} />
                            ))}
                          </Picker>
                          )}
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
                                rules={{
                                  pattern:
                                {
                                    value: TELEFONO_REGEX,
                                    message: "Telefono ó Caracter No Permitido"
                                },
                                    required: 'Telefono Requerida',
                                }}
                                margin={20}
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
                                control={control}
                                rules={{
                                  pattern:
                                {
                                    value: EMAIL_REGEX,
                                    message: "Caracter No Permitido"
                                },
                                    required: 'Telefono Requerida',
                                }}
                                margin={20}
                            />
                      </View>
                      
                      <Botones 
                            name='Registrar'
                            funcion={handleSubmit(registrarEmpresa)}
                            margin={60}
                            />
                      <Botones2 name='Cerrar Sersion'
                          funcion={salir} margin={60} padding={4}>
                        < AntDesign name='logout-variant' size={35} color={colores.color8}/>
                      </Botones2>
                      
                            
                    <Text>{estado} {idUser} {idDepartamento} {idMunicipio}</Text>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
        </>
      )}
    </View>
  );
};

export default Empresa2;

const styles = StyleSheet.create({
  containForm: {
    
  },
  modal: {
    flex:1,
    backgroundColor: colores.color6,
    justifyContent:'flex-start'
  },
  modalView: {
    marginHorizontal: 20,
    marginVertical:40,
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
    elevation: 8,
    backgroundColor: colores.color8,
},
  pickerStyles: {
    //backgroundColor:colores.color1,
    color: colors.color9,
  },
  iconos: {
    width: 20,
    height: 20,
    tintColor: colores.color5
  },
  txt:{
    fontFamily:'Roboto-Medium'
  }
});
