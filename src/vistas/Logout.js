import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colores, colors } from '../componentes/Colors';
import { AuthContext } from '../context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Imputs from '../componentes/Imputs';
import Botones from '../componentes/Botones';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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

const Logout = () => {
  const { isLoading, userInfo, registerEmpresa, updateUserInfo, companyInfo, logout, txtErrorNit} = useContext(AuthContext);
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

  const [userName, setUserName] = useState(userInfo.nombre);
  const [emailUser, setEmailUser] = useState(userInfo.email)


  // useFocusEffect( //Este se utiliza para que renderice las funciones de inmediato en las vistas que hacen parte de los bootom tabs
  //       React.useCallback(()=>{
  //         updateUserInfo();
  //       }, [])
  //   )

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
          navegacion.navigate('Inicio'); // Reemplaza 'PantallaDespuesDelRegistro' con el nombre de la pantalla a la que deseas navegar después del registro exitoso.
      })
      .catch(error => {
          // Manejar el error si es necesario
      });
}

//console.log(pasar, datosEmpresa, idUser);
const navegacion = useNavigation();
  return (
    <SafeAreaView>
      <Spinner visible={isLoading} />
      {pasar == 'si' ?  
      (
        < >
            <View style={{ marginBottom:70, backgroundColor:colores.color5, paddingVertical:30, height:100}}>
              <View style={{flexDirection:'row', alignItems:'center', paddingLeft:5, paddingBottom:10}}> 
                <Image source={require('../../assets/iconos/usuario.png')} style={{width:50, height:50, borderRadius:50, marginHorizontal:20 ,backgroundColor:colores.color5 ,tintColor:colores.color8}} />
                <View>
                  <Text style={{color:colores.color8, fontSize:16, fontWeight:'800'}}>{userInfo.nombre}</Text>
                  <Text style={{color:colors.color8, fontSize:16, paddingTop:3}}>{userInfo.email}</Text>
                </View>
              </View>
            </View>
          <ScrollView style={{ height:450}}>
              <TouchableOpacity onPress={()=>{navegacion.navigate('Perfil')}}>
                <View style={styles.containerOptions}> 
                    <Text style={{color:colores.color5, paddingVertical:5, fontSize:15, fontWeight:'700', marginLeft:10}}>Perfil</Text>
                    < AntDesign name='chevron-right-circle-outline' size={20} color={colores.color5} style={{marginRight:5}}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{navegacion.navigate('Company')}}>
                <View style={styles.containerOptions}> 
                    <Text style={{color:colores.color5, paddingVertical:5, fontSize:15, fontWeight:'700', marginLeft:10}}>Empresa</Text>
                    < AntDesign name='chevron-right-circle-outline' size={20} color={colores.color5} style={{marginRight:5}}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{navegacion.navigate('Privacidad')}}>
                <View style={styles.containerOptions}> 
                    <Text style={{color:colores.color5, paddingVertical:5, fontSize:15, fontWeight:'700', marginLeft:10}}>Privacidad</Text>
                    < AntDesign name='chevron-right-circle-outline' size={20} color={colores.color5} style={{marginRight:5}}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{navegacion.navigate('Tyc')}}>
                <View style={styles.containerOptions}> 
                    <Text style={{color:colores.color5, paddingVertical:5, fontSize:15, fontWeight:'700', marginLeft:10}}>Terminos y condiciones</Text>
                    < AntDesign name='chevron-right-circle-outline' size={20} color={colores.color5} style={{marginRight:5}}/>
                </View>
              </TouchableOpacity>
              <View style={{marginTop:'20%', paddingBottom:40}}>
                <Botones2 name='Cerrar Sersion'
                    funcion={salir} margin={'27%'} padding={6}>
                  < AntDesign name='exit-to-app' size={30} color={colores.color8}/>
                </Botones2>
              </View>
            </ScrollView>
      </>
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
                                  pattern:{value: NOMBRES_REGEX,message: "Caracter No Permitido"},
                                  required: 'Nombre Requerido',
                                  maxLength:{value: 40,  message: 'El nombre de la empresa no puede tener más de 40 caracteres' }
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
                                pattern:{value: NIT_REGEX,  message: "El formato de nit es 12..34-1, solo numeros ,un solo '-' y el numero que termina."},
                                minLength: { value: 10, message: "Debe contener 10 caracteres minimo" },
                                maxLength:{value: 12,  message: 'El nit no puede tener más de 12 caracteres' },
                                    required: 'Nit Requerido',
                                }}
                                margin={20}
                            />
                            {txtErrorNit &&
                            <Text style={{
                                color: 'red',
                                paddingLeft: 60
                            }}>
                                {txtErrorNit}
                            </Text>
                        }
                      </View>
                      <View 
                        style={{paddingBottom:10,}}                      
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
                                margin={20}
                            />
                      </View>
                      
                      <Botones 
                        name='Registrar'
                        funcion={handleSubmit(registrarEmpresa)}
                        margin={60}
                      />
                      {/* <Botones 
                        name='Regresar'
                        funcion={()=> navegacion.goBack()}
                        margin={60}
                      /> */}
                      <Botones2 name='Cerrar Sersion'
                          funcion={salir} margin={60} padding={6}>
                        < AntDesign name='exit-to-app' size={35} color={colores.color8}/>
                      </Botones2>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Logout;

const styles = StyleSheet.create({
  containForm: {
    flex:1
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
    shadowColor: colores.color5,
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
    fontFamily:'Roboto-Medium',
    color:colores.color9
  },
  containerOptions:{
    //backgroundColor:colores.color5, 
    height:55, 
    borderBottomWidth:1, 
    borderBottomColor:colors.color7,
    //borderRadius:3,
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    marginHorizontal:20
  }
});
