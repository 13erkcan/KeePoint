import React, { useState, useCallback } from "react";
import { BackHandler, View, StatusBar, TouchableOpacity, TextInput, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";

const SigninScreen = () => {

    const navigation = useNavigation();

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => {
                BackHandler.removeEventListener("hardwareBackPress", backAction);
            };
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        showPassword: false,
        userName: null,
        password: null,
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        showPassword,
        userName,
        password,
        backClickCount,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        paddingTop: 160
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {signinInfo()}
                </ScrollView>
                {cornerImage()}
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={styles.animatedView}>
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </View>
    )

    function signinInfo() {
        return (
            <View>
                <MaskedView
                    style={{ flex: 1, height: 35, }}
                    maskElement={
                        <Text style={{ textAlign: 'center', ...Fonts.bold30, }}>
                            SIGN IN
                        </Text>
                    }
                >
                    <LinearGradient
                        start={{ x: 1, y: 0.2 }}
                        end={{ x: 1, y: 1 }}
                        colors={['rgba(255, 124, 0,1)', 'rgba(41, 10, 89, 1)']}
                        style={{ flex: 1 }}
                    />
                </MaskedView>
                {userNameTextField()}
                {passwordTextField()}
                {signinButton()}
                {orIndicator()}
                {socialMediaOptions()}
                {dontHaveAccountInfo()}
            </View>
        )
    }

    function dontHaveAccountInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginRight: Sizes.fixPadding + 5.0, ...Fonts.blackColor13SemiBold }}>
                        Don't have an account ?
                    </Text>
                    <TouchableOpacity
                        style={{ flex: 0.3 }}
                        activeOpacity={0.9}
                        onPress={() => navigation.push('auth/signupScreen')}
                    >
                        <MaskedView
                            style={{ flex: 0.3, height: 18, }}
                            maskElement={
                                <Text style={{ ...Fonts.blackColor13Bold }}>
                                    sign up
                                </Text>
                            }
                        >
                            <LinearGradient
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}
                                colors={[
                                    'rgba(255, 124, 0,1)',
                                    'rgba(255, 124, 0,1)',
                                    'rgba(41, 10, 89, 0.9)'
                                ]}
                                style={{ flex: 1 }}
                            />
                        </MaskedView >
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

    function socialMediaOptions() {
        return (
            <View style={styles.socialMediaIconsWrapStyle}>
                <View style={{ backgroundColor: '#4267B2', ...styles.socialMediaIconsStyle }}>
                    <Image
                        source={require('../../assets/images/icon/facebook-icon.png')}
                        style={{ width: 15.0, height: 15.0 }}
                        resizeMode="contain"
                    />
                </View>

                <View style={{
                    backgroundColor: '#EA4335',
                    ...styles.socialMediaIconsStyle,
                    marginHorizontal: Sizes.fixPadding - 5.0,
                }}>
                    <Image
                        source={require('../../assets/images/icon/google-icon.png')}
                        style={{ width: 15.0, height: 15.0 }}
                        resizeMode="contain"
                    />
                </View>
                <View style={{
                    backgroundColor: '#00A1F2',
                    ...styles.socialMediaIconsStyle,
                }}>
                    <Image
                        source={require('../../assets/images/icon/twitter-icon.png')}
                        style={{ width: 15.0, height: 15.0 }}
                        resizeMode="contain"
                    />
                </View>
            </View>
        )
    }

    function orIndicator() {
        return (
            <View style={styles.orWrapStyle}>
                <View
                    style={{ flex: 1, backgroundColor: '#D5D5D5', height: 1.5, }}
                />
                <Text style={{
                    marginHorizontal: Sizes.fixPadding,
                    ...Fonts.grayColor12SemiBold
                }}>
                    Or sign in with
                </Text>
                <View
                    style={{ flex: 1, backgroundColor: '#D5D5D5', height: 1.5, }}
                />
            </View>
        )
    }

    function signinButton() {
        return (
            <TouchableOpacity
                style={styles.signinButtonStyle}
                activeOpacity={0.9}
                onPress={() => navigation.push('auth/signupScreen')}
            >
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={[
                        'rgba(255, 124, 0,1)',
                        'rgba(41, 10, 89, 0.9)',
                    ]}
                    style={styles.signinButtonGradientStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18Bold }}>
                        SIGN IN
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    function passwordTextField() {
        return (
            <View style={styles.passwordTextFieldWrapstyle}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <MaterialIcons
                        name="lock-open"
                        size={20}
                        color={Colors.grayColor}
                    />
                    <TextInput
                        value={password}
                        onChangeText={(text) => updateState({ password: text })}
                        secureTextEntry={showPassword}
                        selectionColor={Colors.grayColor}
                        placeholder='Password'
                        placeholderTextColor={Colors.grayColor}
                        style={{
                            flex: 1,
                            ...Fonts.blackColor13Bold,
                            marginLeft: Sizes.fixPadding,
                        }}
                    />

                </View>
                <MaterialCommunityIcons
                    name={showPassword ? 'eye-outline' : "eye-off-outline"}
                    color={Colors.grayColor}
                    size={20}
                    onPress={() => updateState({ showPassword: !showPassword })}
                />
            </View>
        )
    }

    function userNameTextField() {
        return (
            <View style={styles.userNameTextFieldWrapStyle}>
                <MaterialIcons
                    name="person"
                    color={Colors.grayColor}
                    size={20}
                />
                <TextInput
                    value={userName}
                    onChangeText={(text) => updateState({ userName: text })}
                    selectionColor={Colors.grayColor}
                    placeholder="User Name"
                    placeholderTextColor={Colors.grayColor}
                    style={{
                        marginLeft: Sizes.fixPadding,
                        flex: 1,
                        ...Fonts.blackColor14Bold
                    }}
                />
            </View>
        )
    }

    function cornerImage() {
        return (
            <Image
                source={require('../../assets/images/corner-design.png')}
                style={styles.cornerImageStyle}
            />
        )
    }
}

const styles = StyleSheet.create({
    cornerImageStyle: {
        width: '100%',
        height: 170,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 100
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    userNameTextFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 1.0,
        marginTop: Sizes.fixPadding * 2.5,
        marginBottom: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        ...CommonStyles.shadow
    },
    passwordTextFieldWrapstyle: {
        marginVertical: Sizes.fixPadding,
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        paddingVertical: Sizes.fixPadding + 1.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        ...CommonStyles.shadow
    },
    orWrapStyle: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    socialMediaIconsStyle: {
        width: 32.0,
        height: 32.0,
        borderRadius: 16.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialMediaIconsWrapStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    signinButtonGradientStyle: {
        paddingVertical: Sizes.fixPadding + 3.0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 5.0
    },
    signinButtonStyle: {
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.5,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0
    }
})

export default SigninScreen;