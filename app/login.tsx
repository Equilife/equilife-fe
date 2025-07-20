import { FormIcon, Icons } from "@/constants/Images";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        // TODO: Implement login logic
        // For now, just go to home
        router.replace("./home");
    };

    const handleGoogleLogin = () => {
        // TODO: Implement Google login
        console.log("Google login");
    };

    const handleAppleLogin = () => {
        // TODO: Implement Apple login
        console.log("Apple login");
    };

    const handleForgotPassword = () => {
        // TODO: Navigate to forgot password
        console.log("Forgot password");
    };

    const handleRegister = () => {
        router.push("./register");
    };

    return (
        <View className="flex-1 bg-white px-6 py-12">
            {/* Back Button */}
            <TouchableOpacity onPress={() => router.back()} className="mb-8">
                <Text className="text-2xl">←</Text>
            </TouchableOpacity>

            {/* Logo and Title */}
            <View className="">
                <Image source={Icons.logoLanscapeBig} className="w-3/6 h-28" resizeMode="contain" />
            </View>

            {/* Login Title */}
            <View className="mb-4">
                <Text className="text-xl font-poppins-bold text-gray-800 mb-2">Login</Text>
                <Text className="text-base font-poppins text-gray-600">Please Login to your account</Text>
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

            {/* Remember Me and Forgot Password */}
            <View className="flex-row justify-between items-center mb-8">
                <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} className="flex-row items-center">
                    <View className={`w-5 h-5 rounded border-2 mr-2 ${rememberMe ? "bg-green-500 border-green-500" : "border-gray-300"}`}>{rememberMe && <Text className="text-white text-xs text-center">✓</Text>}</View>
                    <Text className="font-poppins text-gray-600">Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text className="font-poppins text-gray-600">Forgot password?</Text>
                </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity onPress={handleLogin} className="bg-[#8EAE9D] py-4 rounded-xl mb-4">
                <Text className="text-white font-poppins-semibold text-lg text-center">Login</Text>
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

            {/* Register Link */}
            <TouchableOpacity onPress={handleRegister}>
                <Text className="text-center font-poppins text-gray-600">
                    Don&apos;t have an account? <Text className="text-black font-poppins-semibold">Register</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}
