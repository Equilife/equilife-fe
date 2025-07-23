import { Dashboard } from "@/constants/Images";
import { router } from "expo-router";
import React from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Circle, Path, Rect, Svg, Text as SvgText } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

export default function ProfileScreen() {
    // Mock data
    const healthScore = 81;
    const sleepData = {
        current: 51,
        target: 56,
        status: "pretty good",
        weeklyData: [4, 6, 5, 7, 8, 5, 6], // hours per day - matching the design
        labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
        highlightIndex: 4, // Friday is highlighted
    };

    const nutritionData = {
        current: 3056,
        target: 3000,
        status: "pretty good",
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

    const exerciseData = {
        current: 345,
        target: 150,
        status: "Good",
        weeklyData: [200, 250, 150, 100, 50, 180, 200],
        labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    };

    // Custom Sleep Bar Chart Component
    const SleepBarChart = ({ data, width, height }: { data: any; width: number; height: number }) => {
        const chartHeight = height - 50; // Leave space for labels
        const barWidth = (width - 60) / data.labels.length; // 60 for margins

        // Dynamic calculation for grid lines based on data
        const maxDataValue = Math.max(...data.weeklyData);

        // Calculate appropriate grid intervals
        const maxValue = Math.ceil(maxDataValue * 1.1); // Add 10% padding

        // Generate grid values dynamically
        const gridValues = [];
        if (maxValue <= 4) {
            gridValues.push(0, 1, 2, 3, 4);
        } else if (maxValue <= 8) {
            gridValues.push(0, 2, 4, 6, 8);
        } else if (maxValue <= 12) {
            gridValues.push(0, 3, 6, 9, 12);
        } else {
            // For larger values, use step of maxValue/4
            const step = Math.ceil(maxValue / 4);
            for (let i = 0; i <= maxValue; i += step) {
                gridValues.push(i);
            }
        }

        // Find the index of the highest value for highlighting
        const highestValue = Math.max(...data.weeklyData);
        const highestValueIndex = data.weeklyData.indexOf(highestValue);

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
                                    {value}h
                                </SvgText>
                            </React.Fragment>
                        );
                    })}

                    {/* Bars */}
                    {data.weeklyData.map((value: number, index: number) => {
                        const barHeight = (value / maxValue) * (chartHeight - paddingBottom);
                        const x = paddingLeft + index * barWidth + barWidth * 0.25;
                        const y = chartHeight - barHeight + 10;
                        const isHighest = index === highestValueIndex; // Highlight the highest value

                        return (
                            <React.Fragment key={index}>
                                {/* Bar */}
                                <Rect x={x} y={y} width={barWidth * 0.5} height={barHeight} fill={isHighest ? "#2E5C4A" : "#A3D7D5"} />

                                {/* Value label on top of bar if it's the highest */}
                                {isHighest && (
                                    <>
                                        {/* Background bubble for highest value label */}
                                        <Rect x={x - 8} y={y - 30} width={barWidth * 0.5 + 16} height="20" rx="10" ry="10" fill="#2C2C3E" />
                                        {/* Highest value text */}
                                        <SvgText x={x + barWidth * 0.2} y={y - 17} fontSize="11" fill="white" textAnchor="middle" fontWeight="600">
                                            {value}h
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

    // Custom Nutrition Stacked Bar Chart Component
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
                                        <Rect x={x - 8} y={dinnerY - 30} width={barWidth * 0.5 + 16} height="20" rx="10" ry="10" fill="#2C2C3E" />
                                        {/* Total value text */}
                                        <SvgText x={x + barWidth * 0.15} y={dinnerY - 17} fontSize="11" fill="white" textAnchor="middle" fontWeight="600">
                                            {Math.round(totalValue / 100) / 10}k
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

    // Custom Exercise Line Chart Component
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

    // Circular progress component
    const CircularProgress = ({ percentage, size = 120 }: { percentage: number; size?: number }) => {
        const radius = size / 2 - 10;
        const circumference = 2 * Math.PI * radius;
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <View className="items-center justify-center">
                <Svg width={size} height={size} className="absolute">
                    {/* Background circles */}
                    <Circle cx={size / 2} cy={size / 2} r={radius} stroke="#E5E7EB" strokeWidth="8" fill="transparent" />
                    <Circle cx={size / 2} cy={size / 2} r={radius - 15} stroke="#E5E7EB" strokeWidth="6" fill="transparent" />
                    <Circle cx={size / 2} cy={size / 2} r={radius - 25} stroke="#E5E7EB" strokeWidth="4" fill="transparent" />

                    {/* Progress circles */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#2E5C4A"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius - 15}
                        stroke="#8EAE9D"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset + 20}
                        strokeLinecap="round"
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius - 25}
                        stroke="#B8855C"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset + 40}
                        strokeLinecap="round"
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                </Svg>
            </View>
        );
    };

    return (
        <ScrollView className="flex-1 bg-[#F5FBFC]" showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="px-6 pt-12 pb-6">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <View className="w-12 h-12 bg-gray-300 rounded-full mr-3" />
                        <View>
                            <Text className="text-xl font-poppins-bold text-gray-800">equilife</Text>
                            <Text className="text-sm font-poppins text-gray-600">Maintain your healthy life</Text>
                        </View>
                    </View>

                    <View className="w-8 h-8 rounded-full items-center justify-center">
                        <Image source={Dashboard.bell} className="w-5 h-6" resizeMode="contain" />
                    </View>
                </View>
            </View>

            {/* Health Score Card */}
            <View className="mx-6 mb-6">
                <View className="bg-[#E8F0EC] rounded-3xl p-6">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-1">
                            <CircularProgress percentage={healthScore} size={140} />
                        </View>

                        <View className="flex-1 pl-6">
                            {/* <Image source={Dashboard.share} className="absolute top-0 right-0 w-7 h-7 bg-blue-900" resizeMode="contain" /> */}
                            <View className="space-y-3">
                                <View className="">
                                    <Text className="text-4xl font-poppins-bold text-gray-800">{healthScore}%</Text>
                                    <Text className="text-lg font-poppins-semibold text-gray-600">Good</Text>
                                </View>

                                <View className="flex-row items-center">
                                    <View className="w-3 h-3 bg-[#2E5C4A] rounded-full mr-2" />
                                    <Text className="font-poppins text-gray-700">Sleep</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <View className="w-3 h-3 bg-[#8EAE9D] rounded-full mr-2" />
                                    <Text className="font-poppins text-gray-700">Eat</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <View className="w-3 h-3 bg-[#B8855C] rounded-full mr-2" />
                                    <Text className="font-poppins text-gray-700">Sport</Text>
                                </View>
                            </View>

                            <TouchableOpacity className="mt-6 bg-[#C3DFE2] px-4 py-2 rounded-full border-2 border-[#114438]" onPress={() => router.push("/chat")}>
                                <Text className="font-poppins text-gray-600 text-center">Ask Equilife</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            {/* Sleep Chart */}
            <View className="mx-6 mb-6">
                <View className="bg-[#F5FBFC] border-[1.5px] border-[#C3DFE2] rounded-3xl p-6">
                    <View className="flex-row items-center mb-4">
                        <Image source={Dashboard.sleep} className="w-12 h-12" resizeMode="contain" />
                        <Text className="text-lg font-poppins-semibold text-gray-800">Sleeping time</Text>
                    </View>

                    <View className="mb-4">
                        <View className="flex-row items-baseline">
                            <Text className="text-3xl font-poppins-bold text-gray-800">{sleepData.current}</Text>
                            <Text className="text-lg font-poppins-bold text-gray-800">/{sleepData.target}</Text>
                            <Text className="text-sm font-poppins text-gray-600 ml-2">hours</Text>
                        </View>
                        <Text className="text-sm font-poppins text-gray-500">{sleepData.status}</Text>
                    </View>

                    <SleepBarChart
                        data={{
                            labels: sleepData.labels,
                            weeklyData: sleepData.weeklyData,
                        }}
                        width={screenWidth - 60}
                        height={200}
                    />
                </View>
            </View>

            {/* Nutrition Chart */}
            <View className="mx-6 mb-6">
                <View className="bg-[#F5FBFC] border-[1.5px] border-[#C3DFE2] rounded-3xl p-6">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                            <Image source={Dashboard.food} className="w-7 h-7 mr-3" resizeMode="contain" />
                            <Text className="text-lg font-poppins-semibold text-gray-800">Nutrition</Text>
                        </View>

                        <View className="flex-row space-x-4 gap-4">
                            <View className="flex-row items-center">
                                <View className="w-2 h-2 bg-[#2E5C4A] rounded-full mr-1" />
                                <Text className="text-xs font-poppins text-gray-600">Breakfast</Text>
                            </View>
                            <View className="flex-row items-center">
                                <View className="w-2 h-2 bg-[#8EAE9D] rounded-full mr-1" />
                                <Text className="text-xs font-poppins text-gray-600">Lunch</Text>
                            </View>
                            <View className="flex-row items-center">
                                <View className="w-2 h-2 bg-[#B8855C] rounded-full mr-1" />
                                <Text className="text-xs font-poppins text-gray-600">Dinner</Text>
                            </View>
                        </View>
                    </View>

                    <View className="mb-4">
                        <View className="flex-row items-baseline">
                            <Text className="text-3xl font-poppins-bold text-gray-800">{nutritionData.current}</Text>
                            <Text className="text-lg font-poppins-bold text-gray-800">/{nutritionData.target}</Text>
                            <Text className="text-sm font-poppins text-gray-600 ml-2">kcl</Text>
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
                </View>
            </View>

            {/* Exercise Chart */}
            <View className="mx-6 mb-6">
                <View className="bg-[#F5FBFC] border-[1.5px] border-[#C3DFE2] rounded-3xl p-6">
                    <View className="flex-row items-center mb-4">
                        <Image source={Dashboard.muscle} className="w-7 h-7 mr-3" resizeMode="contain" />
                        <Text className="text-lg font-poppins-semibold text-gray-800">Exercise</Text>
                    </View>

                    <View className="mb-4">
                        <View className="flex-row items-baseline">
                            <Text className="text-3xl font-poppins-bold text-gray-800">{exerciseData.current}</Text>
                            <Text className="text-lg font-poppins-bold text-gray-800">/{exerciseData.target}</Text>
                            <Text className="text-sm font-poppins text-gray-600 ml-2">min</Text>
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
            </View>

            {/* Bottom spacing for navigation */}
            <View className="h-32" />
        </ScrollView>
    );
}
