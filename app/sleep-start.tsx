import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SleepStartScreen() {
    const insets = useSafeAreaInsets();
    const [sleepTimer, setSleepTimer] = useState(0); // seconds
    const [isActive, setIsActive] = useState(true);
    const [currentTrack] = useState({
        title: "Ocean Waves",
        artist: "Sound of rain",
    });

    // Timer logic
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (isActive) {
            interval = setInterval(() => {
                setSleepTimer((timer) => timer + 1);
            }, 1000);
        } else if (!isActive && sleepTimer !== 0) {
            if (interval) clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, sleepTimer]);

    // Convert seconds to HH:MM:SS format
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    // Functions for backend integration (placeholder)
    const startSleepSession = async () => {
        // TODO: Implement backend call to start sleep session
        console.log("Starting sleep session...");
    };

    const stopSleepSession = async () => {
        // TODO: Implement backend call to stop sleep session
        console.log("Stopping sleep session...");
    };

    const saveSleepData = async (duration: number, photoUri?: string) => {
        // TODO: Implement backend call to save sleep data with photo
        console.log("Saving sleep data:", { duration, track: currentTrack, photoUri });
    };

    const sendPhotoForAnalysis = async (photoUri: string, sleepDuration: number) => {
        // TODO: Implement backend call to send photo for AI analysis
        console.log("Sending photo for AI analysis:", { photoUri, sleepDuration });
        // This will return analysis results from your team's AI backend
        return {
            analysisId: "mock-analysis-id",
            status: "processing",
        };
    };

    const takeCameraPhoto = async () => {
        try {
            // Request camera permissions
            const { status } = await ImagePicker.requestCameraPermissionsAsync();

            if (status !== "granted") {
                Alert.alert("Camera Permission Required", "We need camera access to analyze your wake-up condition for better sleep insights.", [
                    { text: "Cancel", style: "cancel" },
                    { text: "Settings", onPress: () => ImagePicker.requestCameraPermissionsAsync() },
                ]);
                return null;
            }

            // Launch camera with options optimized for face detection
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [3, 4],
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

    const handleStopSleeping = () => {
        Alert.alert("Stop Sleeping", "Are you sure you want to stop your sleep session?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Stop",
                onPress: async () => {
                    setIsActive(false);
                    await stopSleepSession();

                    // Show camera prompt for wake-up analysis
                    Alert.alert("Wake-up Analysis", "Take a quick photo for AI-powered sleep quality analysis?", [
                        {
                            text: "Skip",
                            style: "cancel",
                            onPress: async () => {
                                await saveSleepData(sleepTimer);
                                router.back();
                            },
                        },
                        {
                            text: "Take Photo",
                            onPress: async () => {
                                const photoUri = await takeCameraPhoto();

                                if (photoUri) {
                                    // Save sleep data with photo
                                    await saveSleepData(sleepTimer, photoUri);

                                    // Send photo for AI analysis
                                    const analysisResult = await sendPhotoForAnalysis(photoUri, sleepTimer);

                                    // Navigate to analysis results page
                                    router.push({
                                        pathname: "/sleep-analysis",
                                        params: {
                                            photoUri: photoUri,
                                            sleepDuration: sleepTimer.toString(),
                                            analysisId: analysisResult.analysisId,
                                        },
                                    });
                                } else {
                                    // Photo capture cancelled or failed
                                    await saveSleepData(sleepTimer);
                                    router.back();
                                }
                            },
                        },
                    ]);
                },
            },
        ]);
    };

    const handleGoBack = () => {
        if (isActive) {
            Alert.alert("Sleep Session Active", "You have an active sleep session. Do you want to stop it?", [
                {
                    text: "Continue Sleeping",
                    style: "cancel",
                },
                {
                    text: "Stop & Go Back",
                    onPress: handleStopSleeping,
                },
            ]);
        } else {
            router.back();
        }
    };

    // Start sleep session when component mounts
    useEffect(() => {
        startSleepSession();
    }, []);

    return (
        <View className="flex-1 bg-[#F5FBFC]" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={handleGoBack} className="p-2">
                    <Text className="text-2xl font-poppins">←</Text>
                </TouchableOpacity>
                <Text className="text-xl font-poppins-semibold text-gray-900">Sleep Session</Text>
                <View className="p-2" />
            </View>

            {/* Main Content */}
            <View className="flex-1 justify-center items-center px-6">
                {/* Current Track Info */}
                <View className="bg-[#B0D0D3] rounded-full px-8 py-4 mb-12">
                    <View className="flex-row items-center">
                        <View className="w-5 h-5 mr-3">
                            {/* Music note icon */}
                            <Text className="text-lg">♪</Text>
                        </View>
                        <Text className="text-lg font-poppins-semibold text-gray-900">{currentTrack.title}</Text>
                    </View>
                </View>

                {/* Cat Image Placeholder */}
                <View className="mb-20">
                    <View className="w-80 h-80 bg-orange-100 rounded-full items-center justify-center mb-8 mx-auto" style={{ backgroundColor: "#FEF3C7" }}>
                        {/* Placeholder for cat sleeping image - you can replace this with actual image */}
                        <View className="items-center">
                            <Text className="text-8xl mb-2">😴</Text>
                            <Text className="text-gray-500 font-poppins text-sm text-center">Replace with cat{"\n"}sleeping image</Text>
                        </View>
                    </View>
                </View>

                {/* Sleep Timer */}
                <View className="items-center mb-20">
                    <Text className="text-6xl font-poppins-bold text-gray-900 mb-3">{formatTime(sleepTimer)}</Text>
                </View>

                {/* Stop Button */}
                <TouchableOpacity
                    onPress={handleStopSleeping}
                    className="bg-[#7BA05B] rounded-full px-16 py-5 items-center"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 10,
                    }}
                >
                    <View className="flex-row items-center">
                        <View className="w-6 h-6 mr-3 items-center justify-center">
                            {/* Stop icon - circle */}
                            <View className="w-4 h-4 bg-white rounded-full" />
                        </View>
                        <Text className="text-white font-poppins-semibold text-lg">Stop Sleeping</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Bottom spacing for safe area */}
            <View style={{ height: Math.max(insets.bottom, 20) }} />
        </View>
    );
}
