import { View, Text,Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { useGlobalContext } from '../../../contexts/GlobalProvider'
import profileImg from "../../../assets/images/profilePic.png";

const ChatInstance = ({user,profile,role,userName}) => {
    const handleNavigate = (userName,user) => {
      const userString = encodeURIComponent(JSON.stringify(user));
        router.push({pathname: "/ChatScreen", params: {userName:userName,
          receiver: userString
        },
        })
    }
    const {connectedUsers,received,lastMessages} = useGlobalContext();
    // const [lastMessage, setLastMessage] = useState(null);
    const [receivedMessages, setReceivedMessages] = useState(0);
    const [userStatus, setUserStatus] = useState(false);
    const [lastMessage, setLastMessage] = useState(null);
    
    useEffect(() => {
        let isUserConnected = false;
        connectedUsers?.forEach((connectedUser) => {
            if (connectedUser === user.id) {
                isUserConnected = true;
            }
        });
        setUserStatus(isUserConnected);
    }, [connectedUsers, user.id]);

    useEffect(() => {
      const message = lastMessages.find((message) => {
        return message.senderId === user.id || message.receiverId === user.id});
      if (message) {
        setLastMessage(message);
      }
    }, [lastMessages, user.id]);

    useEffect(()=>{
      let count = 0;
      received.forEach((msg) => {
          if (msg.senderId === user.id) {
              count++;
          }
      });
      setReceivedMessages(count);
    },[received, user.id])
    return (
      <Pressable onPress={()=>{
        handleNavigate(userName,user)
      }} className="flex flex-row items-center justify-between py-4 px-2 mb-1 relative">
        <View className="flex flex-row items-center gap-x-4">
          <View className="flex flex-col items-center justify-center">
            { profile ?
            <Image source={{uri:profile}} style={{width: 50, height: 50, borderRadius: 50}}/>:
            <Image source={profileImg} style={{width: 50, height: 50, borderRadius: 50}}/>
          }
            {userStatus && <View className="absolute bottom-0 right-[1px] w-3 h-3 bg-green-500 rounded-full"/>}
          </View>
          <View className="flex flex-col gap-y-1 justify-center items-start relative bottom-1  w-[68%] ">
            <View className="flex flex-row gap-2 items-end justify-center ">
              <Text className="text-white_87 font-inter_Medium text-base">{userName}</Text>
              <View className="relative rounded w-14 h-5 flex items-center justify-center">
                <View className={`absolute top-0 left-0 rounded w-full h-full ${role === 'Admin' ? 'bg-rose-500' : 'bg-blue-500'} opacity-20`} />
                <Text className={`${role === 'Admin' ? 'text-rose-500' : 'text-blue-500'} font-inter_Medium text-[12px]`}>{role}</Text>
              </View>
            </View>
            <Text className="text-white_60 font-inter_Regular text-sm " numberOfLines={2}>{lastMessage?.message??"No messages yet"}</Text>
          </View>
        </View>
        { receivedMessages > 0 &&
        <View className="flex flex-col items-center justify-center bg-white_87 w-6 h-6 rounded-full">
          <Text className="text-black font-inter_Regular text-xs">{receivedMessages}</Text>
        </View>
        }
        {/* {A divider} */}
        <View className="h-px bg-white_38 w-full absolute bottom-0 left-2 opacity-50"></View>
      </Pressable>
    )
}

export default ChatInstance