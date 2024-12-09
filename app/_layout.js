import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    Montserrat_Light: require("../assets/fonts/Montserrat-Light.ttf"),
    Montserrat_Regular: require("../assets/fonts/Montserrat-Regular.ttf"),
    Montserrat_Medium: require("../assets/fonts/Montserrat-Medium.ttf"),
    Montserrat_SemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    Montserrat_Bold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/signinScreen" options={{ gestureEnabled: false }} />
      <Stack.Screen name="auth/signupScreen" />
      <Stack.Screen name="chooseMusic/chooseMusicScreen" />
      <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
      <Stack.Screen name="search/searchScreen" />
      <Stack.Screen name="tracks/tracksScreen" />
      <Stack.Screen name="nowPlaying/nowPlayingScreen" />
      <Stack.Screen name="topArtist/topArtistScreen" />
      <Stack.Screen name="subscribe/subscribeScreen" />
      <Stack.Screen name="exploreSubscription/exploreSubscriptionScreen" />
      <Stack.Screen name="paymentFailed/paymentFailedScreen" options={{ gestureEnabled: false }} />
    </Stack>
  );
}
