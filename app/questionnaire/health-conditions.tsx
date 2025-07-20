import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const healthConditions = [
    { id: 1, title: "Diabetes", description: "Blood sugar management condition" },
    { id: 2, title: "Hypertension", description: "High blood pressure condition" },
    { id: 3, title: "Heart Disease", description: "Cardiovascular health condition" },
    { id: 4, title: "Obesity", description: "Weight management condition" },
    { id: 5, title: "Asthma", description: "Respiratory condition" },
    { id: 6, title: "Arthritis", description: "Joint inflammation condition" },
    { id: 7, title: "Depression", description: "Mental health condition" },
    { id: 8, title: "Anxiety", description: "Mental health condition" },
];

export default function HealthConditionsScreen() {
    const [selectedConditions, setSelectedConditions] = useState<number[]>([]);

    const handleConditionToggle = (conditionId: number) => {
        setSelectedConditions((prev) => {
            if (prev.includes(conditionId)) {
                return prev.filter((id) => id !== conditionId);
            } else {
                return [...prev, conditionId];
            }
        });
    };

    const handleContinue = () => {
        router.push("./health-goals");
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <View className="flex-1 bg-[#E8F0EC] px-6 py-12">
            {/* Title */}
            <View className="mt-8 mb-8">
                <Text className="text-3xl font-poppins-bold text-black mb-4">Do you have any existing{"\n"}health conditions?</Text>

                <Text className="text-lg font-poppins text-gray-600">Select all that apply to help us personalize your health plan</Text>
            </View>

            {/* Health Conditions List */}
            <ScrollView className="flex-1 mb-6" showsVerticalScrollIndicator={false}>
                {healthConditions.map((condition) => {
                    const isSelected = selectedConditions.includes(condition.id);

                    return (
                        <TouchableOpacity
                            key={condition.id}
                            onPress={() => handleConditionToggle(condition.id)}
                            className={`mb-4 p-4 rounded-2xl border-2 flex-row items-center justify-between ${isSelected ? "bg-[#8EAE9D] border-[#8EAE9D]" : "bg-white border-[#8EAE9D]"}`}
                        >
                            <View className="flex-1">
                                <Text className={`font-poppins-semibold text-lg mb-1 ${isSelected ? "text-white" : "text-gray-800"}`}>{condition.title}</Text>
                                <Text className={`font-poppins text-sm ${isSelected ? "text-white/80" : "text-gray-600"}`}>{condition.description}</Text>
                            </View>

                            <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${isSelected ? "bg-white border-white" : "bg-transparent border-[#8EAE9D]"}`}>
                                {isSelected && <Text className="text-[#8EAE9D] text-sm font-bold">✓</Text>}
                            </View>
                        </TouchableOpacity>
                    );
                })}

                {/* None of the above option */}
                <TouchableOpacity
                    onPress={() => setSelectedConditions([])}
                    className={`mb-4 p-4 rounded-2xl border-2 flex-row items-center justify-between ${selectedConditions.length === 0 ? "bg-[#8EAE9D] border-[#8EAE9D]" : "bg-white border-[#8EAE9D]"}`}
                >
                    <View className="flex-1">
                        <Text className={`font-poppins-semibold text-lg ${selectedConditions.length === 0 ? "text-white" : "text-gray-800"}`}>None of the above</Text>
                    </View>

                    <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${selectedConditions.length === 0 ? "bg-white border-white" : "bg-transparent border-[#8EAE9D]"}`}>
                        {selectedConditions.length === 0 && <Text className="text-[#8EAE9D] text-sm font-bold">✓</Text>}
                    </View>
                </TouchableOpacity>
            </ScrollView>

            {/* Navigation Buttons */}
            <View className="flex-row space-x-4 gap-2">
                <TouchableOpacity onPress={handleBack} className="w-16 h-16 bg-white border-2 border-[#8EAE9D] rounded-2xl justify-center items-center">
                    <Text className="text-[#8EAE9D] text-xl">←</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleContinue} className="flex-1 bg-[#8EAE9D] py-4 rounded-2xl">
                    <Text className="text-white font-poppins-semibold text-lg text-center">Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
