import React, { useState } from "react";
import { View, Dimensions, ImageBackground, ScrollView, StatusBar, FlatList, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes, } from "../../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view'
import { Menu, MenuItem } from 'react-native-material-menu';
import { useNavigation } from "expo-router";

const { width } = Dimensions.get('window');

const recommendedList = [
    {
        id: '1r',
        image: require('../../../assets/images/songsCoverPicks/coverImage1.png'),
        category: 'Morning chill',
    },
    {
        id: '2r',
        image: require('../../../assets/images/songsCoverPicks/coverImage2.png'),
        category: 'Daily Mix',
    },
    {
        id: '3r',
        image: require('../../../assets/images/songsCoverPicks/coverImage3.png'),
        category: 'Top Trending',
    },
    {
        id: '4r',
        image: require('../../../assets/images/songsCoverPicks/coverImage4.png'),
        category: 'Pop Music',
    }
];

const popularSongsList = [
    {
        id: '1s',
        image: require('../../../assets/images/songsCoverPicks/coverImage5.png'),
        songName: 'Shape of you',
        artist: 'Ed shreean',
    },
    {
        id: '2s',
        image: require('../../../assets/images/songsCoverPicks/coverImage6.png'),
        songName: 'Waka waka',
        artist: 'Shakira',
    },
    {
        id: '3s',
        image: require('../../../assets/images/songsCoverPicks/coverImage7.png'),
        songName: 'Let her go',
        artist: 'Passenger',
    },
    {
        id: '4s',
        image: require('../../../assets/images/songsCoverPicks/coverImage8.png'),
        songName: 'See you again',
        artist: 'Wiz khalifa',
    },
];

const recentlyPlayedList = [
    {
        id: 'r1',
        image: require('../../../assets/images/songsCoverPicks/coverImage12.png'),
        albumName: 'Wathered',
    },
    {
        id: 'r2',
        image: require('../../../assets/images/songsCoverPicks/coverImage11.png'),
        albumName: 'Circles',
    },
    {
        id: 'r3',
        image: require('../../../assets/images/songsCoverPicks/coverImage10.png'),
        albumName: 'Sugar&brownies',
    },
    {
        id: 'r4',
        image: require('../../../assets/images/songsCoverPicks/coverImage9.png'),
        albumName: 'Pretty girl',
    },
];

const forYouList = [
    {
        id: '1f',
        image: require('../../../assets/images/songsCoverPicks/coverImage14.png'),
        albumName: 'Don\'t call me up',
        artist: 'Mabel',
        isFavorite: false,
    },
    {
        id: '2f',
        image: require('../../../assets/images/songsCoverPicks/coverImage15.png'),
        albumName: 'Sugar and brownies',
        artist: 'Dharia',
        isFavorite: false,
    },
    {
        id: '3f',
        image: require('../../../assets/images/songsCoverPicks/coverImage9.png'),
        albumName: 'Pretty girl',
        artist: 'Maggie Lindemann',
        isFavorite: false,
    },
];

const playlists = [
    {
        id: '1',
        image: require('../../../assets/images/songsCoverPicks/coverImage13.png'),
        sortCategory: 'Recently added',
    },
    {
        id: '2',
        image: require('../../../assets/images/songsCoverPicks/coverImage13.png'),
        sortCategory: 'Most played',
    },
    {
        id: '3',
        image: require('../../../assets/images/songsCoverPicks/coverImage13.png'),
        sortCategory: 'Favorite tracks',
    },
];

const albumsList = [
    {
        id: '1',
        image: require('../../../assets/images/audio.png'),
        category: 'Audio',
    },
    {
        id: '2',
        image: require('../../../assets/images/download.png'),
        category: 'Download',
    },
    {
        id: '3',
        image: require('../../../assets/images/music.png'),
        category: 'Future dust',
    },
];

const topArtistList = [
    {
        id: '1a',
        image: require('../../../assets/images/artist/artist1.png'),
        artistName: 'Ben Kane',
        songsCount: 179,
    },
    {
        id: '2a',
        image: require('../../../assets/images/artist/artist2.png'),
        artistName: 'Hammad Raza',
        songsCount: 250,
    },
    {
        id: '3a',
        image: require('../../../assets/images/artist/artist3.png'),
        artistName: 'Lady Gaga',
        songsCount: 200,
    },
    {
        id: '4a',
        image: require('../../../assets/images/artist/artist1.png'),
        artistName: 'Ben Kane',
        songsCount: 179,
    }
];

