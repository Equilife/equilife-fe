import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function NameScreen() {
    const [firstName, setFirstName] = useState("");

    const handleContinue = () => {
        if (firstName.trim()) {
            // Store the name in context or async storage
            router.push("./profile");
        }
    };

    return (
        <View className="flex-1 bg-[#E8F0EC] px-6 py-12">
            {/* Progress Bar */}
            {/* <ProgressBar currentStep={4} totalSteps={6} /> */}

            {/* Title */}
            <View className="mt-16 mb-8">
                <Text className="text-3xl font-poppins-bold text-black mb-4">What name should{"\n"}we call you by? 👋✋</Text>
            </View>

            {/* Input Section */}
            <View className="flex-1">
                <Text className="text-lg font-poppins-medium text-gray-800 mb-4">Your preferred first name</Text>

                <TextInput
                    className="bg-white border-2 border-[#8EAE9D] rounded-2xl px-6 py-4 text-lg font-poppins text-gray-800"
                    placeholder="Enter your first name"
                    placeholderTextColor="#9CA3AF"
                    value={firstName}
                    onChangeText={setFirstName}
                    autoFocus={true}
                />
            </View>

            <View className="mb-12">
                {/* Continue Button */}
                <TouchableOpacity onPress={handleContinue} disabled={!firstName.trim()} className={`py-4 rounded-2xl ${firstName.trim() ? "bg-[#8EAE9D]" : "bg-gray-300"}`}>
                    <Text className="text-white font-poppins-semibold text-lg text-center">Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
