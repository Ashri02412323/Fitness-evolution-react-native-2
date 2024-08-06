import { View, Text } from 'react-native'
import React from 'react'

const MessageInstance = ({ message }) => {
  return (
    <View className="self-end bg-mint-87 py-3 px-4 rounded-md mb-1 min-w-[20px] max-w-[90%]" >
      <Text className="text-white font-inter_Regular">{message}</Text>
    </View>
  );
};
export default MessageInstance