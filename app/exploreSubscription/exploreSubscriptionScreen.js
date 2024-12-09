import React from "react";
import { View, ScrollView, StatusBar, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from "expo-router";

const subscriptionAllowsList = [
    'Download unlimited songs',
    'View song lyrics while playing song',
    'High quality sound quality',
    'Add free song play',
];

const ExploreSubscriptionScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 170.0, }}
                >
                    {musicImage()}
                    {subscribedNowText()}
                    {subscriptionAllowsInfo()}
                </ScrollView>
                {cornerImage()}
                {exploreNowButton()}
            </View>
        </View>
    )

    function exploreNowButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => { navigation.push('paymentFailed/paymentFailedScreen') }}
                style={{
                    justifyContent: 'center',
                    margin: Sizes.fixPadding * 2.0,
                    borderRadius: Sizes.fixPadding - 5.0
                }}
            >
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={[
                        'rgba(255, 124, 0,1)',
                        'rgba(41, 10, 89, 0.9)',
                    ]}
                    style={styles.exploreNowButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18Bold }}>
                        Explore Now
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

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
                                <Text style={{
                                    marginLeft: Sizes.fixPadding,
                                    ...Fonts.blackColor13SemiBold
                                }}>
                                    {item}
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }

    function subscribedNowText() {
        return (
            <Text style={styles.subscribedNowTextStyle}>
                You're Subscribed Now
            </Text>
        )
    }

    function musicImage() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={{
                        width: '100%',
                        height: 150,
                    }}
                />
                <View style={styles.musicTextStyle}>
                    <MaskedView
                        style={{
                            width: 110.0,
                            height: 40,
                        }}
                        maskElement={
                            <Text style={{ ...Fonts.bold35, }}>
                                Music
                            </Text>
                        }>
                        <LinearGradient
                            start={{ x: 1, y: 0.2 }}
                            end={{ x: 1, y: 1 }}
                            colors={['rgba(255, 124, 0,1)', 'rgba(41, 10, 89, 1)']}
                            style={{ flex: 1 }}
                        />
                    </MaskedView>
                    <MaskedView
                        style={{ width: 50.0, height: 20, }}
                        maskElement={
                            <Text style={{ ...Fonts.blackColor15SemiBold, }}>
                                of you
                            </Text>
                        }>
                        <LinearGradient
                            start={{ x: 1, y: 0.2 }}
                            end={{ x: 1, y: 1 }}
                            colors={['rgba(255, 124, 0,1)', 'rgba(41, 10, 89, 1)']}
                            style={{ flex: 1 }}
                        />
                    </MaskedView>
                </View>
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
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding - 40.0,
    },
    exploreNowButtonStyle: {
        paddingVertical: Sizes.fixPadding + 2.0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 5.0
    },
    checkIconWrapStyle: {
        width: 18.0,
        height: 18.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5B2544',
        borderRadius: Sizes.fixPadding - 7.0,
    },
    subscribedNowTextStyle: {
        marginTop: Sizes.fixPadding * 4.0,
        marginBottom: Sizes.fixPadding * 3.0,
        textAlign: 'center',
        ...Fonts.blackColor20Bold
    },
    musicTextStyle: {
        marginTop: Sizes.fixPadding - 60.0,
        flexDirection: 'row',
        alignItems: 'flex-end',
        flex: 0.45,
    }
})

export default ExploreSubscriptionScreen;
