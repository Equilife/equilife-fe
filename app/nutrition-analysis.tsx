import { Food, Icons } from "@/constants/Images";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface NutritionInfo {
    name: string;
    calories: number;
    totalCalories: string;
    totalFat: string;
    fiber: string;
    protein: string;
    motivationalText: string;
}

export default function NutritionAnalysisScreen() {
    const insets = useSafeAreaInsets();
    const { photoUri, isLoading } = useLocalSearchParams<{ photoUri: string; isLoading?: string }>();

    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [analysisData, setAnalysisData] = useState<NutritionInfo | null>(null);

    // Simulate AI analysis when component mounts
    useEffect(() => {
        const performAnalysis = async () => {
            try {
                // Simulate API call to backend for nutrition analysis
                console.log("Analyzing food photo:", { photoUri });

                // Simulate processing time (3 seconds)
                await new Promise((resolve) => setTimeout(resolve, 3000));

                // Simulated AI analysis result
                const nutritionResult: NutritionInfo = {
                    name: "Nasi Padang",
                    calories: 367,
                    totalCalories: "125 calories",
                    totalFat: "17g",
                    fiber: "20g",
                    protein: "25g",
                    motivationalText: "You're fueling your body the right way.",
                };

                setAnalysisData(nutritionResult);
                setAnalysisComplete(true);
            } catch (error) {
                console.error("Analysis error:", error);
                // Handle error - maybe show retry option
            }
        };

        if (isLoading === "true") {
            performAnalysis();
        } else {
            // If not loading, show the analysis data immediately
            setAnalysisData({
                name: "Nasi Padang",
                calories: 367,
                totalCalories: "125 calories",
                totalFat: "17g",
                fiber: "20g",
                protein: "25g",
                motivationalText: "You're fueling your body the right way.",
            });
            setAnalysisComplete(true);
        }
    }, [isLoading, photoUri]);

    // Loading screen while analysis is in progress
    if (!analysisComplete) {
        return (
            <View style={{ flex: 1, backgroundColor: "#F5FBFC", paddingTop: insets.top }}>
                {/* Header */}
                <View className="flex-row items-center px-6 py-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className="text-lg text-gray-600">←</Text>
                    </TouchableOpacity>
                    <View className="flex-1 items-center">
                        <Text className="text-lg font-poppins-bold text-gray-900">Analyzing Food</Text>
                    </View>
                    <View style={{ width: 20 }} />
                </View>

                {/* Loading Content */}
                <View className="flex-1 items-center justify-center px-6">
                    {/* Food Photo */}
                    {photoUri && (
                        <View className="w-64 h-48 rounded-3xl overflow-hidden mb-8">
                            <Image source={{ uri: photoUri }} className="w-full h-full" resizeMode="cover" />
                        </View>
                    )}

                    {/* Loading Indicator */}
                    <View className="items-center mb-8">
                        <View className="w-16 h-16 border-4 border-[#8EAE9D] border-t-transparent rounded-full animate-spin mb-6" />
                        <Text className="text-xl font-poppins-bold text-gray-900 mb-2 text-center">Analyzing your food...</Text>
                        <Text className="text-gray-600 text-center font-poppins leading-relaxed">Our AI is identifying the nutritional{"\n"}content and calculating calories</Text>
                    </View>

                    {/* Tips while waiting */}
                    <View className="bg-white rounded-3xl border-2 border-[#8EAE9D] p-6 mx-6">
                        <Text className="text-lg font-poppins-bold text-gray-900 mb-3 text-center">Did you know?</Text>
                        <Text className="text-gray-600 font-poppins text-center">Proper nutrition tracking can help you achieve your health goals 3x faster!</Text>
                    </View>
                </View>

                {/* Bottom spacing */}
                <View style={{ height: Math.max(insets.bottom + 20, 40) }} />
            </View>
        );
    }

    // Analysis results screen
    if (!analysisData) {
        return null;
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#F5FBFC", paddingTop: insets.top }}>
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="flex-row items-center px-6 py-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className="text-lg text-gray-600">←</Text>
                    </TouchableOpacity>
                    <View className="flex-1 items-center">
                        <Text className="text-lg font-poppins-bold text-gray-900">Meal Details</Text>
                    </View>
                    <View style={{ width: 20 }} />
                </View>

                {/* Food Image */}
                <View className="items-center px-6 py-4">
                    <View className="w-64 h-48 rounded-3xl items-center justify-center mb-4">
                        <Image source={Food.spoon} className="w-full h-full" resizeMode="contain" />
                    </View>
                </View>

                {/* Main Calories Display */}
                <View className="items-center px-6 py-4">
                    <Text className="text-5xl font-poppins-bold text-gray-900">
                        {analysisData.calories}
                        <Text className="text-lg font-poppins">kcal</Text>
                    </Text>
                    <Text className="text-gray-500 text-center font-poppins mt-2">{analysisData.motivationalText}</Text>
                </View>

                {/* Nutrition Details */}
                <View className="mx-6 mt-6 bg-white rounded-3xl border-2 border-gray-200 p-6">
                    <Text className="text-lg font-poppins-bold text-gray-900 mb-4 text-center">Identifiers</Text>

                    <View className="space-y-4">
                        <View className="flex-row justify-between items-center py-2 border-b border-gray-200">
                            <Text className="text-gray-700 font-poppins">Eat name</Text>
                            <Text className="text-gray-900 font-poppins-semibold">{analysisData.name}</Text>
                        </View>

                        <View className="flex-row justify-between items-center py-2 border-b border-gray-200">
                            <Text className="text-gray-700 font-poppins">Total calories</Text>
                            <Text className="text-gray-900 font-poppins-semibold">{analysisData.totalCalories}</Text>
                        </View>

                        <View className="flex-row justify-between items-center py-2 border-b border-gray-200">
                            <Text className="text-gray-700 font-poppins">Total fat</Text>
                            <Text className="text-gray-900 font-poppins-semibold">{analysisData.totalFat}</Text>
                        </View>

                        <View className="flex-row justify-between items-center py-2 border-b border-gray-200">
                            <Text className="text-gray-700 font-poppins">Fiber</Text>
                            <Text className="text-gray-900 font-poppins-semibold">{analysisData.fiber}</Text>
                        </View>

                        <View className="flex-row justify-between items-center py-2">
                            <Text className="text-gray-700 font-poppins">Protein</Text>
                            <Text className="text-gray-900 font-poppins-semibold">{analysisData.protein}</Text>
                        </View>
                    </View>

                    {/* Notes Section */}
                    <View className="mt-6">
                        <Text className="text-lg font-poppins-bold text-gray-900 mb-2">Notes :</Text>
                        <Text className="text-gray-500 font-poppins leading-relaxed">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                        </Text>
                    </View>
                </View>

                {/* Logo */}
                <View className="items-center mt-8">
                    <Image source={Icons.logoLandscape} className="w-28 h-28" resizeMode="contain" />
                </View>
            </ScrollView>

            {/* Bottom spacing */}
            <View style={{ height: Math.max(insets.bottom + 20, 40) }} />
        </View>
    );
}
