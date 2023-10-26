import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colores, colors } from "../componentes/Colors";

const SplashScreens = () => {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', backgroundColor: colores.color5 }}>
            <ActivityIndicator size="large" color={colores.color3} />
        </View>
    )
}

export default SplashScreens;