import { View, TextInput, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import ScheduleHeader from './components/MySchedules/ScheduleHeader'
import { useGlobalSearchParams } from 'expo-router';

const ChatScreen = () => {
    const {userName } = useGlobalSearchParams();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title={userName} />
      <ScrollView className="flex flex-col px-2">

      </ScrollView>
      <View className="flex flex-row items-center justify-between py-4 px-2 mb-2 relative">
        <TextInput className="w-full h-12 bg-white_87 rounded-full px-4" placeholder="Type a message" />
        </View>
    </SafeAreaView>
  )
}

export default ChatScreen