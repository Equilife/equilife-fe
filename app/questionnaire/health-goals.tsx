import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const healthGoals = [
    { id: 1, title: "Weight Loss", description: "Reduce body weight in a healthy way" },
    { id: 2, title: "Weight Gain", description: "Increase body weight and muscle mass" },
    { id: 3, title: "Muscle Building", description: "Build lean muscle and strength" },
    { id: 4, title: "Cardio Fitness", description: "Improve cardiovascular health" },
    { id: 5, title: "Flexibility", description: "Increase mobility and flexibility" },
    { id: 6, title: "Stress Management", description: "Better mental health and relaxation" },
    { id: 7, title: "Better Sleep", description: "Improve sleep quality and duration" },
    { id: 8, title: "General Wellness", description: "Overall health improvement" },
];

export default function HealthGoalsScreen() {
    const [selectedGoals, setSelectedGoals] = useState<number[]>([]);

    const handleGoalToggle = (goalId: number) => {
        setSelectedGoals((prev) => {
            if (prev.includes(goalId)) {
                return prev.filter((id) => id !== goalId);
            } else {
                return [...prev, goalId];
            }
        });
    };

    const handleContinue = () => {
        router.push("./preferences");
    };

    const handleBack = () => {
        router.back();
    };

    const canContinue = selectedGoals.length > 0;

    return (
        <View className="flex-1 bg-[#E8F0EC] px-6 py-12">
            {/* Title */}
            <View className="mt-8 mb-8">
                <Text className="text-3xl font-poppins-bold text-black mb-4">What are your main{"\n"}health goals?</Text>

                <Text className="text-lg font-poppins text-gray-600">Select one or more goals to help us create your personalized plan</Text>
            </View>

            {/* Health Goals List */}
            <ScrollView className="flex-1 mb-6" showsVerticalScrollIndicator={false}>
                {healthGoals.map((goal) => {
                    const isSelected = selectedGoals.includes(goal.id);

                    return (
                        <TouchableOpacity
                            key={goal.id}
                            onPress={() => handleGoalToggle(goal.id)}
                            className={`mb-4 p-4 rounded-2xl border-2 flex-row items-center justify-between ${isSelected ? "bg-[#8EAE9D] border-[#8EAE9D]" : "bg-white border-[#8EAE9D]"}`}
                        >
                            <View className="flex-1">
                                <Text className={`font-poppins-semibold text-lg mb-1 ${isSelected ? "text-white" : "text-gray-800"}`}>{goal.title}</Text>
                                <Text className={`font-poppins text-sm ${isSelected ? "text-white/80" : "text-gray-600"}`}>{goal.description}</Text>
                            </View>

                            <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${isSelected ? "bg-white border-white" : "bg-transparent border-[#8EAE9D]"}`}>
                                {isSelected && <Text className="text-[#8EAE9D] text-sm font-poppins-bold">✓</Text>}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Navigation Buttons */}
            <View className="flex-row space-x-4 gap-2">
                <TouchableOpacity onPress={handleBack} className="w-16 h-16 bg-white border-2 border-[#8EAE9D] rounded-2xl justify-center items-center">
                    <Text className="text-[#8EAE9D] text-xl">←</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleContinue} disabled={!canContinue} className={`flex-1 py-4 rounded-2xl ${canContinue ? "bg-[#8EAE9D]" : "bg-gray-300"}`}>
                    <Text className="text-white font-poppins-semibold text-lg text-center">Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
