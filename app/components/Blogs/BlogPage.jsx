import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useGlobalSearchParams } from 'expo-router'
import ScheduleHeader from '../../components/MySchedules/ScheduleHeader';

const BlogPage = () => {
    const {title,bg} = useGlobalSearchParams();

  return (
    <SafeAreaView className="bg-primary h-full relative" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title="Blog Page" />
        <ScrollView className="px-4">
            <Text className="text-white">{title}</Text>
        </ScrollView>
    </SafeAreaView>
  )
}

export default BlogPage