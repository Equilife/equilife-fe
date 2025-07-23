import { Sleep } from "@/constants/Images";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Rect, Svg, Text as SvgText } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

export default function SleepScreen() {
    const insets = useSafeAreaInsets();
    const [selectedPeriod, setSelectedPeriod] = useState("1 year");

    const handleStartSleeping = () => {
        router.push("/sleep-start");
    };

    // Sample data - updated to match dashboard structure
    const sleepData = {
        current: 51,
        target: 56,
        quality: 78,
        status: "pretty good",
        bedTime: "10:00 PM",
        wakeTime: "05:00 AM",
        periods: ["1 day", "1 week", "1 month", "1 year", "all time"],
        weeklyData: [4, 6, 5, 7, 8, 5, 6], // hours per day - matching the design
        labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
        highlightIndex: 4, // Friday is highlighted
    };

    const musicData = {
        title: "Ocean Waves",
        artist: "Phobe brigers",
        albumArt: "https://via.placeholder.com/50x50/8B4513/FFFFFF?text=🎵",
    };

    // Custom Sleep Bar Chart Component (exact copy from dashboard)
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

    return (
        <ScrollView className="flex-1 bg-[#F5FBFC]" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-6 py-6">
                <Text className="text-3xl font-poppins-bold text-gray-900 text-center mb-6">Sleep Quality</Text>

                {/* Period Selector */}
                <View className="bg-[#C3DFE2] rounded-full p-2 mb-6 border border-[#114438]">
                    <View className="flex-row justify-between">
                        {sleepData.periods.map((period) => (
                            <TouchableOpacity key={period} onPress={() => setSelectedPeriod(period)} className={`px-4 py-2 rounded-full ${selectedPeriod === period ? "bg-white border-2 border-[#114438]" : ""}`}>
                                <Text className={`text-center text-sm font-poppins-medium ${selectedPeriod === period ? "text-gray-900" : "text-gray-600"}`}>{period}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Sleep Chart (copied exactly from dashboard) */}
                <View className="bg-white border-[1.5px] border-[#C3DFE2] rounded-3xl p-6 mb-6">
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

            {/* Sleep Schedule */}
            <View className="px-6 mb-6">
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-xl font-poppins-bold text-gray-900">Sleep Schedule</Text>
                    <TouchableOpacity onPress={() => router.push("/sleep-schedule")}>
                        {/* <Text className="text-gray-400 text-xl">✏️</Text> */}
                        <Image source={Sleep.editIcon} className="w-6 h-6 mx-4" resizeMode="contain" />
                    </TouchableOpacity>
                </View>

                <View className="bg-white rounded-3xl p-6 border-2 border-[#114438]">
                    <View className="flex-row justify-between">
                        {/* Bedtime */}
                        <View className="flex-row items-center">
                            <View className="w-14 h-14 rounded-full items-center justify-center mr-2">
                                {/* <Text className="text-xl">🛏️</Text> */}
                                <Image source={Sleep.tidurIcon} className="w-full h-full" resizeMode="contain" />
                            </View>
                            <View>
                                <Text className="text-lg font-poppins-semibold text-gray-900">{sleepData.bedTime}</Text>
                                <Text className="text-sm font-poppins text-gray-500">Went to bed</Text>
                            </View>
                        </View>

                        {/* Wake time */}
                        <View className="flex-row items-center">
                            <View className="w-12 h-12 bg-gray-300 rounded-full items-center justify-center mr-4">
                                {/* <Text className="text-xl">☀️</Text> */}
                                <Image source={Sleep.wakeUpIcon} className="w-full h-full" resizeMode="contain" />
                            </View>
                            <View>
                                <Text className="text-lg font-poppins-semibold text-gray-900">{sleepData.wakeTime}</Text>
                                <Text className="text-sm font-poppins text-gray-500">Wake Up</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Music Player */}
            <View className="px-6 mb-6">
                <TouchableOpacity onPress={() => router.push("/sleep-sound")}>
                    <View className="bg-white rounded-3xl p-6 border-2 border-[#114438]">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center flex-1">
                                <View className="w-12 h-12 bg-gray-300 rounded-lg mr-4 items-center justify-center">
                                    <Text className="text-lg">🎵</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-lg font-poppins-semibold text-gray-900">{musicData.title}</Text>
                                    <Text className="text-sm font-poppins text-gray-500">{musicData.artist}</Text>
                                </View>
                            </View>

                            {/* Music controls */}
                            <View className="flex-row items-center">
                                <TouchableOpacity className="mr-4">
                                    {/* <Text className="text-2xl">⏮️</Text> */}
                                    <Image source={Sleep.leftPlay} className="w-6 h-6" resizeMode="contain" />
                                </TouchableOpacity>
                                <TouchableOpacity className="mr-4">
                                    {/* <Text className="text-2xl">⏸️</Text> */}
                                    <Image source={Sleep.pause} className="w-6 h-6" resizeMode="contain" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    {/* <Text className="text-2xl">⏭️</Text> */}
                                    <Image source={Sleep.rightPlay} className="w-6 h-6" resizeMode="contain" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Feedback Section */}
            <View className="px-6 mb-6">
                <View className="bg-white rounded-3xl p-6 border-2 border-[#114438]">
                    <Text className="text-lg font-poppins-semibold text-gray-900 mb-4 text-center">Feedback & suggestion</Text>
                    <Text className="text-gray-600 font-poppins text-center leading-6">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                    </Text>
                </View>
            </View>

            {/* Start Sleeping Button */}
            <View className="px-6 mb-20">
                <TouchableOpacity onPress={handleStartSleeping} className="bg-[#8EAE9D] rounded-full py-4 px-8 items-center">
                    <View className="flex-row items-center">
                        {/* <Text className="text-white text-xl mr-2">🌙</Text> */}
                        <Image source={Sleep.moonStar} className="w-6 h-6 mx-4" resizeMode="contain" />
                        <Text className="text-white font-poppins-semibold text-lg">Start Sleeping</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Bottom spacing for tab navigation */}
            <View className="h-32" />
        </ScrollView>
    );
}
