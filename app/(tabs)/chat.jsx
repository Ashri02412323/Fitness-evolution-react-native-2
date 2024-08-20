import { View, Text, SafeAreaView, Image, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import ChatInstance from '../components/Chat/ChatInstance';
import { useGlobalContext } from '../../contexts/GlobalProvider';
import { useScheduleContext } from '../../contexts/ScheduleProvider';


const Chat = () => {
  const insets = useSafeAreaInsets();
  const {chatUsers,isChatUsersLoading} = useGlobalContext();
  const {chatsRefresh, setChatsRefresh} = useScheduleContext();
  const onRefresh = () => {
    setChatsRefresh(true);
  }
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title="Chat" />
        <ScrollView 
        refreshControl={
          <RefreshControl refreshing={chatsRefresh} onRefresh={onRefresh} />
        }>
      <View className="flex flex-col px-2">
          {isChatUsersLoading&&<Text className="text-white text-lg text-center">Loading...</Text>}
        {!isChatUsersLoading && chatUsers.map((user,index) => {
          if(!user || !user.userName){
            return null;
          }

         return <ChatInstance key={index} 
          profile={user.profile}
          userName={user.userName}
          user={user}
          lastMessage={user.lastMessage}
          role={user.role}
          noOfMsg={user.noOfMsg}
          />
        })}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
