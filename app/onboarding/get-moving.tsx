import { OnboardingImages } from "@/constants/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Image } from "react-native";
import OnboardingScreen from "./_components/OnboardingScreen";

export default function GetMoving() {
    const handleNext = async () => {
        try {
            // Mark onboarding as completed
            await AsyncStorage.setItem("hasSeenOnboarding", "true");
            // Go to main app
            // router.replace("../home");
            router.replace("../auth");
        } catch (error) {
            console.error("Error saving onboarding status:", error);
            // Fallback to home anyway
            router.replace("../auth");
        }
    };

    const GetMovingIllustration = () => {
        return <Image source={OnboardingImages.getMoving} className="w-60 h-60" resizeMode="contain" />;
    };

    return (
        <OnboardingScreen title="Get Moving: Build Strength & Energy" subtitle="Regular movement strengthens your muscles, improves circulation, and boosts your energy levels." illustration={<GetMovingIllustration />} onNext={handleNext} />
    );
}
