import { Sleep } from "@/constants/Images";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SleepGoal {
    startTime: string;
    wakeTime: string;
    duration: number;
}

interface TimePickerState {
    show: boolean;
    type: "start" | "wake";
    date: Date;
}

export default function SleepScheduleScreen() {
    const insets = useSafeAreaInsets();

    const [sleepGoal, setSleepGoal] = useState<SleepGoal>({
        startTime: "22:00",
        wakeTime: "06:00",
        duration: 8,
    });

    const [timePicker, setTimePicker] = useState<TimePickerState>({
        show: false,
        type: "start",
        date: new Date(),
    });

    const [isLoading, setIsLoading] = useState(false);

    const saveSleepSchedule = async () => {
        if (sleepGoal.startTime === "00:00" || sleepGoal.wakeTime === "00:00") {
            Alert.alert("Incomplete Schedule", "Please set both start and wake up times.");
            return;
        }

        try {
            setIsLoading(true);
            // Implementation for saving schedule
            await new Promise((resolve) => setTimeout(resolve, 1000));
            Alert.alert("Success", "Sleep schedule saved successfully!");
            router.back();
        } catch {
            Alert.alert("Error", "Failed to save sleep schedule. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const calculateDuration = (startTime: string, wakeTime: string) => {
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [wakeHour, wakeMinute] = wakeTime.split(":").map(Number);

        let duration = wakeHour * 60 + wakeMinute - (startHour * 60 + startMinute);
        if (duration < 0) {
            duration += 24 * 60;
        }

        setSleepGoal((prev) => ({
            ...prev,
            duration: Math.round((duration / 60) * 10) / 10,
        }));
    };

    const showTimePicker = (type: "start" | "wake") => {
        const currentTime = type === "start" ? sleepGoal.startTime : sleepGoal.wakeTime;
        const [hour, minute] = currentTime.split(":").map(Number);
        const date = new Date();
        date.setHours(hour, minute, 0, 0);

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

            setSleepGoal((prev) => ({
                ...prev,
                [timePicker.type === "start" ? "startTime" : "wakeTime"]: timeString,
            }));

            const otherTime = timePicker.type === "start" ? sleepGoal.wakeTime : sleepGoal.startTime;
            if (otherTime !== "00:00") {
                const startTime = timePicker.type === "start" ? timeString : sleepGoal.startTime;
                const wakeTime = timePicker.type === "wake" ? timeString : sleepGoal.wakeTime;
                calculateDuration(startTime, wakeTime);
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
                <Text className="text-xl font-poppins-semibold text-gray-900">Sleep schedule</Text>
                <View className="w-10" />
            </View>

            {/* Main Content */}
            <View className="flex-1 px-6">
                {/* Illustration Container */}
                <View className="items-center mt-4 mb-8">
                    <View className="w-72 h-48">
                        <Image source={Sleep.sleepImage} className="w-full h-full" resizeMode="contain" />
                    </View>
                </View>

                {/* Title and Description */}
                <View className="mb-4">
                    <Text className="text-2xl font-poppins-bold text-gray-900 text-center mb-3">Set Your Sleep Goal</Text>
                    <Text className="text-base font-poppins text-gray-500 text-center leading-6">With a goal, we recommend you set optimal{"\n"}time and wake up alarm</Text>
                </View>

                {/* Time Pickers */}
                <View className="mb-4">
                    <View className="flex-row justify-between mb-4">
                        {/* Start Time */}
                        <View className="flex-1 mr-3">
                            <Text className="text-lg font-poppins-medium text-center text-gray-900 mb-3">Start</Text>
                            <TouchableOpacity className="bg-[#C3DFE2] border-[3px] border-[#114438] rounded-2xl px-6 py-4" onPress={() => showTimePicker("start")}>
                                <Text className="text-xl font-poppins-semibold text-gray-900 text-center">{sleepGoal.startTime}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Wake Up Time */}
                        <View className="flex-1 ml-3">
                            <Text className="text-lg font-poppins-medium text-center text-gray-900 mb-3">Wake up</Text>
                            <TouchableOpacity className="bg-[#C3DFE2] border-[3px] border-[#114438] rounded-2xl px-6 py-4" onPress={() => showTimePicker("wake")}>
                                <Text className="text-xl font-poppins-semibold text-gray-900 text-center">{sleepGoal.wakeTime}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Sleep Duration Display */}
                    {/* {sleepGoal.duration > 0 && sleepGoal.startTime !== "00:00" && sleepGoal.wakeTime !== "00:00" && (
                        <View className="bg-gray-50 rounded-2xl p-4 mb-4">
                            <Text className="text-center text-lg font-poppins-medium text-gray-700">Sleep Duration: {sleepGoal.duration} hours</Text>
                            <Text className="text-center text-sm font-poppins text-gray-500 mt-1">
                                {sleepGoal.duration >= 7 && sleepGoal.duration <= 9 ? "✅ Recommended sleep duration" : sleepGoal.duration < 7 ? "⚠️ Consider sleeping longer for better health" : "⚠️ This might be too long"}
                            </Text>
                        </View>
                    )} */}
                </View>

                {/* Set Schedule Button */}
                <View className="mb-4">
                    <TouchableOpacity className="bg-[#8EAE9D] rounded-2xl py-4 px-6" onPress={saveSleepSchedule} disabled={isLoading}>
                        <Text className="text-lg font-poppins-semibold text-white text-center">{isLoading ? "Saving..." : "Set sleep schedule"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Date Time Picker */}
            {timePicker.show && <DateTimePicker value={timePicker.date} mode="time" is24Hour={true} display={Platform.OS === "ios" ? "spinner" : "default"} onChange={handleTimeChange} />}
        </ScrollView>
    );
}
