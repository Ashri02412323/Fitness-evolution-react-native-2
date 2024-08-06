import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MessageInstance = () => {
  const insets = useSafeAreaInsets();
  return (
    <View>
      <Text>MessageInstance</Text>
    </View>
  )
}

export default MessageInstance