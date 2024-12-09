import React from "react";
import { View, ScrollView, StatusBar, TouchableOpacity, Image, Text, StyleSheet, ImageBackground } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from "expo-router";

const subscribePackageList = [
    {
        id: '1',
        packType: 'Starter Pack',
        validityInMonths: 3,
        amount: 8.99,
    },
    {
        id: '2',
        packType: 'Standard Pack',
        validityInMonths: 6,
        amount: 15.99,
    },
    {
        id: '3',
        packType: 'Super Saver Pack',
        validityInMonths: 12,
        amount: 25.99,
    },
];

const subscriptionAllowsList = [
    'Download unlimited songs',
    'View song lyrics while playing song',
    'High quality sound quality',
    'Add free song play',
];

const SubscribeScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 190.0, }}
                >
                    {header()}
                    {packages()}
                    {subscriptionAllowsInfo()}
                </ScrollView>
                {cornerImage()}
            </View>
        </View>
    )

    function subscriptionAllowsInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor15Bold }}>
                    Subscription allows
                </Text>
                {
                    subscriptionAllowsList.map((item, index) => (
                        <View key={`${index}`}>
                            <View style={{
                                marginBottom: Sizes.fixPadding + 10.0,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={styles.checkIconWrapStyle}>
                                    <MaterialIcons
                                        name="check"
                                        color={Colors.whiteColor}
                                        size={12}
                                    />
                                </View>
                                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor13SemiBold }}>
                                    {item}
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }

    function packages() {
        return (
            subscribePackageList.map((item) => (
                <View key={`${item.id}`}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('exploreSubscription/exploreSubscriptionScreen')}
                    >
                        <ImageBackground
                            source={require('../../assets/images/card-design.png')}
                            style={{
                                marginHorizontal: Sizes.fixPadding * 2.0,
                                height: 130.0,
                                marginBottom: Sizes.fixPadding + 5.0,
                            }}
                            borderRadius={Sizes.fixPadding - 5.0}
                        >
                            <View style={{
                                marginBottom: Sizes.fixPadding + 5.0,
                                marginHorizontal: Sizes.fixPadding * 2.0,
                                justifyContent: 'flex-end', flex: 1,
                            }}>
                                <Text style={{ marginBottom: Sizes.fixPadding - 8.0, ...Fonts.whiteColor15Bold }}>
                                    {item.packType}
                                </Text>
                                <Text style={{ ...Fonts.whiteColor22Light }}>
                                    {item.validityInMonths} MONTHS
                                </Text>
                                <Text style={{ alignSelf: 'flex-end', ...Fonts.whiteColor22Light }}>
                                    $ {item.amount}
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            ))
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

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.pop()}
                    style={{ width: 30 }}
                >
                    <MaskedView
                        style={{ flex: 1, flexDirection: 'row', height: 30 }}
                        maskElement={
                            <View
                                style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <MaterialIcons
                                    name="keyboard-arrow-left"
                                    size={30}
                                    color="white"
                                />
                            </View>
                        }>
                        <LinearGradient
                            colors={[Colors.secondaryColor, Colors.primaryColor]}
                            style={{ flex: 1 }}
                        />
                    </MaskedView>
                </TouchableOpacity>
                <MaskedView
                    style={{ flex: 1, height: 28, }}
                    maskElement={
                        <Text style={{ ...Fonts.bold22, }}>
                            Subscribe
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
        marginBottom: Sizes.fixPadding + 10.0,
        marginTop: Sizes.fixPadding - 40.0,
    },
    checkIconWrapStyle: {
        width: 18.0,
        height: 18.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5B2544',
        borderRadius: Sizes.fixPadding - 7.0,
    }
})

export default SubscribeScreen;
