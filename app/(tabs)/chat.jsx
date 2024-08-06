import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { logoutUser } from '../../lib/Users/User';
import CustomButton from '../components/CustomButton';

const Chat = () => {
  const insets = useSafeAreaInsets();
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <Text className="text-white">Chat</Text>
      <CustomButton title="Logout" handlePress={handleLogout} />
    </SafeAreaView>
  );
};

export default Chat;
