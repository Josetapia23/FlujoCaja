import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colores } from '../componentes/Colors';
import { AuthContext } from '../context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
const Empresa = () => {
  const { isLoading, userInfo } = useContext(AuthContext);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [idDepartamen, setIdDepartamen] = useState(8);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [idMunicipio, setIdMunicipio] = useState(null); // Nueva constante de estado para el id del municipio

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
    if (selectedCountry !== null && cities[selectedCountry]) {
      setSelectedCity(cities[selectedCountry][0]);
      setIdDepartamen(selectedCountry);
      
    }
  }, [selectedCountry]);

  const estado = userInfo.RegistroEmpresa;
  const idUser = userInfo.id;

  return (
    <View>
      <Spinner visible={isLoading} />
      {estado === 'SI' ? (
        <>
          <View>
            <Picker
              selectedValue={selectedCountry}
              onValueChange={(itemValue) => setSelectedCountry(itemValue)}
            >
              {countries.map((country) => (
                <Picker.Item label={country.departamento} value={country.id_depar} key={country.id_depar} />
              ))}
            </Picker>
            {selectedCountry !== null && Array.isArray(cities[selectedCountry]) && (
              <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedCity(itemValue);
                  setIdMunicipio(cities[selectedCountry][itemIndex].id_municipio); // Aquí es donde se cambia el estado de idMunicipio cuando se selecciona una ciudad
                }}
              >
                {cities[selectedCountry].map((city) => (
                  <Picker.Item label={city.municipio} value={city.id_municipio} key={city.id_municipio} />
                ))}
              </Picker>
            )}
          </View>
          <Text>{estado} {idUser} {idDepartamen} {idMunicipio}</Text>
        </>
      ) : (
        <View style={styles.containForm}>
          <Modal visible={true} style={styles.modal}>
            {/* Contenido del modal */}
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
  }
});


