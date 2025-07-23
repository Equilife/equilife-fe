import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SleepSound {
    id: string;
    title: string;
    artist: string;
    isPlaying: boolean;
    duration: number;
}

export default function SleepSoundScreen() {
    const insets = useSafeAreaInsets();
    // const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const [sounds, setSounds] = useState<SleepSound[]>([
        {
            id: "1",
            title: "Smoke Signal",
            artist: "Phobe Brigers",
            isPlaying: false,
            duration: 240,
        },
        {
            id: "2",
            title: "Waiting Room",
            artist: "Phobe Brigers",
            isPlaying: false,
            duration: 180,
        },
        {
            id: "3",
            title: "Sound of rain",
            artist: "Phobe Brigers",
            isPlaying: true,
            duration: 320,
        },
        {
            id: "4",
            title: "Wind sound",
            artist: "Phobe Brigers",
            isPlaying: false,
            duration: 200,
        },
        {
            id: "5",
            title: "Ocean Waves",
            artist: "Phobe Brigers",
            isPlaying: false,
            duration: 280,
        },
        {
            id: "6",
            title: "Forest Sounds",
            artist: "Phobe Brigers",
            isPlaying: false,
            duration: 350,
        },
        {
            id: "7",
            title: "Ocean Waves",
            artist: "Phobe Brigers",
            isPlaying: false,
            duration: 280,
        },
        {
            id: "8",
            title: "Forest Sounds",
            artist: "Phobe Brigers",
            isPlaying: false,
            duration: 350,
        },
    ]);

    const playSound = (soundId: string) => {
        setSounds((prev) =>
            prev.map((sound) => ({
                ...sound,
                isPlaying: sound.id === soundId ? !sound.isPlaying : false,
            }))
        );
    };

    const pauseSound = (soundId: string) => {
        setSounds((prev) =>
            prev.map((sound) => ({
                ...sound,
                isPlaying: sound.id === soundId ? false : sound.isPlaying,
            }))
        );
    };

    const addNewSound = () => {
        Alert.alert("Add Sound", "Feature to add new sleep sound will be implemented");
    };

    // const toggleViewMode = () => {
    //     setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
    // };

    return (
        <ScrollView className="flex-1 bg-[#F5FBFC]" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <Text className="text-2xl font-poppins">←</Text>
                </TouchableOpacity>
                <Text className="text-xl font-poppins-semibold text-gray-900">Sleep sound</Text>
                <View className="p-2" />
                {/* Toggle view mode feature commented out for now */}
            </View>

            {/* Sound List */}
            <View className="px-6 mt-6">
                {/* Grid View (Original Design) */}
                <View className="flex-row flex-wrap justify-between">
                    {sounds.map((sound, index) => (
                        <View key={sound.id} className="w-[47%] mb-6">
                            <View className="bg-[#B0D0D3] rounded-3xl p-4">
                                {/* Album Art Placeholder */}
                                <View className="w-full aspect-square bg-gray-400 rounded-2xl mb-3 items-center justify-center"></View>

                                {/* Song Info */}
                                <View className="mb-2">
                                    <Text className="text-base font-poppins-bold text-gray-900 mb-1" numberOfLines={1}>
                                        {sound.title}
                                    </Text>
                                    <Text className="text-sm font-poppins text-gray-600" numberOfLines={1}>
                                        {sound.artist}
                                    </Text>
                                </View>

                                {/* Play Button */}
                                <View className="flex-row justify-end">
                                    <TouchableOpacity onPress={() => (sound.isPlaying ? pauseSound(sound.id) : playSound(sound.id))} className="w-6 h-6 items-center justify-center">
                                        {sound.isPlaying ? (
                                            // Pause icon - two vertical bars
                                            <View className="flex-row space-x-0.5">
                                                <View className="w-1.5 h-4 bg-gray-900 rounded-sm" />
                                                <View className="w-1.5 h-4 bg-gray-900 rounded-sm" />
                                            </View>
                                        ) : (
                                            // Play icon - triangle
                                            <View
                                                className="w-0 h-0 ml-0.5"
                                                style={{
                                                    borderLeftWidth: 5,
                                                    borderRightWidth: 0,
                                                    borderTopWidth: 3,
                                                    borderBottomWidth: 3,
                                                    borderLeftColor: "#1f2937",
                                                    borderTopColor: "transparent",
                                                    borderBottomColor: "transparent",
                                                }}
                                            />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* Add Button */}
            <TouchableOpacity
                onPress={addNewSound}
                className="absolute right-6 w-16 h-16 bg-[#7BA05B] rounded-2xl items-center justify-center"
                style={{
                    bottom: Math.max(insets.bottom + 30, 42), // Minimum 32px from bottom, or 16px above safe area
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 10,
                }}
            >
                <Text className="text-white text-3xl font-poppins-light leading-none">+</Text>
            </TouchableOpacity>

            {/* Bottom spacing */}
            <View style={{ height: Math.max(insets.bottom + 80, 100) }} />
        </ScrollView>
    );
}
