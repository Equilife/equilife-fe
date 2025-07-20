import { FormIcon, Icons } from "@/constants/Images";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = () => {
        // TODO: Implement register logic
        // For now, go to OTP verification
        router.push("./otp-verification");
    };

    const handleGoogleLogin = () => {
        // TODO: Implement Google login
        console.log("Google login");
    };

    const handleAppleLogin = () => {
        // TODO: Implement Apple login
        console.log("Apple login");
    };

    const handleLogin = () => {
        router.push("./login");
    };

    return (
        <View className="flex-1 bg-white px-6 py-12">
            {/* Back Button */}
            <TouchableOpacity onPress={() => router.replace("./auth")} className="">
                <Text className="text-2xl">←</Text>
            </TouchableOpacity>

            {/* Logo and Title */}
            <View className="">
                <Image source={Icons.logoLanscapeBig} className="w-3/6 h-28" resizeMode="contain" />
            </View>

            {/* Register Title */}
            <View className="mb-4">
                <Text className="text-xl font-poppins-bold text-gray-800 mb-2">Sign up</Text>
                <Text className="text-base font-poppins text-gray-600">Create your account</Text>
            </View>

            {/* Email Input */}
            <View className="mb-4">
                <Text className="text-base font-poppins-medium text-gray-700 mb-2">E-mail address</Text>
                <View className="flex-row items-center rounded-xl px-4 border-[3px] border-[#8EAE9D]">
                    {/* <Text className="text-gray-400 mr-3">✉</Text> */}
                    <Image source={FormIcon.email} className="w-5 h-6 mr-2" resizeMode="contain" />
                    <TextInput className="flex-1 font-poppins text-gray-700" placeholder="Your email address" placeholderTextColor="#9CA3AF" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                </View>
            </View>

            {/* Password Input */}
            <View className="mb-4">
                <Text className="text-base font-poppins-medium text-gray-700 mb-2">Password</Text>
                <View className="flex-row items-center rounded-xl px-4 border-[3px] border-[#8EAE9D]">
                    {/* <Text className="text-gray-400 mr-3">🔒</Text> */}
                    <Image source={FormIcon.password} className="w-5 h-6 mr-2" resizeMode="contain" />
                    <TextInput className="flex-1 font-poppins text-gray-700" placeholder="Enter your password" placeholderTextColor="#9CA3AF" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        {/* <Text className="text-gray-400">{showPassword ? "🙈" : "👁"}</Text> */}
                        <Image source={FormIcon.eye} className="w-5 h-6" resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Confirm Password Input */}
            <View className="mb-8">
                <Text className="text-base font-poppins-medium text-gray-700 mb-2">Confirm Password</Text>
                <View className="flex-row items-center rounded-xl px-4 border-[3px] border-[#8EAE9D]">
                    {/* <Text className="text-gray-400 mr-3">🔒</Text> */}
                    <Image source={FormIcon.password} className="w-5 h-6 mr-2" resizeMode="contain" />
                    <TextInput
                        className="flex-1 font-poppins text-gray-700"
                        placeholder="Confirm your password"
                        placeholderTextColor="#9CA3AF"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {/* <Text className="text-gray-400">{showConfirmPassword ? "🙈" : "👁"}</Text> */}
                        <Image source={FormIcon.eye} className="w-5 h-6" resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity onPress={handleRegister} className="bg-[#8EAE9D] py-4 rounded-xl mb-4">
                <Text className="text-white font-poppins-semibold text-lg text-center">Register</Text>
            </TouchableOpacity>

            {/* Divider */}
            <Text className="text-gray-500 font-poppins text-center mb-2">Or</Text>

            {/* Google Login */}
            <TouchableOpacity onPress={handleGoogleLogin} className="bg-white py-4 rounded-xl border-[3px] border-[#8EAE9D] mb-4 flex-row justify-center items-center">
                <View className="mr-3 w-6 h-6 justify-center items-center">
                    <Image source={Icons.google} className="w-6 h-6" resizeMode="contain" />
                </View>
                <Text className="text-[#6B8377] font-poppins-medium text-base">Continue with google</Text>
            </TouchableOpacity>

            {/* Apple Login */}
            <TouchableOpacity onPress={handleAppleLogin} className="bg-white py-4 rounded-xl border-[3px] mb-8 border-[#8EAE9D] flex-row justify-center items-center">
                <View className="mr-3 w-6 h-6 justify-center items-center">
                    <Image source={Icons.apple} className="w-5 h-6" resizeMode="contain" />
                </View>
                <Text className="text-[#6B8377] font-poppins-medium text-base">Continue with apple</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity onPress={handleLogin}>
                <Text className="text-center font-poppins text-gray-600">
                    Already have an account? <Text className="text-black font-poppins-semibold">Login</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}
