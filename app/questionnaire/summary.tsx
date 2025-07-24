import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SummaryScreen() {
    const handleContinue = () => {
        // Navigate directly to dashboard
        router.replace("../../(tabs)");
    };

    const handleBack = () => {
        router.back();
    };

    // Mock data - in real app, this would come from context/state
    const userData = {
        name: "Alex",
        age: 25,
        gender: "Female",
        height: "165 cm",
        weight: "60 kg",
        healthConditions: ["None"],
        healthGoals: ["Weight Loss", "Cardio Fitness"],
        dietaryPreferences: ["Vegetarian", "Low Sodium"],
    };

    return (
        <View className="flex-1 bg-[#E8F0EC] px-6 py-12">
            {/* Title */}
            <View className="mt-8 mb-8">
                <Text className="text-3xl font-poppins-bold text-black mb-4">
                    Perfect! Let&apos;s review{"\n"}your profile, {userData.name}
                </Text>

                <Text className="text-lg font-poppins text-gray-600">Make sure everything looks correct before we create your personalized plan</Text>
            </View>

            {/* Summary Content */}
            <ScrollView className="flex-1 mb-6" showsVerticalScrollIndicator={false}>
                {/* Personal Info */}
                <View className="bg-white rounded-2xl p-6 mb-4 border-2 border-[#8EAE9D]">
                    <Text className="text-xl font-poppins-bold text-gray-800 mb-4">Personal Information</Text>

                    <View className="space-y-3">
                        <View className="flex-row justify-between">
                            <Text className="font-poppins text-gray-600">Name:</Text>
                            <Text className="font-poppins-semibold text-gray-800">{userData.name}</Text>
                        </View>

                        <View className="flex-row justify-between">
                            <Text className="font-poppins text-gray-600">Age:</Text>
                            <Text className="font-poppins-semibold text-gray-800">{userData.age} years</Text>
                        </View>

                        <View className="flex-row justify-between">
                            <Text className="font-poppins text-gray-600">Gender:</Text>
                            <Text className="font-poppins-semibold text-gray-800">{userData.gender}</Text>
                        </View>

                        <View className="flex-row justify-between">
                            <Text className="font-poppins text-gray-600">Height:</Text>
                            <Text className="font-poppins-semibold text-gray-800">{userData.height}</Text>
                        </View>

                        <View className="flex-row justify-between">
                            <Text className="font-poppins text-gray-600">Weight:</Text>
                            <Text className="font-poppins-semibold text-gray-800">{userData.weight}</Text>
                        </View>
                    </View>
                </View>

                {/* Health Information */}
                <View className="bg-white rounded-2xl p-6 mb-4 border-2 border-[#8EAE9D]">
                    <Text className="text-xl font-poppins-bold text-gray-800 mb-4">Health Information</Text>

                    <View className="mb-4">
                        <Text className="font-poppins-semibold text-gray-700 mb-2">Health Conditions:</Text>
                        <View className="flex-row flex-wrap">
                            {userData.healthConditions.map((condition, index) => (
                                <View key={index} className="bg-[#F0F9F4] px-3 py-1 rounded-full mr-2 mb-2">
                                    <Text className="font-poppins text-sm text-[#8EAE9D]">{condition}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View>
                        <Text className="font-poppins-semibold text-gray-700 mb-2">Health Goals:</Text>
                        <View className="flex-row flex-wrap">
                            {userData.healthGoals.map((goal, index) => (
                                <View key={index} className="bg-[#F0F9F4] px-3 py-1 rounded-full mr-2 mb-2">
                                    <Text className="font-poppins text-sm text-[#8EAE9D]">{goal}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Dietary Preferences */}
                <View className="bg-white rounded-2xl p-6 mb-4 border-2 border-[#8EAE9D]">
                    <Text className="text-xl font-poppins-bold text-gray-800 mb-4">Dietary Preferences</Text>

                    <View className="flex-row flex-wrap">
                        {userData.dietaryPreferences.map((preference, index) => (
                            <View key={index} className="bg-[#F0F9F4] px-3 py-1 rounded-full mr-2 mb-2">
                                <Text className="font-poppins text-sm text-[#8EAE9D]">{preference}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Success Message */}
                <View className="bg-[#8EAE9D] rounded-2xl p-6 mb-4">
                    <Text className="text-xl font-poppins-bold text-white mb-2">🎉 You&apos;re all set!</Text>
                    <Text className="font-poppins text-white">Based on your profile, we&apos;ll create a personalized health plan just for you. You can always update your preferences in the app settings.</Text>
                </View>
            </ScrollView>

            {/* Navigation Buttons */}
            <View className="flex-row space-x-4 gap-2">
                <TouchableOpacity onPress={handleBack} className="w-16 h-16 bg-white border-2 border-[#8EAE9D] rounded-2xl justify-center items-center">
                    <Text className="text-[#8EAE9D] text-xl">←</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleContinue} className="flex-1 bg-[#8EAE9D] py-4 rounded-2xl">
                    <Text className="text-white font-poppins-semibold text-lg text-center">Start My Health Journey</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
