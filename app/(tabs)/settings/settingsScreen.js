import React, { useState } from "react";
import { Dimensions, TextInput, View, Modal, ScrollView, StatusBar, TouchableOpacity, Image, Text, StyleSheet, ImageBackground, Platform, KeyboardAvoidingView } from "react-native";
import { Colors, Fonts, Sizes } from "../../../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Switch } from 'react-native-paper';
import { Slider } from '@miblanchard/react-native-slider';
import { useNavigation } from "expo-router";

const { width } = Dimensions.get('window');

const SettingsScreen = () => {

    const navigation = useNavigation();

    const [state, setState] = useState({
        email: 'music@gmail.com',
        password: '••••••••••',
        sleepTime: false,
        musicQuality: 80,
        autoPlay: false,
        audioNormalization: true,
        smartVolume: false,
        musicFromLock: true,
        skipSlienceBetweenTracks: false,
        musicWithScreenOff: true,
        darkMode: false,
        playBackWhenDeviceConnect: true,
        facebookConnection: true,
        twitterConnection: false,
        instagramConnection: true,
        showEmailDialog: false,
        editableEmail: 'music@gmail.com',
        showPasswordDialog: false,
        oldPassword: null,
        newPassord: null,
        confirmPassword: null,
        showLogoutDialog: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        email,
        password,
        sleepTime,
        musicQuality,
        autoPlay,
        audioNormalization,
        smartVolume,
        musicFromLock,
        skipSlienceBetweenTracks,
        musicWithScreenOff,
        darkMode,
        playBackWhenDeviceConnect,
        facebookConnection,
        twitterConnection,
        instagramConnection,
        showEmailDialog,
        editableEmail,
        showPasswordDialog,
        oldPassword,
        newPassord,
        confirmPassword,
        showLogoutDialog,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: 170.0,
                        paddingBottom: Sizes.fixPadding * 6.0,
                    }}
                >
                    {header()}
                    {userAccountInfo()}
                    {divider()}
                    {upgradePremiumButton()}
                    {playBackInfo()}
                    {divider()}
                    {generalInfo()}
                    {divider()}
                    {connectionsInfo()}
                    {divider()}
                    {logoutText()}
                </ScrollView>
                {cornerImage()}
            </View>
            {editEmailDialog()}
            {editPasswordDialog()}
            {logoutDialog()}
        </View>
    )

    function logoutDialog() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showLogoutDialog}
                onRequestClose={() => {
                    updateState({ showLogoutDialog: false })
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        updateState({ showLogoutDialog: false });
                    }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={{ width: '80%', alignSelf: 'center' }}
                        >
                            <View style={styles.dialogWrapStyle}>
                                <Text style={{
                                    textAlign: 'center',
                                    ...Fonts.blackColor18Bold,
                                    paddingTop: Sizes.fixPadding * 2.0,
                                }}>
                                    Are you sure want to Logout?
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => updateState({ showLogoutDialog: false })}
                                        style={styles.cancelButtonStyle}
                                    >
                                        <Text style={{ ...Fonts.blackColor15Bold }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => {
                                            updateState({ showLogoutDialog: false })
                                            navigation.push('auth/signinScreen');
                                        }}
                                        style={styles.okButtonStyle}
                                    >
                                        <LinearGradient
                                            start={{ x: 1, y: 0 }}
                                            end={{ x: 0, y: 0 }}
                                            colors={[
                                                'rgba(255, 124, 0,1)',
                                                'rgba(41, 10, 89, 0.9)',
                                            ]}
                                            style={styles.okButtonGradientStyle}
                                        >
                                            <Text style={{ ...Fonts.whiteColor15Bold }}>
                                                Logout
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function editPasswordDialog() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPasswordDialog}
                onRequestClose={() => {
                    updateState({ showPasswordDialog: false })
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        updateState({ showPasswordDialog: false });
                    }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={{ justifyContent: "center", flex: 1 }}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={{ width: '80%', alignSelf: 'center' }}
                        >
                            <View style={styles.dialogWrapStyle}>
                                <Text style={{
                                    ...Fonts.blackColor18Bold,
                                    paddingVertical: Sizes.fixPadding * 2.0,
                                }}>
                                    Change Your Password
                                </Text>
                                <View style={{ width: '100%' }}>
                                    <TextInput
                                        secureTextEntry={true}
                                        placeholder="Old Password"
                                        placeholderTextColor={Colors.grayColor}
                                        selectionColor={Colors.primaryColor}
                                        value={oldPassword}
                                        onChangeText={(value) => updateState({ oldPassword: value })}
                                        style={styles.textFieldStyle}
                                    />
                                </View>
                                <View style={{ width: '100%' }}>
                                    <TextInput
                                        secureTextEntry={true}
                                        selectionColor={Colors.primaryColor}
                                        placeholder="New Password"
                                        placeholderTextColor={Colors.grayColor}
                                        value={newPassord}
                                        onChangeText={(value) => updateState({ newPassord: value })}
                                        style={{ marginVertical: Sizes.fixPadding, ...styles.textFieldStyle }}
                                    />
                                </View>
                                <View style={{ width: '100%' }}>
                                    <TextInput
                                        secureTextEntry={true}
                                        selectionColor={Colors.primaryColor}
                                        placeholder="Confirm New Password"
                                        placeholderTextColor={Colors.grayColor}
                                        value={confirmPassword}
                                        onChangeText={(value) => updateState({ confirmPassword: value })}
                                        style={styles.textFieldStyle}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => updateState({
                                            showPasswordDialog: false,
                                            oldPassword: null, newPassord: null, confirmPassword: null
                                        })}
                                        style={styles.cancelButtonStyle}
                                    >
                                        <Text style={{ ...Fonts.blackColor15Bold }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => {
                                            updateState({
                                                showPasswordDialog: false,
                                                oldPassword: null, newPassord: null, confirmPassword: null
                                            })
                                        }}
                                        style={styles.okButtonStyle}
                                    >
                                        <LinearGradient
                                            start={{ x: 1, y: 0 }}
                                            end={{ x: 0, y: 0 }}
                                            colors={[
                                                'rgba(255, 124, 0,1)',
                                                'rgba(41, 10, 89, 0.9)',
                                            ]}
                                            style={styles.okButtonGradientStyle}
                                        >
                                            <Text style={{ ...Fonts.whiteColor15Bold }}>
                                                Okay
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </TouchableOpacity>
            </Modal>
        )
    }

    function editEmailDialog() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showEmailDialog}
                onRequestClose={() => {
                    updateState({ showEmailDialog: false })
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        updateState({ showEmailDialog: false });
                    }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={{ justifyContent: "center", flex: 1 }}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={{ alignSelf: 'center', width: '80%', }}
                        >
                            <View style={styles.dialogWrapStyle}>
                                <Text style={{
                                    ...Fonts.blackColor18Bold,
                                    paddingVertical: Sizes.fixPadding * 2.0,
                                }}>
                                    Change Email
                                </Text>
                                <View style={{ width: '100%' }}>
                                    <TextInput
                                        selectionColor={Colors.primaryColor}
                                        value={editableEmail}
                                        onChangeText={(value) => updateState({ editableEmail: value })}
                                        style={styles.textFieldStyle}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => updateState({ showEmailDialog: false, editableEmail: email })}
                                        style={styles.cancelButtonStyle}
                                    >
                                        <Text style={{ ...Fonts.blackColor15Bold }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => {
                                            updateState({ showEmailDialog: false, email: editableEmail })
                                        }}
                                        style={styles.okButtonStyle}
                                    >
                                        <LinearGradient
                                            start={{ x: 1, y: 0 }}
                                            end={{ x: 0, y: 0 }}
                                            colors={[
                                                'rgba(255, 124, 0,1)',
                                                'rgba(41, 10, 89, 0.9)',
                                            ]}
                                            style={styles.okButtonGradientStyle}
                                        >
                                            <Text style={{ ...Fonts.whiteColor15Bold }}>
                                                Okay
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </TouchableOpacity>
            </Modal>
        )
    }

    function logoutText() {
        return (
            <Text
                onPress={() => updateState({ showLogoutDialog: true })}
                style={{
                    marginBottom: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    ...Fonts.redColor14SemiBold
                }}
            >
                Logout
            </Text>
        )
    }

    function connectionsInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor15Bold }}>
                    CONNECTIONS
                </Text>
                {facebookConnectionInfo()}
                {twitterConnectionInfo()}
                {instagramConnectionInfo()}
            </View>
        )
    }

    function instagramConnectionInfo() {
        return (
            <View style={styles.commonRowStyle}>
                <Text style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                    Instagram
                </Text>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 20,
                }}>
                    <Switch
                        trackColor={{ true: Colors.grayColor, false: Colors.grayColor }}
                        style={{ transform: [{ scale: Platform.OS == 'ios' ? 0.5 : 0.8 }] }}
                        color='#D81B60'
                        value={instagramConnection}
                        onValueChange={() => updateState({ instagramConnection: !instagramConnection })}
                        thumbColor={instagramConnection ? '#D81B60' : Colors.whiteColor}
                    />
                </View>
            </View>
        )
    }

    function twitterConnectionInfo() {
        return (
            <View style={styles.commonRowStyle}>
                <Text style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                    Twitter
                </Text>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 20,
                }}>
                    <Switch
                        trackColor={{ true: Colors.grayColor, false: Colors.grayColor }}
                        style={{ transform: [{ scale: Platform.OS == 'ios' ? 0.5 : 0.8 }] }}
                        color='#D81B60'
                        value={twitterConnection}
                        onValueChange={() => updateState({ twitterConnection: !twitterConnection })}
                        thumbColor={twitterConnection ? '#D81B60' : Colors.whiteColor}
                    />
                </View>
            </View>
        )
    }

    function facebookConnectionInfo() {
        return (
            <View style={styles.commonRowStyle}>
                <Text style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                    Facebook
                </Text>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 20,
                }}>
                    <Switch
                        trackColor={{ true: Colors.grayColor, false: Colors.grayColor }}
                        style={{ transform: [{ scale: Platform.OS == 'ios' ? 0.5 : 0.8 }] }}
                        color='#D81B60'
                        value={facebookConnection}
                        onValueChange={() => updateState({ facebookConnection: !facebookConnection })}
                        thumbColor={facebookConnection ? '#D81B60' : Colors.whiteColor}
                    />
                </View>
            </View>
        )
    }

    function generalInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor15Bold }}>
                    GENERAL
                </Text>
                {darkModeInfo()}
                {playBackWhenDeviceConnectInfo()}
            </View>
        )
    }

    function playBackWhenDeviceConnectInfo() {
        return (
            <View style={styles.commonRowStyle}>
                <Text style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                    Smart Playback When Devices Connect
                </Text>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 20,
                }}>
                    <Switch
                        trackColor={{ true: Colors.grayColor, false: Colors.grayColor }}
                        style={{ transform: [{ scale: Platform.OS == 'ios' ? 0.5 : 0.8 }] }}
                        color='#D81B60'
                        value={playBackWhenDeviceConnect}
                        onValueChange={() => updateState({ playBackWhenDeviceConnect: !playBackWhenDeviceConnect })}
                        thumbColor={playBackWhenDeviceConnect ? '#D81B60' : Colors.whiteColor}
                    />
                </View>
            </View>
        )
    }

    function darkModeInfo() {
        return (
            <View style={styles.commonRowStyle}>
                <Text style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                    Dark Mode
                </Text>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 20,
                }}>
                    <Switch
                        trackColor={{ true: Colors.grayColor, false: Colors.grayColor }}
                        style={{ transform: [{ scale: Platform.OS == 'ios' ? 0.5 : 0.8 }], }}
                        color='#D81B60'
                        value={darkMode}
                        onValueChange={() => updateState({ darkMode: !darkMode })}
                        thumbColor={darkMode ? '#D81B60' : Colors.whiteColor}
                    />
                </View>
            </View>
        )
    }

    function playBackInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor15Bold }}>
                    PLAYBACK
                </Text>
                {sleepTimeInfo()}
                {musicQualityInfo()}
                {autoPlayInfo()}
                {audioNormalizationInfo()}
                {SmartVolumeInfo()}
                {controlMusicFromLockInfo()}
                {skipSlienceBetweenTracksInfo()}
                {musicWithScreenOffInfo()}
            </View>
        )
    }

    function musicWithScreenOffInfo() {
        return (
            <View style={styles.commonRowStyle}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        Music With Screen Off
                    </Text>
                    <Text style={{ width: width - 125, ...Fonts.grayColor10Medium }}>
                        Connect headphones to listen to music while your screen is off.
                    </Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 20,
                }}>
                    <Switch
                        trackColor={{ true: Colors.grayColor, false: Colors.grayColor }}
                        style={{ transform: [{ scale: Platform.OS == 'ios' ? 0.5 : 0.8 }] }}
                        color='#D81B60'
                        value={musicWithScreenOff}
                        onValueChange={() => updateState({ musicWithScreenOff: !musicWithScreenOff })}
                        thumbColor={musicWithScreenOff ? '#D81B60' : Colors.whiteColor}
                    />
                </View>
            </View>
        )
    }

    function skipSlienceBetweenTracksInfo() {
        return (
            <View style={styles.commonRowStyle}>
                <Text style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                    Skip Slience Between Tracks
                </Text>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 20,
                }}>
                    <Switch
                        trackColor={{ true: Colors.grayColor, false: Colors.grayColor }}
                        style={{ transform: [{ scale: Platform.OS == 'ios' ? 0.5 : 0.8 }] }}
                        color='#D81B60'
                        value={skipSlienceBetweenTracks}
                        onValueChange={() => updateState({ skipSlienceBetweenTracks: !skipSlienceBetweenTracks })}
                        thumbColor={skipSlienceBetweenTracks ? '#D81B60' : Colors.whiteColor}
                    />
                </View>
            </View>
        )
    }

    function controlMusicFromLockInfo() {
        return (
            <View style={styles.commonRowStyle}>
                <Text style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                    Control Music From Loack Screen
                </Text>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 20,
                }}>
                    <Switch
                        trackColor={{ true: Colors.grayColor, false: Colors.grayColor }}
                        style={{ transform: [{ scale: Platform.OS == 'ios' ? 0.5 : 0.8 }] }}
                        color='#D81B60'
                        value={musicFromLock}
                        onValueChange={() => updateState({ musicFromLock: !musicFromLock })}
                        thumbColor={musicFromLock ? '#D81B60' : Colors.whiteColor}
                    />
                </View>
            </View>
        )
    }

    function SmartVolumeInfo() {
        return (
            <View style={styles.commonRowStyle}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...Fonts.blackColor14SemiBold, }}>
                        Smart Volume
                    </Text>
                    <Text style={{ ...Fonts.grayColor10Medium }}>
                        Automatically adjust each track to the same volume.
                    </Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 20,
                }}>
                    <Switch
                        trackColor={{ true: Colors.grayColor, false: Colors.grayColor }}
                        style={{ transform: [{ scale: Platform.OS == 'ios' ? 0.5 : 0.8 }] }}
                        color='#D81B60'
                        value={smartVolume}
                        onValueChange={() => updateState({ smartVolume: !smartVolume })}
                        thumbColor={smartVolume ? '#D81B60' : Colors.whiteColor}
                    />
                </View>
            </View>
        )
    }

    function audioNormalizationInfo() {
        return (
            <View style={styles.commonRowStyle}>
                <Text style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                    Audio Normalization
                </Text>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 20,
                }}>
                    <Switch
                        trackColor={{ true: Colors.grayColor, false: Colors.grayColor }}
                        style={{ transform: [{ scale: Platform.OS == 'ios' ? 0.5 : 0.8 }] }}
                        color='#D81B60'
                        value={audioNormalization}
                        onValueChange={() => updateState({ audioNormalization: !audioNormalization })}
                        thumbColor={audioNormalization ? '#D81B60' : Colors.whiteColor}
                    />
                </View>
            </View>
        )
    }

    function autoPlayInfo() {
        return (
            <View style={styles.commonRowStyle}>
                <Text style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                    Autoplay
                </Text>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 20,
                }}>
                    <Switch
                        trackColor={{ true: Colors.grayColor, false: Colors.grayColor }}
                        style={{ transform: [{ scale: Platform.OS == 'ios' ? 0.5 : 0.8 }] }}
                        color='#D81B60'
                        value={autoPlay}
                        onValueChange={() => updateState({ autoPlay: !autoPlay })}
                        thumbColor={autoPlay ? '#D81B60' : Colors.whiteColor}
                    />
                </View>
            </View>
        )
    }

    function musicQualityInfo() {
        return (
            <>
                <View style={styles.commonRowStyle}>
                    <Text style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                        Music Quality
                    </Text>
                    <Text style={{ ...Fonts.grayColor12SemiBold }}>
                        HIGH
                    </Text>
                </View>
                <View style={styles.songProcessSliderWrapStyle}>
                    <Slider
                        value={musicQuality}
                        onValueChange={(value) => updateState({ musicQuality: value })}
                        maximumValue={100}
                        minimumValue={0}
                        containerStyle={{ height: 12.0 }}
                        minimumTrackTintColor={Colors.primaryColor}
                        maximumTrackTintColor={Colors.secondaryColor}
                        thumbTintColor={Colors.secondaryColor}
                        trackStyle={{ height: 3.0, }}
                        thumbStyle={{ height: 15, width: 15, backgroundColor: Colors.primaryColor }}
                    />
                </View>
            </>
        )
    }

    function sleepTimeInfo() {
        return (
            <View style={styles.commonRowStyle}>
                <Text style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                    Sleep Time
                </Text>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 20,
                }}>
                    <Switch
                        trackColor={{ true: Colors.grayColor, false: Colors.grayColor }}
                        style={{ transform: [{ scale: Platform.OS == 'ios' ? 0.5 : 0.8 }] }}
                        color='#D81B60'
                        value={sleepTime}
                        onValueChange={() => updateState({ sleepTime: !sleepTime })}
                        thumbColor={sleepTime ? '#D81B60' : Colors.whiteColor}
                    />
                </View>
            </View>
        )
    }

    function upgradePremiumButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('subscribe/subscribeScreen')}
            >
                <ImageBackground
                    source={require('../../../assets/images/banner-design.png')}
                    style={styles.upgradePremiumButtonStyle}
                    borderRadius={Sizes.fixPadding - 7.0}
                    resizeMode="contain"
                >
                    <Text style={{ ...Fonts.whiteColor18Bold }}>
                        Upgrade to My Music Premium
                    </Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    function divider() {
        return (
            <View
                style={{
                    backgroundColor: Colors.grayColor,
                    height: 1.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginVertical: Sizes.fixPadding + 5.0,
                }}
            />
        )
    }

    function userAccountInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginVertical: Sizes.fixPadding, ...Fonts.blackColor15Bold }}>
                    USER ACCOUNT
                </Text>
                <View style={{ marginBottom: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor13SemiBold }}>
                        {email}
                    </Text>
                    <Text
                        onPress={() => updateState({ showEmailDialog: true })}
                        style={{ ...Fonts.grayColor12SemiBold }}
                    >
                        EDIT
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor13SemiBold }}>
                        {password}
                    </Text>
                    <Text
                        onPress={() => updateState({ showPasswordDialog: true })}
                        style={{ ...Fonts.grayColor12SemiBold }}
                    >
                        EDIT
                    </Text>
                </View>
            </View>
        )
    }

    function cornerImage() {
        return (
            <Image
                source={require('../../../assets/images/corner-design.png')}
                style={styles.cornerImageStyle}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaskedView
                    style={{ flex: 1, height: 28, }}
                    maskElement={
                        <Text style={{ ...Fonts.bold22, }}>
                            Settings
                        </Text>
                    }>
                    <LinearGradient
                        start={{ x: 1, y: 0.2 }}
                        end={{ x: 1, y: 1 }}
                        colors={['rgba(255, 124, 0,1)', 'rgba(41, 10, 89, 1)']}
                        style={{ flex: 1 }}
                    />
                </MaskedView >
            </View >
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
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding - 30.0,
    },
    upgradePremiumButtonStyle: {
        alignItems: 'center',
        height: 50.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'center',
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    songProcessSliderWrapStyle: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding - 5.0,
    },
    dialogWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: '#E2E2E2',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    okButtonStyle: {
        flex: 0.50,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    okButtonGradientStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
        borderRadius: Sizes.fixPadding - 5.0,
    },
    textFieldStyle: {
        ...Fonts.blackColor13Medium,
        paddingBottom: Sizes.fixPadding - 2.0,
        borderBottomColor: Colors.grayColor,
        borderBottomWidth: 0.70,
    },
    commonRowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Sizes.fixPadding
    }
})

export default SettingsScreen;