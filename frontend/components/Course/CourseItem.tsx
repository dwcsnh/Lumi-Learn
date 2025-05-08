import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import useCourseStore from '@/zustand/courseStore'

export type CourseItemProps = {
    id: string,
    imgUrl: string | undefined,
    courseName: string,
    instructorName: string,
    isUserEnrolled: boolean
}

const CourseItem = (props: CourseItemProps) => {
    const [ isPressed, setIsPressed ] = useState(false);
    const router = useRouter();

    // zustand for course
    const setSelectedCourseId = useCourseStore((state) => state.setSelectedCourseId);
    return (
        <Pressable
            id='course-item-container'
            className={`w-[98%] flex-row justify-center p-3 rounded-xl ${isPressed ? 'bg-slate-100' : 'bg-gray-50'}`}
            style = {{boxShadow: "0px 4px 6px rgba(0,0,0,0.08)"}}
            onPress={() => {
                setSelectedCourseId(props.id);
                props.isUserEnrolled === true ? router.push(`/(tabs)/courses/${props.id}`) : router.push('/(other)/CoursePreview');
            }}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            <View
                id='course-item-content'
                className='w-full flex-row gap-5 items-center'
            >
                {/* Replace with real thumbnail image later */}
                <Image
                  src={props.imgUrl}  
                  width={80}
                  height={80}
                  borderRadius={8}
                />

                <View
                    id='course-overview'
                    className='w-full h-20 flex-col gap-1'
                >
                    <Text
                        id='course-name'
                        className='color-gray-700 font-semibold text-lg'
                    >{props.courseName}</Text>
                    <Text
                        id='instructor-name'
                        className='color-gray-700 text-sm'
                    >{props.instructorName}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default CourseItem