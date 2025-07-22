import { Sleep } from "@/constants/Images";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Path, Svg, Text as SvgText } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

export default function SleepScreen() {
    const insets = useSafeAreaInsets();
    const [selectedPeriod, setSelectedPeriod] = useState("1 year");

    const handleStartSleeping = () => {
        router.push("/sleep-start");
    };

    // Sample data
    const sleepData = {
        current: 51,
        target: 56,
        quality: 78,
        status: "pretty good",
        bedTime: "10:00 PM",
        wakeTime: "05:00 AM",
        periods: ["1 day", "1 week", "1 month", "1 year", "all time"],
    };

    const musicData = {
        title: "Ocean Waves",
        artist: "Phobe brigers",
        albumArt: "https://via.placeholder.com/50x50/8B4513/FFFFFF?text=🎵",
    };

    // Simple line chart component
    const SleepChart = () => {
        const chartWidth = screenWidth - 80;
        const chartHeight = 200;
        const paddingLeft = 30;
        const paddingTop = 20;

        // Create a smooth wave curve that resembles the sleep pattern in the image
        const createSleepCurve = () => {
            const width = chartWidth - paddingLeft - 20;
            const height = chartHeight - paddingTop - 60;

            // Points for a natural sleep wave pattern similar to the image
            const points = [
                { x: paddingLeft, y: paddingTop + height * 0.2 }, // Start high (around 8h area)
                { x: paddingLeft + width * 0.2, y: paddingTop + height * 0.5 }, // Dip down (around 5h area)
                { x: paddingLeft + width * 0.4, y: paddingTop + height * 0.35 }, // Rise up (around 6h area)
                { x: paddingLeft + width * 0.6, y: paddingTop + height * 0.6 }, // Another dip (around 4h area)
                { x: paddingLeft + width * 0.8, y: paddingTop + height * 0.25 }, // Rise again (around 7h area)
                { x: paddingLeft + width * 0.95, y: paddingTop + height * 0.45 }, // End moderate (around 5h area)
            ];

            // Create smooth curve using smooth bezier curves
            let pathData = `M ${points[0].x} ${points[0].y}`;

            for (let i = 1; i < points.length; i++) {
                const prevPoint = points[i - 1];
                const currentPoint = points[i];

                // Create smooth curves between points
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
                        8h
                    </SvgText>
                    <SvgText x="10" y="85" fontSize="14" fill="#6B7280" fontFamily="Poppins_400Regular">
                        5h
                    </SvgText>
                    <SvgText x="10" y="135" fontSize="14" fill="#6B7280" fontFamily="Poppins_400Regular">
                        2h
                    </SvgText>
                    <SvgText x="10" y="175" fontSize="14" fill="#6B7280" fontFamily="Poppins_400Regular">
                        0h
                    </SvgText>

                    {/* Sleep curve with dark green color like in the image */}
                    <Path d={createSleepCurve()} stroke="#1F4E42" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>

                {/* Sleep quality score - positioned like in the image */}
                <View
                    className="bg-[#C3DFE2] rounded-2xl px-4 py-3"
                    style={{
                        position: "absolute",
                        bottom: 80,
                        left: chartWidth * 0.35,
                        transform: [{ translateX: -30 }],
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        borderWidth: 1,
                        borderColor: "#C3DFE2",
                    }}
                >
                    <View className="flex-row items-center">
                        <Text className="text-2xl font-poppins-bold text-gray-800 mr-2">78</Text>
                        <Text className="text-orange-500 text-lg">🔥</Text>
                    </View>
                </View>

                {/* Sleep hours info - positioned like in the image */}
                <View
                    className="absolute"
                    style={{
                        position: "absolute",
                        bottom: 20,
                        right: 40,
                    }}
                >
                    <Text className="text-4xl font-poppins-bold text-gray-800 text-right">
                        {sleepData.current}/{sleepData.target}
                    </Text>
                    <Text className="text-lg font-poppins text-gray-600 text-right">hours</Text>
                    <Text className="text-sm font-poppins text-gray-500 text-right">{sleepData.status}</Text>
                </View>
            </View>
        );
    };

    return (
        <ScrollView className="flex-1 bg-[#F5FBFC]" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-6 py-6">
                <Text className="text-3xl font-poppins-bold text-gray-900 text-center mb-6">Sleep Quality</Text>

                {/* Period Selector */}
                <View className="bg-[#C3DFE2] rounded-full p-1 mb-6 border border-[#114438]">
                    <View className="flex-row">
                        {sleepData.periods.map((period) => (
                            <TouchableOpacity
                                key={period}
                                onPress={() => setSelectedPeriod(period)}
                                className={`flex-1 py-2 px-3 rounded-full ${selectedPeriod === period ? "bg-white shadow-sm border-2 border-[#114438]" : "bg-transparent"}`}
                            >
                                <Text className={`text-center text-sm font-poppins-medium ${selectedPeriod === period ? "text-gray-900" : "text-gray-600"}`}>{period}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Sleep Chart */}
                <View className="bg-[#B0D0D3] rounded-3xl p-6 mb-6 relative">
                    <SleepChart />

                    {/* Share button - positioned in top right corner */}
                    <TouchableOpacity
                        className="absolute top-4 right-4 w-8 h-8 items-center justify-center"
                        style={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                        }}
                    >
                        <Text className="text-gray-600 text-xl">↗</Text>
                    </TouchableOpacity>
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
