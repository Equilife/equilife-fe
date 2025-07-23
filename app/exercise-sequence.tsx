import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CalendarDay {
    date: number;
    isCurrentMonth: boolean;
    hasExercised: boolean;
    isToday: boolean;
    fullDate: Date;
}

interface ExerciseData {
    [key: string]: boolean; // date string as key, exercised as value
}

export default function ExerciseSequenceScreen() {
    const insets = useSafeAreaInsets();
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Simulate dummy exercise data - more realistic pattern
    const exerciseData: ExerciseData = useMemo(() => {
        const data: ExerciseData = {};
        const today = new Date();

        // Create realistic exercise pattern for last 3 months
        for (let i = 90; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split("T")[0];

            // Realistic pattern:
            // - Higher chance on weekdays (80%)
            // - Lower chance on weekends (40%)
            // - Occasional rest days
            // - Recent streak for demonstration
            const dayOfWeek = date.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            let hasExercised = false;

            if (i <= 20) {
                // Last 20 days - current streak
                hasExercised = i !== 10 && i !== 3; // missed 2 days to make it realistic
            } else if (i <= 40) {
                // 21-40 days ago - good period
                hasExercised = Math.random() > (isWeekend ? 0.7 : 0.3);
            } else {
                // Older days - mixed
                hasExercised = Math.random() > (isWeekend ? 0.8 : 0.5);
            }

            data[dateString] = hasExercised;
        }

        return data;
    }, []);

    // Calculate consecutive days streak
    const calculateStreak = (): number => {
        const today = new Date();
        let streak = 0;

        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split("T")[0];

            if (exerciseData[dateString]) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    };

    const consecutiveDays = calculateStreak();

    // Navigate months
    const navigateMonth = (direction: "prev" | "next") => {
        const newDate = new Date(selectedDate);
        if (direction === "prev") {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        setSelectedDate(newDate);
    };

    // Generate calendar data for selected month
    const generateCalendarData = (): CalendarDay[][] => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const today = new Date();

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        // Get previous month days
        const prevMonth = new Date(year, month - 1, 0);
        const daysInPrevMonth = prevMonth.getDate();

        const weeks: CalendarDay[][] = [];
        let currentWeek: CalendarDay[] = [];

        // Add previous month days
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const date = new Date(year, month - 1, daysInPrevMonth - i);
            const dateString = date.toISOString().split("T")[0];

            currentWeek.push({
                date: daysInPrevMonth - i,
                isCurrentMonth: false,
                hasExercised: exerciseData[dateString] || false,
                isToday: false,
                fullDate: date,
            });
        }

        // Add current month days
        for (let date = 1; date <= daysInMonth; date++) {
            const fullDate = new Date(year, month, date);
            const dateString = fullDate.toISOString().split("T")[0];
            const isToday = today.toDateString() === fullDate.toDateString();

            currentWeek.push({
                date,
                isCurrentMonth: true,
                hasExercised: exerciseData[dateString] || false,
                isToday,
                fullDate,
            });

            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        }

        // Add next month days to complete the week
        let nextMonthDate = 1;
        while (currentWeek.length < 7) {
            const date = new Date(year, month + 1, nextMonthDate);
            const dateString = date.toISOString().split("T")[0];

            currentWeek.push({
                date: nextMonthDate,
                isCurrentMonth: false,
                hasExercised: exerciseData[dateString] || false,
                isToday: false,
                fullDate: date,
            });
            nextMonthDate++;
        }

        if (currentWeek.length > 0) {
            weeks.push(currentWeek);
        }

        return weeks;
    };

    // Calculate monthly stats
    const calculateMonthlyStats = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let workoutDays = 0;
        let totalDays = 0;

        for (let date = 1; date <= daysInMonth; date++) {
            const fullDate = new Date(year, month, date);
            const dateString = fullDate.toISOString().split("T")[0];
            const today = new Date();

            // Only count days up to today if it's current month
            if (fullDate <= today) {
                totalDays++;
                if (exerciseData[dateString]) {
                    workoutDays++;
                }
            } else if (year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth())) {
                // Count all days for past months
                totalDays++;
                if (exerciseData[dateString]) {
                    workoutDays++;
                }
            }
        }

        const restDays = totalDays - workoutDays;
        const consistency = totalDays > 0 ? Math.round((workoutDays / totalDays) * 100) : 0;

        return { workoutDays, restDays, consistency };
    };

    const calendarWeeks = generateCalendarData();
    const monthlyStats = calculateMonthlyStats();
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Tr", "Sa"];

    // Get month name and year
    const monthName = selectedDate.toLocaleDateString("en-US", { month: "long" });
    const year = selectedDate.getFullYear();

    return (
        <ScrollView className="flex-1 bg-[#F5FBFC]" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <Text className="text-2xl font-poppins">←</Text>
                </TouchableOpacity>
                <Text className="text-xl font-poppins-semibold text-gray-900">Sequence</Text>
                <View className="w-10" />
            </View>

            <View className="flex-1 px-6">
                {/* Consecutive Days Counter */}
                <View className="items-center mb-8 mt-4">
                    <Text className="text-8xl font-poppins-bold text-[#F59E0B] mb-2">{consecutiveDays}</Text>
                    <Text className="text-lg font-poppins text-gray-500">consecutive days</Text>
                </View>

                {/* Month Navigation */}
                <View className="flex-row items-center justify-between mb-4">
                    <TouchableOpacity onPress={() => navigateMonth("prev")} className="p-3 rounded-full bg-white border-[1.5px] border-[#8EAE9D]">
                        <Text className="text-xl font-poppins-bold text-[#8EAE9D]">‹</Text>
                    </TouchableOpacity>

                    <Text className="text-2xl font-poppins-bold text-gray-900">
                        {monthName} {year}
                    </Text>

                    <TouchableOpacity onPress={() => navigateMonth("next")} className="p-3 rounded-full bg-white border-[1.5px] border-[#8EAE9D]">
                        <Text className="text-xl font-poppins-bold text-[#8EAE9D]">›</Text>
                    </TouchableOpacity>
                </View>

                {/* Calendar */}
                <View className="bg-white border-[1.5px] border-[#8EAE9D] rounded-3xl p-4 mb-4">
                    {/* Week Day Headers */}
                    <View className="flex-row mb-2">
                        {weekDays.map((day, index) => (
                            <View key={index} className="flex-1 items-center py-3">
                                <Text className="text-sm font-poppins-medium text-gray-600 bg-[#A8CDD8] px-3 py-2 rounded-lg">{day}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Calendar Grid */}
                    {calendarWeeks.map((week, weekIndex) => (
                        <View key={weekIndex} className="flex-row">
                            {week.map((day, dayIndex) => {
                                let cellStyle = "flex-1 items-center justify-center py-4 mx-0.5 my-0.5 rounded-lg";
                                let textStyle = "text-lg font-poppins-medium";

                                if (!day.isCurrentMonth) {
                                    // Previous/next month days
                                    cellStyle += " bg-gray-200";
                                    textStyle += " text-gray-400";
                                } else if (day.isToday) {
                                    // Today (circled)
                                    cellStyle += " bg-white border-2 border-blue-500";
                                    textStyle += " text-blue-500 font-poppins-bold";
                                } else if (day.hasExercised) {
                                    // Days with exercise
                                    cellStyle += " bg-[#F59E0B]";
                                    textStyle += " text-white font-poppins-semibold";
                                } else {
                                    // Regular days without exercise
                                    cellStyle += " bg-white";
                                    textStyle += " text-gray-900";
                                }

                                return (
                                    <TouchableOpacity
                                        key={dayIndex}
                                        className={cellStyle}
                                        onPress={() => {
                                            // TODO: Handle day selection/exercise logging
                                            console.log(`Selected date: ${day.fullDate.toDateString()}`);
                                        }}
                                    >
                                        <Text className={textStyle}>{day.date}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ))}
                </View>

                {/* Legend */}
                <View className="flex-row bg-white py-4 justify-around border-[1.5px] border-[#8EAE9D] rounded-3xl mb-8">
                    <View className="flex-row items-center">
                        <View className="w-4 h-4 bg-[#F59E0B] rounded mr-2" />
                        <Text className="text-sm font-poppins text-gray-600">Exercised</Text>
                    </View>
                    <View className="flex-row items-center">
                        <View className="w-4 h-4 bg-white border-2 border-blue-500 rounded mr-2" />
                        <Text className="text-sm font-poppins text-gray-600">Today</Text>
                    </View>
                    <View className="flex-row items-center">
                        <View className="w-4 h-4 bg-white border border-gray-300 rounded mr-2" />
                        <Text className="text-sm font-poppins text-gray-600">No Exercise</Text>
                    </View>
                </View>

                {/* Dynamic Stats Section */}
                <View className="bg-gray-50 border-[1.5px] border-[#8EAE9D] rounded-3xl p-6 mb-8">
                    <Text className="text-xl font-poppins-bold text-gray-900 mb-4">{monthName} Statistics</Text>
                    <View className="flex-row justify-between">
                        <View className="items-center">
                            <Text className="text-2xl font-poppins-bold text-[#F59E0B]">{monthlyStats.workoutDays}</Text>
                            <Text className="text-sm font-poppins text-gray-600">Workout Days</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-2xl font-poppins-bold text-gray-400">{monthlyStats.restDays}</Text>
                            <Text className="text-sm font-poppins text-gray-600">Rest Days</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-2xl font-poppins-bold text-green-800">{monthlyStats.consistency}%</Text>
                            <Text className="text-sm font-poppins text-gray-600">Consistency</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Bottom spacing */}
            <View style={{ height: Math.max(insets.bottom + 20, 40) }} />
        </ScrollView>
    );
}
