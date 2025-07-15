import { OnboardingImages } from "@/constants/Images";
import { router } from "expo-router";
import { Image } from "react-native";
import OnboardingScreen from "./_components/OnboardingScreen";

export default function EatClean() {
    const handleNext = () => {
        router.push("./get-moving");
    };

    const EatCleanIllustration = () => {
        return <Image source={OnboardingImages.eatClean} className="w-60 h-60" resizeMode="contain" />;
    };

    return <OnboardingScreen title="Eat Clean: Fuel Your Body Right" subtitle="Eating nutritious, whole foods gives your body the fuel it needs to function at its best." illustration={<EatCleanIllustration />} onNext={handleNext} />;
}
