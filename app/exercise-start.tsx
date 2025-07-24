import { Exercise } from "@/constants/Images";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ExerciseStartScreen() {
    const insets = useSafeAreaInsets();

    const [exerciseTime, setExerciseTime] = useState(0); // in seconds
    const [isRunning, setIsRunning] = useState(true);

    // Format time as HH:MM:SS
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    // Timer effect
    useEffect(() => {
        let interval: any;

        if (isRunning) {
            interval = setInterval(() => {
                setExerciseTime((prev) => prev + 1);
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning]);

    const handleStopExercise = () => {
        Alert.alert("Stop Workout", "Are you sure you want to stop your workout?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Stop",
                style: "destructive",
                onPress: async () => {
                    setIsRunning(false);

                    try {
                        // TODO: Save exercise session data to backend
                        await saveExerciseSession({
                            duration: exerciseTime,
                            timestamp: new Date().toISOString(),
                            // Add other relevant data
                        });

                        // Navigate back to exercise tab
                        router.push("/(tabs)/exercise");
                    } catch {
                        Alert.alert("Error", "Failed to save exercise session.");
                    }
                },
            },
        ]);
    };

    // Backend functions (placeholder)
    const saveExerciseSession = async (sessionData: { duration: number; timestamp: string }) => {
        // TODO: Implement backend call to save exercise session
        console.log("Saving exercise session:", sessionData);
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
    };

    const pauseExercise = () => {
        setIsRunning(!isRunning);
        // TODO: Implement pause/resume logic for backend tracking
    };

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <Text className="text-2xl font-poppins">←</Text>
                </TouchableOpacity>
                <Text className="text-xl font-poppins-semibold text-gray-900">Workout Session</Text>
                <View className="w-10" />
            </View>

            <View className="flex-1 items-center justify-center px-6">
                {/* Circular Exercise Illustration */}
                <View className="items-center mb-12">
                    {/* Outer Circle - Dark Green */}
                    <View className="w-80 h-80 rounded-full bg-[#7BA05B] items-center justify-center">
                        {/* Second Circle - Medium Green */}
                        <View className="w-72 h-72 rounded-full bg-[#8EAE9D] items-center justify-center">
                            {/* Third Circle - Light Green */}
                            <View className="w-64 h-64 rounded-full bg-[#B0D0D3] items-center justify-center">
                                {/* Inner Circle - Very Light Green */}
                                <View className="w-56 h-56 rounded-full bg-[#C3DFE2] items-center justify-center">
                                    {/* Center Circle - White */}
                                    <View className="w-48 h-48 rounded-full bg-white items-center justify-center">
                                        {/* Running Person Illustration Placeholder */}
                                        <View className="w-full h-full items-center justify-center">
                                            <Image source={Exercise.workoutImage} className="w-full h-full" resizeMode="contain" />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Exercise Timer */}
                <View className="mb-12">
                    <Text className="text-4xl font-poppins-bold text-gray-900 text-center">{formatTime(exerciseTime)}</Text>
                </View>

                {/* Control Buttons */}
                <View className="w-full px-6">
                    {/* Pause/Resume Button */}
                    <TouchableOpacity className={`rounded-2xl py-4 px-6 mb-4 ${isRunning ? "bg-orange-500" : "bg-green-500"}`} onPress={pauseExercise}>
                        <Text className="text-lg font-poppins-semibold text-white text-center">{isRunning ? "Pause Workout" : "Resume Workout"}</Text>
                    </TouchableOpacity>

                    {/* Stop Workout Button */}
                    <TouchableOpacity
                        className="bg-[#8EAE9D] rounded-2xl py-4 px-6"
                        onPress={handleStopExercise}
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 8,
                            elevation: 8,
                        }}
                    >
                        <View className="flex-row items-center justify-center">
                            {/* <View className="w-4 h-4 rounded-full bg-white mr-3" /> */}
                            <Image source={Exercise.endWorkout} className="w-7 h-7 mr-4 -ml-2" resizeMode="contain" />
                            <Text className="text-lg font-poppins-semibold text-white">Stop Workout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom spacing for safe area */}
            <View style={{ height: Math.max(insets.bottom, 20) }} />
        </View>
    );
}
