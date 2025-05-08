import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import AntDesgin from '@expo/vector-icons/AntDesign';
import { Topic } from '@/types/topic';
import { CourseItemProps } from '../Course/CourseItem';
import CourseList from '../Course/CourseList';
import { ScrollView } from 'react-native-gesture-handler';

interface SearchProps {
    searchingTopics: Topic[],
    recentSearches: SearchInfo[],
    deleteSearchHistory: (content: any) => void
    displaySearchResult: boolean,
    searchedCourses: CourseItemProps[]
}

type SearchInfo  = {
    content: string
}

const Search = ({searchingTopics, recentSearches, deleteSearchHistory, displaySearchResult, searchedCourses}: SearchProps) => {
    const [option, setOption] = useState(1);
  return (
    <ScrollView>
        {displaySearchResult === false &&
            <View className = "relative left-[4%] animate-slideLeftFromRight">
                {/* header */}
                <View className = "mt-[2rem]">
                    <Text className = "text-xl font-bold">Topic you may like</Text>
                    {/* topics */}
                    <View className = "flex-row mt-[1rem] gap-3 flex-wrap">
                        {searchingTopics.map((topic, index) => {
                            return (
                                <Pressable className = {`rounded-full py-[0.5rem] px-[1.2rem] border-solid border-[2px] ${option === index ? "bg-gray-400" : ""}`} onPress={() => setOption(index)} key = {index}>
                                    <Text className = {option === index ? "text-white" : ""}>{topic.name}</Text>
                                </Pressable>
                            )
                        })}
                    </View>
                </View>
        
                {/* recent searches */}
                <View className = "mt-[2rem]">
                    <Text className = "text-xl font-bold">Recent searches</Text>
                    <View className = "flex-col gap-8 mt-[1rem] relative left-[4%]">
                        {recentSearches.map((search, index) => {
                            return (
                                <View className = "flex-row" key = {index}>
                                    <Text className = "text-lg">{search.content}</Text>
                                    <Pressable className = "absolute right-14" onPress={() => deleteSearchHistory(search.content)}>
                                        <AntDesgin name = "close" size = {24}/>
                                    </Pressable>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </View>
        }

        {displaySearchResult === true && 
            <View className = "">
                <Text className = "text-xl font-bold relative left-[2rem] top-[1rem]">Courses:</Text>
                <ScrollView
                    className = "mt-[1.5rem]"
                    contentContainerStyle = {{paddingBottom: 20}}
                >
                    <View className = "flex-col flex-1 items-center px-6" id='my-course-screen'>
                        <CourseList 
                            courses={searchedCourses}
                        />
                    </View>
                </ScrollView>
            </View>
        }
    </ScrollView>
  )
}

export default Search
