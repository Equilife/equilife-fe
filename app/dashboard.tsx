import { Dashboard } from "@/constants/Images";
import React from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { BarChart, LineChart } from "react-native-chart-kit";
import { Circle, Rect, Svg, Text as SvgText } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
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

    // Chart configurations
    const chartConfig = {
        backgroundColor: "transparent",
        backgroundGradientFrom: "transparent",
        backgroundGradientTo: "transparent",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(163, 215, 213, ${opacity})`, // Light teal for normal bars
        labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForLabels: {
            fontSize: 12,
        },
        barPercentage: 0.6,
        fillShadowGradient: `rgba(163, 215, 213, 1)`, // Light teal
        fillShadowGradientOpacity: 1,
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
                                <Rect x={x} y={y} width={barWidth * 0.5} height={barHeight} rx="6" ry="6" fill={isHighest ? "#2E5C4A" : "#A3D7D5"} />

                                {/* Value label on top of bar if it's the highest */}
                                {isHighest && (
                                    <>
                                        {/* Background bubble for highest value label */}
                                        <Rect x={x - 8} y={y - 30} width={barWidth * 0.5 + 16} height="20" rx="10" ry="10" fill="#2C2C3E" />
                                        {/* Highest value text */}
                                        <SvgText x={x + barWidth * 0.25} y={y - 17} fontSize="11" fill="white" textAnchor="middle" fontWeight="600">
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

                {/* <View className="absolute items-center">
                    <Text className="text-4xl font-poppins-bold text-gray-800">{percentage}%</Text>
                    <Text className="text-lg font-poppins-semibold text-gray-600">Good</Text>
                </View> */}
            </View>
        );
    };

    // Prepare nutrition chart data - removed unused variable
    // const nutritionChartData = {
    //   labels: nutritionData.labels,
    //   datasets: [...]
    // };

    return (
        <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
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
                        {/* <Text className="text-lg">🔔</Text> */}
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

                            <TouchableOpacity className="mt-6 bg-[#C3DFE2] px-4 py-2 rounded-full border-2 border-[#114438]">
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
                        {/* <Text className="text-2xl mr-2">💤</Text> */}
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
                            {/* <Text className="text-2xl mr-2">🍽️</Text> */}
                            <Image source={Dashboard.food} className="w-7 h-7 mr-3" resizeMode="contain" />
                            <Text className="text-lg font-poppins-semibold text-gray-800">Nutrition</Text>
                        </View>

                        <View className="flex-row space-x-4">
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

                    <BarChart
                        data={{
                            labels: nutritionData.labels,
                            datasets: [
                                {
                                    data: nutritionData.weeklyData.map((day) => day.breakfast + day.lunch + day.dinner),
                                },
                            ],
                        }}
                        width={screenWidth - 60}
                        height={180}
                        yAxisLabel=""
                        yAxisSuffix="k"
                        chartConfig={{
                            ...chartConfig,
                            color: (opacity = 1) => `rgba(142, 174, 157, ${opacity})`,
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                        showValuesOnTopOfBars={false}
                        fromZero={true}
                    />
                </View>
            </View>

            {/* Exercise Chart */}
            <View className="mx-6 mb-6">
                <View className="bg-[#F5FBFC] border-[1.5px] border-[#C3DFE2] rounded-3xl p-6">
                    <View className="flex-row items-center mb-4">
                        {/* <Text className="text-2xl mr-2">🏃</Text> */}
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

                    <LineChart
                        data={{
                            labels: exerciseData.labels,
                            datasets: [
                                {
                                    data: exerciseData.weeklyData,
                                    color: (opacity = 1) => `rgba(46, 92, 74, ${opacity})`,
                                    strokeWidth: 3,
                                },
                            ],
                        }}
                        width={screenWidth - 60}
                        height={180}
                        chartConfig={{
                            ...chartConfig,
                            color: (opacity = 1) => `rgba(46, 92, 74, ${opacity})`,
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                        bezier
                        withDots={true}
                        withInnerLines={false}
                        withOuterLines={false}
                        fromZero={true}
                    />
                </View>
            </View>

            {/* Bottom spacing for navigation */}
            <View className="h-20" />
        </ScrollView>
    );
}
