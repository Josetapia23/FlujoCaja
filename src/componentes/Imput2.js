import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Image } from 'react-native'
import { Controller } from 'react-hook-form'
import {colores, colors} from './Colors'


export default function Imput2({
  imagen,
  control,
  rules = {},
  name,
  placeholder,
  secureTextEntry,
  keyboardType,
  margin }) {

  return (


    <Controller
      control={control}
      name={name}
      rules={rules}//Reglas del imput requerido o obligatorio
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? "red" : colores.color5, marginHorizontal:margin }]}>
            <Image
              style={styles.iconos}
              source={imagen}
            />
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={colores.color9}
              style={[styles.txtInput]}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
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
