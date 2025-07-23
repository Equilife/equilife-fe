import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MealSchedule {
    breakfastStart: string;
    breakfastEnd: string;
    lunchStart: string;
    lunchEnd: string;
    dinnerStart: string;
    dinnerEnd: string;
}

interface TimePickerState {
    show: boolean;
    type: "breakfastStart" | "breakfastEnd" | "lunchStart" | "lunchEnd" | "dinnerStart" | "dinnerEnd";
    date: Date;
}

export default function NutritionScheduleScreen() {
    const insets = useSafeAreaInsets();

    const [mealSchedule, setMealSchedule] = useState<MealSchedule>({
        breakfastStart: "07:00",
        breakfastEnd: "08:00",
        lunchStart: "12:00",
        lunchEnd: "13:00",
        dinnerStart: "18:00",
        dinnerEnd: "19:00",
    });

    const [timePicker, setTimePicker] = useState<TimePickerState>({
        show: false,
        type: "breakfastStart",
        date: new Date(),
    });

    const [isLoading, setIsLoading] = useState(false);

    const saveMealSchedule = async () => {
        try {
            setIsLoading(true);
            // Implementation for saving meal schedule
            await new Promise((resolve) => setTimeout(resolve, 1000));
            Alert.alert("Success", "Meal schedule saved successfully!");
            router.back();
        } catch {
            Alert.alert("Error", "Failed to save meal schedule. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const showTimePicker = (type: TimePickerState["type"]) => {
        const currentTime = mealSchedule[type];
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

            setMealSchedule((prev) => ({
                ...prev,
                [timePicker.type]: timeString,
            }));
        }

        if (Platform.OS === "ios") {
            setTimePicker((prev) => ({ ...prev, show: false }));
        }
    };

    return (
        <ScrollView className="flex-1 bg-[#F5FBFC]" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <Text className="text-2xl font-poppins">←</Text>
                </TouchableOpacity>
                <Text className="text-xl font-poppins-semibold text-gray-900">Eats schedule</Text>
                <View className="w-10" />
            </View>

            {/* Main Content */}
            <View className="flex-1 px-6">
                {/* Illustration Container */}
                <View className="items-center mt-4 mb-8">
                    <View className="w-72 h-48 bg-gray-200 rounded-3xl items-center justify-center">
                        {/* Placeholder for illustration - you can replace this with actual image */}
                        <Text className="text-gray-400 text-center font-poppins">Eating Illustration{"\n"}(Will be added later)</Text>
                    </View>
                </View>

                {/* Title and Description */}
                <View className="mb-4">
                    <Text className="text-2xl font-poppins-bold text-gray-900 text-center mb-3">Set Your Eats Goal</Text>
                    <Text className="text-base font-poppins text-gray-500 text-center leading-6">With a goal, we recommend you set optimal{"\n"}time and wake up alarm</Text>
                </View>

                {/* Breakfast Time Pickers */}
                <View className="mb-4">
                    <Text className="text-lg font-poppins-semibold text-gray-900 mb-3">Breakfast</Text>
                    <View className="flex-row justify-between mb-4">
                        {/* Breakfast Start */}
                        <View className="flex-1 mr-3">
                            <TouchableOpacity className="bg-[#C3DFE2] border-[3px] border-[#114438] rounded-2xl px-6 py-4" onPress={() => showTimePicker("breakfastStart")}>
                                <Text className="text-xl font-poppins-semibold text-gray-900 text-center">{mealSchedule.breakfastStart}</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="items-center justify-center mx-2">
                            <Text className="text-lg font-poppins text-gray-900">—</Text>
                        </View>

                        {/* Breakfast End */}
                        <View className="flex-1 ml-3">
                            <TouchableOpacity className="bg-[#C3DFE2] border-[3px] border-[#114438] rounded-2xl px-6 py-4" onPress={() => showTimePicker("breakfastEnd")}>
                                <Text className="text-xl font-poppins-semibold text-gray-900 text-center">{mealSchedule.breakfastEnd}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Lunch Time Pickers */}
                <View className="mb-4">
                    <Text className="text-lg font-poppins-semibold text-gray-900 mb-3">Lunch</Text>
                    <View className="flex-row justify-between mb-4">
                        {/* Lunch Start */}
                        <View className="flex-1 mr-3">
                            <TouchableOpacity className="bg-[#C3DFE2] border-[3px] border-[#114438] rounded-2xl px-6 py-4" onPress={() => showTimePicker("lunchStart")}>
                                <Text className="text-xl font-poppins-semibold text-gray-900 text-center">{mealSchedule.lunchStart}</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="items-center justify-center mx-2">
                            <Text className="text-lg font-poppins text-gray-900">—</Text>
                        </View>

                        {/* Lunch End */}
                        <View className="flex-1 ml-3">
                            <TouchableOpacity className="bg-[#C3DFE2] border-[3px] border-[#114438] rounded-2xl px-6 py-4" onPress={() => showTimePicker("lunchEnd")}>
                                <Text className="text-xl font-poppins-semibold text-gray-900 text-center">{mealSchedule.lunchEnd}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Dinner Time Pickers */}
                <View className="mb-4">
                    <Text className="text-lg font-poppins-semibold text-gray-900 mb-3">Dinner</Text>
                    <View className="flex-row justify-between mb-4">
                        {/* Dinner Start */}
                        <View className="flex-1 mr-3">
                            <TouchableOpacity className="bg-[#C3DFE2] border-[3px] border-[#114438] rounded-2xl px-6 py-4" onPress={() => showTimePicker("dinnerStart")}>
                                <Text className="text-xl font-poppins-semibold text-gray-900 text-center">{mealSchedule.dinnerStart}</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="items-center justify-center mx-2">
                            <Text className="text-lg font-poppins text-gray-900">—</Text>
                        </View>

                        {/* Dinner End */}
                        <View className="flex-1 ml-3">
                            <TouchableOpacity className="bg-[#C3DFE2] border-[3px] border-[#114438] rounded-2xl px-6 py-4" onPress={() => showTimePicker("dinnerEnd")}>
                                <Text className="text-xl font-poppins-semibold text-gray-900 text-center">{mealSchedule.dinnerEnd}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Set Schedule Button */}
                <View className="mb-4">
                    <TouchableOpacity className="bg-[#8EAE9D] rounded-2xl py-4 px-6" onPress={saveMealSchedule} disabled={isLoading}>
                        <Text className="text-lg font-poppins-semibold text-white text-center">{isLoading ? "Saving..." : "Set eats schedule"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Date Time Picker */}
            {timePicker.show && <DateTimePicker value={timePicker.date} mode="time" is24Hour={true} display={Platform.OS === "ios" ? "spinner" : "default"} onChange={handleTimeChange} />}
        </ScrollView>
    );
}
