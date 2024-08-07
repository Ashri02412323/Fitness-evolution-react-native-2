import { View, Text, Pressable, Image, ImageBackground } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import UserCount from '../../../assets/images/userCount.png'
import UserImage from '../../../assets/images/userIcon.png'
import ScheduleInstanc from './ScheduleInstanc'
import { router } from 'expo-router'
const TodaySchedule = () => {
  return (
    <View>
      <View className="flex flex-row items-center justify-between mb-6 mt-4">
        <Text className="text-white_87 text-xl font-inter_SemiBold ">Workout Schedules</Text>
        <Pressable onPress={()=> {
          
          router.push("/mySchedules")
          }}>
          <AntDesign name="arrowright" size={30} color="#9DA0A1" />
        </Pressable>
      </View>

      <View className="mt-0 flex flex-row justify-between items-center">
        <Pressable onPress={()=> {router.push('/AdminUsers')}}>
          <View className="relative">
          <ImageBackground 
              source={UserCount} 
              className="h-[200px] w-[100px] rounded-lg" 
              resizeMode="cover"
              style={{overflow: 'hidden'}}
              >
              {/* Add other components or content here */}
              <View className="flex-1 top-6 items-center">
                  <Image source={UserImage} className="h-12 w-12 mb-6" />
                  <Text className="text-white_87 font-cinzel_Bold text-4xl">05</Text>
                  <Text className="text-white_87 font-pop_SemiBold w-full mx-auto text-center text-sm">Users Count</Text>
              </View>
          </ImageBackground>
            
          </View>
        </Pressable>
        <View className="w-[66%] rounded-lg h-full bg-white_87 py-4 px-2">
          <ScheduleInstanc title="Upcoming" value={"05"} color={"bg-upcoming"} subtitle={"Future Schedules"} route={0} />
          <ScheduleInstanc title="Completed" value={"06"} color={"bg-completed"} subtitle={"Schedules Done"} route={1} />
          <ScheduleInstanc title="Requested" value={"07"} color={"bg-requested"} isLast={true} subtitle={"Requested by users"} route={2} />
        </View>
      </View>
    </View>
  )
}

export default TodaySchedule