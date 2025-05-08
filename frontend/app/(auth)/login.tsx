import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import useAuthStore, { AuthState } from '@/zustand/authStore';
import { logIn } from '@/api/authApi';
import { Redirect, useRouter } from 'expo-router';

const login = () => {
    const [ usernameInput, setUsernameInput ] = useState('');
    const [ passwordInput, setPasswordInput ] = useState('');
    const [ usernameError, setUsernameError ] = useState(false);
    const [ passwordError, setPasswordError ] = useState(false);
    const [ usernameErrorMessage, setUsernameErrorMessage ] = useState('');
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState('');
    const authState = useAuthStore((state) => state.authState);
    const router = useRouter();
    const saveAuthState = useAuthStore((state) => state.saveAuthState);

    const handleLogin = () => {
        if (usernameInput.length == 0) {
            setUsernameError(true);
            setUsernameErrorMessage("Please enter your username");
        }

        if (passwordInput.length == 0) {
            setPasswordError(true);
            setPasswordErrorMessage("Please enter your password");
        }

        if (usernameError || passwordError) {
            return;
        }

        const request = {
            username: usernameInput,
            password: passwordInput
        };

        logIn(request).then((res) => {
            const authState: AuthState = {
                user: res.data.user,
                accessToken: res.data.authToken
            };
            saveAuthState(authState);
            setUsernameError(false);
            setPasswordError(false);
            console.log(res.data.authToken);
        }).catch((err) => {
            if (err.response?.status == 404) {
                setUsernameError(true);
                setPasswordError(false);
                setUsernameErrorMessage(`Cannot found username '${usernameInput}'`);
            }
            if (err.response?.status == 401) {
                setPasswordError(true);
                setUsernameError(false);
                setPasswordErrorMessage("Incorrect password");
            }
            console.log(err.message);
        });
    }

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
                className='flex flex-col gap-5 w-full color-orange-300'
            >
                <View id='username-input'>
                      <Text 
                        accessible={true}
                        accessibilityLabel="UserName input field"
                        className={usernameError ? 
                            'text-sm ml-1 mb-2 color-red-600'
                            : 'text-sm ml-1 mb-2 color-slate-700'}
                    >
                        Username
                    </Text>
                    <TextInput
                        id='username-input-field'
                        accessible={true}
                        accessibilityLabel="UserName input field"
                        accessibilityHint="Double type to start typing"
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
                <TouchableHighlight
                    id='login-button'
                    className='w-full mt-5 py-4 flex items-center bg-slate-900 rounded-xl'
                    onPress={() => handleLogin()}
                    underlayColor="gray"
                >
                    <Text 
                        id='login-button'
                        className='color-white text-lg font-semibold'
                    >
                        Login
                    </Text>
                </TouchableHighlight>
                <View className="w-full mt-4 flex items-center">
                    <Text className="text-sm color-slate-700">
                    Don't have an account?{" "}
                    <Text
                        className="font-bold color-blue-500"
                        onPress={() => router.push("/(auth)/signup")}
                    >
                        Sign up
                    </Text>
                    </Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default login