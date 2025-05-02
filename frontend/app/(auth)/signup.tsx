import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuthStore from '@/zustand/authStore';
import { logIn, register } from '@/api/authApi';
import { Redirect, useRouter } from 'expo-router';
import DropdownSelection, { DropdownProps } from '@/components/Auth/DropdownSelection';

const signup = () => {
    const [ usernameInput, setUsernameInput ] = useState('');
    const [ passwordInput, setPasswordInput ] = useState('');
    const [ confirmPasswordInput, setConfirmPasswordInput ] = useState('');
    const [ usernameError, setUsernameError ] = useState(false);
    const [ roleError, setRoleError ] = useState(false);
    const [ confirmPasswordError, setConfirmPasswordError ] = useState(false);
    const [ passwordError, setPasswordError ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState("");
    const [ usernameErrorMessage, setUsernameErrorMessage ] = useState('');
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState('');
    const authState = useAuthStore((state) => state.authState);
    const router = useRouter();
    const saveAuthState = useAuthStore((state) => state.saveAuthState);

    const dropdownProps: DropdownProps = {
        isError: roleError,
        title: selectedItem.length != 0 ? selectedItem : "Choose your role",
        data: ["Student", "Teacher"],
        styling: null,
        setSelectedItem: setSelectedItem
    }

    const handleSignup = () => {
        if (usernameInput.length == 0) {
            setUsernameError(true);
            setUsernameErrorMessage("Please enter your username");
        }

        if (selectedItem.length == 0) {
            setRoleError(true);
        }

        if (passwordInput.length == 0) {
            setPasswordError(true);
            setPasswordErrorMessage("Please enter your password");
        }

        if (usernameError || passwordError || confirmPasswordError || roleError) {
            return;
        }

        const request = {
            username: usernameInput,
            password: passwordInput,
            role: selectedItem == "Student" ? 0 : 1
        };

        register(request).then((res) => {
            const authState = res.data;
            saveAuthState(authState);
            setUsernameError(false);
            setPasswordError(false);
            setRoleError(false);
            setConfirmPasswordError(false);
        }).catch((err) => {
            if (err.response?.status == 409) {
                setUsernameError(true);
                setPasswordError(false);
                setUsernameErrorMessage(`Username '${usernameInput}' already exists`);
            }
            console.log(err.message);
        });
    }

    useEffect(() => {
        if (passwordInput.length != 0) {
            setConfirmPasswordInput('');
        }
    }, [passwordInput]);

    useEffect(() => {
        if (confirmPasswordInput != passwordInput) {
            setConfirmPasswordError(true);
        } else {
            setConfirmPasswordError(false);
        }
    }, [confirmPasswordInput]);

    useEffect(() => {
        if (selectedItem.length != 0) {
            setRoleError(false);
        }
    }, [selectedItem]);

    if (authState?.user != null) {
        return <Redirect href="/(tabs)/notification"/>;
    }

  return (
    <View
        id='login-screen'
        className='flex-1 justify-center items-center'
    >
        <View
            id='login-container'
            className='flex flex-col items-center p-4 h-fit w-4/5 gap-3'
        >
            <View
                id='lumilearn-logo'
                className=''
            >
                <Text className='text-4xl pb-6 font-bold color-slate-900'>Logo</Text>
            </View>
            <View
                id='login-form'
                className='relative flex flex-col gap-5 w-full color-orange-300'
            >
                <View id='username-input'>
                    <Text 
                        className={usernameError ? 
                            'text-sm ml-1 mb-2 color-red-600'
                            : 'text-sm ml-1 mb-2 color-slate-700'}
                    >
                        Username
                    </Text>
                    <TextInput
                        id='username-input-field'
                        placeholder='Please enter your username'
                        placeholderTextColor={"#9CA3AF"}
                        className={usernameError ? 
                            'w-full p-4 rounded-xl bg-transparent border border-solid border-red-500'
                            : 'w-full p-4 rounded-xl bg-transparent border border-solid border-gray-600'}
                        style={{ textAlignVertical: 'center' }}
                        onChangeText={(text) => {
                            setUsernameInput(text);
                            setUsernameError(false);
                        }}
                    />
                    {usernameError && (
                        <Text className='text-sm ml-1 mt-2 mb-2 color-red-600'>
                            {usernameErrorMessage}
                        </Text>
                    )}
                </View>
                <View id='role-input' className='z-[100]'>
                    <Text 
                        className={roleError ? 
                            'text-sm ml-1 mb-2 color-red-600'
                            : 'text-sm ml-1 mb-2 color-slate-700'}
                    >
                        Role
                    </Text>
                    <DropdownSelection {...dropdownProps}/>
                    {roleError && (
                        <Text className='text-sm ml-1 mt-2 mb-2 color-red-600'>
                            Please choose a role
                        </Text>
                    )}
                </View>
                <View id='password-input'>
                    <Text 
                        className={passwordError ? 
                            'text-sm ml-1 mb-2 color-red-600'
                            : 'text-sm ml-1 mb-2 color-slate-700'}
                    >
                        Password
                    </Text>
                    <TextInput
                        id='password-input-field'
                        placeholder='Please enter your password'
                        placeholderTextColor={"#9CA3AF"}
                        className={passwordError ? 
                            'w-full p-4 rounded-xl bg-transparent border border-solid border-red-500'
                            : 'w-full p-4 rounded-xl bg-transparent border border-solid border-gray-600'}
                        style={{ textAlignVertical: 'center' }}
                        onChangeText={(text) => {
                            setPasswordInput(text);
                            setPasswordError(false);
                        }}
                    />
                    {passwordError && (
                        <Text className='text-sm ml-1 mt-2 mb-2 color-red-600'>
                            {passwordErrorMessage}
                        </Text>
                    )}
                </View>
                <View id='confirm-password-input'>
                    <Text 
                        className={confirmPasswordError ? 
                            'text-sm ml-1 mb-2 color-red-600'
                            : 'text-sm ml-1 mb-2 color-slate-700'}
                    >
                        Confirm password
                    </Text>
                    <TextInput
                        id='confirm-password-input-field'
                        placeholder='Please re-enter your password'
                        placeholderTextColor={"#9CA3AF"}
                        className={confirmPasswordError ? 
                            'w-full p-4 rounded-xl bg-transparent border border-solid border-red-500'
                            : 'w-full p-4 rounded-xl bg-transparent border border-solid border-gray-600'}
                        style={{ textAlignVertical: 'center' }}
                        onChangeText={(text) => {
                            setConfirmPasswordInput(text);
                        }}
                    />
                    {confirmPasswordError && (
                        <Text className='text-sm ml-1 mt-2 mb-2 color-red-600'>
                            Password does not match
                        </Text>
                    )}
                </View>
                <TouchableHighlight
                    id='login-button'
                    className='w-full mt-5 py-4 flex items-center bg-slate-900 rounded-xl'
                    onPress={() => handleSignup()}
                    underlayColor="gray"
                >
                    <Text 
                        id='login-button'
                        className='color-white text-lg font-semibold'
                    >
                        Sign up
                    </Text>
                </TouchableHighlight>
                <View className="w-full mt-3 flex items-center">
                    <Text className="text-sm color-slate-700">
                    Already had an account?{" "}
                    <Text
                        className="font-bold color-blue-500"
                        onPress={() => router.push("/(auth)/login")}
                    >
                        Log in
                    </Text>
                    </Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default signup