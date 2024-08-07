import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import ScheduleHeader from '../components/MySchedules/ScheduleHeader'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BlogDetails = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="bg-primary h-full relative" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title="Blogs" />
        <ScrollView>
          <Text className="text-white">BlogDetails</Text>
        </ScrollView>
    </SafeAreaView>
  )
}

export default BlogDetails