import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function SleepCameraScreen() {
    const insets = useSafeAreaInsets();
    const [isCapturing, setIsCapturing] = useState(false);

    // Camera permission request function
    const requestCameraPermission = async () => {
        // TODO: Implement camera permission request
        // For now, simulate permission granted
        return true;
    };

    // Take photo function
    const takePhoto = async () => {
        try {
            setIsCapturing(true);

            // TODO: Implement actual camera functionality
            // For now, simulate photo capture
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Simulate successful photo capture
            const photoData = {
                uri: "mock-photo-uri",
                width: 1080,
                height: 1920,
                timestamp: new Date().toISOString(),
            };

            // Navigate to analysis screen with photo data
            router.push({
                pathname: "/sleep-analysis",
                params: { photoUri: photoData.uri },
            });
        } catch (error) {
            Alert.alert("Error", "Failed to capture photo. Please try again.");
        } finally {
            setIsCapturing(false);
        }
    };

    // Skip photo function
    const skipPhoto = () => {
        Alert.alert("Skip Photo?", "Are you sure you want to skip the wake-up photo? This will affect the accuracy of your sleep analysis.", [
            {
                text: "Take Photo",
                style: "cancel",
            },
            {
                text: "Skip",
                onPress: () => router.push("/sleep-analysis"),
            },
        ]);
    };

    const handleGoBack = () => {
        Alert.alert("Cancel Photo", "Do you want to go back to the sleep session?", [
            {
                text: "Stay",
                style: "cancel",
            },
            {
                text: "Go Back",
                onPress: () => router.back(),
            },
        ]);
    };

    React.useEffect(() => {
        requestCameraPermission();
    }, []);

    return (
        <View className="flex-1 bg-gray-900" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={handleGoBack} className="p-2">
                    <Text className="text-2xl text-white">←</Text>
                </TouchableOpacity>
                <Text className="text-xl font-poppins-semibold text-white">Wake-up Photo</Text>
                <TouchableOpacity onPress={skipPhoto} className="p-2">
                    <Text className="text-white font-poppins">Skip</Text>
                </TouchableOpacity>
            </View>

            {/* Camera Preview Area */}
            <View className="flex-1 relative">
                {/* Camera viewfinder overlay */}
                <View className="absolute inset-0 bg-black">
                    {/* Simulated camera preview */}
                    <View className="flex-1 bg-gray-800 items-center justify-center">
                        <Text className="text-white text-lg font-poppins mb-4">Camera Preview</Text>
                        <Text className="text-gray-400 text-sm font-poppins text-center px-8">
                            Camera functionality will be implemented here.{"\n"}
                            For now, this is a placeholder.
                        </Text>
                    </View>
                </View>

                {/* Face detection overlay */}
                <View className="absolute inset-0 items-center justify-center">
                    <View
                        className="border-4 border-white rounded-2xl"
                        style={{
                            width: width * 0.7,
                            height: height * 0.5,
                            borderStyle: "dashed",
                        }}
                    >
                        {/* Corner markers */}
                        <View className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-white" />
                        <View className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-white" />
                        <View className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-white" />
                        <View className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-white" />
                    </View>
                </View>

                {/* Instructions */}
                <View className="absolute bottom-32 left-0 right-0 px-6">
                    <View className="bg-black bg-opacity-60 rounded-2xl p-4">
                        <View className="flex-row items-center justify-center mb-2">
                            <Text className="text-2xl mr-2">⏱️</Text>
                            <Text className="text-white font-poppins-semibold">Please hold still..</Text>
                        </View>
                        <Text className="text-gray-300 text-sm font-poppins text-center">Position your face within the frame for sleep quality analysis</Text>
                    </View>
                </View>

                {/* Progress bar at bottom */}
                <View className="absolute bottom-20 left-0 right-0 px-6">
                    <View className="w-full h-1 bg-gray-600 rounded-full">
                        <View className="h-full bg-blue-400 rounded-full transition-all duration-1000" style={{ width: isCapturing ? "100%" : "0%" }} />
                    </View>
                </View>
            </View>

            {/* Bottom Controls */}
            <View className="px-6 pb-8" style={{ paddingBottom: Math.max(insets.bottom + 32, 48) }}>
                <View className="flex-row items-center justify-center">
                    {/* Cancel Button */}
                    <TouchableOpacity onPress={skipPhoto} className="w-16 h-16 rounded-full border-2 border-gray-400 items-center justify-center mr-12" disabled={isCapturing}>
                        <Text className="text-gray-400 text-lg">✕</Text>
                    </TouchableOpacity>

                    {/* Capture Button */}
                    <TouchableOpacity
                        onPress={takePhoto}
                        disabled={isCapturing}
                        className="w-20 h-20 rounded-full bg-white items-center justify-center"
                        style={{
                            opacity: isCapturing ? 0.7 : 1,
                            transform: [{ scale: isCapturing ? 0.9 : 1 }],
                        }}
                    >
                        {isCapturing ? (
                            <View className="w-12 h-12 rounded-full border-4 border-gray-400 border-t-4 border-t-blue-500 animate-spin" />
                        ) : (
                            <View className="w-16 h-16 rounded-full bg-gray-200 items-center justify-center">
                                <View className="w-12 h-12 rounded-full border-4 border-gray-600" />
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Gallery/Recent Photo Button */}
                    <TouchableOpacity className="w-16 h-16 rounded-2xl bg-gray-700 items-center justify-center ml-12" disabled={isCapturing}>
                        <Text className="text-white text-lg">📷</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
