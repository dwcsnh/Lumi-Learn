import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import LessonItem from './LessonItem'
import { LessonOverview } from '@/types/lesson'

export type LessonListProps = {
    lessons: LessonOverview[] | undefined,
};

const LessonList = ({ lessons }: LessonListProps) => {
  return (
    <View 
        id='lesson-list'
        className='w-full flex-1'
    >
        <ScrollView
            id='lesson-list-scroll-view'
            horizontal={false}
            showsVerticalScrollIndicator={false}
            className='relative'
        >
            <View
                id='lesson-list-container'
                className='flex-col gap-3 pb-4'
            >
                {lessons?.map((lesson, index) => (
                    <LessonItem key={index} lesson={lesson} lessonNumber={index + 1}/>
                ))}
            </View>
        </ScrollView>
    </View>
  )
}

export default LessonList