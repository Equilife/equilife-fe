import { Achievements, Profile } from "@/constants/Images";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();

    // Get current date dynamically
    const getCurrentDate = () => {
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return today.toLocaleDateString("en-US", options);
    };

    const achievements = [
        {
            id: 1,
            title: "Dream Master",
            status: "Unlocked",
            icon: Achievements.dreamMaster,
            bgColor: "#8B4513",
        },
        {
            id: 2,
            title: "Chill Champion",
            status: "Unlocked",
            icon: Achievements.chillChampion,
            bgColor: "#FF8C00",
        },
        {
            id: 3,
            title: "Heartful Habit",
            status: "Unlocked",
            icon: Achievements.heartfulHabit,
            bgColor: "#FF4757",
        },
    ];

    return (
        <ScrollView className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            {/* Header with gradient background */}
            <View
                className="bg-gray-300 px-6 py-8 mb-6"
                style={{
                    backgroundColor: "#A8C5B8",
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                }}
            >
                {/* Top Row - Avatar, Date, Notification */}
                <View className="flex-row items-center justify-between mb-8">
                    <View className="w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                        <Image source={{ uri: "https://via.placeholder.com/60x60/8B4513/FFFFFF?text=👤" }} className="w-full h-full" resizeMode="cover" />
                    </View>

                    <Text className="text-white text-lg font-poppins-medium">{getCurrentDate()}</Text>

                    <TouchableOpacity className="w-10 h-10 rounded-full items-center justify-center">
                        {/* <Text className="text-white text-lg">🔔</Text> */}
                        <Image source={Profile.whiteBell} className="w-7 h-7" resizeMode="contain" />
                    </TouchableOpacity>
                </View>

                {/* Greeting */}
                <View className="items-center">
                    <Text className="text-white text-2xl font-poppins-bold">Hello, nama! 👋👋</Text>
                </View>
            </View>

            {/* Achievements Section */}
            <View className="px-6 mb-8">
                <View className="bg-[#F5FBFC] border-[1.5px] border-[#C3DFE2] rounded-3xl p-6 shadow-sm">
                    {/* Header with "For more" link */}
                    <View className="flex-row items-center justify-between mb-6">
                        <View className="flex-1" />
                        <TouchableOpacity className="flex-row items-center" onPress={() => router.push("/achievements")}>
                            <Text className="text-gray-500 font-poppins text-base mr-1">For more</Text>
                            <Text className="text-gray-500 font-poppins text-lg">›</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Achievement Cards */}
                    <View className="flex-row justify-between">
                        {achievements.map((achievement) => (
                            <View key={achievement.id} className="items-center flex-1 mx-[0.3rem] bg-white py-4 border-2 border-[#114438] rounded-3xl">
                                <View
                                    className="w-16 h-16 rounded-2xl items-center justify-center mb-3"
                                    style={
                                        {
                                            // backgroundColor: achievement.bgColor,
                                            // borderColor: "#2E5C4A",
                                        }
                                    }
                                >
                                    <Image source={achievement.icon} className="w-full h-full" resizeMode="contain" />
                                </View>
                                <Text className="text-gray-800 font-poppins-semibold text-sm text-center mb-1">{achievement.title}</Text>
                                <Text className="text-gray-500 font-poppins text-xs text-center">{achievement.status}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            {/* Bottom spacing for tab navigation */}
            <View className="h-32" />
        </ScrollView>
    );
}
