import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function DevSettings() {
    const resetOnboarding = async () => {
        try {
            await AsyncStorage.removeItem("hasSeenOnboarding");
            Alert.alert("Success", "Onboarding reset! Close and reopen the app to see onboarding again.", [{ text: "OK", onPress: () => router.push("/") }]);
        } catch (error) {
            console.error("Error resetting onboarding:", error);
            Alert.alert("Error", "Failed to reset onboarding");
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-white p-6">
            <Text className="text-2xl font-poppins-bold text-gray-800 mb-4">Dev Settings</Text>

            <TouchableOpacity onPress={resetOnboarding} className="bg-red-500 px-8 py-3 rounded-full mb-4">
                <Text className="text-white font-poppins-semibold">Reset Onboarding</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/")} className="bg-gray-500 px-8 py-3 rounded-full">
                <Text className="text-white font-poppins-semibold">Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
}
