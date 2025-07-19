import { OnboardingImages } from "@/constants/Images";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function OTPVerification() {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(20);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const inputRefs = useRef<TextInput[]>([]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        let interval: any;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timer]);

    const handleOTPChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus to next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (key: string, index: number) => {
        if (key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const otpValue = otp.join("");
        if (otpValue.length === 4) {
            // TODO: Implement OTP verification logic
            console.log("OTP:", otpValue);
            router.replace("./home");
        }
    };

    const handleResendOTP = () => {
        if (!isTimerActive) {
            // TODO: Implement resend OTP logic
            console.log("Resending OTP");
            setTimer(20);
            setIsTimerActive(true);
            setOtp(["", "", "", ""]);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`;
    };

    return (
        <KeyboardAvoidingView className="flex-1 bg-white" behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}>
            <ScrollView className="flex-1 px-6 py-12" contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                {/* Back Button */}
                <TouchableOpacity onPress={() => router.back()} className="mb-8">
                    <Text className="text-2xl">←</Text>
                </TouchableOpacity>

                {/* Title */}
                <View className={`items-center justify-center mb-8 ${keyboardVisible ? "flex-[0.3]" : "flex-[1/2]"}`}>
                    <Text className="text-3xl font-poppins-bold text-gray-800">Verify</Text>
                </View>

                {/* Illustration */}
                {!keyboardVisible && (
                    <View className="flex-1 items-center justify-center mb-12">
                        <Image source={OnboardingImages.otpVerification} className="w-5/6 h-56" resizeMode="contain" />
                    </View>
                )}

                {/* OTP Input Section */}
                <View className="items-center mb-8">
                    <Text className="text-xl font-poppins-bold text-gray-800 mb-2">Enter OTP</Text>
                    <Text className="text-base font-poppins text-gray-600 mb-6">alamatemail@gmail.com</Text>

                    {/* OTP Input Boxes */}
                    <View className="flex-row justify-center space-x-4 mb-8">
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => {
                                    if (ref) inputRefs.current[index] = ref;
                                }}
                                className="w-16 h-16 border-2 mx-1 rounded-xl text-center text-xl font-poppins-bold text-gray-800"
                                style={{
                                    borderColor: digit ? "#8EAE9D" : "#D1D5DB",
                                    backgroundColor: digit ? "#F9FAFB" : "white",
                                }}
                                value={digit}
                                onChangeText={(value) => handleOTPChange(value, index)}
                                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                                keyboardType="numeric"
                                maxLength={1}
                                selectTextOnFocus
                            />
                        ))}
                    </View>

                    {/* Verify Button */}
                    <TouchableOpacity onPress={handleVerify} className="w-full bg-[#8EAE9D] py-4 rounded-xl mb-6">
                        <Text className="text-white font-poppins-semibold text-lg text-center">Verify</Text>
                    </TouchableOpacity>

                    {/* Resend OTP */}
                    <TouchableOpacity onPress={handleResendOTP} disabled={isTimerActive}>
                        <Text className={`font-poppins text-base ${isTimerActive ? "text-gray-400" : "text-[#8EAE9D]"}`}>Resend OTP {isTimerActive ? `(${formatTime(timer)})` : ""}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
