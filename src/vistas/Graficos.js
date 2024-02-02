import { Alert, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colores, colors } from '../componentes/Colors'
import Tablas from '../componentes/Tablas';
import Imput2 from '../componentes/Imput2';
import Botones from '../componentes/Botones';
import { useForm } from 'react-hook-form';
import SplashScreens from './SplashScreens';
import { ScrollView } from 'react-native';
import Imputs from '../componentes/Imputs';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';


const numeros_regex = /^[0-9]{1,1000}$/;


const Graficos = () => {
  const {
    control,
    reset,
    handleSubmit,
    getValues, // Añade esto
    formState: { errors },
} = useForm();

const {userInfo} = useContext(AuthContext);
const [cantidad1, setCantidad1] = useState(0);
const [cantidad, setCantidad] = useState(0);
const [uXmes, setUXMes] = useState(0);
const [cargando, setCargando] = useState(false);
const [monto1, setMonto1] = useState('');
const [monto2, setMonto2] = useState('');
const [monto3, setMonto3] = useState('');
const [monto4, setMonto4] = useState('');
const [monto11, setMonto11] = useState('');
const [monto22, setMonto22] = useState('');
const [monto33, setMonto33] = useState('');
const [monto44, setMonto44]= useState('');
const [gfm, setGfm] = useState("");
const [mtms, setMtms] = useState("");
const [pvp, setPvp] = useState("");
const [ppxp, setPpxp] = useState("");
const [observacion, setObservacion] = useState('');
const idUser = userInfo.id;

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

// useFocusEffect(
//   React.useCallback(() => {
//     resetInputs();
//     setCantidad1(0);
//     setCantidad(0);
//   }, [])
// );

  useEffect(() => {
  // Verificar si setCantidad1 es un número antes de redondear
  if (!isNaN(cantidad1)) {
    setCantidad(Math.round(cantidad1));
  }
  setUXMes(cantidad/30);
}, [cantidad1]);

useEffect(() => {

  setUXMes(Math.round(cantidad/30));
}, [cantidad]);

let montoOne = 0;
let montoTwo = 0;
let montoThree = 0;
let montoFour = 0;

const onConfirm = () => {
  const values = getValues();
  montoOne = values.monto1 ? Number(values.monto1.replace(/,/g, '')) : 0;
  montoTwo = values.monto2 ? Number(values.monto2.replace(/,/g, '')) : 0;
  montoThree = values.monto3 ? Number(values.monto3.replace(/,/g, '')) : 0;
  montoFour = values.monto4 ? Number(values.monto4.replace(/,/g, '')) : 0;

  //   
      setMonto11(montoOne);
  setMonto22(montoTwo);
  setMonto33(montoThree);
  setMonto44(montoFour);
  setObservacion(`En el mes debes vender
   un total de ${cantidad} unidades 
   es decir alrededor de ${uXmes} por dia para obtener
   la meta de $${monto22.toLocaleString()} y cubir los gastos fijos del mes`);
  //   
  

  Alert.alert(
    'Confirmar Calculo',
    `Gasto Mensual $${montoOne.toLocaleString()}
    Meta Mensual: $${montoTwo.toLocaleString()}
    Precio de venta x Unidad: $${montoThree.toLocaleString()}
    Costo de Produccion: $${montoFour.toLocaleString()}`,
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Ingresar',
        onPress: () => {
          Calcular();
          //resetInputs();
        },
        style: 'destructive',
      },
    ],
    { cancelable: false }
  );


  const addMontos = () => {
    setCargando(true);
    return new Promise((resolve, reject) => {
      axios
        .post(
          'http://10.1.80.103/flujoCaja/addRentabilidad.php',
          {
            gastoMensual: monto1, //De esta forma obtengo el valor de lo que tenga el imput con name:'nombre'
            gananciaMensual: monto2,
            ventaPorUnidad: monto3,
            costoPorUnidad:monto4,
            observacion: observacion,
            idUser: idUser,
          },
        )
        .then(res => {
          if (res.data.result === 'success2') {
            setVisible2(false);
            setErrorNombre('');
            console.log('Monto registrado exitosamente');
            reset({ monto: '' }); // Esto reseteará el campo 'nombre' del formulario
            resolve('Registro exitoso');
            setCargando(false);
          }else {
            // Otro caso no manejado
            setErrorNombre('');
            console.log('Respuesta inesperada del servidor:', res.data);
            reject('Error inesperado del servidor');
            setCargando(false);

          }
        })
        .catch(error => {
          console.error('Error al registrar usuario con axios:', error.message);
          reject('Error al registrar usuario con axios: ' + error.message);
            setCargando(false);

        });
    });
  };

};
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerSuperior}>
          <Text style={{lineHeight:30 ,fontFamily:'Roboto-Medium', fontSize:20, color:colores.color7, textAlign:'center', marginHorizontal:20}}>{`Rentabilidad Emprendedora \n Mensual`}</Text>
      </View> 
      <ScrollView>
      {
        cargando ==true ? 
        (
          <SplashScreens/>
      ):(
        <>
        <View 
            style={{paddingBottom:30, marginHorizontal:20, marginVertical:20}}
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
                              pattern:
                                {
                                    value: numeros_regex,
                                    message: "Caracter No Permitido"
                                },
                                required: 'El monto de gasto mensual es obligatorio',
                            }}
                            keyboardType='numeric'
                            // margin={50}
                        />
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
                              pattern:
                                {
                                    value: numeros_regex,
                                    message: "Caracter No Permitido"
                                },
                                required: 'El monto de ganancia mensual es obligatorio',
                            }}
                            keyboardType='numeric'
                            // margin={50}
                        />
                <Text style={styles.txt}>Precio de venta unitaria:<Text style={{color:'red'}}>*</Text></Text>
                <Imputs
                            imagen={require('../../assets/iconos/dolar.png')}
                            name="monto3"
                            placeholder=" Ingrese el monto"
                            datos={monto3}
                            setDatos={setMonto3}
                            control={control}
                            rules={{
                              pattern:
                                {
                                    value: numeros_regex,
                                    message: "Caracter No Permitido"
                                },
                                required: 'El monto de venta es obligatorio',
                            }}
                            keyboardType='numeric'
                            // margin={50}
                        />
                <Text style={styles.txt}>Costo de produccion unitario:<Text style={{color:'red'}}>*</Text></Text>
                <Imputs
                            imagen={require('../../assets/iconos/dolar.png')}
                            name="monto4"
                            placeholder=" Ingrese el monto"
                            datos={monto4}
                            setDatos={setMonto4}
                            control={control}
                            rules={{
                              pattern:
                                {
                                    value: numeros_regex,
                                    message: "Caracter No Permitido"
                                },
                                required: 'El costo de inversion unitario es obligatorio',
                            }}
                            keyboardType='numeric'
                            // margin={50}
                        />
                      {
                        cantidad > 0 ? (
                          <View style={{backgroundColor:colores.color8, justifyContent:'center', borderRadius:10, alignItems:'center', padding:7}}>
                              <Text style={{textAlign:'center'}}>
                                  <Text style={styles.txtInfomativo}>
                                    {`En el mes debes vender un total de `} 
                                  </Text>
                                  <Text style={styles.txtInfomativo2}>
                                    {`${cantidad}`} 
                                  </Text>
                                  <Text style={styles.txtInfomativo}>
                                    {` unidades es decir alrededor de `} 
                                  </Text>
                                  <Text style={styles.txtInfomativo2}>
                                    {`${uXmes}`} 
                                  </Text>
                                  <Text style={styles.txtInfomativo}>
                                    {` por dia para obetener la meta de: `} 
                                  </Text>
                                  <Text style={styles.txtInfomativo2}>
                                    {`$${monto22.toLocaleString()}`} 
                                  </Text>
                                  <Text style={styles.txtInfomativo}>
                                    {` y cubrir los gastos fijos del mes.`} 
                                  </Text>
                              </Text>
                          </View>
                        ):(<>

                        </>)
                      }
                <Botones 
                name='Consultar'
                funcion={handleSubmit(onConfirm)}
                margin={100}/>
        </View>
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
    shadowColor: colores.color5,
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
  fontSize:18, 
  fontFamily:'Roboto-Regular', 
  color:colores.color9,
},
txtInfomativo2:{
  marginTop:20,
  fontSize:18, 
  fontFamily:'Roboto-Bold', 
  color:colores.color9,
}
})