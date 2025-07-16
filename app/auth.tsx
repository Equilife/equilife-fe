import { Icons } from "@/constants/Images";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function AuthScreen() {
    const handleLogin = () => {
        router.push("./login");
    };

    const handleSignUp = () => {
        router.push("./register");
    };

    const handleGoogleLogin = () => {
        // TODO: Implement Google login
        console.log("Google login");
    };

    const handleAppleLogin = () => {
        // TODO: Implement Apple login
        console.log("Apple login");
    };

    return (
        <View className="flex-1 bg-white px-6 py-12">
            <View className="h-3/6 justify-end pb-16">
                {/* Logo and Title */}
                <View className="mb-4">
                    <Image source={Icons.logoLanscapeBig} className="w-4/6 h-28" resizeMode="contain" />
                </View>

                {/* Description */}
                <View className="">
                    <Text className="text-lg text-left font-poppins text-gray-600 leading-6">Equilife helps you live well—mind, body, and spirit. Join us and start building your best self.</Text>
                </View>
            </View>

            {/* Auth Buttons */}
            <View className="h-3/6">
                {/* Login Button */}
                <TouchableOpacity onPress={handleLogin} className="bg-[#8EAE9D] py-4 rounded-xl mb-4">
                    <Text className="text-white font-poppins-semibold text-blg text-center">Login</Text>
                </TouchableOpacity>

                {/* Sign Up Button */}
                <TouchableOpacity onPress={handleSignUp} className="bg-white py-4 rounded-xl border-[3px] border-[#8EAE9D] mb-8">
                    <Text className="text-[#6B8377] font-poppins-semibold text-base text-center">Sign up</Text>
                </TouchableOpacity>

                {/* Divider */}
                <Text className="font-poppins text-center mb-6">Or</Text>

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
            </View>
        </View>
    );
}
