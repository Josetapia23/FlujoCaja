import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colores, colors } from "../componentes/Colors";

const SplashScreens = () => {
    return (
        <View
            style={{ flex: 1, 
            justifyContent: 'center', 
            backgroundColor: colores.color6, 
            alignItems:'center', 
            flexDirection:'column'
            }}>
            <ActivityIndicator size="large" color={colores.color4} />
        </View>
    )
}

export default SplashScreens;