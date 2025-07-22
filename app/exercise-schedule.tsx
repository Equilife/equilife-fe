import { Exercise } from "@/constants/Images";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ExerciseGoal {
    startTime: string;
    endTime: string;
    duration: number;
}

interface TimePickerState {
    show: boolean;
    type: "start" | "end";
    date: Date;
}

export default function ExerciseScheduleScreen() {
    const insets = useSafeAreaInsets();

    const [exerciseGoal, setExerciseGoal] = useState<ExerciseGoal>({
        startTime: "06:00",
        endTime: "07:00",
        duration: 1,
    });

    const [timePicker, setTimePicker] = useState<TimePickerState>({
        show: false,
        type: "start",
        date: new Date(),
    });

    const [isLoading, setIsLoading] = useState(false);

    const saveExerciseSchedule = async () => {
        if (exerciseGoal.startTime === "00:00" || exerciseGoal.endTime === "00:00") {
            Alert.alert("Incomplete Schedule", "Please set both start and end times.");
            return;
        }

        try {
            setIsLoading(true);
            // TODO: Implementation for saving exercise schedule
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Navigate to exercise recommendations
            router.push("/exercise-recommendations");
        } catch {
            Alert.alert("Error", "Failed to save exercise schedule. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const calculateDuration = (start: string, end: string) => {
        const [startHour, startMinute] = start.split(":").map(Number);
        const [endHour, endMinute] = end.split(":").map(Number);

        const startInMinutes = startHour * 60 + startMinute;
        const endInMinutes = endHour * 60 + endMinute;

        let durationInMinutes = endInMinutes - startInMinutes;

        // Handle case where end time is next day
        if (durationInMinutes < 0) {
            durationInMinutes += 24 * 60;
        }

        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;

        setExerciseGoal((prev) => ({
            ...prev,
            duration: hours + minutes / 60,
        }));
    };

    const showTimePicker = (type: "start" | "end") => {
        const currentTime = type === "start" ? exerciseGoal.startTime : exerciseGoal.endTime;
        const [hours, minutes] = currentTime.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);

        setTimePicker({
            show: true,
            type,
            date,
        });
    };

    const handleTimeChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === "android") {
            setTimePicker((prev) => ({ ...prev, show: false }));
        }

        if (selectedDate) {
            const timeString = selectedDate.toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
            });

            setExerciseGoal((prev) => ({
                ...prev,
                [timePicker.type === "start" ? "startTime" : "endTime"]: timeString,
            }));

            const otherTime = timePicker.type === "start" ? exerciseGoal.endTime : exerciseGoal.startTime;
            if (otherTime !== "00:00") {
                const startTime = timePicker.type === "start" ? timeString : exerciseGoal.startTime;
                const endTime = timePicker.type === "end" ? timeString : exerciseGoal.endTime;
                calculateDuration(startTime, endTime);
            }
        }

        if (Platform.OS === "ios") {
            setTimePicker((prev) => ({ ...prev, show: false }));
        }
    };

    return (
        <ScrollView className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <Text className="text-2xl font-poppins">←</Text>
                </TouchableOpacity>
                <Text className="text-xl font-poppins-semibold text-gray-900">Exercise schedule</Text>
                <View className="w-10" />
            </View>

            <View className="flex-1 px-6">
                {/* Exercise Illustration */}
                <View className="items-center mt-4 mb-8">
                    <View className="w-72 h-52">
                        <Image source={Exercise.exerciseImage} className="w-full h-full" resizeMode="contain" />
                    </View>
                </View>

                {/* Title and Description */}
                <View className="mb-4">
                    <Text className="text-2xl font-poppins-bold text-gray-900 text-center mb-3">Set Your Exercise Goal</Text>
                    <Text className="text-base font-poppins text-gray-500 text-center leading-6">With a goal, we recommend you set optimal{"\n"}time and wake up alarm</Text>
                </View>

                {/* Time Pickers */}
                <View className="mb-4">
                    <View className="flex-row justify-between mb-4">
                        {/* Start Time */}
                        <View className="flex-1 mr-3">
                            <Text className="text-lg font-poppins-medium text-center text-gray-900 mb-3">Start</Text>
                            <TouchableOpacity className="bg-[#C3DFE2] border-[3px] border-[#114438] rounded-2xl px-6 py-4" onPress={() => showTimePicker("start")}>
                                <Text className="text-xl font-poppins-semibold text-gray-900 text-center">{exerciseGoal.startTime}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* End Time */}
                        <View className="flex-1 ml-3">
                            <Text className="text-lg font-poppins-medium text-center text-gray-900 mb-3">End</Text>
                            <TouchableOpacity className="bg-[#C3DFE2] border-[3px] border-[#114438] rounded-2xl px-6 py-4" onPress={() => showTimePicker("end")}>
                                <Text className="text-xl font-poppins-semibold text-gray-900 text-center">{exerciseGoal.endTime}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Duration Display */}
                    {/* {exerciseGoal.duration > 0 && exerciseGoal.startTime !== "00:00" && exerciseGoal.endTime !== "00:00" && (
                        <View className="bg-gray-50 rounded-2xl p-4 mb-4">
                            <Text className="text-center text-lg font-poppins-medium text-gray-700">
                                Exercise Duration: {Math.floor(exerciseGoal.duration)}h {Math.round((exerciseGoal.duration % 1) * 60)}m
                            </Text>
                            <Text className="text-center text-sm font-poppins text-gray-500 mt-1">
                                {exerciseGoal.duration >= 0.5 && exerciseGoal.duration <= 2 ? "✅ Good exercise duration" : exerciseGoal.duration < 0.5 ? "⚠️ Consider exercising longer" : "⚠️ This might be too long"}
                            </Text>
                        </View>
                    )} */}
                </View>

                {/* Set Schedule Button */}
                <View className="mb-4">
                    <TouchableOpacity className="bg-[#8EAE9D] rounded-2xl py-4 px-6" onPress={saveExerciseSchedule} disabled={isLoading}>
                        <Text className="text-lg font-poppins-semibold text-white text-center">{isLoading ? "Saving..." : "Set exercise schedule"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Time Picker */}
            {timePicker.show && <DateTimePicker value={timePicker.date} mode="time" is24Hour={true} display={Platform.OS === "ios" ? "spinner" : "default"} onChange={handleTimeChange} />}
        </ScrollView>
    );
}
