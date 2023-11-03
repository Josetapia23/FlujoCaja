import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colores } from '../componentes/Colors';
import { AuthContext } from '../context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Imputs from '../componentes/Imputs';

const Empresa = () => {
  const { isLoading, userInfo } = useContext(AuthContext);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [idDepartamen, setIdDepartamen] = useState(8);
  const [idMunicipio, setIdMunicipio] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [empresa, setEmpresa] = useState('');
  const [nit, setNit] = useState('');
  const [direccion, setDireccion] = useState('');

  const estado = userInfo.RegistroEmpresa;
  const idUser = userInfo.id;

  useEffect(() => {
    cargarDepartamentos();
  }, [idDepartamen]);

  const cargarDepartamentos = () => {
    axios
      .post('http://10.1.80.104/flujoCaja/deparMunicipios.php', {
        idDepar: idDepartamen,
      })
      .then((res) => {
        console.log(res.data);
        const { departamentos, municipios } = res.data;
        console.log(departamentos, municipios);
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

  return (
    <View>
      <Spinner visible={isLoading} />
      {estado !== null ? (
        <>
          <View>
            <Modal>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:30}}>
                <Text>Nombre:</Text>
              <Imputs
                        name="nombre"
                        placeholder="Nombre de la empresa"
                        datos={empresa}
                        setDatos={setEmpresa}
                        control={control}
                        rules={{
                            required: 'Email Requerido',
                        }}
                        margin={50}
                    />
              </View>
              <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', paddingHorizontal:30}}>
                <Text>Nit:</Text>
              <Imputs
                        name="nit"
                        placeholder="Nit"
                        datos={nit}
                        setDatos={setNit}
                        control={control}
                        rules={{
                            required: 'Nit Requerido',
                        }}
                        margin={50}
                    />
              </View>
              <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', paddingHorizontal:30}}>
                <Text>Direccion:</Text>
              <Imputs
                        name="direccion"
                        placeholder="Direccion de la empresa"
                        datos={direccion}
                        setDatos={setDireccion}
                        control={control}
                        rules={{
                            required: 'Direccion Requerida',
                        }}
                        margin={50}
                    />
              </View>
              <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', paddingHorizontal:30}}>
                  <Text>Departamento:</Text>
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
              <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', paddingHorizontal:30}}>
              <Text>Municipio</Text>
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
              
                    
            <Text>{estado} {idUser} {idDepartamen} {idMunicipio}</Text>
            </Modal>
          </View>
        </>
      ) : (
        <View style={styles.containForm}>
          <Modal visible={true} style={styles.modal}>
          <Text>Municipiooooooo</Text>
          </Modal>
          {/* Otros componentes */}
        </View>
      )}
    </View>
  );
};

export default Empresa;

const styles = StyleSheet.create({
  containForm: {},
  modal: {
    backgroundColor: colores.color2
  },
  pickerStyles: {
    backgroundColor:colores.color1,
    color:'red'
  }
});
