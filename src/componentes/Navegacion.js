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
import Empresa3 from '../vistas/Empresa3';
import Gastos from '../vistas/Gastos';
import Historiales from '../vistas/Historiales';
import Historiales2 from '../vistas/Historiales2';
import OnboardingScreen from '../vistas/OnboardingScreen';
import Logout from '../vistas/Logout';
import Company from '../vistas/Company';
import Perfil from '../vistas/Perfil';
import GestionIng from '../vistas/GestionIng';
import GestionGast from '../vistas/GestionGast';
import SplashScreen2 from '../vistas/SplashScreen2';
import SplashScreen3 from '../vistas/SplashScreen3';
import Privacidad from '../vistas/Privacidad';
import TermYCondiciones from '../vistas/TermYCondiciones';

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
                              {/* <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false,}}/> */}
                              {/* <Stack.Screen  name='SplashScreen2' component={SplashScreen2} options={{ headerShown: false,}}/> */}
                              <Stack.Screen name="Login" component={Login} options={{ headerShown: false,}}/>
                              <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false,}}/>
                          </>
                      ) : (
                        <>
                            {/* <Stack.Screen name="SplashScreen3" component={SplashScreen3} options={{ headerShown: false,}}/> */}
                            <Stack.Screen name="Inicio" component={TabGroup} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false,}}/>
                            {/* <Stack.Screen name="Logout" component={TabGroup} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Home" component={Home} options={{ headerShown: false,}}/> */}
                            <Stack.Screen name="Graficos" component={Graficos} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Despliegue" component={Despliegue} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Ingresos" component={Ingresos} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Gastos" component={Gastos} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Historiales" component={Historiales} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Historiales2" component={Historiales2} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Company" component={Company} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false,}}/>
                            <Stack.Screen name="GesIng" component={GestionIng} options={{ headerShown: false,}}/>
                            <Stack.Screen name="GesGast" component={GestionGast} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Privacidad" component={Privacidad} options={{ headerShown: false,}}/>
                            <Stack.Screen name="Tyc" component={TermYCondiciones} options={{ headerShown: false,}}/>
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
                    }
                    if(route.name === 'Graficos'){
                      iconName = 'calculator-variant-outline';
                    }
                    if(route.name === 'Despliegue'){
                        iconName = 'currency-usd';
                    }
                    if(route.name === 'Logout'){
                        iconName = 'account-tie';
                    }
                    // Retorna el componente de ícono
                    return <AntDesign name={iconName} size={20} color={iconColor} />;
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
            <Tab.Screen name="Despliegue" component={Despliegue} options={{ headerShown: false, tabBarVisible: false }} />
            <Tab.Screen name="Graficos" component={Graficos} options={{ headerShown: false }} />
            <Tab.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

export default Navegacion

const styles = StyleSheet.create({})