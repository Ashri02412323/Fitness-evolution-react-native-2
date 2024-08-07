import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useGlobalContext } from '../../../contexts/GlobalProvider';

const ScheduleInstanc = ({title, color, value,subtitle, isLast,route}) => {
  const {setIndex} = useGlobalContext();
  return (
    <Pressable onPress={()=> {
      setIndex(route??0)
      router.push('/mySchedules')
      }}>
    <View className={`flex flex-row items-center justify-between ${!isLast && "mb-4"} px-2`}>
      <View className="flex flex-row items-center w-[80%]">
        <View className={`h-[40px] w-[3px] ${color} rounded-full mr-2`} />
        <View>
            <Text className=" text-primary opacity-70 font-pop_SemiBold text-base">{title}</Text>
            <Text className="text-white_60 font-inter_Medium text-sm">{subtitle??"This is a subtitle"}</Text>
        </View>
      </View>
      <Text className="text-white_38 font-pop_SemiBold text-lg w-[20%]  text-right">{value}</Text>
    </View>
    </Pressable>
  )
}

export default ScheduleInstanc