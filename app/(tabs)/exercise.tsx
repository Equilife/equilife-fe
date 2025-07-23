import { Exercise, FormIcon } from "@/constants/Images";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Circle, Path, Rect, Svg, Text as SvgText } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

export default function ExerciseScreen() {
    const insets = useSafeAreaInsets();
    const [selectedPeriod, setSelectedPeriod] = useState("1 year");
    const [showWorkoutConfirmation, setShowWorkoutConfirmation] = useState(false);
    const [hasWorkedOutToday, setHasWorkedOutToday] = useState(false);
    const [workoutConfirmed, setWorkoutConfirmed] = useState(false);

    // Check if we should show workout confirmation
    useEffect(() => {
        // For demo, show confirmation immediately
        setShowWorkoutConfirmation(true);

        // In production, you would check the actual schedule time:
        // const checkSchedule = () => {
        //     const isScheduleTime = checkExerciseScheduleTime();
        //     if ((isScheduleTime || isPastScheduleTime()) && !workoutConfirmed) {
        //         setShowWorkoutConfirmation(true);
        //     }
        // };
        //
        // checkSchedule();
        // const interval = setInterval(checkSchedule, 60000);
        // return () => clearInterval(interval);
    }, []); // Empty dependency array to run only once

    const handleWorkoutConfirmation = (worked: boolean) => {
        setHasWorkedOutToday(worked);
        setWorkoutConfirmed(true);
        setShowWorkoutConfirmation(false);

        // Simple confirmation without navigation
        if (worked) {
            Alert.alert("Great job! 💪", "Keep up the excellent work with your exercise routine!");
        } else {
            Alert.alert("No worries! 😊", "Remember, consistency is key. You can still work out later!");
        }
    };

    const handleStartExercise = () => {
        router.push("/exercise-start");
    };

    const handleEditExerciseSchedule = () => {
        router.push("/exercise-schedule");
    };

    const handleViewSequence = () => {
        router.push("/exercise-sequence");
    };

    // Sample exercise data - updated to match dashboard structure
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
        weeklyData: [200, 250, 150, 100, 50, 180, 200],
        labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    };

    // Custom Exercise Line Chart Component (same as dashboard)
    const ExerciseLineChart = ({ data, width, height }: { data: any; width: number; height: number }) => {
        const chartHeight = height - 50; // Leave space for labels
        const paddingLeft = 30;
        const paddingBottom = 30;

        // Dynamic calculation for max value
        const maxDataValue = Math.max(...data.weeklyData);
        const maxValue = Math.ceil(maxDataValue / 50) * 50; // Round to nearest 50

        // Generate grid values dynamically (0, 100, 200, 300)
        const gridValues = [];
        for (let i = 0; i <= maxValue; i += 100) {
            gridValues.push(i);
        }

        // Find the highest value for highlighting
        const highestValue = Math.max(...data.weeklyData);
        const highestValueIndex = data.weeklyData.indexOf(highestValue);

        // Calculate points for the line
        const pointWidth = (width - 60) / (data.labels.length - 1);
        const points = data.weeklyData.map((value: number, index: number) => {
            const x = paddingLeft + index * pointWidth;
            const y = chartHeight - (value / maxValue) * (chartHeight - paddingBottom) + 10;
            return { x, y, value, index };
        });

        // Create path string for the line
        const pathData = points
            .map((point: any, index: number) => {
                return index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`;
            })
            .join(" ");

        return (
            <View style={{ width, height }}>
                <Svg width={width} height={height}>
                    {/* Grid lines */}
                    {gridValues.map((value) => {
                        const y = chartHeight - (value / maxValue) * (chartHeight - paddingBottom) + 10;
                        return (
                            <React.Fragment key={value}>
                                {/* Grid line */}
                                <Rect x={paddingLeft} y={y} width={width - paddingLeft - 20} height="1" fill="#E5E7EB" opacity="0.3" />
                                {/* Y-axis label */}
                                <SvgText x={paddingLeft - 8} y={y + 4} fontSize="11" fill="#9CA3AF" textAnchor="end">
                                    {value}
                                </SvgText>
                            </React.Fragment>
                        );
                    })}

                    {/* Line path */}
                    <Path d={pathData} stroke="#2E5C4A" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Data points (dots) */}
                    {points.map((point: any, index: number) => {
                        const isHighest = index === highestValueIndex;
                        return (
                            <React.Fragment key={index}>
                                {/* Outer circle (border) */}
                                <Circle cx={point.x} cy={point.y} r="8" fill="#2E5C4A" />
                                {/* Inner circle (white) */}
                                <Circle cx={point.x} cy={point.y} r="5" fill="white" />
                                {/* Inner dot */}
                                <Circle cx={point.x} cy={point.y} r="3" fill="#2E5C4A" />

                                {/* Value label on top if it's the highest */}
                                {isHighest && (
                                    <>
                                        {/* Background bubble for highest value label */}
                                        <Rect x={point.x - 20} y={point.y - 35} width="40" height="20" rx="10" ry="10" fill="#2C2C3E" />
                                        {/* Highest value text */}
                                        <SvgText x={point.x} y={point.y - 22} fontSize="11" fill="white" textAnchor="middle" fontWeight="600">
                                            {point.value}
                                        </SvgText>
                                    </>
                                )}

                                {/* Day label */}
                                <SvgText x={point.x} y={chartHeight + 25} fontSize="11" fill="#6B7280" textAnchor="middle">
                                    {data.labels[index]}
                                </SvgText>
                            </React.Fragment>
                        );
                    })}
                </Svg>
            </View>
        );
    };

    return (
        <ScrollView className="flex-1 bg-[#F5FBFC]" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-6 py-6">
                <View className="flex-row items-center justify-between mb-8">
                    <TouchableOpacity onPress={handleViewSequence} className="p-2">
                        {/* <Text className="text-2xl">📅</Text> */}
                        <Image source={FormIcon.date} className="w-7 h-7" resizeMode="contain" />
                    </TouchableOpacity>
                    <Text className="text-3xl font-poppins-bold text-gray-900">Exercise Tracker</Text>
                    <View className="w-10" />
                </View>

                {/* Period Selection */}
                <View className="bg-[#C3DFE2] rounded-full p-2 mb-6 border border-[#114438]">
                    <View className="flex-row justify-between">
                        {exerciseData.periods.map((period) => (
                            <TouchableOpacity key={period} onPress={() => setSelectedPeriod(period)} className={`px-4 py-2 rounded-full ${selectedPeriod === period ? "bg-white border-2 border-[#1F4E42]" : ""}`}>
                                <Text className={`font-poppins text-sm ${selectedPeriod === period ? "text-[#1F4E42] font-poppins-semibold" : "text-gray-700"}`}>{period}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Exercise Chart (same format as sleep) */}
                <View className="bg-white border-[1.5px] border-[#C3DFE2] rounded-3xl p-6 mb-6">
                    <View className="mb-4">
                        <View className="flex-row items-baseline">
                            <Text className="text-3xl font-poppins-bold text-gray-800">{exerciseData.current}</Text>
                            <Text className="text-lg font-poppins-bold text-gray-800">/{exerciseData.target}</Text>
                            <Text className="text-sm font-poppins text-gray-600 ml-2">minutes</Text>
                        </View>
                        <Text className="text-sm font-poppins text-gray-500">{exerciseData.status}</Text>
                    </View>

                    <ExerciseLineChart
                        data={{
                            labels: exerciseData.labels,
                            weeklyData: exerciseData.weeklyData,
                        }}
                        width={screenWidth - 60}
                        height={200}
                    />
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

                {/* Exercise Schedule */}
                <View className="bg-white rounded-3xl p-6 mb-6 border-2 border-[#1F4E42]">
                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-xl font-poppins-bold text-gray-900">Exercise Schedule</Text>
                        <TouchableOpacity onPress={handleEditExerciseSchedule}>
                            <Image source={Exercise.editIcon} className="w-6 h-6" resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center justify-center mt-4 mb-4">
                        <Text className="text-lg font-poppins text-gray-900">{exerciseData.schedule.start}</Text>
                        <Text className="text-lg font-poppins text-gray-900 mx-4">—</Text>
                        <Text className="text-lg font-poppins text-gray-900">{exerciseData.schedule.end}</Text>
                    </View>

                    {/* Workout Confirmation Section */}
                    {showWorkoutConfirmation && (
                        <View className="border-t border-gray-200 pt-4">
                            <Text className="text-lg font-poppins-semibold text-gray-900 text-center mb-4">Worked out today?</Text>
                            <View className="flex-row justify-center space-x-4">
                                <TouchableOpacity onPress={() => handleWorkoutConfirmation(false)} className="bg-red-500 px-6 py-3 rounded-full flex-1 mr-2">
                                    <Text className="text-white font-poppins-semibold text-center">Not yet</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleWorkoutConfirmation(true)} className="bg-[#8EAE9D] px-6 py-3 rounded-full flex-1 ml-2">
                                    <Text className="text-white font-poppins-semibold text-center">Yep!</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* Status indicator when confirmed */}
                    {workoutConfirmed && (
                        <View className="border-t border-gray-200 pt-4">
                            <View className="flex-row items-center justify-center">
                                <Text className={`font-poppins-semibold text-lg ${hasWorkedOutToday ? "text-green-600" : "text-orange-600"}`}>{hasWorkedOutToday ? "✅ Workout completed today!" : "⏰ Workout pending today"}</Text>
                            </View>
                            {/* Reset button for demo purposes */}
                            <TouchableOpacity
                                onPress={() => {
                                    setWorkoutConfirmed(false);
                                    setShowWorkoutConfirmation(true);
                                }}
                                className="mt-2"
                            >
                                <Text className="text-blue-500 text-center font-poppins text-sm">Reset for demo</Text>
                            </TouchableOpacity>
                        </View>
                    )}
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
