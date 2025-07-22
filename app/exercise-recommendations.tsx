import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface WorkoutType {
    id: string;
    name: string;
    selected: boolean;
}

export default function ExerciseRecommendationsScreen() {
    const insets = useSafeAreaInsets();

    const [workouts, setWorkouts] = useState<WorkoutType[]>([
        { id: "swimming", name: "Swimming", selected: false },
        { id: "running", name: "Running", selected: false },
        { id: "gym", name: "Gym", selected: false },
        { id: "tennis", name: "Tennis", selected: false },
    ]);

    const [isLoading, setIsLoading] = useState(false);

    const toggleWorkoutSelection = (id: string) => {
        setWorkouts((prev) => prev.map((workout) => (workout.id === id ? { ...workout, selected: !workout.selected } : workout)));
    };

    const handleSetExercise = async () => {
        const selectedWorkouts = workouts.filter((w) => w.selected);

        if (selectedWorkouts.length === 0) {
            Alert.alert("No Selection", "Please select at least one workout type.");
            return;
        }

        try {
            setIsLoading(true);
            // TODO: Save selected exercise types to backend
            await new Promise((resolve) => setTimeout(resolve, 1000));

            Alert.alert("Success", `Your preferred workouts have been saved: ${selectedWorkouts.map((w) => w.name).join(", ")}`, [
                {
                    text: "OK",
                    onPress: () => router.replace("./(tabs)/exercise"),
                },
            ]);
        } catch {
            Alert.alert("Error", "Failed to save exercise preferences. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <Text className="text-2xl font-poppins">←</Text>
                </TouchableOpacity>
                <Text className="text-xl font-poppins-semibold text-gray-900">Exercise Recommendations</Text>
                <View className="w-10" />
            </View>

            <View className="flex-1 px-6">
                {/* Title */}
                <View className="mb-8 mt-4">
                    <Text className="text-2xl font-poppins-bold text-gray-900 text-center">Find Your Perfect Workout</Text>
                </View>

                {/* Workout Grid */}
                <View className="mb-8">
                    {/* First Row */}
                    <View className="flex-row justify-between mb-6">
                        {/* Swimming */}
                        <TouchableOpacity
                            className={`flex-1 mr-3 rounded-3xl p-6 ${workouts[0].selected ? "bg-[#A8CDD8] border-2 border-[#1F4E42]" : "bg-[#B0D0D3]"}`}
                            onPress={() => toggleWorkoutSelection("swimming")}
                            style={{ aspectRatio: 0.8 }}
                        >
                            {/* Placeholder for swimming illustration */}
                            <View className="flex-1 bg-gray-300 rounded-2xl mb-4 items-center justify-center">
                                <Text className="text-gray-500 text-xs">Swimming</Text>
                                <Text className="text-gray-500 text-xs">Illustration</Text>
                            </View>
                            <Text className="text-xl font-poppins-bold text-gray-900 text-center">Swimming</Text>
                        </TouchableOpacity>

                        {/* Running */}
                        <TouchableOpacity
                            className={`flex-1 ml-3 rounded-3xl p-6 ${workouts[1].selected ? "bg-[#A8CDD8] border-2 border-[#1F4E42]" : "bg-[#B0D0D3]"}`}
                            onPress={() => toggleWorkoutSelection("running")}
                            style={{ aspectRatio: 0.8 }}
                        >
                            {/* Placeholder for running illustration */}
                            <View className="flex-1 bg-gray-300 rounded-2xl mb-4 items-center justify-center">
                                <Text className="text-gray-500 text-xs">Running</Text>
                                <Text className="text-gray-500 text-xs">Illustration</Text>
                            </View>
                            <Text className="text-xl font-poppins-bold text-gray-900 text-center">Running</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Second Row */}
                    <View className="flex-row justify-between mb-6">
                        {/* Gym */}
                        <TouchableOpacity
                            className={`flex-1 mr-3 rounded-3xl p-6 ${workouts[2].selected ? "bg-[#A8CDD8] border-2 border-[#1F4E42]" : "bg-[#B0D0D3]"}`}
                            onPress={() => toggleWorkoutSelection("gym")}
                            style={{ aspectRatio: 0.8 }}
                        >
                            {/* Placeholder for gym illustration */}
                            <View className="flex-1 bg-gray-300 rounded-2xl mb-4 items-center justify-center">
                                <Text className="text-gray-500 text-xs">Gym</Text>
                                <Text className="text-gray-500 text-xs">Illustration</Text>
                            </View>
                            <Text className="text-xl font-poppins-bold text-gray-900 text-center">Gym</Text>
                        </TouchableOpacity>

                        {/* Tennis */}
                        <TouchableOpacity
                            className={`flex-1 ml-3 rounded-3xl p-6 ${workouts[3].selected ? "bg-[#A8CDD8] border-2 border-[#1F4E42]" : "bg-[#B0D0D3]"}`}
                            onPress={() => toggleWorkoutSelection("tennis")}
                            style={{ aspectRatio: 0.8 }}
                        >
                            {/* Placeholder for tennis illustration */}
                            <View className="flex-1 bg-gray-300 rounded-2xl mb-4 items-center justify-center">
                                <Text className="text-gray-500 text-xs">Tennis</Text>
                                <Text className="text-gray-500 text-xs">Illustration</Text>
                            </View>
                            <Text className="text-xl font-poppins-bold text-gray-900 text-center">Tennis</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Set Exercise Button */}
                <View className="mb-8">
                    <TouchableOpacity
                        className="bg-[#8EAE9D] rounded-3xl py-4 px-6"
                        onPress={handleSetExercise}
                        disabled={isLoading}
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 8,
                            elevation: 8,
                        }}
                    >
                        <Text className="text-xl font-poppins-semibold text-white text-center">{isLoading ? "Saving..." : "Set Exercise"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
