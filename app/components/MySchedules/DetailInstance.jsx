import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import {Toast} from 'toastify-react-native';

const DetailInstance = ({ title, value, isLast, isLink }) => {
  const handleLinkPress = async () => {
    if (value) {
        try {
            const supported = await Linking.canOpenURL(value);
            if (supported) {
                Linking.openURL(value);
            } else {
                Toast.warn( 'Uh oh! Looks like this url does not exist', 'top');
            }
        } catch (error) {
          Toast.warn( 'Uh oh! Looks like an error occured while opening the url', 'top');
        }
    }
};

  return (
    <View>
      <View className="flex flex-col gap-y-2">
        <Text className="text-white_87 font-inter_Medium text-md">{title}</Text>
        {isLink ? (
          <TouchableOpacity onPress={handleLinkPress}>
            <Text className="text-blue-500 font-inter_Regular text-md">
              {value?.trim() ? value : 'Not defined'}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text className="text-white_60 font-inter_Regular text-md">
            {value?.trim() ? value : 'Not defined'}
          </Text>
        )}
      </View>
      {!isLast && <View className="h-px bg-white_38 my-4"></View>}
    </View>
  );
};

export default DetailInstance;