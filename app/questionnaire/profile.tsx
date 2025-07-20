import { FormIcon } from "@/constants/Images";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedGender, setSelectedGender] = useState<"female" | "male" | null>(null);
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const handleContinue = () => {
        if (dateOfBirth && selectedGender && height && weight) {
            router.push("./health-conditions");
        }
    };

    const handleBack = () => {
        router.back();
    };

    const handleDatePress = () => {
        setShowDatePicker(true);
    };

    const handleDateSelect = (event: any, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === "ios");
        if (selectedDate) {
            setSelectedDate(selectedDate);
            const formattedDate = `${selectedDate.getDate().toString().padStart(2, "0")}/${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}/${selectedDate.getFullYear()}`;
            setDateOfBirth(formattedDate);
        }
    };

    const isFormValid = dateOfBirth && selectedGender && height && weight;

    return (
        <View className="flex-1 bg-[#E8F0EC] px-6 py-12">
            {/* Title */}
            <View className="mt-8 mb-8">
                <Text className="text-3xl font-poppins-bold text-black mb-2">Let&apos;s complete your{"\n"}profile together, nama.</Text>
            </View>

            {/* Date of Birth */}
            <View className="mb-6">
                <Text className="text-lg font-poppins-medium text-gray-800 mb-3">Date of birth</Text>

                <TouchableOpacity onPress={handleDatePress}>
                    <View className="bg-white border-2 border-[#8EAE9D] rounded-2xl px-6 py-4 flex-row items-center justify-between">
                        <Text className={`text-lg font-poppins ${dateOfBirth ? "text-gray-800" : "text-gray-400"}`}>{dateOfBirth || "dd/mm/yyyy"}</Text>
                        {/* <Text className="text-[#8EAE9D] text-xl">📅</Text> */}
                        <Image source={FormIcon.date} className="w-7 h-8" resizeMode="contain" />
                    </View>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker value={selectedDate || new Date()} mode="date" display={Platform.OS === "ios" ? "spinner" : "default"} onChange={handleDateSelect} maximumDate={new Date()} minimumDate={new Date(1900, 0, 1)} />
                )}
            </View>

            {/* Gender Selection */}
            <View className="mb-6">
                <Text className="text-lg font-poppins-medium text-gray-800 mb-3">What&apos;s your gender?</Text>

                <View className="flex-row space-x-4 gap-2">
                    <TouchableOpacity
                        onPress={() => setSelectedGender("female")}
                        className={`flex-1 py-4 px-6 rounded-2xl border-2 flex-row items-center justify-center ${selectedGender === "female" ? "bg-[#8EAE9D] border-[#8EAE9D]" : "bg-white border-[#8EAE9D]"}`}
                    >
                        {/* <Text className="text-2xl mr-2">👩</Text> */}
                        <Text className={`font-poppins-medium text-lg mr-5 ${selectedGender === "female" ? "text-white" : "text-gray-700"}`}>Female</Text>
                        <Image source={FormIcon.female} className="w-9 h-11" resizeMode="contain" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setSelectedGender("male")}
                        className={`flex-1 py-2 rounded-2xl border-2 flex-row items-center justify-center ${selectedGender === "male" ? "bg-[#8EAE9D] border-[#8EAE9D]" : "bg-white border-[#8EAE9D]"}`}
                    >
                        {/* <Text className="text-2xl mr-2">👨</Text> */}
                        <Text className={`font-poppins-medium text-lg mr-5 ${selectedGender === "male" ? "text-white" : "text-gray-700"}`}>Male</Text>
                        <Image source={FormIcon.male} className="w-9 h-11" resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Height and Weight */}
            <View className="flex-row gap-2 space-x-4 mb-auto">
                <View className="flex-1">
                    <Text className="text-lg font-poppins-medium text-gray-800 mb-3">What&apos;s your height?</Text>

                    <View className="relative">
                        <TextInput
                            className="bg-white border-2 border-[#8EAE9D] rounded-2xl px-6 py-4 text-lg font-poppins text-gray-800 text-center"
                            placeholder="00"
                            placeholderTextColor="#9CA3AF"
                            value={height}
                            onChangeText={setHeight}
                            keyboardType="numeric"
                        />
                        <View className="absolute right-4 top-4">
                            <Text className="text-[#A0A0A0] font-poppins mt-1">cm</Text>
                        </View>
                    </View>
                </View>

                <View className="flex-1">
                    <Text className="text-lg font-poppins-medium text-gray-800 mb-3">What&apos;s your weight?</Text>

                    <View className="relative">
                        <TextInput
                            className="bg-white border-2 border-[#8EAE9D] rounded-2xl px-6 py-4 text-lg font-poppins text-gray-800 text-center"
                            placeholder="00"
                            placeholderTextColor="#9CA3AF"
                            value={weight}
                            onChangeText={setWeight}
                            keyboardType="numeric"
                        />
                        <View className="absolute right-4 top-4">
                            <Text className="text-[#A0A0A0] font-poppins mt-1">kg</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Navigation Buttons */}
            <View className="flex-row space-x-4 gap-2">
                <TouchableOpacity onPress={handleBack} className="w-16 h-16 bg-white border-2 border-[#8EAE9D] rounded-2xl justify-center items-center">
                    <Text className="text-[#8EAE9D] text-xl">←</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleContinue} disabled={!isFormValid} className={`flex-1 py-4 rounded-2xl ${isFormValid ? "bg-[#8EAE9D]" : "bg-gray-300"}`}>
                    <Text className="text-white font-poppins-semibold text-lg text-center">Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
