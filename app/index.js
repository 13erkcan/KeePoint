import React from "react";
import { View, Text, StatusBar, Image, ImageBackground } from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "expo-router";

const SplashScreen = () => {

    const navigation = useNavigation();

    setTimeout(() => {
        navigation.push('auth/signinScreen');
    }, 2000);

    return (
        <View style={{ flex: 1, }}>
            <StatusBar backgroundColor={Colors.secondaryColor} barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <LinearGradient
                    start={{ x: 1, y: 0.2 }}
                    end={{ x: 1, y: 1 }}
                    colors={['rgba(255, 124, 0,1)', 'rgba(41, 10, 89, 1)']}
                    style={{ flex: 1 }}
                >
                    <ImageBackground
                        source={require('.././assets/images/bg.png')}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Image
                            source={require('../assets/images/white-logo.png')}
                            style={{ height: 150.0, width: '100%' }}
                        />
                        <Text style={{ marginTop: Sizes.fixPadding - 60.0 }}>
                            <Text style={{ ...Fonts.whiteColor35Bold }}>
                                Music
                            </Text>
                            <Text style={{ ...Fonts.whiteColor15Bold }}>
                                {` `}of you
                            </Text>
                        </Text>
                    </ImageBackground>
                </LinearGradient>
            </View>
        </View>
    )
}

export default SplashScreen;