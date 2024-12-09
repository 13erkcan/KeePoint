import React, { useState } from "react";
import { View, FlatList, Dimensions, ImageBackground, StatusBar, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from "expo-router";

const { width } = Dimensions.get('window');

const musicsList = [
    {
        id: '1',
        image: require('../../assets/images/songsCoverPicks/coverImage21.png'),
        songType: 'FRENCH',
        selected: true,
    },
    {
        id: '2',
        image: require('../../assets/images/songsCoverPicks/coverImage22.png'),
        songType: 'ENGLISH',
        selected: false,
    },
    {
        id: '3',
        image: require('../../assets/images/songsCoverPicks/coverImage17.png'),
        songType: 'POP R&B',
        selected: false,
    },
    {
        id: '4',
        image: require('../../assets/images/songsCoverPicks/coverImage23.png'),
        songType: 'BLUES',
        selected: false,
    },
    {
        id: '5',
        image: require('../../assets/images/songsCoverPicks/coverImage24.png'),
        songType: 'PODCASTS',
        selected: false,
    },
    {
        id: '6',
        image: require('../../assets/images/songsCoverPicks/coverImage25.png'),
        songType: 'TOP HITS',
        selected: false,
    },
    {
        id: '7',
        image: require('../../assets/images/songsCoverPicks/coverImage26.png'),
        songType: 'TECHNO',
        selected: false,
    },
    {
        id: '8',
        image: require('../../assets/images/songsCoverPicks/coverImage2.png'),
        songType: 'PEACEFUL',
        selected: false,
    },
    {
        id: '9',
        image: require('../../assets/images/songsCoverPicks/coverImage27.png'),
        songType: 'LOVE SONGS',
        selected: false,
    }
];

const ChooseMusicScreen = () => {

    const navigation = useNavigation();

    const [musicsData, setmusicsData] = useState(musicsList)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor='transparent' barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            {skipAndNextText()}
                            {chooseMusicTitle()}
                            {musics()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 160.0 }}
                >
                </FlatList>
                {cornerImage()}
            </View>
        </View>
    )

    function updateMusics({ id }) {
        const newList = musicsData.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, selected: !item.selected };
                return updatedItem;
            }
            return item;
        });
        setmusicsData(newList);
    }

    function musics() {

        const renderItem = ({ item, index }) => (
            <View style={{
                alignItems: 'center',
                marginLeft: index % 3 == 0 ? Sizes.fixPadding * 2.0 : 0.0,
                marginRight: index % 3 == 2 ? Sizes.fixPadding * 2.0 : 0.0,
                marginBottom: Sizes.fixPadding * 2.5,
            }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateMusics({ id: item.id })}
                >
                    <ImageBackground
                        source={item.image}
                        style={{
                            width: width / 3.6,
                            height: width / 3.6,
                        }}
                        borderRadius={(width / 3.6) / 2.0}
                    >
                        {
                            item.selected ?
                                <View style={{
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    width: width / 3.6,
                                    height: width / 3.6,
                                    borderRadius: (width / 3.6) / 2.0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <MaterialIcons
                                        name="check"
                                        color={Colors.whiteColor}
                                        size={25}
                                    />
                                </View>
                                :
                                null
                        }
                    </ImageBackground>
                </TouchableOpacity>

                {item.selected
                    ?
                    <MaskedView
                        style={{ width: width / 3.6, height: 18 }}
                        maskElement={
                            <Text style={{
                                marginTop: Sizes.fixPadding - 8.0,
                                textAlign: 'center',
                                ...Fonts.blackColor14SemiBold
                            }}>
                                {item.songType}
                            </Text>
                        }
                    >
                        <LinearGradient
                            start={{ x: 1, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={[
                                'rgba(255, 124, 0,1)',
                                'rgba(41, 10, 89, 1)'
                            ]}
                            style={{ flex: 1 }}
                        >
                            <Text style={{
                                textAlign: 'center',
                                marginTop: Sizes.fixPadding - 8.0,
                                color: "transparent"
                            }}>
                                {item.songType}
                            </Text>
                        </LinearGradient>
                    </MaskedView>
                    :
                    <Text style={{
                        textAlign: 'center',
                        marginTop: Sizes.fixPadding - 8.0,
                        ...Fonts.blackColor14SemiBold
                    }}>
                        {item.songType}
                    </Text>
                }
            </View>
        )
        return (
            <FlatList
                scrollEnabled={false}
                data={musicsData}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={3}
                columnWrapperStyle={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            />
        )
    }

    function chooseMusicTitle() {
        return (
            <View
                style={{
                    marginTop: Sizes.fixPadding,
                    marginBottom: Sizes.fixPadding * 3.5,
                }}
            >
                <Image
                    source={require('../../assets/images/music-note.png')}
                    style={{ marginBottom: Sizes.fixPadding, alignSelf: 'center', width: 30.0, height: 30.0 }}
                    resizeMode="contain"
                />
                <MaskedView
                    style={{ height: 22, }}
                    maskElement={
                        <Text style={{ textAlign: 'center', ...Fonts.blackColor18Bold, }}>
                            Choose Music That Interests You...
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
        )
    }

    function skipAndNextText() {
        return (
            <View style={styles.skipAndNextTextWrapStyle}>
                <Text
                    onPress={() => navigation.push('(tabs)')}
                    style={{ ...Fonts.grayColor15Medium }}
                >
                    Skip
                </Text>
                <Text
                    onPress={() => navigation.push('(tabs)')}
                    style={{ ...Fonts.grayColor15Medium }}
                >
                    Next
                </Text>
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
    skipAndNextTextWrapStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export default ChooseMusicScreen;