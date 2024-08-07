import { View, Text } from 'react-native'
import React from 'react'

const UserDetailInstance = ({title,value}) => {
  return (
    <View className="flex flex-row items-center mb-2">
        <Text className="text-white_60 font-inter_Medium  mr-4 w-[60px]">{title}</Text>
        <Text className={`${value?.trim() ?"text-white_87":"text-white_60"} font-inter_Medium `}>{value ?? "Not defined"}</Text>
    </View>
  )
}

export default UserDetailInstance