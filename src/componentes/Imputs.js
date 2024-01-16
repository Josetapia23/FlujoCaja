import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Image } from 'react-native'
import { Controller } from 'react-hook-form'
import {colores, colors} from './Colors'


export default function Imputs({
  imagen,
  control,
  rules = {},
  name,
  placeholder,
  secureTextEntry,
  keyboardType,
  datos,
  setDatos,
  margin,
  editable = true,
  backgroundColor }) {

  return (


    <Controller
      control={control}
      name={name}
      rules={rules}//Reglas del imput requerido o obligatorio
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? "red" : colores.color5, marginHorizontal:margin, backgroundColor: editable? colores.color6 : colores.color7}]}>
            <Image
              style={styles.iconos}
              source={imagen}
            />
            <TextInput
              value={datos || value}
              onChangeText={(text) => {
                setDatos(text);
                onChange(text);
              }}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={colores.color9}
              style={[styles.txtInput]}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              editable = {editable}
            />
          </View>
          {error && (
            <Text style={styles.txtError}>{error.message || "Error"}</Text>
          )}
        </>
      )}
    />

  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: colores.color7,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center'
  },
  txtInput: {
    fontSize: 15,
    width: '100%',
    fontFamily: 'Roboto-Medium',
    color: colors.color9,
  },
  iconos: {
    width: 20,
    height: 20,
    tintColor: colores.color5
  },
  txtError: {
    color: 'red',
    paddingLeft: 60
  }
})
