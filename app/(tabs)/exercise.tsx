import { Exercise } from "@/constants/Images";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Path, Svg, Text as SvgText } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

export default function ExerciseScreen() {
    const insets = useSafeAreaInsets();
    const [selectedPeriod, setSelectedPeriod] = useState("1 year");

    const handleStartExercise = () => {
        router.push("/exercise-start");
    };

    const handleEditExerciseSchedule = () => {
        router.push("/exercise-schedule");
    };

    // Sample exercise data
    const exerciseData = {
        current: 345,
        target: 150,
        quality: 78,
        status: "Good",
        schedule: {
            start: "10:00 PM",
            end: "05:00 AM",
        },
        periods: ["1 day", "1 week", "1 month", "1 year", "all time"],
        weeklyData: [
            { day: "S", date: "13", isActive: false },
            { day: "M", date: "14", isActive: false },
            { day: "T", date: "15", isActive: false },
            { day: "W", date: "16", isActive: false },
            { day: "T", date: "17", isActive: true },
            { day: "F", date: "18", isActive: false },
            { day: "S", date: "19", isActive: false },
        ],
    };

    // Exercise chart component
    const ExerciseChart = () => {
        const chartWidth = screenWidth - 80;
        const chartHeight = 200;
        const paddingLeft = 30;
        const paddingTop = 20;

        // Create exercise curve similar to the image
        const createExerciseCurve = () => {
            const width = chartWidth - paddingLeft - 20;
            const height = chartHeight - paddingTop - 60;

            // Points for exercise pattern - higher activity in middle, lower at ends
            const points = [
                { x: paddingLeft, y: paddingTop + height * 0.4 }, // Start moderate
                { x: paddingLeft + width * 0.15, y: paddingTop + height * 0.2 }, // Rise up
                { x: paddingLeft + width * 0.3, y: paddingTop + height * 0.15 }, // Peak
                { x: paddingLeft + width * 0.45, y: paddingTop + height * 0.35 }, // Dip
                { x: paddingLeft + width * 0.6, y: paddingTop + height * 0.25 }, // Rise again
                { x: paddingLeft + width * 0.75, y: paddingTop + height * 0.1 }, // Another peak
                { x: paddingLeft + width * 0.95, y: paddingTop + height * 0.3 }, // End moderate
            ];

            // Create smooth curve
            let pathData = `M ${points[0].x} ${points[0].y}`;

            for (let i = 1; i < points.length; i++) {
                const prevPoint = points[i - 1];
                const currentPoint = points[i];

                const cp1x = prevPoint.x + (currentPoint.x - prevPoint.x) * 0.5;
                const cp1y = prevPoint.y;
                const cp2x = currentPoint.x - (currentPoint.x - prevPoint.x) * 0.5;
                const cp2y = currentPoint.y;

                pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currentPoint.x} ${currentPoint.y}`;
            }

            return pathData;
        };

        return (
            <View style={{ width: chartWidth, height: chartHeight, position: "relative" }}>
                <Svg width={chartWidth} height={chartHeight}>
                    {/* Y-axis labels */}
                    <SvgText x="10" y="35" fontSize="14" fill="#6B7280" fontFamily="Poppins_400Regular">
                        300
                    </SvgText>
                    <SvgText x="10" y="85" fontSize="14" fill="#6B7280" fontFamily="Poppins_400Regular">
                        200
                    </SvgText>
                    <SvgText x="10" y="135" fontSize="14" fill="#6B7280" fontFamily="Poppins_400Regular">
                        100
                    </SvgText>
                    <SvgText x="10" y="175" fontSize="14" fill="#6B7280" fontFamily="Poppins_400Regular">
                        0
                    </SvgText>

                    {/* Exercise curve with dark green color */}
                    <Path d={createExerciseCurve()} stroke="#1F4E42" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>

                {/* Exercise quality score and stats */}
                <View
                    className="bg-[#C3DFE2] rounded-2xl px-4 py-3"
                    style={{
                        position: "absolute",
                        bottom: 30,
                        left: 40,
                    }}
                >
                    <View className="flex-row items-center">
                        <Text className="text-2xl font-poppins-bold text-[#1F4E42] mr-1">{exerciseData.quality}</Text>
                        <Text className="text-lg">🔥</Text>
                    </View>
                </View>

                {/* Exercise minutes display */}
                <View
                    className="items-end"
                    style={{
                        position: "absolute",
                        bottom: 30,
                        right: 40,
                    }}
                >
                    <Text className="text-2xl font-poppins-bold text-gray-900">
                        {exerciseData.current}/{exerciseData.target} min
                    </Text>
                    <Text className="text-sm font-poppins text-gray-600">{exerciseData.status}</Text>
                </View>

                {/* Edit icon */}
                <View
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                    }}
                >
                    <Text className="text-gray-400 text-lg">✏️</Text>
                </View>
            </View>
        );
    };

    return (
        <ScrollView className="flex-1 bg-[#F5FBFC]" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-6 py-6">
                <Text className="text-3xl font-poppins-bold text-gray-900 text-center mb-8">Exercise Tracker</Text>

                {/* Period Selection */}
                <View className="bg-[#B0D0D3] rounded-full p-2 mb-6">
                    <View className="flex-row justify-between">
                        {exerciseData.periods.map((period) => (
                            <TouchableOpacity key={period} onPress={() => setSelectedPeriod(period)} className={`px-4 py-2 rounded-full ${selectedPeriod === period ? "bg-white border-2 border-[#1F4E42]" : ""}`}>
                                <Text className={`font-poppins text-sm ${selectedPeriod === period ? "text-[#1F4E42] font-poppins-semibold" : "text-gray-700"}`}>{period}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Exercise Chart */}
                <View className="bg-[#B0D0D3] rounded-3xl p-4 mb-6">
                    <ExerciseChart />
                </View>

                {/* Weekly Calendar */}
                {/* <View className="flex-row justify-between mb-6">
                    {exerciseData.weeklyData.map((day, index) => (
                        <View key={index} className="items-center">
                            <View className={`w-12 h-12 rounded-2xl items-center justify-center mb-1 ${day.isActive ? "bg-[#1F4E42] border-2 border-[#1F4E42]" : "bg-[#B0D0D3]"}`}>
                                <Text className={`font-poppins-semibold text-sm ${day.isActive ? "text-white" : "text-gray-700"}`}>{day.day}</Text>
                            </View>
                            <Text className={`font-poppins text-sm ${day.isActive ? "text-[#1F4E42] font-poppins-semibold" : "text-gray-600"}`}>{day.date}</Text>
                        </View>
                    ))}
                </View> */}

                {/* Edit icon for calendar */}
                <View className="items-end mb-6">
                    <TouchableOpacity className="p-2">
                        {/* <Text className="text-gray-400 text-lg">✏️</Text> */}
                        <Image source={Exercise.editIcon} className="w-6 h-6" resizeMode="contain" />
                    </TouchableOpacity>
                </View>

                {/* Exercise Schedule */}
                <View className="bg-white rounded-3xl p-6 mb-6 border-2 border-[#1F4E42]">
                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-xl font-poppins-bold text-gray-900">Exercise Schedule</Text>
                        <TouchableOpacity onPress={handleEditExerciseSchedule}>
                            <Image source={Exercise.editIcon} className="w-6 h-6" resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center justify-center mt-4">
                        <Text className="text-lg font-poppins text-gray-900">{exerciseData.schedule.start}</Text>
                        <Text className="text-lg font-poppins text-gray-900 mx-4">—</Text>
                        <Text className="text-lg font-poppins text-gray-900">{exerciseData.schedule.end}</Text>
                    </View>
                </View>

                {/* Feedback & Suggestion */}
                <View className="bg-white rounded-3xl p-6 mb-6 border-2 border-[#1F4E42]">
                    <Text className="text-xl font-poppins-bold text-gray-900 mb-4">Feedback & suggestion</Text>
                    <Text className="text-gray-600 font-poppins leading-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,</Text>
                </View>

                {/* Start Exercise Button */}
                <View className="mb-20">
                    <TouchableOpacity onPress={handleStartExercise} className="bg-[#8EAE9D] rounded-full py-4 px-8 items-center">
                        <View className="flex-row items-center">
                            <Image source={Exercise.musle} className="w-6 h-6 mx-4" resizeMode="contain" />
                            <Text className="text-white font-poppins-semibold text-lg">Start Exercise</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom spacing for tab navigation */}
            <View className="h-32" />
        </ScrollView>
    );
}
