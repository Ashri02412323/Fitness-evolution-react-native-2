import { View, Text, Image } from 'react-native'
import React from 'react'

const AboutProfile = ({sizeClass,textStyle, parentStyle,name,profileImg}) => {
    const extractFirstLetter = (name) => {
        return name.charAt(0).toUpperCase();
      }
    const firstLetter = extractFirstLetter(name);

  return (
    <View className={`bg-lava ${sizeClass} flex-row justify-center items-center mr-3 rounded-full ${parentStyle}`}>
      {profileImg ? <Image source={{uri:profileImg}} className="w-full h-full rounded-full" /> : 
        <Text className={`text-white font-pop_Medium text-[120px] relative -bottom-[2px] mt-0 ${textStyle}`}>{firstLetter ?? 'A'}
        </Text>
        }
    </View>
  )
}

export default AboutProfile