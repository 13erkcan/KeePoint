import React, { useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity, StatusBar, View, StyleSheet, Text, Image } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Menu, MenuItem } from 'react-native-material-menu';
import { useNavigation } from "expo-router";

const { width } = Dimensions.get('window');

const songOptionsList = ['Share', 'Track Details', 'Add to Playlist', 'Album', 'Artist', 'Set as'];

const tracksList = [
    {
        id: '1',
        songName: 'Leave Me Lonely',
        artist: 'Ariana Grande',
    },
    {
        id: '2',
        songName: 'There\'s Nothing Holdin\' Me Back',
        artist: 'Shawn Menders',
    },
    {
        id: '3',
        songName: 'Yeh Dosti Hum Nahi Todenge',
        artist: 'Kishore Kumar And RD Barman',
    },
    {
        id: '4',
        songName: 'Bhanware Ki Gunjan',
        artist: 'Kishore Kumar',
    },
    {
        id: '5',
        songName: 'Dangerous Woman',
        artist: 'Ariana Grande',
    },
    {
        id: '6',
        songName: 'Party Rock Anthem',
        artist: 'GoonRock',
    },
    {
        id: '7',
        songName: 'What Makes You Beautiful',
        artist: 'One Direction',
    },
    {
        id: '8',
        songName: 'Neele Neele Ambar Par',
        artist: 'Kishore Kumar',
    },
    {
        id: '9',
        songName: 'Rim Jhim Gire Sawan',
        artist: 'Hasrat Jaipuri',
    },
    {
        id: '10',
        songName: 'Aate Jaate Khoobsurat Awara Sadko',
        artist: 'Kishore Kumar',
    },
    {
        id: '11',
        songName: 'Leave Me Lonely',
        artist: 'Ariana Grande',
    },
    {
        id: '12',
        songName: 'There\'s Nothing Holdin\' Me Back',
        artist: 'Shawn Menders',
    },
    {
        id: '13',
        songName: 'Dangerous Woman',
        artist: 'Ariana Grande',
    },
    {
        id: '14',
        songName: 'Aate Jaate Khoobsurat Awara Sadko',
        artist: 'Kishore Kumar',
    },
    {
        id: '15',
        songName: 'Party Rock Anthem',
        artist: 'GoonRock',
    },
];

const sortOptions = ['Name', 'Date Added', 'Artist'];