const ExploreScreen = () => {

    const navigation = useNavigation();

    const [state, setState] = useState({
        forYouData: forYouList,
        pauseSong: true,
        showOptions: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        forYouData,
        pauseSong,
        showOptions,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: 150.0,
                        paddingBottom: Sizes.fixPadding * 7.0
                    }}
                >
                    {header()}
                    {searchBar()}
                    {recommendedInfo()}
                    {popularSongsInfo()}
                    {recentlyPlayedInfo()}
                    {forYouInfo()}
                    {playListInfo()}
                    {albumsInfo()}
                    {topArtistInfo()}
                </ScrollView>
                {cornerImage()}
            </View>
        </View>
    )

    function topArtistInfo() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('topArtist/topArtistScreen', { item: JSON.stringify(item) })}
            >
                <Image
                    source={item.image}
                    style={styles.topArtistImageStyle}
                />
                <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.blackColor12SemiBold }}>
                    {item.artistName}
                </Text>
                <Text style={{ ...Fonts.grayColor10Medium }}>
                    {item.songsCount} songs
                </Text>
            </TouchableOpacity>
        )

        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0, }}>
                <View style={styles.titleWrapStyle}>
                    <Text style={styles.titleStyle}>
                        Top Artists
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={Colors.blackColor}
                        size={25}
                    />
                </View>
                <FlatList
                    data={topArtistList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingRight: Sizes.fixPadding,
                    }}
                />
            </View>
        )
    }

    function albumsInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0, }}>
                <View style={styles.titleWrapStyle}>
                    <Text style={styles.titleStyle}>
                        Albums
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={Colors.blackColor}
                        size={25}
                    />
                </View>
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', justifyContent: 'space-between' }}>
                    {
                        albumsList.map((item) => (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => navigation.push('tracks/tracksScreen')}
                                key={`${item.id}`}
                            >
                                <View
                                    style={{
                                        width: width / (albumsList.length + 0.8),
                                        ...styles.albumImageWrapStyle,
                                    }}
                                >
                                    <Image
                                        source={item.image}
                                        resizeMode="contain"
                                        style={{
                                            width: width / (albumsList.length + 0.8),
                                            height: 100,
                                        }}
                                    />
                                </View>
                                <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.blackColor12SemiBold }}>
                                    {item.category}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    function playListInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0, }}>
                <View style={styles.titleWrapStyle}>
                    <Text style={styles.titleStyle}>
                        Playlists
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={Colors.blackColor}
                        size={25}
                    />
                </View>
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', justifyContent: 'space-between' }}>
                    {
                        playlists.map((item) => (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => navigation.push('tracks/tracksScreen')}
                                key={`${item.id}`}
                            >
                                <Image
                                    source={item.image}
                                    style={{ width: width / (playlists.length + 0.8), ...styles.playListImageStyle }}
                                />
                                <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.blackColor12SemiBold }}>
                                    {item.sortCategory}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    function updateForYou({ id }) {
        const newList = forYouData.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, isFavorite: !item.isFavorite };
                return updatedItem;
            }
            return item;
        });
        updateState({ forYouData: newList })
    }

    function forYouInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0, }}>
                <View style={styles.titleWrapStyle}>
                    <Text style={styles.titleStyle}>
                        For You
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={Colors.blackColor}
                        size={25}
                    />
                </View>
                {
                    forYouData.map((item) => (
                        <View key={`${item.id}`}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => navigation.push('nowPlaying/nowPlayingScreen', { item: JSON.stringify(item) })}
                                style={styles.forYouInfoWrapStyle}
                            >
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
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
        )
    }

    function recentlyPlayedInfo() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('nowPlaying/nowPlayingScreen', { item: JSON.stringify(item) })}
            >
                <Image source={item.image}
                    style={styles.recentlyPalyedSongImageStyle}
                />
                <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.blackColor12SemiBold }}>
                    {item.albumName}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0, }}>
                <View style={styles.titleWrapStyle}>
                    <Text style={styles.titleStyle}>
                        Recently Played
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={Colors.blackColor}
                        size={25}
                    />
                </View>
                <FlatList
                    data={recentlyPlayedList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingRight: Sizes.fixPadding,
                    }}
                />
            </View>
        )
    }

    function popularSongsInfo() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('nowPlaying/nowPlayingScreen', { item: JSON.stringify(item) })}
            >
                <Image
                    source={item.image}
                    style={styles.popularSongImageStyle}
                />
                <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.blackColor12SemiBold }}>
                    {item.songName}
                </Text>
                <Text style={{ ...Fonts.grayColor10Medium }}>
                    {item.artist}
                </Text>
            </TouchableOpacity>
        )

        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0, }}>
                <View style={styles.titleWrapStyle}>
                    <Text style={styles.titleStyle}>
                        Popular Song
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={Colors.blackColor}
                        size={25}
                    />
                </View>
                <FlatList
                    data={popularSongsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingRight: Sizes.fixPadding,
                    }}
                />
            </View>
        )
    }

    function recommendedInfo() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('tracks/tracksScreen')}
            >
                <ImageBackground
                    source={item.image}
                    style={{ width: 130.0, height: 120.0, marginRight: Sizes.fixPadding }}
                    borderRadius={Sizes.fixPadding - 5.0}
                >
                    <LinearGradient
                        start={{ x: 1, y: 0.2 }}
                        end={{ x: 1, y: 1 }}
                        colors={['rgba(255, 124, 0,0.5)', 'rgba(41, 10, 89, 0.5)']}
                        style={{ flex: 1, borderRadius: Sizes.fixPadding - 5.0 }}
                    >
                        <Text style={{ padding: Sizes.fixPadding - 5.0, ...Fonts.whiteColor12Medium }}>
                            {item.category}
                        </Text>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        )

        return (
            <View>
                <View style={styles.titleWrapStyle}>
                    <Text style={styles.titleStyle}>
                        Recommended For You
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={Colors.blackColor}
                        size={25}
                    />
                </View>
                <FlatList
                    data={recommendedList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0 }}
                />
            </View>
        )
    }

    function searchBar() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('search/searchScreen')}
                style={styles.searchBarWrapStyle}
            >
                <Text style={{ ...Fonts.grayColor15Medium }}>
                    Search for artist,song or lyrics...
                </Text>
                <MaterialIcons
                    name="search"
                    color={Colors.grayColor}
                    size={25}
                />
            </TouchableOpacity>
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
                            Explore
                        </Text>
                    }>
                    <LinearGradient
                        start={{ x: 1, y: 0.2 }}
                        end={{ x: 1, y: 1 }}
                        colors={['rgba(255, 124, 0,1)', 'rgba(41, 10, 89, 1)']}
                        style={{ flex: 1 }}
                    />
                </MaskedView>
                <Menu
                    visible={showOptions}
                    style={{ height: 150.0, backgroundColor: Colors.whiteColor }}
                    anchor={
                        <MaterialIcons
                            name="more-vert"
                            size={24}
                            color={Colors.blackColor}
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => updateState({ showOptions: true })}
                        />
                    }
                    onRequestClose={() => updateState({ showOptions: false })}
                >
                    <MenuItem
                        pressColor='transparent'
                        textStyle={{ marginRight: Sizes.fixPadding * 3.0, ...Fonts.blackColor12SemiBold }}
                        onPress={() => {
                            updateState({ showOptions: false })
                        }}
                    >
                        View By Album Artist
                    </MenuItem>
                    <MenuItem
                        pressColor='transparent'
                        textStyle={{ marginRight: Sizes.fixPadding * 3.0, marginTop: Sizes.fixPadding - 40.0, ...Fonts.blackColor12SemiBold }}
                        onPress={() => {
                            updateState({ showOptions: false })
                        }}
                    >
                        Sound Quality and Effects
                    </MenuItem>
                    <MenuItem
                        pressColor='transparent'
                        textStyle={{ marginRight: Sizes.fixPadding * 3.0, marginTop: Sizes.fixPadding - 70.0, ...Fonts.blackColor12SemiBold }}
                        onPress={() => {
                            updateState({ showOptions: false })
                        }}
                    >
                        Tracks
                    </MenuItem>
                    <MenuItem
                        pressColor='transparent'
                        textStyle={{ marginRight: Sizes.fixPadding * 3.0, marginTop: Sizes.fixPadding - 100.0, ...Fonts.blackColor12SemiBold }}
                        onPress={() => {
                            updateState({ showOptions: false })
                        }}
                    >
                        Contact Us
                    </MenuItem>
                </Menu>
            </View>
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
    },
    searchBarWrapStyle: {
        backgroundColor: Colors.lightGrayColor,
        borderRadius: Sizes.fixPadding * 2.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
    },
    titleStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
        ...Fonts.blackColor15Bold
    },
    titleWrapStyle: {
        marginRight: Sizes.fixPadding + 5.0,
        marginLeft: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    popularSongImageStyle: {
        marginRight: Sizes.fixPadding,
        width: 110,
        height: 100,
        borderRadius: Sizes.fixPadding - 5.0
    },
    recentlyPalyedSongImageStyle: {
        marginRight: Sizes.fixPadding,
        width: 110,
        height: 100,
        borderRadius: Sizes.fixPadding - 5.0
    },
    forYouInfoWrapStyle: {
        marginBottom: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    playListImageStyle: {
        alignSelf: 'center',
        height: 100,
        borderWidth: 2.0,
        borderColor: Colors.lightGrayColor,
        borderRadius: Sizes.fixPadding - 5.0
    },
    albumImageWrapStyle: {
        alignSelf: 'center',
        backgroundColor: Colors.whiteColor,
        borderWidth: 2.0,
        borderColor: Colors.lightGrayColor,
        borderRadius: Sizes.fixPadding - 5.0
    },
    topArtistImageStyle: {
        marginRight: Sizes.fixPadding,
        width: 110,
        height: 100,
        borderRadius: Sizes.fixPadding - 5.0
    },
})

export default ExploreScreen;