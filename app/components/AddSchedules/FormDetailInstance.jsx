import { View, Text, TextInput } from 'react-native';
import React from 'react';

const FormDetailInstance = ({ title, placeholder, value, setValue, isTextArea, showError = true, error }) => {
  return (
    <View className="mt-4">
      <Text className="text-white_60 font-pop_Regular mb-2">{title}</Text>
      {isTextArea ? (
        <TextInput
          className="border rounded p-2 px-4 bg-white_87 text-black font_inter_Regular"
          placeholder={placeholder}
          value={value}
          multiline={true}
          numberOfLines={6}
          onChangeText={(text) => setValue(text)}
          style={{ textAlignVertical: 'top' }}
          placeholderTextColor={"#9DA0A1"}
        />
      ) : (
        <TextInput
          className="border rounded p-2 px-4 bg-white_87 text-black font_inter_Regular"
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => setValue(text)}
          placeholderTextColor={"#9DA0A1"}
        />
      )}
      {showError && error && (
        <Text className="text-red-500 mt-1">{error}</Text>
      )}
    </View>
  );
};

export default FormDetailInstance;