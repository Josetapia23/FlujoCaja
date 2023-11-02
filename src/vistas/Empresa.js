import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colores } from '../componentes/Colors';
import { AuthContext } from '../context/AuthContext';
import { Picker } from '@react-native-picker/picker';

const Empresa = () => {
    const { isLoading,  userInfo } = useContext(AuthContext);
    const countries = [
      { key: 'COL', value: 'Colombia' },
      { key: 'USA', value: 'Estados Unidos' },
      { key: 'ARG', value: 'Argentina' }
    ];
  
    const cities = {
      'COL': [
        { key: 'BOG', value: 'Bogotá' },
        { key: 'MED', value: 'Medellín' },
        { key: 'CAL', value: 'Cali' }
      ],
      'USA': [
        { key: 'NYC', value: 'Nueva York' },
        { key: 'LA', value: 'Los Ángeles' },
        { key: 'CHI', value: 'Chicago' }
      ],
      'ARG': [
        { key: 'BSA', value: 'Buenos Aires' },
        { key: 'COR', value: 'Córdoba' },
        { key: 'MEN', value: 'Mendoza' }
      ]
    };
  
    const [selectedCountry, setSelectedCountry] = useState(countries[0].key);
  const [selectedCity, setSelectedCity] = useState(cities[selectedCountry][0].key);

  useEffect(() => {
    if (cities[selectedCountry]) {
      setSelectedCity(cities[selectedCountry][0].key);
    }
  }, [selectedCountry]);
  
    const estado = userInfo.RegistroEmpresa;
  
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
          <Picker.Item label={country.value} value={country.key} key={country.key} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedCity}
        onValueChange={(itemValue) => setSelectedCity(itemValue)}
      >
        {cities[selectedCountry]?.map((city) => (
          <Picker.Item label={city.value} value={city.key} key={city.key} />
        ))}
      </Picker>
        </View>
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
