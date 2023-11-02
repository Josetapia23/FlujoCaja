import { StyleSheet} from 'react-native'
import React, { useContext } from 'react'
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
import Perfil from '../vistas/Perfil';
import Empresa from '../vistas/Empresa';

const Stack = createNativeStackNavigator();

const Navegacion = () => {
  const { tokenUsuario, splashLoading } = useContext(AuthContext)

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
                            <Stack.Screen name="Ingresos" component={Ingresos} options={{ headerShown: false,}}/>
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
                    }else if(route.name === 'Perfil'){
                        iconName = 'account-tie';
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
            <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
            <Tab.Screen name="Empresa" component={Empresa} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

export default Navegacion

const styles = StyleSheet.create({})