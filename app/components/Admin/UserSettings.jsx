import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const UserSettings = ({title,icon,onPress,isRed,isLast}) => {
  return (
    <TouchableOpacity onPress={onPress} className="">
        <View className={`flex flex-row p-2 items-center px-12 relative`}>
            <View className="p-2 pr-2 pl-0">
                {icon}
            </View>
            <Text className={`${isRed?"text-[#FF3B30]":"text-mint-87"} font-inter_Regular text-lg`}>{title}</Text>
            {!isLast && <View className="h-[70%] w-[1px] bg-mint-87 opacity-50 absolute -right-1 " />}
        </View>
    </TouchableOpacity>
  )
}

export default UserSettings