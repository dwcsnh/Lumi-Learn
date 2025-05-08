import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { User } from '@/types/user';
import { ScrollView } from 'react-native-gesture-handler';

interface UserInformationProps {
    setupDisplayInformation: (display: boolean) => void;
    userProfile: User | undefined
}

const UserInformation = ({setupDisplayInformation, userProfile}: UserInformationProps) => {
  return (
    <ScrollView className = "mt-[4rem] animate-slideLeftFromRight">
        {/* header */}
        <View className = "w-[100vw] border-solid border-black border-b-[1px] pb-[2rem] mt-[1rem]">
            <Text className = "text-center text-3xl font-bold">Information</Text>
            <Pressable className = "absolute left-8 top-1" onPress={() => setupDisplayInformation(false)}>
                <AntDesign name = "left" size = {26} />
            </Pressable>
        </View>

        {/* avatar and change */}
        <View className = "mt-[3rem]">
            <Image source = {require("../../assets/images/userAvatarTest.png")} className = "w-[6rem] h-[6rem] relative left-[40%] border-gray-500 border-solid border-[1px] rounded-full" />
            <Text className = "text-xl text-center mt-[0.5rem]">Change avatar</Text>
        </View>

        {/* username */}
        <View className = "mt-[1rem] relative left-[5%]">
            <Text className = "text-xl font-bold">User name</Text>
            {/* options */}
            <View className = "flex-col mt-[0.5rem]">
                <Pressable className = "w-[90%] border-solid border-black border-[2px] pl-[1rem] py-[0.7rem] rounded-lg">
                    <Text className = "text-xl">{userProfile?.username}</Text>
                    <AntDesign name = "right" size = {24} className = "absolute right-4 top-3" /> 
                </Pressable>
            </View>
        </View>

        {/* full name */}
        <View className = "mt-[1.5rem] relative left-[5%]">
            <Text className = "text-xl font-bold">Full name</Text>
            {/* options */}
            <View className = "flex-col mt-[0.5rem]">
                <Pressable className = "w-[90%] border-solid border-black border-[2px] pl-[1rem] py-[0.7rem] rounded-lg">
                    <Text className = "text-xl">{userProfile?.name}</Text>
                    <AntDesign name = "right" size = {24} className = "absolute right-4 top-3" /> 
                </Pressable>
            </View>
        </View>

        {/* birthday */}
        <View className = "mt-[1.5rem] relative left-[5%]">
            <Text className = "text-xl font-bold">Birthday</Text>
            {/* options */}
            <View className = "flex-col mt-[0.5rem]">
                <Pressable className = "w-[90%] border-solid border-black border-[2px] pl-[1rem] py-[0.7rem] rounded-lg">
                    <Text className = "text-xl">{userProfile?.birthday.toString().substring(0,10)}</Text>
                    <AntDesign name = "right" size = {24} className = "absolute right-4 top-3" /> 
                </Pressable>
            </View>
        </View>

        {/* email */}
        <View className = "mt-[1.5rem] relative left-[5%]">
            <Text className = "text-xl font-bold">Email</Text>
            {/* options */}
            <View className = "flex-col mt-[0.5rem]">
                <Pressable className = "w-[90%] border-solid border-black border-[2px] pl-[1rem] py-[0.7rem] rounded-lg">
                    <Text className = "text-xl">{userProfile?.email}</Text>
                    <AntDesign name = "right" size = {24} className = "absolute right-4 top-3" /> 
                </Pressable>
            </View>
        </View>

        {/* phone number */}
        <View className = "mt-[1.5rem] relative left-[5%]">
            <Text className = "text-xl font-bold">Phone number</Text>
            {/* options */}
            <View className = "flex-col mt-[0.5rem]">
                <Pressable className = "w-[90%] border-solid border-black border-[2px] pl-[1rem] py-[0.7rem] rounded-lg">
                    <Text className = "text-xl">{userProfile?.phone}</Text>
                    <AntDesign name = "right" size = {24} className = "absolute right-4 top-3" /> 
                </Pressable>
            </View>
        </View>
    </ScrollView>
  )
}

export default UserInformation
