import { useEffect, useState } from "react";
import { View, TextInput, Image, Pressable, Text } from "react-native";
import eye_hide from "../../assets/images/eye-hide.png";
import eye from "../../assets/images/eye.png";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  icon,
  iconType,
  validationError,
  isPassword,
  keyboardType,
  noMargin,
  parentStyle,
  isNumber,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
 
  return (
    <View className={`w-full`}>
      { title &&
      <Text className="text-base text-white_87 mb-2">{title}</Text>
      }
      <View className={`w-full bg-white_87 rounded-md border-2 border-black-200 focus:border-secondary flex flex-row items-center ${parentStyle}`}>
        {icon && iconType === 'fontAwesome'? 
        <View className="ml-3">
            <FontAwesome5 name={icon} size={22} color="#0B1215"/>
        </View>
        :
        <MaterialIcons name={icon} size={24} color="#0B1215" style={{
            marginLeft: 10,
        }} /> }
        <TextInput
          className={`flex-1 px-2 text-black font-psemibold text-base m-0 focus:outline-none focus:border-none font-inter_Regular relative ${!noMargin &&"-left-2 -top-2 pb-0 py-2"} ${otherStyles}`}
          value={isNumber ? value?.toString() : value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={isPassword && !showPassword}
          {...props}
          keyboardType={keyboardType?keyboardType:'default'}
        />

        {isPassword && (
          <Pressable onPress={() => setShowPassword(!showPassword)} className="h-[50px] w-[56px] flex items-center justify-center">
            <Image
              source={!showPassword ?  eye_hide: eye}
              className="w-14 h-6"
              resizeMode="contain"
            />
          </Pressable>
        )}
      </View>
      {validationError && (
        <Text className="text-rose-500 text-xs mt-1">{validationError}</Text>
      )}
    </View>
  );
};

export default FormField;
