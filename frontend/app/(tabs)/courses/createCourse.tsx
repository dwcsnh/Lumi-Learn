import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { GetAllTopics } from '@/api/topicApi';
import { PillSelection } from '@/components/PillsSelection/PillSelection';
import { createCourse } from '@/api/courseApi';

type ReactNativeFile = {
  uri: string;
  name: string;
  type: string;
};

const CreateCoursePage = () => {
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [topicError, setTopicError] = useState(false);

  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');
  const [topicErrorMessage, setTopicErrorMessage] = useState('');

  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [thumbnailInput, setThumbnailInput] = useState<ReactNativeFile | null>(null);
  const [thumbnailUri, setThumbnailUri] = useState<string | null>(null);

  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const router = useRouter();

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: false,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) return;

    const selectedAsset = result.assets[0];
    const uri = selectedAsset.uri;
    setThumbnailUri(uri);

    const fileName = selectedAsset.fileName || uri.split('/').pop() || 'thumbnail.jpg';
    const ext = fileName.split('.').pop()?.toLowerCase() || 'jpg';
    const mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;

    const file: ReactNativeFile = {
      uri,
      name: fileName,
      type: mimeType,
    };

    setThumbnailInput(file);
  };

  const handleCreateCourse = () => {
    let valid = true;

    if (!titleInput.trim()) {
      setTitleError(true);
      setTitleErrorMessage('Title is required.');
      valid = false;
    }

    if (!descriptionInput.trim()) {
      setDescriptionError(true);
      setDescriptionErrorMessage('Description is required.');
      valid = false;
    }

    if (selectedTopics.length === 0) {
      setTopicError(true);
      setTopicErrorMessage('Please choose a topic');
      valid = false;
    }

    if (!valid) return;

    const formData = new FormData();
    formData.append('Title', titleInput);
    formData.append('Description', descriptionInput);
    formData.append('Topic', selectedTopics[0]);

    if (thumbnailInput) {
      formData.append('Thumbnail', {
        uri: thumbnailInput.uri,
        name: thumbnailInput.name,
        type: thumbnailInput.type,
      } as any);
    }

    createCourse(formData)
      .then((res) => {
        const courseId = res.data.id;
        router.push(`/(tabs)/courses/${courseId}`);
      })
      .catch((err) => {
        console.log('Error creating course: ', err.response?.data || err.message);
      });
  };

  useEffect(() => {
    GetAllTopics().then((res) => {
      const data = res.data;
      const names = data.map((topic: any) => topic.name);
      setTopics(names);
    });
  }, []);

  return (
    <View className="flex-col flex-1 items-center justify-center px-6">
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false} className="w-full">
        <View className="w-full flex-col items-center justify-center">
          <TouchableOpacity onPress={handleImagePicker}>
            <View className="w-32 h-32 items-center justify-center rounded-xl bg-gray-300 mb-6 mt-20">
              {thumbnailUri ? (
                <Image
                  source={{ uri: thumbnailUri }}
                  style={{ width: '100%', height: '100%', borderRadius: 8 }}
                />
              ) : (
                <Text className="text-center">Select Thumbnail</Text>
              )}
            </View>
          </TouchableOpacity>

          <View className="w-full flex-col items-center justify-center gap-6">
            <View className="w-full">
              <Text className={`text-sm ml-1 mb-2 ${titleError ? 'text-red-600' : 'text-slate-700'}`}>
                Course title
              </Text>
              <TextInput
                placeholder="Enter course title"
                placeholderTextColor="#9CA3AF"
                className={`w-full p-4 rounded-xl text-3xl font-semibold bg-transparent border-b-2 ${
                  titleError ? 'border-red-500' : 'border-gray-400'
                }`}
                style={{ textAlignVertical: 'center' }}
                value={titleInput}
                onChangeText={(text) => {
                  setTitleInput(text);
                  setTitleError(false);
                }}
              />
              {titleError && (
                <Text className="text-sm ml-1 mt-2 mb-2 text-red-600">{titleErrorMessage}</Text>
              )}
            </View>

            <View className="w-full">
              <Text
                className={`text-sm ml-1 mb-2 ${
                  descriptionError ? 'text-red-600' : 'text-slate-700'
                }`}
              >
                Course description
              </Text>
              <TextInput
                placeholder="Enter course description"
                placeholderTextColor="#9CA3AF"
                className={`w-full p-4 rounded-xl text-xl font-normal bg-transparent border-b-2 ${
                  descriptionError ? 'border-red-500' : 'border-gray-400'
                }`}
                style={{ textAlignVertical: 'center' }}
                value={descriptionInput}
                onChangeText={(text) => {
                  setDescriptionInput(text);
                  setDescriptionError(false);
                }}
              />
              {descriptionError && (
                <Text className="text-sm ml-1 mt-2 mb-2 text-red-600">{descriptionErrorMessage}</Text>
              )}
            </View>

            <View className="w-full">
              <Text className={`text-sm ml-1 mb-2 ${topicError ? 'text-red-600' : 'text-slate-700'}`}>
                Choose a topic for your course
              </Text>
              <PillSelection
                values={topics}
                selected={selectedTopics}
                setSelected={setSelectedTopics}
                multiSelect={false}
                wrap={true}
              />
              {topicError && (
                <Text className="text-sm ml-1 mt-2 mb-2 text-red-600">{topicErrorMessage}</Text>
              )}
            </View>

            <TouchableOpacity
              className="bg-gray-400 py-5 rounded-xl items-center w-full"
              onPress={handleCreateCourse}
              activeOpacity={0.6}
            >
              <Text className="text-white font-semibold">Create course</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-200 border border-black py-5 rounded-xl items-center w-full"
              onPress={() => router.back()}
              activeOpacity={0.6}
            >
              <Text className="text-gray-700">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateCoursePage;
