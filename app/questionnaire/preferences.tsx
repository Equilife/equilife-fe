import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const dietaryPreferences = [
    { id: 1, title: "Vegetarian", description: "Plant-based diet excluding meat" },
    { id: 2, title: "Vegan", description: "Plant-based diet excluding all animal products" },
    { id: 3, title: "Keto", description: "Low-carb, high-fat diet" },
    { id: 4, title: "Mediterranean", description: "Traditional Mediterranean eating pattern" },
    { id: 5, title: "Low Sodium", description: "Reduced salt intake diet" },
    { id: 6, title: "Gluten-Free", description: "Diet excluding gluten-containing foods" },
    { id: 7, title: "Gluten-Free", description: "Diet excluding gluten-containing foods" },
    { id: 8, title: "Gluten-Free", description: "Diet excluding gluten-containing foods" },
    { id: 9, title: "Gluten-Free", description: "Diet excluding gluten-containing foods" },
];

export default function PreferencesScreen() {
    const [selectedPreferences, setSelectedPreferences] = useState<number[]>([]);
    const [searchText, setSearchText] = useState("");

    const handlePreferenceToggle = (prefId: number) => {
        setSelectedPreferences((prev) => {
            if (prev.includes(prefId)) {
                return prev.filter((id) => id !== prefId);
            } else {
                return [...prev, prefId];
            }
        });
    };

    const handleContinue = () => {
        router.push("./summary");
    };

    const handleBack = () => {
        router.back();
    };

    const filteredPreferences = dietaryPreferences.filter((pref) => pref.title.toLowerCase().includes(searchText.toLowerCase()));

    const selectedItems = dietaryPreferences.filter((pref) => selectedPreferences.includes(pref.id));

    const removePreference = (prefId: number) => {
        setSelectedPreferences((prev) => prev.filter((id) => id !== prefId));
    };

    return (
        <View className="flex-1 bg-[#E8F0EC] px-6 py-12">
            {/* Title */}
            <View className="mt-8 mb-8">
                <Text className="text-3xl font-poppins-bold text-black mb-4">Dietary preferences &{"\n"}restrictions</Text>

                <Text className="text-lg font-poppins text-gray-600">Help us suggest meals that fit your lifestyle</Text>
            </View>

            {/* Search Input */}
            <View className="mb-6">
                <View className="relative">
                    <TextInput
                        className="bg-white border-2 border-[#8EAE9D] rounded-2xl px-6 py-4 text-lg font-poppins text-gray-800 pr-16"
                        placeholder="Search dietary preferences"
                        placeholderTextColor="#9CA3AF"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <View className="absolute right-4 top-4">
                        <Text className="text-[#8EAE9D] text-xl">⚪</Text>
                    </View>
                </View>
            </View>

            {/* Preferences List */}
            <ScrollView className="flex-1 mb-6" showsVerticalScrollIndicator={false}>
                {filteredPreferences.map((preference) => {
                    const isSelected = selectedPreferences.includes(preference.id);

                    return (
                        <TouchableOpacity
                            key={preference.id}
                            onPress={() => handlePreferenceToggle(preference.id)}
                            className={`mb-4 p-4 rounded-2xl border-2 flex-row items-center justify-between ${isSelected ? "bg-[#8EAE9D] border-[#8EAE9D]" : "bg-white border-[#8EAE9D]"}`}
                        >
                            <View className="flex-1">
                                <Text className={`font-poppins-semibold text-lg mb-1 ${isSelected ? "text-white" : "text-gray-800"}`}>{preference.title}</Text>
                                <Text className={`font-poppins text-sm ${isSelected ? "text-white/80" : "text-gray-600"}`}>{preference.description}</Text>
                            </View>

                            <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${isSelected ? "bg-white border-white" : "bg-transparent border-[#8EAE9D]"}`}>
                                {isSelected && <Text className="text-[#8EAE9D] text-sm font-poppins-bold">✓</Text>}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Selected Items */}
            {selectedItems.length > 0 && (
                <ScrollView className="mb-6 h-fit max-h-[15%]">
                    <Text className="text-lg font-poppins-semibold text-gray-800 mb-3">Selected Preferences</Text>

                    <View className="flex-row flex-wrap">
                        {selectedItems.map((item) => (
                            <View key={item.id} className="bg-white border border-[#8EAE9D] rounded-full px-4 py-2 mr-2 mb-2 flex-row items-center">
                                <Text className="font-poppins text-gray-700 mr-2">{item.title}</Text>
                                <TouchableOpacity onPress={() => removePreference(item.id)}>
                                    <Text className="text-gray-500 font-poppins-bold">×</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}

            {/* Navigation Buttons */}
            <View className="flex-row space-x-4 gap-2">
                <TouchableOpacity onPress={handleBack} className="w-16 h-16 bg-white border-2 border-[#8EAE9D] rounded-2xl justify-center items-center">
                    <Text className="text-[#8EAE9D] text-xl">←</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleContinue} className="flex-1 bg-[#8EAE9D] py-4 rounded-2xl">
                    <Text className="text-white font-poppins-semibold text-lg text-center">Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
