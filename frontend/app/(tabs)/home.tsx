import { View, Text, Button, TextInput, Image, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import CoursesPage from './courses';
import { logIn } from '@/api/authApi';
import useAuthStore from '@/zustand/authStore';

import EvilIcon from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import CourseJoined from '@/components/Home/CourseJoined';
import SuggestedCourse from '@/components/Home/SuggestedCourse';
import Search from '@/components/Search/Search';
import Entypo from '@expo/vector-icons/Entypo';
import SearchFilter from '@/components/Search/SearchFilter';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getAllCourses, getMyCourses, searchCourse} from '@/api/courseApi';
import { GetAllTopics } from '@/api/topicApi';
import { deleteSearchHistoryByContent, getMySearchHistories} from '@/api/searchHistoriesApi';
import { CourseOverview } from '@/types/course';
import { CourseItemProps } from '@/components/Course/CourseItem';
import { getUserProfile } from '@/api/userApi';
import { User } from '@/types/user';
// import { REACT_APP_API_BASE_URL } from '';

const HomePage = () => {
    const username = 'teacher';
    const password = 'string';
    const [text, setText] = useState('');
    const authState = useAuthStore((state) => state.authState);
    const saveAuthState = useAuthStore((state) => state.saveAuthState);

    // state display search
    const [displaySearch, setDisplaySearch] = useState(false);

    // state display search filter
    const [displaySearchFilter, setDisplaySearchFilter] = useState(false);

    // courseJoined
    const [coursesJoined, setCoursesJoined] = useState<CourseItemProps[]>([]);

    // all courses
    const [allCourses, setAllCourses] = useState<CourseItemProps[]>([]);

    // searching topic
    const [searchingTopics, setSearchingTopics] = useState([]);

    // recent search
    const [recentSearches, setRecentSearches] = useState([]);

    // keyword of search input
    const [keyword, setKeyword] = useState<string>("");

    // courses based on search result
    const [searchedCourses, setSearchedCourses] = useState<CourseItemProps[]>([]);

    // state to handle display search result
    const [displaySearchResult, setDisplaySearchResult] = useState<boolean>(false);

    // trigger the change of search histories
    const [searchTrigger, setSearchTrigger] = useState(false);

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

    const handleOnClick = () => {
      const request = {
        username: username,
        password: password
      };

      logIn(request).then((res) => {
        setText(res.data.user.username);
      }).catch((err) => {
        setText(err.message);
      })
    }

    useEffect(() => {
      if (authState?.accessToken) {
        setText(authState.accessToken);
      }
      GetAllTopics().then((response) => {
        setSearchingTopics(response.data);
      })
    }, [authState]);

    // get user's courses
    useEffect(() => {
      getMyCourses().then((res) => {
        const mappedCourses: CourseItemProps[] = res.data.map((course: any) => ({
            id: course.id,
            imgUrl: course.thumbnail,
            courseName: course.title,
            instructorName: course.instructor,
            isUserEnrolled: course.isUserEnrolled
          }));
          setCoursesJoined(mappedCourses);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    // get all courses that user not enrolled
    useEffect(() => {
      getAllCourses().then((res) => {
          const mappedCourses: CourseItemProps[] = res.data.map((course: any) => ({
              id: course.id,
              imgUrl: course.thumbnail,
              courseName: course.title,
              instructorName: course.instructor,
              isUserEnrolled: course.isUserEnrolled
          }));
          setAllCourses(mappedCourses.filter(course => course.isUserEnrolled === false));
      }).catch((err) => {
          console.log(err);
      });
    }, [])

    // get search histories
    useEffect(() => {
      getMySearchHistories().then((response) => {
        setRecentSearches(response.data);
      })
    }, [searchTrigger])

    // get user profile
    useEffect(() => {
      getUserProfile().then((response) => {
        setUserProfile(response.data);
      }).catch(err => console.error(err));
    }, [])  

    // disable search filter
    const disableSearchFilter = () => {
      setDisplaySearchFilter(false);
    }

    // delete search history
    const deleteSearchHistory = (content:string) => {
      deleteSearchHistoryByContent(content).then((res) => {
        setSearchTrigger(prev => !prev)
      })
      .catch(err => console.error(err));
    }

    // handle search key word
    const searchCourseByKeyword = (keyword: string) => {
      setDisplaySearchResult(true);
      searchCourse(keyword).then((res) => {
        const mappedCourses: CourseItemProps[] = res.data.map((course: any) => ({
            id: course.id,
            imgUrl: course.thumbnail,
            courseName: course.title,
            instructorName: course.instructor,
        }));
        setSearchedCourses(mappedCourses);
        setSearchTrigger(prev => !prev)
      }).catch((err) => {
        console.log(err);
      });
    }

    // update recent search
    const refreshRecentSearches = () => {
      getMySearchHistories().then((response) => {
        setRecentSearches(response.data);
      })
    }

  return (
    <View className = "flex-1">
      <View className="h-full mt-[2rem]">
        {/* username */}
        {displaySearch === false ? 
            <View className = "relative left-[5%] mt-[2rem]">
              <Text className = "text-3xl font-bold">{userProfile?.name}</Text>
            </View> : 
            <Pressable onPress={() => {
              setDisplaySearch(false);
              setDisplaySearchResult(false);
            }}>
              <Entypo name = "chevron-left" size = {40} className = "relative left-[1%] top-[0.5rem] mt-[1rem]" />
            </Pressable>
        }
        
        {/* search bar and sort */}
        <View className = "flex-row w-full justify-between gap-3 px-4 mt-[1rem]">
            {/* search bar */}
            <Pressable className = "flex-row gap-3 bg-gray-300 rounded-full w-5/6 z-[10] h-[4rem] relative">
                <EvilIcon name = "search" size = {30} className = "absolute left-[1rem] top-[1.2rem] z-[20]" />
                {keyword && <AntDesign name = "close" size = {25} className = "absolute right-4 top-[1.1rem] z-[10]" onPress={() => {
                  setKeyword("");
                  setDisplaySearchResult(false);
                }}/>}
                <TextInput
                    placeholder = "Find courses here"
                    className = "bg-gray-300 rounded-full pl-[4rem] w-full"
                    editable = {displaySearch === false ? false : true}
                    placeholderTextColor={"black"}
                    onPressIn={() => setDisplaySearch(true)}
                    onChangeText={setKeyword}
                    value = {keyword}
                    onSubmitEditing={() => searchCourseByKeyword(keyword)}
                />
            </Pressable>
            {/* filter  */}
            <Pressable className = "flex items-center justify-center p-3 bg-gray-300 rounded-full z-[10] mt-[1.2rem] relative bottom-[0.7rem]" onPress={() => setDisplaySearchFilter(true)}>
              <AntDesign name='filter' size={24}/>
            </Pressable>
        </View>

        {/* Course joined */}
        <ScrollView>
          {displaySearch === false && 
              <CourseJoined 
                courseJoined={coursesJoined}
              />
          }

          {/* suggested course */}
          {displaySearch === false && 
              <SuggestedCourse 
                  courses={allCourses}
              />
          }

          {displaySearch === true && 
            <Search 
                searchingTopics={searchingTopics}
                recentSearches={recentSearches}
                deleteSearchHistory={deleteSearchHistory}
                displaySearchResult = {displaySearchResult}
                searchedCourses={searchedCourses}
            />
          }
        </ScrollView>

        {/* search filter */}
        {displaySearchFilter === true && 
            <View className = "absolute left-0 bottom-[2rem] z-[50]">
              <SearchFilter 
                  disableSearchFilter={disableSearchFilter}
              />
            </View>
        }
      </View>

      {/* overlay */}
      {displaySearchFilter === true && 
        <Pressable className = "bg-gray-600 absolute left-0 top-0 w-full h-full z-[10] opacity-50" onPress={() => setDisplaySearchFilter(false)}></Pressable>
      }
    </View>
  )
};

export default HomePage;