import { View, TextInput, SafeAreaView, ScrollView, Text, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import { useGlobalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../contexts/GlobalProvider';
import MessageInstance from '../components/Chat/MessageInstance';

const ChatScreen = () => {
  const { user } = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const [msg, setMsg] = React.useState("");
  const { chats, setChats } = useGlobalContext();

  useEffect(() => {
    console.log("chats: ", chats);
  }, [chats]);

  const sendMessage = () => {
    setChats([...chats, msg]);
    setMsg(""); // Clear the input after sending the message
  };

  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title={user} />
      <ScrollView className="flex flex-col px-2">
        {/* showing end to end msg */}
        <Text className="text-white_60 font-inter_Regular text-sm w-1/2 mx-auto text-center">
          Our chats are end-to-end encrypted
        </Text>
        <View className="flex flex-col mt-4">
          {chats.map((chat, index) => (
            <MessageInstance key={index} message={chat} />
          ))}
        </View>
      </ScrollView>
      <View className="flex flex-row items-center gap-x-2 py-4 px-2 mb-2 relative">
        <TextInput
          className="w-[87%] h-12 bg-white_87 rounded-lg text-black px-4"
          placeholder="Type a message"
          value={msg}
          onChangeText={(text) => setMsg(text)} // Use onChangeText to get the text value
        />
        <Pressable onPress={sendMessage}>
          <Ionicons name="send" size={26} color="#00C7BE" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
