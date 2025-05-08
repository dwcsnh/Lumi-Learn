import { View, Text, TouchableHighlight, Image } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { S3_URL_PREFIX } from '@/const/AmazonS3';

export type FlashcardResultProps = {
    known: number;
    learning: number;
    flashcardSetTitle: string
    handleClose: () => void
}   

const FlashcardResultScreen: React.FC<FlashcardResultProps> = ({ known, learning, flashcardSetTitle, handleClose }) => {
    const router = useRouter();
    const { courseId } = useLocalSearchParams();
    return (
        <View
            id='quiz-result-screen'
            className='flex-1 flex-col items-center justify-center p-6 gap-5 rounded-t-3xl bg-white w-full animate-slideUpToHalf'
        >
            <Image
                source={{ uri: `${S3_URL_PREFIX}/course/${courseId}`}}
                width={150}
                height={150}
                borderRadius={12}
            />
            <Text className='text-xl font-normal text-black'>
                You have completed flashcard set
            </Text>
            <Text className='text-2xl font-bold text-black'>
                {flashcardSetTitle}
            </Text>
            <Text className='text-base font-base text-gray-400 mt-4'>
                Here's your result
            </Text>
            <View
                id='flashcard-stats'
                className='flex-row items-center justify-center flex-wrap gap-2 p-2 w-full'
            >
                <View
                    id='correct-answer'
                    className='w-[46%] flex-row pl-5 py-3 gap-4 bg-white items-center rounded-xl'
                    style = {{boxShadow: "0px 3px 8px rgba(0,0,0,0.1)"}}
                >
                    <Feather name='check-circle' size={24} color={'green'}/>
                    <View className='flex-col'>
                        <Text className='text-xl font-semibold'>{known}</Text>
                        <Text className='text-sm font-medium text-gray-500'>Terms learned</Text>
                    </View>
                </View>
                <View
                    id='wrong-answer'
                    className='w-[46%] flex-row pl-5 py-3 gap-4 bg-white items-center rounded-xl'
                    style = {{boxShadow: "0px 3px 8px rgba(0,0,0,0.1)"}}
                >
                    <Feather name='clock' size={24} color={'orange'}/>
                    <View className='flex-col'>
                        <Text className='text-xl font-semibold'>{learning}</Text>
                        <Text className='text-sm font-medium text-gray-500'>Learning</Text>
                    </View>
                </View>
            </View>
            <TouchableHighlight
                id='submit-button'
                className='mt-16 flex justify-center items-center w-full py-4 bg-gray-400 rounded-xl'
                onPress={() => router.push(`/(tabs)/courses/${courseId}`)}
                underlayColor={"rgba(0,0,0,0.25)"}
            >
                <Text className='text-lg text-white font-semibold'>
                    Back to course
                </Text>
            </TouchableHighlight>
            <TouchableHighlight
                id='submit-button'
                className='flex justify-center items-center w-full py-4 border border-black bg-gray-200 rounded-xl'
                onPress={() => handleClose()}
                underlayColor={"rgba(0,0,0,0.25)"}
            >
                <Text className='text-lg text-black font-semibold'>
                    {learning == 0 ? 'Restart flashcard set' : 'Continue learning'}
                </Text>
            </TouchableHighlight>
        </View>
    )
}

export default FlashcardResultScreen;