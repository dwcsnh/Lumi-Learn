import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import useCourseStore from '@/zustand/courseStore'
import { getCourseOverview } from '@/api/courseApi'
import { CourseOverview } from '@/types/course'
import { ScrollView } from 'react-native-gesture-handler'

const CoursePreview = () => {
    const selectedCourseId = useCourseStore((state) => state.selectedCourseId);

    // course
    const [courseOverview, setCourseOverview] = useState<CourseOverview>();

    useEffect(() => {
        getCourseOverview(selectedCourseId).then((response) => {
            setCourseOverview(response.data);
        }).catch(err => console.error(err))
    }, [])
  return (
    <View className = "w-full h-full bg-gray-200">
        <View className = "mt-[4rem]">
            {/* close button */}
            <Pressable className = "absolute top-4 left-[2rem]">
                <AntDesign name = "close" size = {32} onPress={() => {
                    router.push('/(tabs)/home');
                }}/>
            </Pressable>
            {/* course name and topic */}
            <View className = "mt-[7rem] ml-[3rem]">
                <Text className = "text-5xl font-bold">{courseOverview?.title}</Text>
                <Pressable className = "mt-[1rem] border-solid border-black border-[2px] rounded-full px-[1rem] py-[0.4rem] w-auto self-start">
                    <Text className = "">{courseOverview?.topic}</Text>
                </Pressable>
            </View>
            {/* course info */}
            <ScrollView className = "w-full bg-white h-full mt-[10rem] rounded-tl-3xl rounded-tr-3xl">
                <Text className = "text-2xl font-bold mt-[2rem] ml-[2rem]">{courseOverview?.title}</Text>
                <Text className = "mt-[1rem] text-lg ml-[2rem]">{`${courseOverview?.lessons.length} lesson(s)`}</Text>
                {/* description */}
                <View className = "mt-[1rem] ml-[2rem]">
                    <Text className = "text-xl font-bold">Descriptions</Text>
                    <Text className = "text-lg mt-[0.5rem]">{courseOverview?.description}</Text>
                </View>
                {/* lesson lists */}
                <ScrollView className = "flex-col ml-[2rem] mt-[1rem]">
                    {courseOverview?.lessons?.map((lesson, index) => {
                        const index_ = index + 1;
                        return (
                            <View className = "flex-row gap-[2rem] pt-[2rem]" key = {index}>
                                <Text className = "font-bold text-3xl">{index_.toString().padStart(2, "0")}</Text>
                                <View className = "relative bottom-[0.5rem]">
                                    <Text className = "text-xl font-bold">{lesson.title}</Text>
                                    <Text className = "text-lg">{`${lesson.flashcardSets.length} flashcard(s)`}</Text>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
                {/* join course */}
                <View className = "mt-[2rem] ml-[20vw]">
                    <Pressable className = "w-[60vw] self-start bg-gray-400 py-[0.5rem] rounded-xl">
                        <Text className = "text-lg text-white text-center">Join course</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    </View>
  )
}

export default CoursePreview
