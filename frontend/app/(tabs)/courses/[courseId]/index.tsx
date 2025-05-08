import { View, Text, Pressable, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getCourseOverview } from '@/api/courseApi';
import { CourseOverview } from '@/types/course';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import LessonItem from '@/components/Lesson/LessonItem';
import LessonList from '@/components/Lesson/LessonList';
import useAuthStore from '@/zustand/authStore';
import CreateCourseModal from '@/components/Course/CreateCourseModal';
import CreateLessonModal from '@/components/Lesson/CreateLessonModal';

const CourseOverviewPage = () => {
    const [ courseOverview, setCourseOverview ] = useState<CourseOverview | undefined>(undefined);
    const [ isLessonModalOpen, setIsLessonModalOpen ] = useState(false);
    const [ refreshPage, setRefreshPage ] = useState(true);
    const { courseId } = useLocalSearchParams();
    const user = useAuthStore((state) => state.authState?.user);
    const router = useRouter();

    const isTeacher = () => {
        return user?.role == "Teacher";
    }

    useEffect(() => {
        if (refreshPage) {
            getCourseOverview(courseId as string).then((res) => {
                setCourseOverview(res.data);
            }).catch((err) => {
                console.log(err);
            })
            setRefreshPage(false);
        }
    }, [courseId, refreshPage]);
    return (
        <View
            id='course-overview-screen'
            className='flex-1 flex-col items-center px-6'
        >
            <View
                id='top-nav'
                className='flex-row pt-14 w-full'
            >
                <Pressable
                    onPress={() => { 
                        router.push(`/(tabs)/courses`);
                    }}
                >
                    <AntDesign name='arrowleft' size={24}/>
                </Pressable>
            </View>
            <View
                id='course-overview-section'
                className='flex-row gap-2 py-8 w-full'
            >
                <View
                    id='course-overview-info'
                    className='flex-col gap-3 w-3/4'
                >
                    <Text
                        id='course-name'
                        className='text-2xl font-bold'
                    >
                        {courseOverview?.title}
                    </Text>
                    <Text
                        id='course-description'
                        className='font-normal'
                    >
                        {courseOverview?.description}
                    </Text>
                </View>
                {/* Replace with course thumbnail later */}
                <Image
                    id='course-thumbnail'
                    source={{ uri: courseOverview?.thumbnail as string | undefined }}
                    width={84}
                    height={84}
                    borderRadius={8}
                >
                </Image>
            </View>
            <View
                id='Lesson-list-section'
                className='flex-col gap-4 w-full flex-1'
            >
                <View id='lesson-list-title'>
                    <Text className='text-lg font-bold'>Lessons in this course</Text>
                </View>
                <LessonList lessons={courseOverview?.lessons}/>
            </View>
            {isTeacher() ? 
            <TouchableOpacity
                id='submit-button'
                className='bottom-4 z-10 flex justify-center items-center w-full py-4 bg-gray-500 rounded-xl'
                onPress={() => setIsLessonModalOpen(true)}
                activeOpacity={0.55}
            >
                <Text className='text-lg text-white font-semibold'>Add lesson</Text>
            </TouchableOpacity>
            : <></>}
            {isLessonModalOpen ? 
                <CreateLessonModal onClose={setIsLessonModalOpen} setRefresh={setRefreshPage}/>
            : <></>}
        </View>
    )
}

export default CourseOverviewPage