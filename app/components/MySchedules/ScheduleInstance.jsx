import { View, Text, Image, Pressable, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import profile from '../../../assets/images/profilePic.png';
import { router } from 'expo-router';
import { Toast } from 'toastify-react-native';
import * as Clipboard from 'expo-clipboard';
import ProfileDefault from '../Profile/ProfileDefault';
import { useGlobalContext } from '../../../contexts/GlobalProvider';

const handleNavigate = (title, date, time, link, userName, noLink, profileImg, descr, isUser, isProfileLink, status, id, startTime, endTime, userId, rawDate, affectedArea) => {
    router.push({ pathname: "/ScheduleDetail", params: { title, date, time, link, userName, noLink, profileImg, descr, isUser, isProfileLink, status, id, startTime, endTime, userId, rawDate, affectedArea } });
};

const ScheduleInstance = ({ title, date, time, link, userName, noLink, profileImg, descr, isUser, status, id, startTime, endTime, userId, rawDate, affectedArea }) => {
    const handlePress = () => {
      console.log("profileImg: ", profileImg);
        handleNavigate(title, date, time, link, userName, noLink, profileImg, descr, isUser, profileImg ? true : false, status, id, startTime, endTime, userId, rawDate, affectedArea);
    };

    const handleLinkPress = async () => {
      if (link) {
        try {
          Linking.openURL(link);
        } catch (error) {
          Toast.warn('Uh oh! Looks like an error occurred while opening the url', 'top');
        }
      }
    };

    const handleLinkLongPress = async () => {
      if (link) {
        await Clipboard.setStringAsync(link);
        Toast.success('Link copied to clipboard', 'top');
      }
    };
const {user} = useGlobalContext();
    return (
        <Pressable onPress={handlePress} className="flex flex-row bg-secondary w-full items-center justify-start p-2 pl-0 rounded-lg mb-2">
            <View className="w-[30%] flex items-center justify-center ">
                {profileImg ? <Image source={{ uri: profileImg }} className="h-16 w-16 rounded-full" /> :
                <ProfileDefault sizeClass="h-16 w-16" textStyle="text-[30px] mt-5" parentStyle="mb-0" userName={user?.role ==='admin'?user?.fullName: userName} isDefault={false} />
                }
            </View>
            <View className="flex flex-col gap-y-[4px] w-[70%]">
                <Text className="text-white_87 font-dm_Medium text-base capitalize" numberOfLines={1}>{title}</Text>
                <View className="flex flex-col gap-y-[2px]">
                    <Text className="text-white_60 font-inter_Regular text-md">{date}, {time}</Text>
                    {!noLink && (
                        <TouchableOpacity onPress={handleLinkPress} onLongPress={handleLinkLongPress}>
                            <Text className="text-blue-500 font-inter_Regular text-md" numberOfLines={1} style={{ flexShrink: 1 }}>
                                {link}
                            </Text>
                        </TouchableOpacity>
                    )}
                    <Text className="text-white_38 font-inter_Regular text-sm">{isUser ? "Trainer: " : "User: "}{userName}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ScheduleInstance;