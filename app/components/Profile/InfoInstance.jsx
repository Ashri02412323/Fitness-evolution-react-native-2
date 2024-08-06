import { View, Text } from 'react-native'
import React from 'react'

const InfoInstance = ({title,value,isLast}) => {
  return (
    <View className="flex flex-row justify-between items-center lative w-full " style={{
        paddingBottom:18,
        paddingTop:18,
    }}>
        <Text className="text-white_87 text-base font-inter_Regular">{title}</Text>
        <Text className="text-white_87 text-base font-inter_Regular text-right">{value}</Text>
        {!isLast && <View className="absolute h-px bg-white_38 w-full my-4" style={{
            top: '170%',
        }}></View>}
    </View>
  )
}

export default InfoInstance