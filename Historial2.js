import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, Modal, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-modern-datepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const imgSenoIzquier = require('../../assets/iconos/senIzquierdo.png')
const imgSenoDerecho = require('../../assets/iconos/senDerecho.png')

const Historial2 = () => {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [date, setDate] = useState('');
    const [date2, setDate2] = useState('');
    const [datos, setDatos] = useState([]);
    const [activo, setActivo] = useState(false);
    const [idUser, setIdUser] = useState('');
    const [seno, setSeno] = useState('');
    const [sumaTiempo, setSumaTiempo] = useState('');
    const [cargando, setCargando] = useState(false);

    const getDatosSesion = async () => { //En esta funcion asincrona obtenemos la identificacion
        try {
            const id = await AsyncStorage.getItem('id');
            setIdUser(id || '0'); //Y se la seteamos a el state de ID para que cuando se ejecute la funcion de ingreso de datos ya tenga el id que se necesita enviar
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDatosSesion();  //Aqui se ejecuta la funcion de inmediato sin mirar las demas
    }, []);

    const ingresoDatos = async () => {
        setCargando(true); // Iniciar la carga
        try {
            const response = await axios.post("https://www.plataforma50.com/pruebas/Amamanta/historial4.php", {
                idUser: idUser,
                seno: seno,
                fecha1: date,
                fecha2: date2,
            });

            // Extrae la parte JSON de la respuesta
            const jsonStartIndex = response.data.indexOf('{"result":');
            if (jsonStartIndex !== -1) {
                const jsonResponse = response.data.substring(jsonStartIndex);
                const responseData = JSON.parse(jsonResponse);

                const result = responseData.result;
                const sumaTiempo = responseData.sumaTiempo;
                const registros = responseData.registros;

                console.log(result);
                console.log(sumaTiempo);
                console.log(registros);

                if (result === "success") {
                    setSumaTiempo(sumaTiempo);
                    setDatos(registros);
                } else {
                    console.log("Error en el resultado");
                }
            } else {
                console.log("Error: La respuesta no contiene un JSON válido");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setCargando(false); // Finalizar la carga
        }
    };



    const handleOnPress = () => {
        setOpen(!open);
    }
    const handleOnPress2 = () => {
        setOpen2(!open2);
    }
    function handleChange(fecha) {
        setDate(fecha)

    } function handleChange2(fecha) {
        setDate2(fecha)
    }


    const xx = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerIntroduccion}>
                <TouchableOpacity style={styles.iconoAtras}
                    onPress={() => { xx.navigate("Historial") }}>
                    <AntDesign name="left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.txtIntroduccion}>Historial</Text>
            </View>

            <View style={{ flex: 1, }}>
                <View style={{ flex: 40, alignItems: 'center' }}>
                    {cargando ? <Text style={{ color: 'black' }}>Cargando...</Text> : ''}
                    {datos.length > 0 && activo ?
                        (
                            <View >
                                <Text style={styles.txtInfo}>
                                    {`El tiempo total que ha amamantando al bebé con el seno ${seno} entre ${date} y ${date2} fue:`}
                                </Text>
                                <Text style={{ color: 'black', fontSize: 30, fontFamily: 'Roboto.Bold', textAlign: 'center' }}>{sumaTiempo}</Text>
                            </View>
                        ) :
                        (
                            <>
                                <View style={styles.containerImg}>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSeno('izquierdo')
                                                setActivo(true);

                                            }
                                            }
                                            style={[{ paddingLeft: 57 }]}
                                        >
                                            <Image
                                                style={styles.imagen}
                                                source={imgSenoIzquier}
                                            />
                                            <Text
                                                style={seno == 'izquierdo' ?
                                                    { textAlign: "center", fontSize: 20, color: '#000', fontWeight: '600', } :
                                                    { textAlign: "center", fontSize: 20, color: '#c6bdbd', fontWeight: '600', }}
                                            >
                                                IZQUIERDO</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSeno('derecho')
                                                setActivo(true);
                                            }
                                            }
                                            style={[{ paddingRight: 57 }]}
                                        >
                                            <Image
                                                style={styles.imagen2}
                                                source={imgSenoDerecho}
                                            />
                                            <Text
                                                style={seno == 'derecho' ?
                                                    { textAlign: "center", fontSize: 20, color: '#000', fontWeight: '600', } :
                                                    { textAlign: "center", fontSize: 20, color: '#c6bdbd', fontWeight: '600', }}
                                            >
                                                DERECHO</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={styles.txtInfo}>Presione el seno mediante el cual desea ver el historial de lactancia</Text>
                                <View style={{ flexDirection: 'row', paddingHorizontal: 90 }}>
                                    <View>
                                        <TouchableOpacity
                                            style={[styles.contenedorSubmit2]}
                                            onPress={handleOnPress}>
                                            <Text style={{ color: '#fff', fontSize: 20, padding: 3 }}>Fecha inicial</Text>
                                        </TouchableOpacity>
                                        <Text style={{ color: 'black', fontSize: 20, }}>{date}</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            style={[styles.contenedorSubmit2]}
                                            onPress={handleOnPress2}>
                                            <Text style={{ color: '#fff', fontSize: 20, padding: 3 }}>Fecha Final</Text>
                                        </TouchableOpacity>
                                        <Text style={{ color: 'black', fontSize: 20 }}>{date2}</Text>

                                    </View>
                                </View>
                                {
                                    seno != '' && date != '' && date2 != '' ?
                                        (
                                            <TouchableOpacity
                                                style={styles.contenedorSubmit}
                                                onPress={ingresoDatos}>
                                                <Text style={styles.txtInferiores}>
                                                    Consultar
                                                </Text>
                                            </TouchableOpacity>
                                        ) :
                                        (<View style={[styles.contenedorSubmit, { opacity: 0.7 }]}>
                                            <Text style={styles.txtInferiores}>
                                                Consultar
                                            </Text>
                                        </View>
                                        )
                                }

                            </>
                        )}
                </View>
                <View style={{ flex: 60 }}>
                    {datos.length > 0 ?
                        (
                            <>

                                <View style={styles.container2}>
                                    <Text style={[styles.header, { textAlign: 'center', fontSize: 20 }]}>Historial</Text>
                                    <View style={styles.row}>
                                        <Text style={[styles.cell, styles.header]}>Seno</Text>
                                        <Text style={[styles.cell, styles.header]}>Tiempo</Text>
                                        <Text style={[styles.cell, styles.header]}>Fecha</Text>
                                    </View>
                                    <FlatList
                                        data={datos}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={({ item }) => (
                                            <>
                                                <View style={styles.contenedorLista}>
                                                    <Text style={{ color: 'black', textTransform: 'lowercase' }}>{item.seno}</Text>
                                                    <Text style={{ color: 'black' }}>{item.tiempo}</Text>
                                                    <Text style={{ color: 'black' }}>{item.fecha}</Text>
                                                </View>
                                            </>
                                        )}
                                    />
                                </View>
                            </>
                        ) :
                        (
                            ''
                        )}
                </View>
                <Modal
                    visible={open}
                    animationType='slide'
                    transparent={true}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <DatePicker
                                mode='calendar'
                                selected={date}
                                onDateChange={handleChange}
                            />
                            <TouchableOpacity
                                style={styles.contenedorSubmit}
                                onPress={handleOnPress}>
                                <Text style={styles.txtInferiores}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={open2}
                    animationType='slide'
                    transparent={true}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <DatePicker
                                mode='calendar'
                                selected={date2}
                                onDateChange={handleChange2}
                            />
                            <TouchableOpacity
                                style={styles.contenedorSubmit}
                                onPress={handleOnPress2}>
                                <Text style={styles.txtInferiores}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export default Historial2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerIntroduccion: {
        backgroundColor: '#ffadc6',
        height: 130,
        marginBottom: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        display: 'flex',
    },
    iconoAtras: {
        alignItems: 'flex-start',
        marginTop: 70,
        marginLeft: 30,

    },
    txtIntroduccion: {
        fontSize: 30,
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginRight: 130,
        marginLeft: 80,
        //marginHorizontal:80,
        fontWeight: '600',
    },

    contenedorCards2: {
        justifyContent: 'space-between',
        paddingLeft: 50,
        paddingRight: 20,
        paddingVertical: 50,
        alignItems: 'center',
        height: 600,
    },
    imagen: {
        width: 140,
        height: 250,
        marginTop: 30,
        marginBottom: 5,
        objectFit: 'fill',
    },
    imagen2: {
        width: 140,
        height: 250,
        marginTop: 30,
        marginBottom: 5,
        //transform:[{scaleX:-1}],
        objectFit: 'fill',
    },
    containerImg: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    container2: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    contenedorLista: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF0F7',
        color: 'black'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ffadc6',
        color: 'black'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    modalView: {
        margin: 20,
        borderBlockColor: '#FFF0F7',
        borderRadius: 20,
        width: '90%',
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#FFF'
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
    header: {
        fontFamily: 'Roboto-Bold',
        color: 'black',
        textTransform: 'uppercase'
    },
    txtInfo: {
        color: '#6A71B9',
        opacity: 0.7,
        fontFamily: 'Poppins-Medium',
        paddingHorizontal: 50,
        paddingTop: 30,
        paddingBottom: 50,
        textAlign: 'center',
        fontSize: 20
    },
    contenedorSubmit: {
        marginTop: 20,
        backgroundColor: '#6A71B9',
        textAlign: 'center',
        borderRadius: 10,
        marginHorizontal: 8
    },
    txtInferiores: {
        padding: 10,
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        padding: 10
    },
    contenedorSubmit2: {
        backgroundColor: '#ffadc6',
        textAlign: 'center',
        borderRadius: 10,
        marginHorizontal: 8,
    }

})