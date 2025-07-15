import { Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../style/global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
    // return (
    //     <Stack>
    //         <Stack.Screen name="index" options={{ headerShown: false }} />
    //         <Stack.Screen name="home" options={{ headerShown: false }} />
    //         <Stack.Screen name="onboarding/exercise-selection" options={{ headerShown: false }} />
    //         <Stack.Screen name="onboarding/sleep-deep" options={{ headerShown: false }} />
    //         <Stack.Screen name="onboarding/eat-clean" options={{ headerShown: false }} />
    //         <Stack.Screen name="onboarding/get-moving" options={{ headerShown: false }} />
    //         <Stack.Screen name="dev-settings" options={{ headerShown: false }} />
    //     </Stack>
    // );
}
