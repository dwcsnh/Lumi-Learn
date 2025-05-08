import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CourseList from '@/components/Course/CourseList'
import { CourseItemProps } from '@/components/Course/CourseItem'
import { getMyCourses } from '@/api/courseApi'
import useAuthStore from '@/zustand/authStore'
import CreateCourseModal from '@/components/Course/CreateCourseModal'
import { useRouter } from 'expo-router'

const coursesDummyData: CourseItemProps[] = [
    {
        imgUrl: '',
        id: '1',
        courseName: 'Football',
        instructorName: 'Leo Messi', 
        isUserEnrolled: false
    },
    {
        imgUrl: '',
        id: '2',
        courseName: 'Billiards',
        instructorName: 'Fedor Gorst',
        isUserEnrolled: false
    },
    {
        imgUrl: '',
        id: '3',
        courseName: 'Snooker',
        instructorName: `Ronnie O' Sullivan`,
        isUserEnrolled: false
    },
    {
        imgUrl: '',
        id: '4',
        courseName: '3pts Shooting',
        instructorName: 'Steph Curry',
        isUserEnrolled: false
    },
    {
        imgUrl: '',
        id: '5',
        courseName: 'Fathering',
        instructorName: 'Nikola Jokic',
        isUserEnrolled: false
    },
    {
        imgUrl: '',
        id: '6',
        courseName: 'Formula One',
        instructorName: 'Max Verstappen',
        isUserEnrolled: false
    },
    {
        imgUrl: '',
        id: '7',
        courseName: 'Golf',
        instructorName: 'Gareth Bale',
        isUserEnrolled: false
    },
    {
        imgUrl: '',
        id: '8',
        courseName: 'Swimming',
        instructorName: 'Michael Phelps',
        isUserEnrolled: false
    },
];

const MyCourseScreen = () => {
    const [ courses, setCourses ] = useState<CourseItemProps[]>(coursesDummyData);
    const [ isCourseModalOpen, setIsCourseModalOpen ] = useState(false);
    const user = useAuthStore((state) => state.authState?.user);
    const router = useRouter();

    const isTeacher = () => {
        return user?.role == "Teacher";
    }

    useEffect(() => {
        getMyCourses().then((res) => {
            const mappedCourses: CourseItemProps[] = res.data.map((course: any) => ({
                id: course.id,
                imgUrl: course.thumbnail,
                courseName: course.title,
                instructorName: course.instructor,
                isUserEnrolled: course.isUserEnrolled
            }));

            // setCourses(prev => [...mappedCourses, ...coursesDummyData]);
            setCourses(mappedCourses);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <View
            id='my-course-screen'
            className='flex-col flex-1 px-6 items-center'
        >
            <CourseList courses={courses}/>
            {isTeacher() ? 
            <TouchableOpacity
                id='submit-button'
                className='bottom-4 z-10 flex justify-center items-center w-full py-4 bg-gray-500 rounded-xl'
                onPress={() => router.push('/(tabs)/courses/createCourse')}
                activeOpacity={0.55}
            >
                <Text className='text-lg text-white font-semibold'>Create new course</Text>
            </TouchableOpacity>
            : <></>}
        </View>
    )
}

export default MyCourseScreen