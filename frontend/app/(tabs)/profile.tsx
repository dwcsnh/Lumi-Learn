import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainProfile from '@/components/Profile/MainProfile';
import UserInformation from '@/components/Profile/UserInformation';
import ChangePassword from '@/components/Profile/ChangePassword';
import ChangeTheme from '@/components/Profile/ChangeTheme';
import Policy from '@/components/Profile/Policy';
import Helps from '@/components/Profile/Helps';
import { User } from '@/types/user';
import { changePasswordApi, getUserProfile } from '@/api/userApi';
import useAuthStore from '@/zustand/authStore';
import { router } from 'expo-router';

const ProfilePage = () => {
  const [displayInformation, setDisplayInformation] = useState(false);
  const [displayChangePassword, setDisplayChangePassword] = useState(false);
  const [displayChangeTheme, setDisplayChangeTheme] = useState(false);
  const [displayPolicy, setDisplayPolicy] = useState(false);
  const [displayHelp, setDisplayHelp] = useState(false);

  // zustand auth state and logout
  const authState = useAuthStore((state) => state.authState);
  const logOutAuthState = useAuthStore((state) => state.logOut);

  // user profile
  const [userProfile, setUserProfile] = useState<User>({
    id: '',
    username: '',
    name: '',
    email: '',
    phone: '',
    birthday: new Date(),
    role: '',
  });

  useEffect(() => {
    getUserProfile().then((response) => {
        setUserProfile(response.data);
    })
  }, [])

  const setupDisplayInformation = (display: boolean) => {
    setDisplayInformation(display);
  }

  const setupDisplayChangePassword = (display: boolean) => {
    setDisplayChangePassword(display);
  }

  const setupDisplayChangeTheme = (display: boolean) => {
    setDisplayChangeTheme(display);
  }

  const setupDisplayPolicy = (display: boolean) => {
    setDisplayPolicy(display);
  }

  const setupDisplayHelp = (display: boolean) => {
    setDisplayHelp(display);
  }

  // logout
  const handleLogOut = () => {
      try {
        logOutAuthState();
      } catch(err) {
        console.error(err);
      }
      router.push('/(auth)/login');
  }
  return (
    <View>
      <View>
        {(displayInformation === false && displayChangePassword === false && displayPolicy === false && displayHelp === false) && 
          <View>
            <MainProfile 
              setupDisplayInformation={setupDisplayInformation}
              setupDisplayChangePassword={setDisplayChangePassword}
              setupDisplayChangeTheme={setupDisplayChangeTheme}
              setupDisplayPolicy={setupDisplayPolicy}
              setupDisplayHelp={setupDisplayHelp}
              handleLogOut={handleLogOut}
            />
          </View>
        }

        {displayInformation === true && 
          <UserInformation 
              setupDisplayInformation={setupDisplayInformation}
              userProfile={userProfile}
          />
        }

        {displayChangePassword === true && 
          <View>
              <ChangePassword 
                  setupDisplayChangePassword={setupDisplayChangePassword}
              />
          </View>
        }

        {displayChangeTheme === true && 
          <View className = "absolute top-[70vh] z-[50]">
              <ChangeTheme 
                  setupDisplayChangeTheme={setupDisplayChangeTheme}
              />
          </View>
        }

        {displayPolicy === true && 
          <Policy 
            setupDisplayPolicy={setupDisplayPolicy}
          />
        }

        {displayHelp === true && 
          <Helps 
            setupDisplayHelp={setupDisplayHelp}
          />
        }
      </View>
      {/* overlay */}
      {displayChangeTheme === true && 
        <Pressable className = "bg-gray-600 absolute left-0 top-0 w-[100vw] h-[100vh] z-[10] opacity-50" onPress={() => setDisplayChangeTheme(false)}></Pressable>
      }
    </View>
  )
};

export default ProfilePage;