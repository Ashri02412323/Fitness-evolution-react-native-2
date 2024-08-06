import { View, Text } from 'react-native'
import React from 'react'

const DetailInstance = ({title,value,isLast,isLink}) => {
  return (
    <View>
        <View className="flex flex-col gap-y-2">
            <Text className="text-white_87 font-inter_Medium text-md">{title}</Text>
            <Text className={`${isLink ? "text-blue-500":"text-white_60"} font-inter_Regular text-md`}>{value}</Text>
        </View>
        {!isLast && <View className="h-px bg-white_38 my-4"></View>}
    </View>
  )
}

export default DetailInstance