import { Alert, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colores, colors } from '../componentes/Colors'
import Tablas from '../componentes/Tablas';
import Imput2 from '../componentes/Imput2';
import Botones from '../componentes/Botones';
import { useForm } from 'react-hook-form';
import SplashScreens from './SplashScreens';
import { ScrollView } from 'react-native';
import Imputs from '../componentes/Imputs';
import { useFocusEffect } from '@react-navigation/native';

const Graficos = () => {
  const {
    control,
    reset,
    handleSubmit,
    getValues, // Añade esto
    formState: { errors },
} = useForm();
const [cantidad1, setCantidad1] = useState(0);
const [cantidad, setCantidad] = useState(0);
const [cargando, setCargando] = useState(false);
const [monto1, setMonto1] = useState('');
const [monto2, setMonto2] = useState('');
const [monto3, setMonto3] = useState('');
const [monto4, setMonto4] = useState('');
const [gfm, setGfm] = useState("");
const [mtms, setMtms] = useState("");
const [pvp, setPvp] = useState("");
const [ppxp, setPpxp] = useState("");

const Calcular = () => {
  setCargando(true);

  // const gastoFijoMensual2 = getValues('monto1');
  // const metaMensual2 = getValues('monto2');
  // const precioVentaProducto2 = getValues('monto3');

  const gastoFijoMensual = monto1 ? Number(monto1.replace(/,/g, '')) : 0;
  const metaMensual = monto2 ? Number(monto2.replace(/,/g, '')) : 0;
  const precioVentaProducto = monto2 ? Number(monto3.replace(/,/g, '')) : 0;
  const precioProduccionXProducto = monto4 ? Number(monto4.replace(/,/g, '')) : 0;

  const gfmFormatted = gastoFijoMensual.toLocaleString();
  const mtmsFormatted = metaMensual.toLocaleString();
  const pvpFormatted = precioVentaProducto.toLocaleString();
  const ppxpFormatted = precioProduccionXProducto.toLocaleString();

  if (!isNaN(gastoFijoMensual) && !isNaN(metaMensual) && !isNaN(precioVentaProducto) && !isNaN(precioProduccionXProducto)) {
    setCantidad1((gastoFijoMensual + metaMensual) / (precioVentaProducto - precioProduccionXProducto));
    setGfm(gfmFormatted);
    setMtms(mtmsFormatted);
    setPvp(pvpFormatted);
    setPpxp(ppxpFormatted);
  }

  setCargando(false);
};

const resetInputs = () => {
  reset({
    monto1: '',
    monto2: '',
    monto3: '',
    monto4: '',
  });
  setMonto1('');
  setMonto2('');
  setMonto3('');
  setMonto4('');
};

useFocusEffect(
  React.useCallback(() => {
    resetInputs();
    setCantidad1(0);
    setCantidad(0);
  }, [])
);

  useEffect(() => {
  // Verificar si setCantidad1 es un número antes de redondear
  if (!isNaN(cantidad1)) {
    setCantidad(Math.round(cantidad1));
  }
}, [cantidad1]);

const onConfirm = () => {
  const values = getValues();
  const monto1 = values.monto1 ? Number(values.monto1.replace(/,/g, '')) : 0;
  const monto2 = values.monto2 ? Number(values.monto2.replace(/,/g, '')) : 0;
  const monto3 = values.monto3 ? Number(values.monto3.replace(/,/g, '')) : 0;
  const monto4 = values.monto4 ? Number(values.monto4.replace(/,/g, '')) : 0;
  Alert.alert(
    'Confirmar Calculo',
    `Gasto Mensual $${monto1.toLocaleString()}
    Meta Mensual: $${monto2.toLocaleString()}
    Precio de venta x Unidad: $${monto3.toLocaleString()}
    idConcepto: $${monto4.toLocaleString()}`,
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Ingresar',
        onPress: () => {
          Calcular();
          resetInputs();
        },
        style: 'destructive',
      },
    ],
    { cancelable: false }
  );
};
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerSuperior}>
          <Text style={{fontFamily:'Roboto-Medium', fontSize:30, color:colores.color7, textAlign:'center'}}>{`Lista De Gastos`}</Text>
      </View> 
      <ScrollView>
      {
        cargando ==true ? 
        (
          <SplashScreens/>
      ):(
        <>
        <View 
            style={{paddingBottom:30, marginHorizontal:20, marginTop:20}}
            >
              <View>
                <Text style={styles.txt}>Gasto fijo mensual:<Text style={{color:'red'}}>*</Text></Text>
                <Imputs
                            imagen={require('../../assets/iconos/dolar.png')}
                            name="monto1"
                            placeholder=" Ingrese el monto"
                            datos={monto1}
                            setDatos={setMonto1}
                            control={control}
                            rules={{
                                required: 'El Nombre es obligatorio',
                            }}
                            // margin={50}
                        />
                {/* <Imput2
                imagen={require('../../assets/iconos/dolar.png')}
                          name="monto1"
                          placeholder=" Ingrese el monto"
                          control={control}
                          rules={{
                              required: 'Monto de ingreso requerido',
                          }}
                          keyboardType='numeric'
                      /> */}
              </View>
                <Text style={styles.txt}>Meta de ganancia mensual:<Text style={{color:'red'}}>*</Text></Text>
                <Imputs
                            imagen={require('../../assets/iconos/dolar.png')}
                            name="monto2"
                            placeholder=" Ingrese el monto"
                            datos={monto2}
                            setDatos={setMonto2}
                            control={control}
                            rules={{
                                required: 'El Nombre es obligatorio',
                            }}
                            // margin={50}
                        />
                {/* <Imput2
                imagen={require('../../assets/iconos/dolar.png')}
                          name="monto2"
                          placeholder=" Ingrese el monto"
                          control={control}
                          rules={{
                              required: 'Monto de ingreso requerido',
                          }}
                          keyboardType='numeric'
                      /> */}
                <Text style={styles.txt}>Precio de venta unitaria:<Text style={{color:'red'}}>*</Text></Text>
                <Imputs
                            imagen={require('../../assets/iconos/dolar.png')}
                            name="monto3"
                            placeholder=" Ingrese el monto"
                            datos={monto3}
                            setDatos={setMonto3}
                            control={control}
                            rules={{
                                required: 'El Nombre es obligatorio',
                            }}
                            // margin={50}
                        />
                {/* <Imput2
                imagen={require('../../assets/iconos/dolar.png')}
                          name="monto3"
                          placeholder=" Ingrese el monto"
                          control={control}
                          rules={{
                              required: 'Monto de ingreso requerido',
                          }}
                          keyboardType='numeric'
                      /> */}
                <Text style={styles.txt}>Costo de produccion unitario:<Text style={{color:'red'}}>*</Text></Text>
                <Imputs
                            imagen={require('../../assets/iconos/dolar.png')}
                            name="monto4"
                            placeholder=" Ingrese el monto"
                            datos={monto4}
                            setDatos={setMonto4}
                            control={control}
                            rules={{
                                required: 'El Nombre es obligatorio',
                            }}
                            // margin={50}
                        />
                      {
                        cantidad > 0 ? (
                          <>
                          <Text style={styles.txtInfomativo}>Teniendo en cuenta la operacion general para hayar la cantidad de productos que 
                            necesitas vender para poder suplir tu negocio y además tener las ganancias especificadas 
                          </Text>
                          <Text style={styles.txtInfomativo}>Debes vender:</Text>
                          <Text style={{fontSize:30, color:colores.color4}}>{cantidad}</Text>
                          </>
                        ):(<></>)
                      }
        </View>
        <Botones 
        name='Consultar'
        funcion={handleSubmit(onConfirm)}
        margin={100}/>
        </>
        
      )
      }
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default Graficos

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: colores.color6,
  },
  containerSuperior:{
    //flexDirection:'row',
    backgroundColor:colores.color5,
    alignItems:'center',
    justifyContent:'center',
    height:100
},
  closeButton: {
    position: 'absolute',
    top: 7,
    right: 12,
    padding: 10,
  },
modal: {
    flex:1,
    backgroundColor: colores.color6,
    justifyContent:'flex-start'
  },
  modalView: {
    marginHorizontal: 20,
    marginVertical:100,
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
    elevation: 20,
    backgroundColor: colores.color8,
    height:400
},
txtTitulo:{
  paddingVertical:20,
  fontFamily:'Roboto-Bold',
  fontSize:30,
  color:colors.color1,
  textAlign:'center'
},
txt:{
  color:colores.color9,
  fontFamily:'Roboto-Regular',
  fontSize:15,
  paddingBottom:5
},
txtInfomativo:{
  marginTop:20,
  fontSize:15, 
  fontFamily:'Roboto-Regular', 
  color:colores.color9,
}
})