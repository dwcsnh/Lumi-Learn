import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import AntDesgin from '@expo/vector-icons/AntDesign';
import { Topic } from '@/types/topic';

interface SearchProps {
    searchingTopics: Topic[],
    recentSearches: SearchInfo[],
    deleteSearchHistory: (content: any) => void
}

type SearchInfo  = {
    content: string
}

const Search = ({searchingTopics, recentSearches, deleteSearchHistory}: SearchProps) => {
    const [option, setOption] = useState(1);
  return (
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
  )
}

export default Search
