import { View, Text, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import CreateNew from '../../../assets/images/CreateNew.png';
const CreateBlogCard = () => {
  return (
    <View className="mx-0 mb-2 mt-6">
    <ImageBackground source={CreateNew} className="w-full h-[130px] rounded-lg overflow-hidden flex" imageStyle={{borderRadius: 8}}>
    <View className="py-3 px-4 flex flex-col justify-between items-center h-full rounded-md ">
      <View className="flex flex-col items-start justify-center w-full ">
        <Text className="text-white_87 font-dm_SemiBold text-lg">Create New Blog</Text>
        <Text className="text-white_87 font-inter_Regular text-base">You will be redirected to sanity.io site.</Text>
      </View>
      <View className="w-full flex flex-row items-center justify-end">
                <Pressable onPress={()=> router.push("/BlogDetails")}>
                    <View className="bg-white_87 self-end py-2 px-3 flex flex-row rounded-md items-center">
                        <Text className="text-mint-87 font-pop_SemiBold text-xs mr-2 ">Create New Blog</Text>
                        <Ionicons name="add-circle-outline" size={20} color="#01AFA8" />
                    </View>
                </Pressable>
            </View>
      </View>
    </ImageBackground>
    </View>
  )
}

export default CreateBlogCard