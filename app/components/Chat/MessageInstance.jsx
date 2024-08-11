import { View, Text } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const textStyle = (status) => {
  switch (status) {
    case 'pending':
      return <AntDesign name="clockcircleo" size={12} color="#DFE0E1" style={{
        marginRight: 1,
        marginTop: 1
      }} />;
    case 'sent':
      return <MaterialIcons name="done" size={14} color="#DFE0E1" style={{ marginRight: 1 }} />;
    case 'delivered':
      return <Ionicons name="checkmark-done" size={14} color="#DFE0E1" style={{ marginRight: 1 }} />;
    case 'read':
      return <Ionicons name="checkmark-done" size={14} color="#1F67FF" style={{ marginRight: 1 }} />;
    default:
      return <Text className="text-white_60">...</Text>;
  }
}

const MessageInstance = ({ msg, user, onRead }) => {
  const memoizedOnRead = useCallback(onRead, [onRead]);

  useEffect(() => {
    if (msg.senderId !== user._id && msg.status !== 'read') {
      memoizedOnRead(msg);
    }
  }, [msg, user, memoizedOnRead]);

  const isSender = msg.senderId === user?._id;
  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };
  return (
    <View className={`px-4 py-2 rounded-md mb-3 min-w-[20px] max-w-[90%] ${isSender ? 'self-end bg-lava' : 'self-start bg-[#4E4C4C]'}`}>
      <Text className="text-white_60 text-xs mb-1">{isSender ? 'You' : msg.senderName}</Text>
      <Text className="text-white font-inter_Regular">
        {msg?.message}
      </Text>
      
        <View className={`mt-2 self-end flex flex-row items-center`}>
          <Text className="text-white_60 text-xs mr-2">{formatTime(msg.timeStamp)}</Text>
          {isSender && textStyle(msg.status)}
        </View>
    </View>
  );
};

export default MessageInstance;