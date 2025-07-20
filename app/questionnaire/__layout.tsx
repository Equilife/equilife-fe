import { Stack } from "expo-router";

export default function QuestionnaireLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                gestureEnabled: false, // Disable swipe back to prevent skipping steps
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="name" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="health-conditions" />
            <Stack.Screen name="health-goals" />
            <Stack.Screen name="preferences" />
            <Stack.Screen name="summary" />
        </Stack>
    );
}
