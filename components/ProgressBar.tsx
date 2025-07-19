import { View } from "react-native";

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <View className="w-full h-2 bg-gray-200 rounded-full mb-6">
            <View className="h-2 bg-[#8EAE9D] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </View>
    );
}
