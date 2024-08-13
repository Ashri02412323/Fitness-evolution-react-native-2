import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useGlobalContext } from '../../../contexts/GlobalProvider';
import Profile from '../../../assets/images/profilePic.png';

const UserInstance = ({isLast,name,gender,profile,index,age,role}) => {
    const {setDetailName,setDetailGender,setDetailRole,setDetailAge,setDetailProfile,setIsDetailVisible} = useGlobalContext();
    const handleOnPress = () => {
        setDetailName(name);
        setDetailAge(age);
        setDetailGender(gender);
        setDetailRole(role);
        setDetailProfile(profile);
        setIsDetailVisible(true);
    }
  return (
    <Pressable onPress={handleOnPress}>
    <View className="flex flex-row space-between items-center p-2 relative mb-4 ">
        <View className="w-[75%] flex flex-row items-center ">
            <Text className="text-white_87 font-inter_Medium text-lg mr-4">{index}.</Text>
            <View className="flex flex-row items-center">
                {profile ? <Image source={{uri:profile}} className="h-12 w-12 mr-3 rounded-full" /> : <Image source={Profile} className="h-12 w-12 mr-3 rounded-full" />}
                <View>
                    <Text className="text-white_87 font-dm_Medium text-base capitalize" numberOfLines={1}>{name}</Text>
                    <Text className="text-white_60 font-inter_Regular text-md">{gender}</Text>
                </View>
            </View>
        </View>
        <View className="flex flex-row w-[25%] items-center justify-evenly ">
        <Pressable className="py-2 px-2">
            <Ionicons name="chatbox-ellipses-outline" size={22} color="#01AFA8" />
        </Pressable>
        <Pressable className="py-2 px-2">
            <FontAwesome6 name="edit" size={20} color="#01AFA8" />
        </Pressable>
        </View>
        {!isLast && <View className="h-[1px] w-full bg-stroke_38 opacity-50 absolute -bottom-2" />}
    </View>
    </Pressable>
  )
}

export default UserInstance