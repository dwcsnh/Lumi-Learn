import { router } from 'expo-router'
import React from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { CourseItemProps } from '../Course/CourseItem'


interface CourseJoinedProps {
    courseJoined: CourseItemProps[],
}


const CourseJoined = ({courseJoined}: CourseJoinedProps) => {
  return (
    <View className = "">
        {/* title */}
        <View className = "relative left-[5%] mt-[2rem]">
            <Text className = "text-xl font-bold">Courses you've joined</Text> 
        </View>

        {/* courses */}
        <ScrollView 
            className = "relative left-[3%] mt-[1rem]" 
            horizontal={true} showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingRight: 32 }}
        >
            <View className = "flex-row gap-4">
            {courseJoined.map((course, index) => {
                return (
                    <Pressable className = "w-[12rem] border-solid border-gray-300 border-[1px] rounded-lg h-[8rem]" key = {index} onPress = {() => {
                        router.push(`/(tabs)/courses/${course.id}`)
                    }}>
                        {/* fake thumbnail */}
                        <View className = "w-[10rem] h-[5rem] bg-white mt-[0.5rem] ml-[1rem]"></View>
                        <Text className = "relative left-[1rem] top-[0.5rem] font-bold">{course.courseName?.length > 18 ? course.courseName.substring(0, 18) + "..." : course.courseName}</Text>
                    </Pressable>
                )
            })} 
            </View>
        </ScrollView>
    </View>
  )
}

export default CourseJoined
