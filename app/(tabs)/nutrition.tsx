import { Food } from "@/constants/Images";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Rect, Svg, Text as SvgText } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

export default function NutritionScreen() {
    const insets = useSafeAreaInsets();
    const [selectedPeriod, setSelectedPeriod] = useState("1 year");

    const takeFoodPhoto = async () => {
        try {
            // Request camera permissions
            const { status } = await ImagePicker.requestCameraPermissionsAsync();

            if (status !== "granted") {
                Alert.alert("Camera Permission Required", "We need camera access to analyze your food for nutrition insights.", [
                    { text: "Cancel", style: "cancel" },
                    { text: "Settings", onPress: () => ImagePicker.requestCameraPermissionsAsync() },
                ]);
                return null;
            }

            // Launch camera
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 0.8,
                base64: false,
                exif: false,
            });

            if (!result.canceled && result.assets[0]) {
                return result.assets[0].uri;
            }

            return null;
        } catch (error) {
            console.error("Camera error:", error);
            Alert.alert("Camera Error", "Failed to access camera. Please try again.");
            return null;
        }
    };

    const handleScanNutrition = async () => {
        Alert.alert("Scan Food", "Take a photo of your food for nutrition analysis", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Take Photo",
                onPress: async () => {
                    const photoUri = await takeFoodPhoto();

                    if (photoUri) {
                        // Navigate immediately to analysis page with loading state
                        router.push({
                            pathname: "/nutrition-analysis" as any,
                            params: {
                                photoUri: photoUri,
                                isLoading: "true",
                            },
                        });
                    }
                },
            },
        ]);
    };

    const handleEditMealSchedule = () => {
        router.push("/nutrition-schedule");
    };

    // Sample nutrition data - updated to match dashboard structure
    const nutritionData = {
        current: 3056,
        target: 3000,
        quality: 78,
        status: "pretty good",
        schedule: {
            breakfast: { start: "08:00 PM", end: "08:15 AM" },
            lunch: { start: "12:00 PM", end: "12:15 AM" },
            dinner: { start: "06:00 PM", end: "06:15 AM" },
        },
        periods: ["1 day", "1 week", "1 month", "1 year", "all time"],
        weeklyData: [
            { breakfast: 800, lunch: 1200, dinner: 1000 },
            { breakfast: 900, lunch: 1100, dinner: 1200 },
            { breakfast: 700, lunch: 1000, dinner: 800 },
            { breakfast: 850, lunch: 1300, dinner: 1100 },
            { breakfast: 800, lunch: 1250, dinner: 1200 },
            { breakfast: 900, lunch: 1200, dinner: 1000 },
            { breakfast: 750, lunch: 1150, dinner: 950 },
        ],
        labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    };

    // Custom Nutrition Stacked Bar Chart Component (same as dashboard)
    const NutritionStackedChart = ({ data, width, height }: { data: any; width: number; height: number }) => {
        const chartHeight = height - 50; // Leave space for labels
        const barWidth = (width - 60) / data.labels.length; // 60 for margins

        // Calculate max total value for scaling
        const maxTotalValue = Math.max(...data.weeklyData.map((day: any) => day.breakfast + day.lunch + day.dinner));
        const maxValue = Math.ceil(maxTotalValue / 1000) * 1000; // Round to nearest thousand

        // Generate grid values for nutrition (0k, 1k, 2k, 3k)
        const gridValues = [];
        for (let i = 0; i <= maxValue; i += 1000) {
            gridValues.push(i);
        }

        // Find the day with highest total value for highlighting
        const totalValues = data.weeklyData.map((day: any) => day.breakfast + day.lunch + day.dinner);
        const highestTotal = Math.max(...totalValues);
        const highestTotalIndex = totalValues.indexOf(highestTotal);

        const paddingLeft = 30;
        const paddingBottom = 30;

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
                                    {value / 1000}k
                                </SvgText>
                            </React.Fragment>
                        );
                    })}

                    {/* Stacked Bars */}
                    {data.weeklyData.map((dayData: any, index: number) => {
                        const x = paddingLeft + index * barWidth + barWidth * 0.25;
                        const totalValue = dayData.breakfast + dayData.lunch + dayData.dinner;
                        // Calculate individual segment heights
                        const breakfastHeight = (dayData.breakfast / maxValue) * (chartHeight - paddingBottom);
                        const lunchHeight = (dayData.lunch / maxValue) * (chartHeight - paddingBottom);
                        const dinnerHeight = (dayData.dinner / maxValue) * (chartHeight - paddingBottom);

                        // Y positions for each segment (stacked from bottom)
                        const breakfastY = chartHeight - breakfastHeight + 10;
                        const lunchY = breakfastY - lunchHeight;
                        const dinnerY = lunchY - dinnerHeight;

                        const isHighest = index === highestTotalIndex;

                        return (
                            <React.Fragment key={index}>
                                {/* Breakfast segment (bottom) */}
                                <Rect x={x} y={breakfastY} width={barWidth * 0.5} height={breakfastHeight} rx="0" ry="0" fill="#2E5C4A" />

                                {/* Lunch segment (middle) */}
                                <Rect x={x} y={lunchY} width={barWidth * 0.5} height={lunchHeight} rx="0" ry="0" fill="#8EAE9D" />

                                {/* Dinner segment (top) */}
                                <Rect x={x} y={dinnerY} width={barWidth * 0.5} height={dinnerHeight} rx="0" ry="0" fill="#B8855C" />

                                {/* Total value label on top if it's the highest */}
                                {isHighest && (
                                    <>
                                        {/* Background bubble for highest value label */}
                                        <Rect x={x - 15} y={dinnerY - 25} width="50" height="18" rx="9" ry="9" fill="#2C2C3E" />
                                        {/* Highest value text */}
                                        <SvgText x={x + barWidth * 0.25} y={dinnerY - 12} fontSize="10" fill="white" textAnchor="middle" fontWeight="600">
                                            {totalValue}
                                        </SvgText>
                                    </>
                                )}

                                {/* Day label */}
                                <SvgText x={x + barWidth * 0.25} y={chartHeight + 25} fontSize="11" fill="#6B7280" textAnchor="middle">
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
                    <View className="w-10" />
                    <Text className="text-3xl font-poppins-bold text-gray-900">Nutrient Quality</Text>
                    <View className="w-10" />
                </View>

                {/* Period Selection */}
                <View className="bg-[#C3DFE2] rounded-full p-2 mb-6 border border-[#114438]">
                    <View className="flex-row justify-between">
                        {nutritionData.periods.map((period) => (
                            <TouchableOpacity key={period} onPress={() => setSelectedPeriod(period)} className={`px-4 py-2 rounded-full ${selectedPeriod === period ? "bg-white border-2 border-[#1F4E42]" : ""}`}>
                                <Text className={`font-poppins text-sm ${selectedPeriod === period ? "text-[#1F4E42] font-poppins-semibold" : "text-gray-700"}`}>{period}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Nutrition Chart (same format as sleep) */}
                <View className="bg-white border-[1.5px] border-[#C3DFE2] rounded-3xl p-6 mb-6">
                    <View className="mb-4">
                        <View className="flex-row items-baseline">
                            <Text className="text-3xl font-poppins-bold text-gray-800">{nutritionData.current}</Text>
                            <Text className="text-lg font-poppins-bold text-gray-800">/{nutritionData.target}</Text>
                            <Text className="text-sm font-poppins text-gray-600 ml-2">kcal</Text>
                        </View>
                        <Text className="text-sm font-poppins text-gray-500">{nutritionData.status}</Text>
                    </View>

                    <NutritionStackedChart
                        data={{
                            labels: nutritionData.labels,
                            weeklyData: nutritionData.weeklyData,
                        }}
                        width={screenWidth - 60}
                        height={200}
                    />

                    {/* Chart Legend - moved inside chart section */}
                    <View className="mt-4 mb-2">
                        <View className="flex-row justify-around">
                            <View className="flex-row items-center">
                                <View className="w-4 h-4 bg-[#2E5C4A] rounded mr-2" />
                                <Text className="text-sm font-poppins text-gray-600">Breakfast</Text>
                            </View>
                            <View className="flex-row items-center">
                                <View className="w-4 h-4 bg-[#8EAE9D] rounded mr-2" />
                                <Text className="text-sm font-poppins text-gray-600">Lunch</Text>
                            </View>
                            <View className="flex-row items-center">
                                <View className="w-4 h-4 bg-[#B8855C] rounded mr-2" />
                                <Text className="text-sm font-poppins text-gray-600">Dinner</Text>
                            </View>
                        </View>
                    </View>

                    {/* Meal Schedule Section - moved from Healthy Plate Routine */}
                    <View className="mt-6 pt-6 border-t border-gray-200">
                        <View className="flex-row items-center justify-between mb-4">
                            <Text className="text-lg font-poppins-bold text-gray-900">Meal Schedule</Text>
                            <TouchableOpacity onPress={handleEditMealSchedule}>
                                <Image source={Food.editIcon} className="w-6 h-6" resizeMode="contain" />
                            </TouchableOpacity>
                        </View>

                        {/* Breakfast */}
                        <View className="mb-3">
                            <Text className="text-gray-500 font-poppins text-sm mb-1">Breakfast</Text>
                            <View className="flex-row items-center justify-center">
                                <Text className="text-base font-poppins text-gray-900">{nutritionData.schedule.breakfast.start}</Text>
                                <Text className="text-base font-poppins text-gray-900 mx-4">—</Text>
                                <Text className="text-base font-poppins text-gray-900">{nutritionData.schedule.breakfast.end}</Text>
                            </View>
                        </View>

                        {/* Lunch */}
                        <View className="mb-3">
                            <Text className="text-gray-500 font-poppins text-sm mb-1">Lunch</Text>
                            <View className="flex-row items-center justify-center">
                                <Text className="text-base font-poppins text-gray-900">{nutritionData.schedule.lunch.start}</Text>
                                <Text className="text-base font-poppins text-gray-900 mx-4">—</Text>
                                <Text className="text-base font-poppins text-gray-900">{nutritionData.schedule.lunch.end}</Text>
                            </View>
                        </View>

                        {/* Dinner */}
                        <View className="mb-2">
                            <Text className="text-gray-500 font-poppins text-sm mb-1">Dinner</Text>
                            <View className="flex-row items-center justify-center">
                                <Text className="text-base font-poppins text-gray-900">{nutritionData.schedule.dinner.start}</Text>
                                <Text className="text-base font-poppins text-gray-900 mx-4">—</Text>
                                <Text className="text-base font-poppins text-gray-900">{nutritionData.schedule.dinner.end}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Nutrition Statistics */}
                <View className="bg-white rounded-3xl p-6 mb-6 border-2 border-[#1F4E42]">
                    <Text className="text-xl font-poppins-bold text-gray-900 mb-4">Today&apos;s Nutrition</Text>

                    <View className="flex-row justify-between items-center mb-4">
                        <View className="flex-row items-baseline">
                            <Text className="text-3xl font-poppins-bold text-gray-900">{nutritionData.current}</Text>
                            <Text className="text-lg font-poppins-bold text-gray-900">/{nutritionData.target}</Text>
                            <Text className="text-sm font-poppins text-gray-700 ml-1">kcl</Text>
                        </View>
                        <Text className="text-lg font-poppins-medium text-gray-600">{nutritionData.status}</Text>
                    </View>

                    <View className="border-t border-gray-200 pt-4">
                        <View className="flex-row items-center justify-center">
                            <Text className="text-sm font-poppins text-gray-600 mr-2">Hydration Quality:</Text>
                            <Text className="text-2xl font-poppins-bold text-orange-500">{nutritionData.quality}</Text>
                            <Text className="text-orange-500 text-lg ml-1">💧</Text>
                        </View>
                    </View>
                </View>

                {/* Feedback & Suggestion */}
                <View className="bg-white rounded-3xl p-6 mb-6 border-2 border-[#1F4E42]">
                    <Text className="text-xl font-poppins-bold text-gray-900 mb-4">Feedback & suggestion</Text>
                    <Text className="text-gray-600 font-poppins leading-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,</Text>
                </View>

                {/* Scan Nutrition Button */}
                <View className="mb-20">
                    <TouchableOpacity onPress={handleScanNutrition} className="bg-[#8EAE9D] rounded-full py-4 px-8 items-center">
                        <View className="flex-row items-center">
                            {/* <Text className="text-white text-2xl mr-3">📷</Text> */}
                            <Image source={Food.camera} className="w-6 h-6 mx-4" resizeMode="contain" />
                            <Text className="text-white font-poppins-semibold text-lg">Scan Nutrition</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom spacing for tab navigation */}
            <View className="h-32" />
        </ScrollView>
    );
}
