import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AnalysisResult {
    sleepQualityScore: number;
    fatigueLevel: string;
    recommendations: string[];
    insights: {
        eyeCondition: string;
        skinCondition: string;
        overallWellness: string;
    };
    isProcessing: boolean;
}

export default function SleepAnalysisScreen() {
    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams();
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult>({
        sleepQualityScore: 0,
        fatigueLevel: "Analyzing...",
        recommendations: [],
        insights: {
            eyeCondition: "Processing...",
            skinCondition: "Processing...",
            overallWellness: "Processing...",
        },
        isProcessing: true,
    });

    // Convert sleep duration from seconds to readable format
    const formatSleepDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    // Simulate AI analysis process
    const performAnalysis = async () => {
        try {
            // TODO: Replace with actual API call to your team's AI backend
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate processing time

            // Mock analysis results - replace with actual API response
            const mockResult: AnalysisResult = {
                sleepQualityScore: 78,
                fatigueLevel: "Moderate",
                recommendations: ["Consider going to bed 30 minutes earlier", "Try drinking more water before sleep", "Reduce screen time 1 hour before bedtime", "Consider using a sleep mask for better darkness"],
                insights: {
                    eyeCondition: "Slightly tired - noticeable under-eye areas",
                    skinCondition: "Good hydration - healthy skin tone",
                    overallWellness: "Well-rested but could improve sleep duration",
                },
                isProcessing: false,
            };

            setAnalysisResult(mockResult);
        } catch (error) {
            console.error("Analysis error:", error);
            setAnalysisResult((prev) => ({
                ...prev,
                isProcessing: false,
                fatigueLevel: "Analysis Failed",
                recommendations: ["Unable to analyze photo. Please try again next time."],
            }));
        }
    };

    const saveAnalysisResults = async () => {
        // TODO: Save analysis results to backend
        console.log("Saving analysis results:", analysisResult);
    };

    const handleDone = async () => {
        await saveAnalysisResults();
        // Navigate back to main sleep screen or dashboard
        router.replace("/(tabs)/sleep");
    };

    const handleRetakePhoto = () => {
        router.back(); // Go back to take another photo
    };

    useEffect(() => {
        performAnalysis();
    }, []);

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const getScoreDescription = (score: number) => {
        if (score >= 80) return "Excellent";
        if (score >= 60) return "Good";
        if (score >= 40) return "Fair";
        return "Poor";
    };

    return (
        <ScrollView className="flex-1 bg-[#F5FBFC]" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <Text className="text-2xl font-poppins">←</Text>
                </TouchableOpacity>
                <Text className="text-xl font-poppins-semibold text-gray-900">Sleep Analysis</Text>
                <View className="p-2" />
            </View>

            <View className="px-6">
                {/* Photo Section */}
                {params.photoUri && (
                    <View className="mb-6">
                        <Text className="text-lg font-poppins-semibold text-gray-900 mb-3">Wake-up Photo</Text>
                        <View className="bg-white border-[1.5px] border-[#114438] rounded-2xl p-4">
                            <Image source={{ uri: params.photoUri as string }} className="w-full h-48 rounded-xl" resizeMode="cover" />
                        </View>
                    </View>
                )}

                {/* Sleep Duration */}
                <View className="mb-6">
                    <View className="bg-white border-[1.5px] border-[#114438] rounded-2xl p-4">
                        <Text className="text-lg font-poppins-semibold text-gray-900 mb-2">Sleep Duration</Text>
                        <Text className="text-3xl font-poppins-bold text-blue-600">{formatSleepDuration(parseInt(params.sleepDuration as string) || 0)}</Text>
                    </View>
                </View>

                {/* Analysis Results */}
                <View className="mb-6">
                    <Text className="text-lg font-poppins-semibold text-gray-900 mb-3">AI Analysis Results</Text>

                    {analysisResult.isProcessing ? (
                        <View className="bg-white rounded-2xl p-6 shadow-sm items-center">
                            <ActivityIndicator size="large" color="#3B82F6" />
                            <Text className="text-gray-600 font-poppins mt-4 text-center">Analyzing your wake-up condition...</Text>
                            <Text className="text-gray-400 font-poppins text-sm mt-2 text-center">This may take a few moments</Text>
                        </View>
                    ) : (
                        <>
                            {/* Sleep Quality Score */}
                            <View className="bg-white border-[1.5px] border-[#114438] rounded-2xl p-4 shadow-sm mb-4">
                                <Text className="text-base font-poppins-semibold text-gray-900 mb-2">Sleep Quality Score</Text>
                                <View className="flex-row items-center justify-between">
                                    <Text className={`text-4xl font-poppins-bold ${getScoreColor(analysisResult.sleepQualityScore)}`}>{analysisResult.sleepQualityScore}%</Text>
                                    <Text className={`text-lg font-poppins-semibold ${getScoreColor(analysisResult.sleepQualityScore)}`}>{getScoreDescription(analysisResult.sleepQualityScore)}</Text>
                                </View>
                            </View>

                            {/* Fatigue Level */}
                            <View className="bg-white border-[1.5px] border-[#114438] rounded-2xl p-4 shadow-sm mb-4">
                                <Text className="text-base font-poppins-semibold text-gray-900 mb-2">Fatigue Level</Text>
                                <Text className="text-lg font-poppins text-gray-700">{analysisResult.fatigueLevel}</Text>
                            </View>

                            {/* AI Insights */}
                            <View className="bg-white border-[1.5px] border-[#114438] rounded-2xl p-4 shadow-sm mb-4">
                                <Text className="text-base font-poppins-semibold text-gray-900 mb-3">AI Insights</Text>
                                <View className="space-y-3">
                                    <View>
                                        <Text className="text-sm font-poppins-semibold text-gray-700">Eye Condition:</Text>
                                        <Text className="text-sm font-poppins text-gray-600">{analysisResult.insights.eyeCondition}</Text>
                                    </View>
                                    <View>
                                        <Text className="text-sm font-poppins-semibold text-gray-700">Skin Condition:</Text>
                                        <Text className="text-sm font-poppins text-gray-600">{analysisResult.insights.skinCondition}</Text>
                                    </View>
                                    <View>
                                        <Text className="text-sm font-poppins-semibold text-gray-700">Overall Wellness:</Text>
                                        <Text className="text-sm font-poppins text-gray-600">{analysisResult.insights.overallWellness}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Recommendations */}
                            <View className="bg-white border-[1.5px] border-[#114438] rounded-2xl p-4 shadow-sm mb-6">
                                <Text className="text-base font-poppins-semibold text-gray-900 mb-3">Recommendations</Text>
                                {analysisResult.recommendations.map((recommendation, index) => (
                                    <View key={index} className="flex-row items-start mb-2">
                                        <Text className="text-blue-500 mr-2">•</Text>
                                        <Text className="text-sm font-poppins text-gray-600 flex-1">{recommendation}</Text>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}
                </View>

                {/* Action Buttons */}
                <View className="mb-8">
                    {!analysisResult.isProcessing && (
                        <View className="space-y-3 gap-5">
                            <TouchableOpacity
                                onPress={handleDone}
                                className="bg-[#8EAE9D] rounded-full py-4 px-8 items-center"
                                style={{
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 4,
                                    elevation: 5,
                                }}
                            >
                                <Text className="text-white font-poppins-semibold text-lg">Done</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleRetakePhoto} className="bg-white border-2 border-[#8EAE9D] rounded-full py-4 px-8 items-center">
                                <Text className="text-gray-700 font-poppins-semibold text-lg">Retake Photo</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>

            {/* Bottom spacing */}
            <View style={{ height: Math.max(insets.bottom + 20, 40) }} />
        </ScrollView>
    );
}
