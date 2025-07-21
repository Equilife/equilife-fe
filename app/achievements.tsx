import { Achievements } from "@/constants/Images";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AchievementsScreen() {
    const insets = useSafeAreaInsets();

    const allAchievements = [
        {
            id: 1,
            title: "Dream Master",
            status: "Unlocked",
            icon: Achievements.dreamMaster,
            bgColor: "#8B4513",
            locked: false,
        },
        {
            id: 2,
            title: "Chill Champion",
            status: "Unlocked",
            icon: Achievements.chillChampion,
            bgColor: "#FF8C00",
            locked: false,
        },
        {
            id: 3,
            title: "Heartful Habit",
            status: "Unlocked",
            icon: Achievements.heartfulHabit,
            bgColor: "#FF4757",
            locked: false,
        },
        {
            id: 4,
            title: "Green Guru",
            status: "Unlocked",
            icon: Achievements.greenGuru,
            bgColor: "#4CAF50",
            locked: false,
        },
        {
            id: 5,
            title: "Positivity Pioner",
            status: "Unlocked",
            icon: Achievements.positivePioneer,
            bgColor: "#8B4513",
            locked: false,
        },
        {
            id: 6,
            title: "Sleep Scholar",
            status: "Unlocked",
            icon: Achievements.sleepScholar,
            bgColor: "#2F4F4F",
            locked: false,
        },
        {
            id: 7,
            title: "Mindful Journaler",
            status: "Unlocked",
            icon: Achievements.mindfulJournaler,
            bgColor: "#2F4F4F",
            locked: false,
        },
        {
            id: 8,
            title: "Mood Messenger",
            status: "Unlocked",
            icon: Achievements.moodMessenger,
            bgColor: "#FF4757",
            locked: false,
        },
        {
            id: 9,
            title: "Wellness Warrior",
            status: "Unlocked",
            icon: Achievements.wellnessWarrior,
            bgColor: "#8B5CF6",
            locked: false,
        },
        {
            id: 10,
            title: "Zen Listener",
            status: "Unlocked",
            icon: Achievements.zenListener,
            bgColor: "#6B7280",
            locked: false,
        },
        {
            id: 11,
            title: "Sumbler",
            status: "Unlocked",
            icon: Achievements.sumbler,
            bgColor: "#8B5CF6",
            locked: false,
        },
        {
            id: 12,
            title: "Gratefull Guru",
            status: "Unlocked",
            icon: Achievements.gratefullGuru,
            bgColor: "#FF8C00",
            locked: false,
        },
        {
            id: 13,
            title: "Healthy Habitant",
            status: "Locked",
            icon: Achievements.dreamMaster,
            bgColor: "#6B7280",
            locked: true,
        },
        {
            id: 14,
            title: "Panda Pal",
            status: "Locked",
            icon: Achievements.dreamMaster,
            bgColor: "#6B7280",
            locked: true,
        },
        {
            id: 15,
            title: "Finish Strong",
            status: "Locked",
            icon: Achievements.dreamMaster,
            bgColor: "#6B7280",
            locked: true,
        },
    ];

    return (
        <ScrollView className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-6 py-6 bg-white">
                <View className="flex-row items-center mb-4">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <Text className="text-2xl">←</Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-3xl font-bold text-gray-900 mb-2">My Achievements</Text>
                <Text className="text-gray-500 text-base">You have 6 achievements so far</Text>
            </View>

            {/* Achievements Grid */}
            <View className="px-6 py-6">
                <View className="flex-row flex-wrap justify-between">
                    {allAchievements.map((achievement, index) => (
                        <View key={achievement.id} className="w-[30%] mb-6">
                            <View className="bg-white rounded-3xl py-4 shadow-sm border-[3px] border-[#114438]">
                                {/* Icon Container */}
                                <View className="items-center mb-3">
                                    <View
                                        className="w-16 h-16 rounded-2xl items-center justify-center"
                                        style={
                                            {
                                                // backgroundColor: achievement.locked ? "#E5E7EB" : achievement.bgColor,
                                                // borderColor: "#2E5C4A",
                                            }
                                        }
                                    >
                                        {achievement.locked ? (
                                            // <Text className="text-yellow-500 text-2xl">🔒</Text>
                                            <Image source={Achievements.locked} />
                                        ) : (
                                            <Image
                                                source={achievement.icon}
                                                className="w-full h-full"
                                                resizeMode="contain"
                                                style={{
                                                    tintColor: achievement.locked ? "#9CA3AF" : undefined,
                                                }}
                                            />
                                        )}
                                    </View>
                                </View>

                                {/* Title and Status */}
                                <Text className="text-gray-800 font-semibold text-sm text-center mb-1">{achievement.title}</Text>
                                <Text className="text-gray-500 text-xs text-center">{achievement.status}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* Bottom spacing for tab navigation */}
            <View className="h-32" />
        </ScrollView>
    );
}
