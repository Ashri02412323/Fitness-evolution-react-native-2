import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import ChatInstance from '../components/Chat/ChatInstance';
import { useGlobalContext } from '../../contexts/GlobalProvider';


const Chat = () => {
  const insets = useSafeAreaInsets();
  const {chatUsers} = useGlobalContext();
  
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title="Chat" />
        <ScrollView>
      <View className="flex flex-col px-2">
        {chatUsers.map((user,index) => (
          <ChatInstance key={index} 
          profile={user.profile}
          userName={user.userName}
          user={user}
          lastMessage={user.lastMessage}
          role={user.role}
          noOfMsg={user.noOfMsg}
          />
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
