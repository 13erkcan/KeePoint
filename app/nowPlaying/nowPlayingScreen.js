import React, { useState } from "react";
import { ScrollView, StatusBar, TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { MaterialIcons } from '@expo/vector-icons';
import { Slider } from '@miblanchard/react-native-slider';
import { useNavigation } from "expo-router";

const nextOnList = [
    {
        id: '1',
        image: require('../../assets/images/songsCoverPicks/coverImage14.png'),
        albumName: 'Don\'t call me up',
        artist: 'Mabel',
        isFavorite: false,
    },
    {
        id: '2',
        image: require('../../assets/images/songsCoverPicks/coverImage15.png'),
        albumName: 'Sugar and brownies',
        artist: 'Dharia',
        isFavorite: false,
    },
    {
        id: '3',
        image: require('../../assets/images/songsCoverPicks/coverImage9.png'),
        albumName: 'Pretty girl',
        artist: 'Maggie Lindemann',
        isFavorite: false,
    },
    {
        id: '4',
        image: require('../../assets/images/songsCoverPicks/coverImage5.png'),
        albumName: 'Shape of you',
        artist: 'Ed Shreean',
        isFavorite: false,
    },
    {
        id: '5',
        image: require('../../assets/images/songsCoverPicks/coverImage5.png'),
        albumName: 'Shape of you',
        artist: 'Ed Shreean',
        isFavorite: false,
    },
];

const NowPlayingScreen = () => {

    const navigation=useNavigation();

    const [state, setState] = useState({
        songRunningInPercentage: 60,
        pauseSong: true,
        nextOnListData: nextOnList,
        currentSongInFavorite: true,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        songRunningInPercentage,
        pauseSong,
        nextOnListData,
        currentSongInFavorite,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 190.0, paddingBottom: Sizes.fixPadding * 2.0 }}
                >
                    {header()}
                    {songInfo()}
                    {nextOnTheLists()}
                </ScrollView>
                {cornerImage()}
            </View>
        </View>
    )

    function updateForYou({ id }) {
        const newList = nextOnListData.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, isFavorite: !item.isFavorite };
                return updatedItem;
            }
            return item;
        });
        updateState({ nextOnListData: newList })
    }

    function nextOnTheLists() {
        return (
            <View>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, marginBottom: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor15Bold }}>
                    Next on the list
                </Text>
                {
                    nextOnListData.map((item) => (
                        <View key={`${item.id}`}>
                            <View style={styles.nextOnTheListInfoWrapStyle}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={item.image}
                                        style={{ width: 50.0, height: 50.0, borderRadius: Sizes.fixPadding - 5.0 }}
                                    />
                                    <View style={{ marginLeft: Sizes.fixPadding, }}>
                                        <Text style={{ ...Fonts.blackColor12SemiBold }}>
                                            {item.albumName}
                                        </Text>
                                        <Text style={{ ...Fonts.grayColor10Medium }}>
                                            {item.artist}
                                        </Text>
                                    </View>
                                </View>
                                <MaterialIcons
                                    name={item.isFavorite ? "favorite" : "favorite-border"}
                                    color={Colors.grayColor}
                                    size={18}
                                    onPress={() => updateForYou({ id: item.id })}
                                />
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }

    function songInfo() {
        return (
            <View>
                {songNameWithPoster()}
                {songTimeInfo()}
                {songProcessSlider()}
                {songPlayInfo()}
                {favoriteShuffleAndRepeatInfo()}
                {lyricsTextWithIcon()}
            </View>
        )
    }

    function lyricsTextWithIcon() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons
                    name="keyboard-arrow-up"
                    size={20}
                    color={Colors.blackColor}
                />
                <Text style={{ ...Fonts.grayColor10SemiBold }}>
                    LYRICS
                </Text>
            </View>
        )
    }

    function favoriteShuffleAndRepeatInfo() {
        return (
            <View style={styles.favoriteShuffleAndRepeatInfoWrapStyle}>
                <MaterialIcons
                    name="repeat"
                    size={20}
                    color="black"
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{ width: 20, marginHorizontal: Sizes.fixPadding * 4.0, }}
                    onPress={() => {
                        updateState({ currentSongInFavorite: !currentSongInFavorite })
                    }}
                >
                    {
                        currentSongInFavorite
                            ?
                            <MaskedView
                                style={{ flex: 1, flexDirection: 'row', height: 18 }}
                                maskElement={
                                    <View
                                        style={{
                                            backgroundColor: 'transparent',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <MaterialIcons
                                            name="favorite"
                                            size={18}
                                            color="white"
                                        />
                                    </View>
                                }>
                                <LinearGradient
                                    colors={[Colors.secondaryColor, Colors.primaryColor]}
                                    style={{ flex: 1 }}
                                />
                            </MaskedView>
                            :
                            <MaterialIcons
                                name="favorite-border"
                                size={18}
                                color='rgba(255, 124, 0,1)'
                            />
                    }
                </TouchableOpacity>
                <MaterialIcons
                    name="shuffle"
                    size={20}
                    color="black"
                />
            </View>
        )
    }

    function songPlayInfo() {
        return (
            <View style={styles.songPlayInfoWrapStyle}>
                <MaterialIcons
                    name="replay-10"
                    size={25}
                    style={{ marginRight: Sizes.fixPadding * 2.0 }}
                    color="black"
                />
                <View style={styles.forwardBackwardButtonWrapStyle}>
                    <MaterialIcons
                        name="arrow-left"
                        size={30}
                        color="black"
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ pauseSong: !pauseSong })}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0.1 }}
                        end={{ x: 0, y: 1 }}
                        colors={[
                            'rgba(255, 124, 0,1)',
                            'rgba(41, 10, 89, 0.9)',
                        ]}
                        style={styles.pausePlayButtonWrapStyle}
                    >
                        <MaterialIcons
                            name={pauseSong ? "pause" : 'play-arrow'}
                            color={Colors.whiteColor}
                            size={25}
                        />
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.forwardBackwardButtonWrapStyle}>
                    <MaterialIcons
                        name="arrow-right"
                        size={30}
                        color="black"
                    />
                </View>
                <MaterialIcons
                    name="forward-10"
                    size={25}
                    color="black"
                    style={{ marginLeft: Sizes.fixPadding * 2.0 }}
                />
            </View>
        )
    }

    function songNameWithPoster() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={require('../../assets/images/songsCoverPicks/coverImage17.png')}
                    style={{
                        marginVertical: Sizes.fixPadding,
                        width: 190.0,
                        height: 210.0,
                        borderRadius: Sizes.fixPadding - 5.0
                    }}
                />
                <Text style={{ ...Fonts.blackColor14Bold }}>
                    Dance The Night
                </Text>
                <Text style={{ ...Fonts.grayColor10Medium }}>
                    Dua Lipa
                </Text>
            </View>
        )
    }

    function songProcessSlider() {
        return (
            <View style={styles.songProcessSliderWrapStyle}>
                <Slider
                    value={songRunningInPercentage}
                    onValueChange={(value) => updateState({ songRunningInPercentage: value })}
                    maximumValue={100}
                    minimumValue={0}
                    containerStyle={{ height: 12.0 }}
                    minimumTrackTintColor={Colors.primaryColor}
                    maximumTrackTintColor={Colors.secondaryColor}
                    thumbTintColor={Colors.secondaryColor}
                    trackStyle={{ height: 4.5, }}
                    thumbStyle={{ height: 15, width: 15, backgroundColor: Colors.primaryColor }}
                />
            </View>
        )

    }

    function songTimeInfo() {
        return (
            <View style={styles.songTimeInfoWrapStyle}>
                <Text style={{ ...Fonts.grayColor10Medium }}>
                    2:20
                </Text>
                <Text style={{ ...Fonts.grayColor10Medium }}>
                    3:58
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.pop()}
                    style={{ width: 30.0, }}
                >
                    <MaskedView
                        style={{ flex: 1, flexDirection: 'row', height: 30 }}
                        maskElement={
                            <View
                                style={{
                                    backgroundColor: 'transparent',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <MaterialIcons
                                    name="keyboard-arrow-down"
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
                            Now Playing
                        </Text>
                    }>
                    <LinearGradient
                        start={{ x: 1, y: 0.2 }}
                        end={{ x: 1, y: 1 }}
                        colors={['rgba(255, 124, 0,1)', 'rgba(41, 10, 89, 1)']}
                        style={{ flex: 1 }}
                    />
                </MaskedView >
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
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding - 40.0,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    songTimeInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding + 5.0,
    },
    songProcessSliderWrapStyle: {
        flex: 1,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    forwardBackwardButtonWrapStyle: {
        width: 30.0,
        backgroundColor: Colors.whiteColor,
        height: 30.0,
        borderRadius: 15.0,
        borderColor: "#DFDFDF",
        borderWidth: 0.50,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pausePlayButtonWrapStyle: {
        width: 37.0,
        height: 37.0,
        borderRadius: 18.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding + 2.0
    },
    favoriteShuffleAndRepeatInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    songPlayInfoWrapStyle: {
        marginTop: Sizes.fixPadding + 10.0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextOnTheListInfoWrapStyle: {
        marginBottom: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})

export default NowPlayingScreen;