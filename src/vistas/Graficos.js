import { Alert, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colores, colors } from '../componentes/Colors'
import Tablas from '../componentes/Tablas';
import Imput2 from '../componentes/Imput2';
import Botones from '../componentes/Botones';
import { useForm } from 'react-hook-form';
import SplashScreens from './SplashScreens';

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



  // const gastoFijoMensual2 = getValues('monto1'); //Montos Obtenidos
  // const metaMensual2 = getValues('monto2');
  // const precioVentaProducto2 = getValues('monto3');
  // const precioProduccionXProducto2 = getValues('monto4');

  // //Aqui los formateo a todos los string obtenidos del formulario
  // const gastoFijoMensual = gastoFijoMensual2 ? Number(gastoFijoMensual2.replace(/,/g, '')) : 0;
  // const metaMensual = metaMensual2 ? Number(metaMensual2.replace(/,/g, '')) : 0;
  // const precioVentaProducto = precioVentaProducto2 ? Number(precioVentaProducto2.replace(/,/g, '')) : 0;
  // const precioProduccionXProducto = precioProduccionXProducto2 ? Number(precioProduccionXProducto2.replace(/,/g, '')) : 0;

  //
  // const gfm = gastoFijoMensual.toLocaleString();
  // const mtms = metaMensual.toLocaleString();
  // const pvp = precioVentaProducto.toLocaleString();
  // const ppxp = precioProduccionXProducto.toLocaleString();

  const Calcular = () =>{
    setCargando(true);

    const gastoFijoMensual2 = getValues('monto1');
    const metaMensual2 = getValues('monto2');
    const precioVentaProducto2 = getValues('monto3');
    const precioProduccionXProducto2 = getValues('monto4');

    const gastoFijoMensual = gastoFijoMensual2 ? Number(gastoFijoMensual2.replace(/,/g, '')) : 0;
    const metaMensual = metaMensual2 ? Number(metaMensual2.replace(/,/g, '')) : 0;
    const precioVentaProducto = precioVentaProducto2 ? Number(precioVentaProducto2.replace(/,/g, '')) : 0;
    const precioProduccionXProducto = precioProduccionXProducto2 ? Number(precioProduccionXProducto2.replace(/,/g, '')) : 0;

    const gfm = gastoFijoMensual.toLocaleString();
    const mtms = metaMensual.toLocaleString();
    const pvp = precioVentaProducto.toLocaleString();
    const ppxp = precioProduccionXProducto.toLocaleString();

    if (!isNaN(gastoFijoMensual) && !isNaN(metaMensual) && !isNaN(precioVentaProducto) && !isNaN(precioProduccionXProducto)) {
      setCantidad1((gastoFijoMensual + metaMensual) / (precioVentaProducto - precioProduccionXProducto));
    }    
    
    setCargando(false);
  }

  useEffect(() => {
  // Verificar si setCantidad1 es un número antes de redondear
  if (!isNaN(cantidad1)) {
    setCantidad(Math.round(cantidad1));
  }
}, [cantidad1]);

const AlertaMonto = () =>{
  Alert.alert(
    'Confirmar Calculo',
    `Gasto Mensual $${gfm}
    Meta Mensual: $${mtms}
    Precio de venta x Unidad: $${pvp}
    idConcepto: $${ppxp}`,
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Ingresar',
        onPress: () => Calcular(),
        style: 'destructive',
      },
    ],
    { cancelable: false }
  );
}
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txtTitulo}>{`Calculos `}</Text>
      {
        cargando ==true ? 
        (
          <SplashScreens/>
      ):(
        <>
        <View 
            style={{paddingBottom:30, marginHorizontal:20}}
            >
              <View>
                <Text style={styles.txt}>Gasto fijo mensual:<Text style={{color:'red'}}>*</Text></Text>
                <Imput2
                imagen={require('../../assets/iconos/dolar.png')}
                          name="monto1"
                          placeholder=" Ingrese el monto"
                          control={control}
                          rules={{
                              required: 'Monto de ingreso requerido',
                          }}
                          keyboardType='numeric'
                      />
                <Text style={styles.txt}>Meta de ganancia mensual:<Text style={{color:'red'}}>*</Text></Text>
              </View>
                <Imput2
                imagen={require('../../assets/iconos/dolar.png')}
                          name="monto2"
                          placeholder=" Ingrese el monto"
                          control={control}
                          rules={{
                              required: 'Monto de ingreso requerido',
                          }}
                          keyboardType='numeric'
                      />
                <Text style={styles.txt}>Precio de venta unitaria:<Text style={{color:'red'}}>*</Text></Text>
                <Imput2
                imagen={require('../../assets/iconos/dolar.png')}
                          name="monto3"
                          placeholder=" Ingrese el monto"
                          control={control}
                          rules={{
                              required: 'Monto de ingreso requerido',
                          }}
                          keyboardType='numeric'
                      />
                <Text style={styles.txt}>Costo de produccion unitario:<Text style={{color:'red'}}>*</Text></Text>
                <Imput2
                imagen={require('../../assets/iconos/dolar.png')}
                          name="monto4"
                          placeholder=" Ingrese el monto"
                          control={control}
                          rules={{
                              required: 'Monto de ingreso requerido',
                          }}
                          keyboardType='numeric'
                      />
                      {
                        cantidad > 0 ? (
                          <>
                          <Text>Teniendo en cuenta la operacion general para hayar la cantidad de productos que 
                            necesitas vender para poder suplir tu negocio y además tener las ganancias especificadas 
                          </Text>
                          <Text>Debes vender:</Text>
                          <Text style={{fontSize:30}}>{cantidad}</Text>
                          </>
                        ):(<></>)
                      }
        </View>
        <Botones 
        name='Guardar'
        funcion={handleSubmit(AlertaMonto)}
        margin={100}/>
        </>
        
      )
      }
    </SafeAreaView>
  )
}

export default Graficos

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: colores.color6,
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
})