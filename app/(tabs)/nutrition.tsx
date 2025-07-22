import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function NutritionScreen() {
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 items-center justify-center p-6" style={{ minHeight: 600 }}>
                <View className="w-16 h-16 bg-gray-300 rounded-lg mb-4" />
                <Text className="text-2xl font-poppins-bold text-gray-800 mb-2">Nutrition</Text>
                <Text className="text-gray-600 text-center font-poppins">Track your daily nutrition intake and meal planning</Text>
            </View>
            {/* Bottom spacing for tab navigation */}
            <View className="h-32" />
        </ScrollView>
    );
}
