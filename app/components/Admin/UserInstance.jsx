import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useGlobalContext } from '../../../contexts/GlobalProvider';
import Profile from '../../../assets/images/profilePic.png';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import AboutProfile from '../Profile/AboutProfile';

const UserInstance = ({isLast,name,gender,profile,index,age,role,email,id}) => {
    const {setDetailName,setDetailGender,setDetailRole,setDetailAge,setDetailProfile,setIsDetailVisible,setDetailEmail,setDetailId} = useGlobalContext();
    const handleOnPress = () => {
        setDetailName(name);
        setDetailAge(age);
        setDetailGender(gender);
        setDetailRole(role);
        setDetailProfile(profile);
        setIsDetailVisible(true);
        setDetailEmail(email);
        setDetailId(id);
    }
    const handleNavigate = () => {
        router.push({
            pathname: '/UserAbout',
            params: {name,gender,profile,index,age,role,email,id}
        });
    }
    const handleRedirect = () => {
        const receiver = {
          userName: name,
          id: id
        }
        const userString = encodeURIComponent(JSON.stringify(receiver));
        router.push({
          pathname: "/ChatScreen",
          params: {receiver:userString,userName:name}
        });
      }
  return (
    <Pressable onPress={handleOnPress}>
    <View className="flex flex-row space-between items-center p-2 pr-0 relative mb-4 ">
        <View className="w-[75%] flex flex-row items-center ">
            <Text className="text-white_87 font-inter_Medium text-lg mr-0 w-[30px] ">{index}.</Text>
            <View className="flex flex-row items-center ">
                {<AboutProfile sizeClass="h-12 w-12" textStyle="text-[20px]" parentStyle="" name={name} profileImg={profile} />}
                <View className="w-[70%]">
                    <Text className="text-white_87 font-dm_Medium text-base capitalize" numberOfLines={1}>{name}</Text>
                    <Text className="text-white_60 font-inter_Regular text-md w-full" numberOfLines={1}>{email}</Text>
                </View>
            </View>
        </View>
        <View className="flex flex-row w-[25%] items-center  ">
        <Pressable className="py-2 px-2 " onPress={handleRedirect}>
            <Ionicons name="chatbox-ellipses-outline" size={20} color="#01AFA8" />
        </Pressable>
        <Pressable className="py-2 px-2 " onPress={handleNavigate}>
            <MaterialCommunityIcons name="account-details-outline" size={22} color="#01AFA8" />
        </Pressable>
        </View>
        {!isLast && <View className="h-[1px] w-full bg-stroke_38 opacity-50 absolute -bottom-2" />}
    </View>
    </Pressable>
  )
}

export default UserInstance