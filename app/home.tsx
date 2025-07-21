import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
    const goToDashboard = () => {
        router.push("./(tabs)");
        // router.push("./dashboard");
    };

    const resetOnboarding = () => {
        router.push("./dev-settings");
    };

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-2xl font-poppins-bold text-gray-800">Welcome to Equilife!</Text>
            <Text className="text-base font-poppins text-gray-600 mt-4">This is your main app screen</Text>

            <TouchableOpacity onPress={goToDashboard} className="bg-[#8EAE9D] px-8 py-3 rounded-full mb-4 mt-8">
                <Text className="text-white font-poppins-semibold">Go to App</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={resetOnboarding} className="bg-red-500 px-8 py-3 rounded-full mb-4">
                <Text className="text-white font-poppins-semibold">Reset Onboarding</Text>
            </TouchableOpacity>
        </View>
    );
}
