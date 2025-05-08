import { View, Text, TouchableOpacity, TouchableHighlight, Image } from 'react-native'
import React from 'react'
import { QuizResult } from '@/types/quizResult'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { S3_URL_PREFIX } from '@/const/AmazonS3';

export type QuizResultProps = {
    quizTitle: string;
    quizResult: QuizResult;
}

const QuizResultScreen: React.FC<QuizResultProps> = ({ quizTitle, quizResult }) => {
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
                You have completed quiz
            </Text>
            <Text className='text-2xl font-bold text-black'>
                {quizTitle}
            </Text>
            <Text className='text-base font-base text-gray-400 mt-4'>
                Here's your result
            </Text>

            <View
                id='quiz-stats'
                className='flex-row items-center justify-center flex-wrap gap-2 p-2 w-full'
            >
                <View
                    id='quiz-score'
                    className='w-[48%] flex-row pl-5 py-3 gap-4 bg-white items-center rounded-xl'
                    style = {{boxShadow: "0px 3px 8px rgba(0,0,0,0.1)"}}
                >
                    <FontAwesome name='bar-chart' size={24} color={'orange'}/>
                    <View className='flex-col'>
                        <Text className='text-xl font-semibold'>{quizResult.score}</Text>
                        <Text className='text-sm font-medium text-gray-500'>Quiz score</Text>
                    </View>
                </View>
                <View
                    id='total-questions'
                    className='w-[48%] flex-row pl-5 py-3 gap-4 bg-white items-center rounded-xl'
                    style = {{boxShadow: "0px 3px 8px rgba(0,0,0,0.1)"}}
                >
                    <FontAwesome name='list-ul' size={24} color={'blue'}/>
                    <View className='flex-col'>
                        <Text className='text-xl font-semibold'>{quizResult.totalQuestions}</Text>
                        <Text className='text-sm font-medium text-gray-500'>Total questions</Text>
                    </View>
                </View>
                <View
                    id='correct-answer'
                    className='w-[48%] flex-row pl-5 py-3 gap-4 bg-white items-center rounded-xl'
                    style = {{boxShadow: "0px 3px 8px rgba(0,0,0,0.1)"}}
                >
                    <FontAwesome name='check' size={24} color={'green'}/>
                    <View className='flex-col'>
                        <Text className='text-xl font-semibold'>{quizResult.correctAnswers}</Text>
                        <Text className='text-sm font-medium text-gray-500'>Correct answers</Text>
                    </View>
                </View>
                <View
                    id='wrong-answer'
                    className='w-[48%] flex-row pl-5 py-3 gap-4 bg-white items-center rounded-xl'
                    style = {{boxShadow: "0px 3px 8px rgba(0,0,0,0.1)"}}
                >
                    <FontAwesome name='remove' size={24} color={'red'}/>
                    <View className='flex-col'>
                        <Text className='text-xl font-semibold'>{quizResult.wrongAnswers}</Text>
                        <Text className='text-sm font-medium text-gray-500'>Wrong answers</Text>
                    </View>
                </View>
            </View>
            <TouchableHighlight
                id='submit-button'
                className='mt-16 flex justify-center items-center w-full py-4 bg-gray-400 rounded-xl'
                onPress={() => router.push(`/(tabs)/courses/${courseId}`)}
                underlayColor={"rgba(0,0,0,0.25)"}
            >
                <Text className='text-lg text-white font-semibold'>Back to course</Text>
            </TouchableHighlight>
        </View>
    )
}

export default QuizResultScreen