import React from "react";
import { FlatList, View, StatusBar, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from "expo-router";

const libraryList = [
    {
        id: '1',
        image: require('../../../assets/images/albumsCoverImages/1.png'),
        libraryFor: 'Liked Songs'
    },
    {
        id: '2',
        image: require('../../../assets/images/albumsCoverImages/2.png'),
        libraryFor: 'Gym'
    },
    {
        id: '3',
        image: require('../../../assets/images/albumsCoverImages/3.png'),
        libraryFor: 'Chill'
    },
    {
        id: '4',
        image: require('../../../assets/images/albumsCoverImages/4.png'),
        libraryFor: 'Liked Prodcasts',
    },
    {
        id: '5',
        image: require('../../../assets/images/albumsCoverImages/5.png'),
        libraryFor: 'Party',
    },
    {
        id: '6',
        image: require('../../../assets/images/albumsCoverImages/6.png'),
        libraryFor: 'Movie\'s'
    },
];

const LibraryScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            {header()}
                            {libraries()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: 170.0,
                        paddingBottom: Sizes.fixPadding * 6.0
                    }}
                />
                {cornerImage()}
            </View>
        </View>
    )

    function libraries() {

        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('tracks/tracksScreen')}
                style={{
                    marginBottom: Sizes.fixPadding * 2.5,
                    flex: 1,
                    marginLeft: index % 2 == 0 ? Sizes.fixPadding * 2.0 : Sizes.fixPadding - 2.0,
                    marginRight: index % 2 == 0 ? Sizes.fixPadding - 2.0 : Sizes.fixPadding * 2.0,
                }}
            >
                <Image
                    source={item.image}
                    style={{
                        width: '100%',
                        height: 160.0,
                        borderRadius: Sizes.fixPadding - 5.0
                    }}
                />
                <Text style={{ marginTop: Sizes.fixPadding - 8.0, ...Fonts.blackColor15SemiBold }}>
                    {item.libraryFor}
                </Text>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={libraryList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={2}
                scrollEnabled={false}
            />
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
                            Library
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
        marginBottom: Sizes.fixPadding + 5.0,
    },
})

export default LibraryScreen;