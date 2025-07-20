import { Icons } from "@/constants/Images";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface OnboardingScreenProps {
    title: string;
    subtitle: string;
    illustration: React.ReactNode;
    onNext: () => void;
    showSkip?: boolean;
}

export default function OnboardingScreen({ title, subtitle, illustration, onNext, showSkip = true }: OnboardingScreenProps) {
    const handleSkip = () => {
        router.replace("../auth");
    };

    return (
        <View className="flex-1 bg-[#E2F1F0] px-6 py-12">
            {/* Illustration */}
            <View className="flex-1">
                <View className="h-2/4 justify-center items-center">{illustration}</View>

                {/* Content */}
                <View className="items-center h-[11.11rem]">
                    <Text className="text-2xl font-poppins-bold text-[#6B8377] text-center mb-4">{title}</Text>
                    <Text className="text-base font-poppins text-[#6B8377] text-center leading-6 px-4">{subtitle}</Text>
                </View>

                {/* Buttons */}
                <View className="flex-row justify-evenly items-center">
                    {showSkip ? (
                        <TouchableOpacity onPress={handleSkip} className="bg-white px-12 py-3 rounded-[10px] border-2 border-[#6B8377]">
                            <Text className="text-[#6B8377] font-poppins-semibold">Skip</Text>
                        </TouchableOpacity>
                    ) : (
                        <View />
                    )}

                    <TouchableOpacity onPress={onNext} className="bg-[#8EAE9D] px-12 py-3  rounded-[10px] border-2 border-[#8EAE9D]">
                        <Text className="text-white font-poppins-semibold">Next</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Logo */}
            <View className="items-center ">
                <Image source={Icons.logoLandscape} className="w-28 h-28 justify-self-end" resizeMode="contain" />
            </View>
        </View>
    );
}
