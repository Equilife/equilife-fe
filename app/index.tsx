import { Icons } from "@/constants/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, View } from "react-native";

export default function SplashScreen() {
    useEffect(() => {
        const checkFirstLaunch = async () => {
            try {
                // Check if this is the first time opening the app
                const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");

                // Wait 3 seconds for splash screen
                setTimeout(() => {
                    if (hasSeenOnboarding === null) {
                        // First time user - show onboarding
                        router.replace("./onboarding/exercise-selection");
                    } else {
                        // Returning user - go to main app
                        router.replace("./home");
                    }
                }, 2000);
            } catch (error) {
                console.error("Error checking first launch:", error);
                // Fallback to onboarding if there's an error
                setTimeout(() => {
                    router.replace("./onboarding/exercise-selection");
                }, 3000);
            }
        };

        checkFirstLaunch();
    }, []);

    return (
        <View className="flex-1 justify-center items-center bg-white">
            {/* Logo Container */}
            <View className="items-center">
                <Image source={Icons.logo} className="w-28 h-28" resizeMode="contain" />
            </View>
        </View>
    );
}
