import { Tabs, useNavigation } from 'expo-router';
import React, { useState, useCallback } from "react";
import { BackHandler, View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function TabLayout() {

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
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000)
  }

  const navigation = useNavigation();

  const [backClickCount, setBackClickCount] = useState(0);
  const [pauseSong, setPauseSong] = useState(true);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: Colors.whiteColor, height: 60.0 },
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarItemStyle: { height: 60 }
        }}
      >
        <Tabs.Screen
          name="explore/exploreScreen"
          options={{
            tabBarIcon: ({ focused }) => tabIcon({ icon: 'music-note', focused })
          }}
        />
        <Tabs.Screen
          name="trending/trendingScreen"
          options={{
            tabBarIcon: ({ focused }) => tabIcon({ icon: 'local-fire-department', focused })
          }}
        />
        <Tabs.Screen
          name="library/libraryScreen"
          options={{
            tabBarIcon: ({ focused }) => tabIcon({ icon: 'library-music', focused })
          }}
        />
        <Tabs.Screen
          name="settings/settingsScreen"
          options={{
            tabBarIcon: ({ focused }) => tabIcon({ icon: 'settings', focused })
          }}
        />
      </Tabs>
      {currentlyPlayedSong()}
      {exitInfo()}
    </>
  );

  function exitInfo() {
    return (
      backClickCount == 1
        ?
        <View style={styles.animatedView}>
          <Text style={{ ...Fonts.whiteColor12Medium }}>
            Press Back Once Again to Exit
          </Text>
        </View>
        :
        null
    )
  }

  function tabIcon({ icon, focused }) {
    return (
      focused
        ?
        <MaskedView
          style={{ flex: 1, height: 35, flexDirection: 'row', marginTop: Sizes.fixPadding + 2.0 }}
          maskElement={
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <MaterialIcons
                color={'black'}
                size={35}
                name={icon}
              />
            </View>
          }
        >
          <LinearGradient
            start={{ x: 0, y: 0.7 }}
            end={{ x: 0, y: 0 }}
            colors={[Colors.primaryColor, Colors.secondaryColor]}
            style={{ flex: 1 }}
          />
        </MaskedView>
        :
        <MaterialIcons
          color={Colors.blackColor}
          size={35}
          style={{ alignSelf: 'center' }}
          name={icon}
        />
    )
  }

  function currentlyPlayedSong() {
    return (
      <TouchableOpacity
        activeOpacity={1}
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
              Ben Kane
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
            onPress={() => setPauseSong(!pauseSong)}
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
}

const styles = StyleSheet.create({
  bottomTabBarStyle: {
    height: 60.0,
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: '#F2F2F2',
    borderTopWidth: 0.50,
    elevation: 2.0
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
    justifyContent: 'center',
    ...CommonStyles.shadow
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
    ...CommonStyles.shadow
  },
  currentlyPlayedSongInfoWrapStyle: {
    left: 0.0,
    right: 0.0,
    bottom: 60.0,
    position: 'absolute',
    zIndex: 100.0,
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.lightGrayColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    ...CommonStyles.shadow
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
})