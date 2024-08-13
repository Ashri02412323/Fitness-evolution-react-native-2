import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useGlobalContext } from '../../../contexts/GlobalProvider';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';

const ProfileDefault = ({ sizeClass, selectedImage,setSelectedImage }) => {
  const { firstLetter } = useGlobalContext();

  const pickImage = async () => {
    
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View className={`bg-lava ${sizeClass} flex-row justify-center items-center rounded-full mb-8`}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} className="w-full h-full rounded-full" />
      ) : (
        <Text className="text-white font-pop_Medium text-[120px] relative bottom-3 mt-0">
          {firstLetter ?? 'A'}
        </Text>
      )}
      <TouchableOpacity onPress={pickImage} className="absolute bottom-0 right-0 bg-white_87 p-2 rounded-full">
      <AntDesign name="camera" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileDefault;