import { View, Text } from 'react-native'
import React from 'react'

const UserDetailInstance = ({ title, value }) => {
  const trimmedValue = typeof value === 'string' ? value.trim() : '';

  return (
    <View className="flex flex-row items-center mb-2">
      <Text className="text-white_60 font-inter_Medium mr-4 w-[50px]">{title}</Text>
      <Text className={`${trimmedValue ? "text-white_87" : "text-white_60"} font-inter_Medium w-[70%]`}>
        {value ?? "Not defined"}
      </Text>
    </View>
  );
}

export default UserDetailInstance;