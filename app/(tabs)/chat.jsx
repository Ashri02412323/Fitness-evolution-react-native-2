import { View, Text, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import profile from '../../assets/images/profilePic.png';
import profile2 from '../../assets/images/swimming.png';

import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import ChatInstance from '../components/Chat/ChatInstance';


const Chat = () => {
  const insets = useSafeAreaInsets();
  const twoUsers = [
    {
      user : "John Doe",
      lastMessage : "Hello, how are you?",
      profile : profile,
      role : "User",
      noOfMsg : 3
    },
    {
      user : "Rampo walka vala",
      lastMessage : "Heya Buddy! Let's hit the gym",
      profile : profile2,
      role : "Admin",
      noOfMsg : 2
    }]
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title="Chat" />
      <View className="flex flex-col px-2">
        {twoUsers.map((user,index) => (
          <ChatInstance key={index} {...user}/>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Chat;
