import { changePasswordApi } from '@/api/userApi';
import AntDesign from '@expo/vector-icons/AntDesign'
import { router } from 'expo-router';
import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

interface ChangePasswordProps {
    setupDisplayChangePassword: (display: boolean) => void;
}

const ChangePassword = ({setupDisplayChangePassword}: ChangePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // error handling
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleChangePassword = () => {
    // handle error
    if (currentPassword === "") {
      setCurrentPasswordError("Recent password cannot be empty");
    }

    if (newPassword === "") {
      setNewPasswordError("New password cannot be empty");
    }

    if (newPassword === currentPassword && newPassword !== "" && currentPassword !== "") {
      setNewPasswordError("New password cannot be the same as recent password");
    }

    if (newPassword !== currentPassword && newPassword !== "" && currentPassword !== "") {
      const payload = {
        currentPassword: currentPassword,
        newPassword: newPassword
      }
      changePasswordApi(payload).then((res) => {
        console.log("Change password successfully");
        router.push('/(tabs)/home');
        setupDisplayChangePassword(false);
      }).catch((err) => {
          if (err?.response.status === 400) {
              setCurrentPasswordError("Recent password is wrong");
          }
      });
    }
  }

  return (
    <ScrollView className = "mt-[4rem] animate-slideLeftFromRight">
        {/* header */}
        <View className = "w-[100vw] border-solid border-black border-b-[1px] pb-[2rem] mt-[1rem]">
            <Text className = "text-center text-3xl font-bold">Change password</Text>
            <Pressable className = "absolute left-8 top-1" onPress={() => setupDisplayChangePassword(false)}>
                <AntDesign name = "left" size = {26} />
            </Pressable>
        </View>

        {/* recent password */}
        <View className = "relative left-[5%] mt-[5rem]">
            <Text className = {currentPasswordError ? "text-xl font-bold text-red-500" : "text-xl font-bold"}>Recent Password</Text>
            <TextInput 
              placeholder = "Enter your current password"
              secureTextEntry = {true}
              className = {`w-[90%] border-solid border-[2px] rounded-lg py-[1rem] mt-[1rem] pl-[1rem] ${currentPasswordError ? "border-red-500" : "border-black"}`} 
              placeholderTextColor={"black"}
              value = {currentPassword}
              onChangeText={setCurrentPassword}
              onFocus = {() => setCurrentPasswordError("")}
            />
            {currentPasswordError && 
              <Text className = "text-red-500 text-lg mt-[0.5rem] relative left-[0.3rem]">{currentPasswordError}</Text>
            }
        </View>

        {/* new password */}
        <View className = "relative left-[5%] mt-[2rem]">
            <Text className = {newPasswordError ? "text-xl font-bold text-red-500" : "text-xl font-bold"}>New Password</Text>
            <TextInput 
              placeholder = "Enter your new password"
              secureTextEntry = {true}
              className = {`w-[90%] border-solid border-[2px] rounded-lg py-[1rem] mt-[1rem] pl-[1rem] ${newPasswordError ? "border-red-500" : "border-black"}`} 
              placeholderTextColor={"black"}
              value = {newPassword}
              onChangeText={setNewPassword}
              onFocus = {() => setNewPasswordError("")}
            />
            {newPasswordError && 
              <Text className = "text-red-500 text-lg mt-[0.5rem] relative left-[0.3rem]">{newPasswordError}</Text>
            }
        </View>

        {/* confirm password */}
        <View className = "relative left-[5%] mt-[2rem]">
            <Text className = {confirmPasswordError ? "text-xl font-bold text-red-500" : "text-xl font-bold"}>Confirm new Password</Text>
            <TextInput 
              placeholder = "Confirm your new password"
              secureTextEntry = {true}
              className = {`w-[90%] border-solid border-[2px] rounded-lg py-[1rem] mt-[1rem] pl-[1rem] ${confirmPasswordError ? "border-red-500" : "border-black"}`} 
              placeholderTextColor={"black"}
              value = {confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus = {() => setConfirmPasswordError("")}
            />
            {confirmPasswordError && 
              <Text className = "text-red-500 text-lg mt-[0.5rem] relative left-[0.3rem]">{confirmPasswordError}</Text>
            }
        </View>

        {/* comfirm button */}
        <View className = "mt-[3rem]">
            <Pressable className = "relative left-[15%] w-[70%] border-solid border-[2px] border-black rounded-lg py-[0.7rem]" onPress = {handleChangePassword}>
                <Text className = "text-xl text-center">Confirm</Text>
            </Pressable>
        </View>
    </ScrollView>
  )
}

export default ChangePassword
