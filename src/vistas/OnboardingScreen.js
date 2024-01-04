import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const lottie = require('../../assets/gif/Animation_3.json')

const OnboardingScreen = () => {
    const navegacion = useNavigation();
    const handleDone=()=>{
        navegacion.navigate('Login');
    }
  return (
    <View style={styles.container}>
      <Onboarding
      onDone={handleDone}
      containerStyles={{paddingHorizontal:15}}
        pages={[
            {
            backgroundColor: '#fff',
            image:(
                <View style={styles.lottie}>
                        <LottieView source={lottie} autoPlay loop />
                </View>
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
                backgroundColor: '#fff',
                image:(
                    <View>
                        <LottieView source={lottie} autoPlay loop />
                    </View>
                ),
                title: 'Onboarding',
                subtitle: 'Done with React Native Onboarding Swiper',
                },
        ]}
        />
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    lottie:{
        width:300,
        height:300
    }
})