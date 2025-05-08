import FontAwesome from '@expo/vector-icons/FontAwesome'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CourseList from '../Course/CourseList';
import { CourseItemProps } from '../Course/CourseItem';

interface SuggestedCourses {
    courses: CourseItemProps[]
}


const SuggestedCourse = ({courses}: SuggestedCourses) => {
  return (
    <View className = "mt-[3rem] h-full flex-1"> 
        {/* title */}
        <View className = "relative left-[5%]">
            <Text className = "text-xl font-bold">Choose your courses</Text>
        </View>
        {/* options filter */}
        <View className = "flex-row mt-[1rem] relative left-[5%] gap-3">
            {/* all */}
            <View className = "bg-gray-600 rounded-full border-solid border-[2px]">
                <Text className = "text-lg text-white px-[1rem] py-[0.3rem]">All</Text>
            </View>
            {/* new */}
            <View className = "rounded-full border-solid border-[2px]">
                <Text className = "text-lg px-[1rem] py-[0.3rem]">New</Text>
            </View>
            {/* popular */}
            <View className = "rounded-full border-solid border-[2px]">
                <Text className = "text-lg px-[1rem] py-[0.3rem]">Popular</Text>
            </View>
            {/* highest rated */}
            <View className = "rounded-full border-solid border-[2px]">
                <Text className = "text-lg px-[1rem] py-[0.3rem]">Highest Rated</Text>
            </View>
        </View>

        {/* courses */}
        <ScrollView
            className = "h-full mt-[1rem]"
            showsVerticalScrollIndicator = {false}
            horizontal={false}
            contentContainerStyle={{ paddingBottom: 35, paddingTop: 10}}
        >
            <View className = "flex-col flex-1 items-center px-6">
                <CourseList 
                    courses={courses}
                />
            </View>
        </ScrollView>
</View>
  )
}

export default SuggestedCourse
