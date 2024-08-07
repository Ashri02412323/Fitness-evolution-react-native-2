import { View, Text, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import AdmingBlogInstance from './AdmingBlogInstance';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const AdminBlog = () => {
  return (
    <View>
      <View className="flex flex-row items-center justify-between mb-6 mt-4">
        <Text className="text-white_87 text-xl font-inter_SemiBold">Your Blogs</Text>
      </View>
      <AdmingBlogInstance title={"Blogs Created"} subtitle={"These are the blogs created by you till now."} icon={<Entypo name="chevron-right" size={24} color="#01AFA8" />} buttonText={"See Your Blogs"}
      onPress={()=> router.push("/BlogDetails")}/>

      <AdmingBlogInstance title={"Create A Blog"} subtitle={"This will redirect you to sanity.io site for creating new blogs."} icon={<Ionicons name="add-circle-outline" size={24} color="#01AFA8" />} buttonText={"Create A Blog"} isCreate={true}
      onPress={()=> router.push("/BlogDetails")}
      titleIcon={<FontAwesome name="edit" size={24} color="#DFE0E1" />}
      />
    </View>
  )
}

export default AdminBlog