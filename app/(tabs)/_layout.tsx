import { TabNavigation } from "@/constants/Images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#2E5C4A",
                tabBarInactiveTintColor: "#9CA3AF",
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    borderTopWidth: 1,
                    borderTopColor: "#E5E7EB",
                    height: 70 + insets.bottom,
                    paddingBottom: insets.bottom + 10,
                    paddingTop: 10,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 4,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <View className={`w-10 h-10 pr-1 rounded-2xl items-center justify-center ${focused ? "bg-[#E8F0EC]" : "bg-transparent"}`}>
                            <Image
                                source={TabNavigation.home}
                                className="w-10 h-10"
                                resizeMode="contain"
                                style={{
                                    tintColor: focused ? "#2E5C4A" : "#9CA3AF",
                                }}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="sleep"
                options={{
                    title: "Sleep",
                    tabBarIcon: ({ focused }) => (
                        <View className={`w-10 h-10 rounded-2xl items-center justify-center ${focused ? "bg-[#E8F0EC]" : "bg-transparent"}`}>
                            <Image
                                source={TabNavigation.sleep}
                                className="w-10 h-10"
                                resizeMode="contain"
                                style={{
                                    tintColor: focused ? "#2E5C4A" : "#9CA3AF",
                                }}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="exercise"
                options={{
                    title: "Exercise",
                    tabBarIcon: ({ focused }) => (
                        <View className={`w-10 h-10 rounded-2xl items-center justify-center ${focused ? "bg-[#E8F0EC]" : "bg-transparent"}`}>
                            <Image
                                source={TabNavigation.sport}
                                className="w-10 h-10"
                                resizeMode="contain"
                                style={{
                                    tintColor: focused ? "#2E5C4A" : "#9CA3AF",
                                }}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="nutrition"
                options={{
                    title: "Nutrition",
                    tabBarIcon: ({ focused }) => (
                        <View className={`w-10 h-10 rounded-2xl items-center justify-center ${focused ? "bg-[#E8F0EC]" : "bg-transparent"}`}>
                            <Image
                                source={TabNavigation.food}
                                className="w-10 h-10"
                                resizeMode="contain"
                                style={{
                                    tintColor: focused ? "#2E5C4A" : "#9CA3AF",
                                }}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <View className={`w-10 h-10 pl-1 rounded-2xl items-center justify-center ${focused ? "bg-[#E8F0EC]" : "bg-transparent"}`}>
                            <Image
                                source={TabNavigation.profile}
                                className="w-10 h-10"
                                resizeMode="contain"
                                style={{
                                    tintColor: focused ? "#2E5C4A" : "#9CA3AF",
                                }}
                            />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
