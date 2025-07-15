import { OnboardingImages } from "@/constants/Images";
import { router } from "expo-router";
import { Image } from "react-native";
import OnboardingScreen from "./_components/OnboardingScreen";

export default function SleepDeep() {
    const handleNext = () => {
        router.push("./eat-clean");
    };

    const SleepDeepIllustration = () => {
        return <Image source={OnboardingImages.sleepDeep} className="w-60 h-60" resizeMode="contain" />;
    };

    return (
        <OnboardingScreen
            title="Sleep Deep: Recharge & Thrive"
            subtitle="Quality sleep restores your body and mind, improves mood, sharpens focus, and strengthens your immune system."
            illustration={<SleepDeepIllustration />}
            onNext={handleNext}
        />
    );
}