const TracksScreen = () => {

    const navigation = useNavigation();

    const [state, setState] = useState({
        showSortOptions: false,
        selectedSortCriteria: sortOptions[0],
        pauseSong: true,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showSortOptions,
        selectedSortCriteria,
        pauseSong,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 190.0, paddingBottom: Sizes.fixPadding * 7.0 }}
                >
                    {header()}
                    {sortingIcons()}
                    {tracks()}
                </ScrollView>
                {cornerImage()}
            </View>
            {currentlyPlayedSong()}
        </View>
    )

    function currentlyPlayedSong() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('nowPlaying/nowPlayingScreen')}
                style={styles.currentlyPlayedSongInfoWrapStyle}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/songsCoverPicks/coverImage16.png')}
                        style={{
                            width: 55.0,
                            height: 55.0,
                            borderRadius: Sizes.fixPadding - 5.0,
                        }}
                    />
                    <View style={{ marginLeft: Sizes.fixPadding, }}>
                        <Text
                            numberOfLines={1}
                            style={{
                                maxWidth: width / 3.0,
                                ...Fonts.blackColor15Bold
                            }}
                        >
                            Dunya
                        </Text>
                        <Text style={{ ...Fonts.grayColor11Medium }}>
                            Mahir Skekh
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                        style={styles.pausePlayButtonWrapStyle}
                    >
                        <MaterialIcons
                            name={pauseSong ? "pause" : 'play-arrow'}
                            size={30}
                            color="black"
                        />
                    </TouchableOpacity>
                    <View style={styles.forwardBackwardButtonWrapStyle}>
                        <MaterialIcons
                            name="arrow-right"
                            size={30}
                            color="black"
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    function tracks() {
        const CustomMenu = () => {
            var _menu = null;

            const setMenuRef = ref => {
                _menu = ref;
            };

            const hideMenu = () => {
                _menu.hide();
            };

            const showMenu = () => {
                _menu.show();
            };

            return (
                <Menu
                    ref={setMenuRef}
                    anchor={
                        <MaterialIcons
                            name="more-vert"
                            color={Colors.grayColor}
                            size={20}
                            onPress={showMenu}
                        />
                    }
                >
                    <View style={{ paddingTop: Sizes.fixPadding, backgroundColor: Colors.whiteColor }}>
                        {
                            songOptionsList.map((item, index) => (
                                <View key={`${index}`}>
                                    <MenuItem
                                        pressColor='transparent'
                                        style={{ height: 30.0, }}
                                        textStyle={{ marginRight: Sizes.fixPadding * 5.0, ...Fonts.blackColor12SemiBold }}
                                        onPress={hideMenu}
                                    >
                                        {item}
                                    </MenuItem>
                                </View>
                            ))
                        }
                    </View>
                </Menu>
            );
        }

        return (
            tracksList.map((item) => (
                <View key={`${item.id}`}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('nowPlaying/nowPlayingScreen')}
                        style={styles.tracksInfoWrapStyle}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                colors={[
                                    'rgba(255, 124, 0,0.9)',
                                    'rgba(255, 124, 0,0.7)',
                                    'rgba(255, 124, 0,0.4)',
                                    'rgba(41, 10, 89, 0.9)',
                                ]}
                                style={styles.musicIconWrapStyle}
                            >
                                <MaterialIcons
                                    name="music-note"
                                    color={Colors.whiteColor}
                                    size={24}
                                />
                            </LinearGradient>
                            <View style={{ marginLeft: Sizes.fixPadding, }}>
                                <Text style={{ ...Fonts.blackColor13SemiBold }}>
                                    {item.songName}
                                </Text>
                                <Text style={{ ...Fonts.grayColor11Medium }}>
                                    {item.artist}
                                </Text>
                            </View>
                        </View>
                        <CustomMenu />
                    </TouchableOpacity>
                </View>
            ))
        )
    }

    function sortingIcons() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 2.0, marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Menu
                    visible={showSortOptions}
                    anchor={
                        <MaterialIcons
                            name="menu"
                            color={Colors.blackColor}
                            size={20}
                            onPress={() => updateState({ showSortOptions: true })}
                        />
                    }
                    onRequestClose={() => updateState({ showSortOptions: false })}
                >
                    <View style={styles.sortingOptionsWrapStyle}>
                        {
                            sortOptions.map((item, index) => (
                                <View key={`${index}`}>
                                    {
                                        selectedSortCriteria == item
                                            ?
                                            <TouchableOpacity
                                                activeOpacity={0.9}
                                                onPress={() => updateState({ selectedSortCriteria: item, showSortOptions: false })}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginBottom: sortOptions.length - 1 == index ? 0.0 : Sizes.fixPadding + 5.0,
                                                }}
                                            >
                                                <MaskedView
                                                    style={{ flex: 0.5 }}
                                                    maskElement={<Text numberOfLines={1} style={{ ...Fonts.blackColor12SemiBold }}>{item}</Text>}>
                                                    <LinearGradient
                                                        start={{ x: 1, y: 0.2 }}
                                                        end={{ x: 1, y: 1 }}
                                                        colors={['rgba(255, 124, 0,1)', 'rgba(41, 10, 89, 1)']}
                                                    >
                                                        <Text style={[{ opacity: 0 }]} />
                                                    </LinearGradient>
                                                </MaskedView >
                                                <MaskedView
                                                    style={{ flex: 1, flexDirection: 'row', height: 15 }}
                                                    maskElement={
                                                        <View
                                                            style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                            <MaterialIcons
                                                                name="check"
                                                                size={15}
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
                                            :
                                            <Text
                                                onPress={() => updateState({ selectedSortCriteria: item, showSortOptions: false })}
                                                style={{ marginBottom: sortOptions.length - 1 == index ? 0.0 : Sizes.fixPadding + 5.0, ...Fonts.blackColor12SemiBold }}>
                                                {item}
                                            </Text>
                                    }
                                </View>
                            ))
                        }
                    </View>
                </Menu>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="shuffle"
                        size={20}
                        color="black"
                        style={{ marginRight: Sizes.fixPadding }}
                    />
                    <MaterialCommunityIcons
                        name="arrow-right-drop-circle"
                        size={20}
                        color="black"
                    />
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.pop()}
                        style={{ width: 30, }}
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
                                Tracks
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
                <MaterialIcons
                    name="search"
                    size={20}
                    style={{ alignSelf: 'flex-end' }}
                    onPress={() => navigation.push('search/searchScreen')}
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
        zIndex: 100,
    },
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding - 40.0,
        justifyContent: 'space-between',
    },
    musicIconWrapStyle: {
        width: 35.0,
        height: 35.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tracksInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
    },
    sortingOptionsWrapStyle: {
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        width: 190.0,
    },
    forwardBackwardButtonWrapStyle: {
        width: 35.0,
        backgroundColor: Colors.whiteColor,
        height: 35.0,
        borderRadius: 17.5,
        borderColor: "#DFDFDF",
        borderWidth: 0.50,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pausePlayButtonWrapStyle: {
        width: 45.0,
        height: 45.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: 22.5,
        borderColor: "#DFDFDF",
        borderWidth: 0.50,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding + 5.0,
    },
    currentlyPlayedSongInfoWrapStyle: {
        position: 'absolute',
        left: 0.0,
        right: 0.0,
        bottom: 0.0,
        backgroundColor: Colors.whiteColor,
        elevation: 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0,
    }
})

export default TracksScreen;