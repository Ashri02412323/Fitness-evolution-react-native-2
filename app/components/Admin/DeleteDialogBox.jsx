import { View, Text, TextInput, Pressable, } from 'react-native'
import React from 'react'
import {  Ionicons } from '@expo/vector-icons'
import CustomButton from '../../components/CustomButton'
const DeleteDialogBox = ({
    setDeleteVisible,
    handleDeleteUser,
    fullName,
    setFullName,
    inputError,
    isDeleting
}) => {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0  z-10 flex items-center">
    <Pressable onPress={()=>setDeleteVisible(false)} className="absolute top-0 left-0 right-0 bottom-0 bg-primary z-10 opacity-40" />
    <View className={`w-[85%] rounded-xl bg-tertiary border-1 border border-white_38 mt-[40%] z-20 p-4 py-6`}>
      <View className="flex flex-row items-center w-full ">
        <Ionicons name="warning-outline" size={24} color="#FF3B30"  />
        <Text className="text-[#FF3B30] text-base ml-2 w-[90%] ">This action is irreversible</Text>
      </View>
      <Text className="text-white mt-4 text-base ">Enter user's FULLNAME to confirm your action</Text>
      <TextInput placeholder="Full Name" className="bg-white mt-3 p-2 px-4 rounded-md"
      onChangeText={(text)=>setFullName(text)}
      value={fullName}
       />
       {inputError && inputError?.trim() && <Text className="text-red mt-2 text-sm ">{inputError}</Text>}
      <View className="mt-6 flex flex-row items-center justify-center">
        <CustomButton title="Cancel" handlePress={()=>setDeleteVisible(false)} customStyle={"px-4 border border-red border-[0.5px] mx-0 mr-3 min-h-[35px]"} textStyle={"text-base text-red mx-0"}
        />
        <CustomButton title="Delete" handlePress={handleDeleteUser} customStyle={"px-4 bg-rose-600 mx-0 min-h-[35px]"} textStyle={"text-base text-white mx-0"}
        isLoading={isDeleting}/>
      </View>
    </View>
  </View>
  )
}

export default DeleteDialogBox