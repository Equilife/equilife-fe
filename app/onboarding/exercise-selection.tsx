import { Icons } from "@/constants/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ExerciseSelection() {
    const handleNext = () => {
        router.push("./sleep-deep");
    };

    const handleSkip = async () => {
        try {
            // Mark onboarding as completed even if skipped
            await AsyncStorage.setItem("hasSeenOnboarding", "true");
            // Go to auth screen
            router.replace("../auth");
        } catch (error) {
            console.error("Error saving onboarding status:", error);
            // Fallback to auth anyway
            router.replace("../auth");
        }
    };

    const VisualButton = ({ title, isActive = false }: { title: string; isActive?: boolean }) => (
        <View className="w-full p-5 rounded-[15px] mb-4 bg-white border-[3px] border-[#8EAE9D]">
            <Text className="text-center font-poppins-semibold text-[#8EAE9D]">{title}</Text>
        </View>
    );

    return (
        <View className="flex-1 bg-[#E2F1F0] px-6 py-12">
            {/* Visual Buttons Section */}
            <View className="flex-1 justify-center">
                <View className="mb-8 items-center">
                    <VisualButton title="Good sleep quality" />
                    <VisualButton title="Healthy food" />
                    <VisualButton title="Get enough exercise" />
                </View>

                <View className="items-center mb-8">
                    <Text className="text-2xl font-poppins-bold text-[#6B8377] text-center mb-4">Exercise: Moving Enough for a Stronger You</Text>
                    <Text className="text-base font-poppins text-[#6B8377] text-center leading-6 px-4">Regular physical activity strengthens your muscles, improves your heart health, and boosts your energy levels.</Text>
                </View>

                <View className="flex-row justify-evenly items-center">
                    <TouchableOpacity onPress={handleSkip} className="bg-white px-12 py-3 rounded-[10px] border-2 border-[#6B8377]">
                        <Text className="text-gray-600 font-poppins-semibold">Skip</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleNext} className="bg-[#8EAE9D] px-12 py-3  rounded-[10px] border-2 border-[#8EAE9D]">
                        <Text className="text-white font-poppins-semibold">Next</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Logo */}
            <View className="items-center mt-8">
                <Image source={Icons.logoLandscape} className="w-28 h-28" resizeMode="contain" />
            </View>
        </View>
    );
}
