import { View, Text, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import BlogsBg from '../../../assets/images/BlogsBg.png'

const AdmingBlogInstance = ({title,subtitle,isCreate,icon,onPress,buttonText,titleIcon}) => {
  return (
    <ImageBackground source={BlogsBg} className="w-full h-[180px] rounded-lg overflow-hidden mb-4">
    <View className="p-4 flex flex-col justify-between h-full">
        <View className="flex flex-row justify-between items-end">
            <View className="flex flex-col items-start w-[65%] ">
                <View className="flex flex-row items-center mb-2">
                    <Text className="text-xl text-white_87 font-pop_SemiBold mr-3">{title}</Text>
                    {titleIcon ? titleIcon :
                    <MaterialIcons name="article" size={28} color="#DFE0E1" />
                    }
                </View>
                <Text className="text-base text-white_87 font-inter_Medium">{subtitle}</Text>
            </View>
            <Text className={`text-[50px] font-cinzel_Bold text-white_87 w-[25%] text-center ${isCreate && "hidden"}`}>
                14
            </Text>
        </View>
        <View className="w-full flex flex-row items-center justify-end ">
            <Pressable onPress={onPress}>
                <View className="bg-white_87 self-end py-1.5 px-3 flex flex-row rounded-md items-center">
                    <Text className="text-mint-87 font-pop_SemiBold text-sm mr-2 ">{buttonText}</Text>
                    {icon}
                </View>
            </Pressable>
        </View>
    </View>
  </ImageBackground>
  )
}

export default AdmingBlogInstance