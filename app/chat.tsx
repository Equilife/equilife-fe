import { Icons } from "@/constants/Images";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatScreen() {
    const insets = useSafeAreaInsets();
    const [message, setMessage] = useState("");

    // Mock chat messages for demonstration
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book, when an unknown printer took a galley.",
            isUser: true,
            timestamp: "11:00",
            avatar: null, // Use fallback avatar
        },
        {
            id: 2,
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book, when an unknown printer took a galley.\n\n1. Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n2. Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n3. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            isUser: false,
            timestamp: "11:01",
            avatar: null, // Will use bot icon
        },
    ]);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                isUser: true,
                timestamp: new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }),
                avatar: null, // Use fallback avatar
            };

            setMessages([...messages, newMessage]);
            setMessage("");

            // Simulate AI response after 1 second
            setTimeout(() => {
                const aiResponse = {
                    id: messages.length + 2,
                    text: "Thank you for your message! This is a simulated AI response. In the actual implementation, this would be connected to the backend AI service.",
                    isUser: false,
                    timestamp: new Date().toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    }),
                    avatar: null,
                };
                setMessages((prev) => [...prev, aiResponse]);
            }, 1000);
        }
    };

    return (
        <View className="flex-1 bg-[#F5FBFC]" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View
                className="px-6 py-4"
                style={{
                    backgroundColor: "#A8C5B8",
                }}
            >
                <View className="flex-row items-center justify-between">
                    {/* Back Button */}
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <Text className="text-2xl text-gray-800">←</Text>
                    </TouchableOpacity>

                    {/* Chat Info */}
                    <View className="flex-row items-center flex-1">
                        {/* Avatar */}
                        <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-3">
                            <Image source={Icons.circleLogo} className="w-full h-full" resizeMode="contain" />
                        </View>

                        {/* Chat Title */}
                        <View className="flex-1">
                            <Text className="text-lg font-poppins-semibold text-gray-800">Equilife Chat AI</Text>
                            <Text className="text-sm font-poppins text-gray-600">Gpt 10</Text>
                        </View>
                    </View>

                    {/* Settings Button */}
                    <TouchableOpacity className="w-10 h-10 rounded-full border border-gray-800 bg-white items-center justify-center">
                        <Image source={Icons.settings} className="w-7 h-7" resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Chat Content */}
            <ScrollView className="flex-1 px-6 py-4" showsVerticalScrollIndicator={false}>
                {messages.length > 0 ? (
                    <View>
                        {messages.map((msg) => (
                            <View key={msg.id} className="mb-4">
                                {msg.isUser ? (
                                    // User Message
                                    <View className="flex-row items-end justify-end">
                                        <View
                                            className="rounded-3xl p-4 mr-1"
                                            style={{
                                                backgroundColor: "#7C9DA0",
                                                borderBottomRightRadius: 8,
                                                maxWidth: "80%",
                                            }}
                                        >
                                            <Text className="text-white font-poppins text-base leading-6">{msg.text}</Text>
                                            {/* <View className="flex-row justify-end items-center mt-2">
                                                <Text className="text-white/80 font-poppins text-xs mr-1">{msg.timestamp}</Text>
                                                <Text className="text-white/80 font-poppins text-xs">✓✓</Text>
                                            </View> */}
                                        </View>
                                        <View className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 border border-gray-200">
                                            {msg.avatar ? (
                                                <Image source={{ uri: msg.avatar }} className="w-full h-full" resizeMode="cover" onError={() => console.log("Avatar loading failed")} />
                                            ) : (
                                                <View className="w-full h-full bg-gray-400 items-center justify-center">
                                                    <Text className="text-white text-lg">👤</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                ) : (
                                    // AI Message
                                    <View className="flex-row items-start mb-8">
                                        <View className="w-10 h-10 bg-white rounded-full items-center justify-center mr-3">
                                            <Image source={Icons.circleLogo} className="w-full h-full" resizeMode="contain" />
                                        </View>
                                        <View className="flex-1">
                                            <View className="bg-white rounded-3xl p-4 border border-gray-100" style={{ maxWidth: "85%" }}>
                                                <Text className="text-gray-800 font-poppins text-base leading-6">{msg.text}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                ) : (
                    // Empty state
                    <View className="flex-1 items-center justify-center py-20 mt-20">
                        <Text className="text-2xl font-poppins-bold text-gray-800 text-center mb-4">What can I help with?</Text>
                    </View>
                )}
            </ScrollView>

            {/* Input Area */}
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={0}>
                <View
                    className="px-6"
                    style={{
                        paddingBottom: insets.bottom + 24,
                        backgroundColor: "#F5FBFC",
                    }}
                >
                    <View className="flex-row items-center bg-white rounded-full border-2 border-gray-300 px-4 py-3">
                        {/* Attachment Button */}
                        <TouchableOpacity className="mr-3">
                            <View className="w-8 h-8 rounded-full border-2 border-gray-300 items-center justify-center">
                                <Text className="text-gray-400">📎</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Text Input */}
                        <TextInput
                            className="flex-1 text-base text-gray-700"
                            placeholder="Ask anything"
                            placeholderTextColor="#9CA3AF"
                            value={message}
                            onChangeText={setMessage}
                            multiline
                            style={{ maxHeight: 100 }}
                            onFocus={() => {
                                // Untuk Android, biarkan sistem handle keyboard
                                if (Platform.OS === "android") {
                                    console.log("Input focused on Android");
                                }
                            }}
                        />

                        {/* Send Button */}
                        <TouchableOpacity
                            className="ml-3"
                            onPress={sendMessage}
                            style={{
                                backgroundColor: "#A8C5B8",
                                borderRadius: 12,
                                padding: 12,
                            }}
                        >
                            <Text className="text-white text-lg">↑</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
