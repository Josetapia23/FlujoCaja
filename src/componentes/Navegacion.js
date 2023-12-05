import { StyleSheet} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {colores} from '../componentes/Colors';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../vistas/Home'
import Login from '../vistas/Login'
import Registro from '../vistas/Registro'
import { AuthContext } from '../context/AuthContext';
import SplashScreens from '../vistas/SplashScreens';
import Graficos from '../vistas/Graficos';
import Ingresos from '../vistas/Ingresos';
import Despliegue from '../vistas/Despliegue';
import Empresa from '../vistas/Empresa';
import Empresa3 from '../vistas/Empresa3';
import Gastos from '../vistas/Gastos';
import Historiales from '../vistas/Historiales';
import Historiales2 from '../vistas/Historiales2';

const Stack = createNativeStackNavigator();

const Navegacion = () => {
  const { tokenUsuario, splashLoading, tokenEmpresa } = useContext(AuthContext);
const [tokenEmpresa2, setTokenEmpresa2] = useState(null);
  
useEffect(()=>(
    setTokenEmpresa2(tokenEmpresa)
  ),[tokenEmpresa]);

    console.log("Este es el token empresa: ", tokenEmpresa2);
  return (
    <NavigationContainer>
        <Stack.Navigator >
        {splashLoading?
          <Stack.Screen name="SplashScreens" component={SplashScreens} options={{ headerShown: false,}}/>
          :
          tokenUsuario !== 1 ? (
                          <>
                              <Stack.Screen name="Login" component={Login} options={{ headerShown: false,}}/>
                              <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false,}}/>
                          </>
                      ) : (
                        <>
                            <Stack.Screen name="Home" component={TabGroup} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Graficos" component={Graficos} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Despliegue" component={Despliegue} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Empresa" component={Empresa} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Ingresos" component={Ingresos} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Gastos" component={Gastos} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Historiales" component={Historiales} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Historiales2" component={Historiales2} options={{ headerShown: false,}}/>
                          </> 
                      )
        }
        </Stack.Navigator>
    </NavigationContainer>
  )
}

//Tab
const Tab = createBottomTabNavigator(); //Instanciamos la clase createBottomTabNavigator en Tab

function TabGroup() {
    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconColor = focused ? colores.color5 : colores.color4; // Cambia el color del ícono según si está activo o inactivo

                    if (route.name === 'Inicio') {
                        iconName = 'home-outline';
                    }else if(route.name === 'Graficos'){
                      iconName = 'chart-areaspline';
                    }else if(route.name === 'Despliegue'){
                        iconName = 'currency-usd';
                    }else if(route.name === 'Empresa'){
                        iconName = 'domain';
                    }
                    // Retorna el componente de ícono
                    return <AntDesign name={iconName} size={35} color={iconColor} />;
                },
            })}
            tabBarOptions={{
                //activeTintColor: '#191970',  Color de ícono activo
                style: {
                    alignItems: 'center',
                },
            }}
        >
            
            <Tab.Screen name="Inicio" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Despliegue" component={Despliegue} options={{ headerShown: false }} />
            <Tab.Screen name="Graficos" component={Graficos} options={{ headerShown: false }} />
            <Tab.Screen name="Empresa" component={Empresa} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

export default Navegacion

const styles = StyleSheet.create({})