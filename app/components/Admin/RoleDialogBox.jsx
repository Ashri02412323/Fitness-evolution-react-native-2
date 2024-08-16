import { View, Text, TextInput, Pressable, } from 'react-native'
import React, { useMemo } from 'react'
import {  Ionicons, MaterialIcons } from '@expo/vector-icons'
import CustomButton from '../../components/CustomButton'
import PickerInstance from '../AddSchedules/PickerInstance'
const RoleDialogBox = ({
    setRoleVisible,
    handleRoleChange,
    role,
    setRole,
    isChangingRole
}) => {
    const roleTemp= useMemo(()=>role,[]);
    const handleCancel = () => {
        setRoleVisible(false);
        setRole(roleTemp);
    }
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0  z-10 flex items-center">
    <Pressable onPress={()=>setRoleVisible(false)} className="absolute top-0 left-0 right-0 bottom-0 bg-primary z-10 opacity-40" />
    <View className={`w-[85%] rounded-xl bg-tertiary border-1 border border-white_38 mt-[40%] z-20 p-4 py-6`}>
      <View className="flex flex-row items-center w-full ">
        <MaterialIcons name="published-with-changes" size={22} color="#01AFA8" />
        <Text className=" text-white_87 text-base ml-2 w-[90%] ">Changing User Role</Text>
      </View>
      {/* <Text className="text-white mt-4 text-base ">Select User Role to change</Text> */}
        <PickerInstance selectedUser={role} onUserChange={setRole} title={"Select Role to Change"}
        userNames={['admin','trainer','user']}
        itemNotObj={true}
        />
      <View className="mt-6 flex flex-row items-center justify-center">
        <CustomButton title="Cancel" handlePress={handleCancel} customStyle={"px-4 mx-0 mr-3 min-h-[35px]"} textStyle={"text-mint-87 text-base mx-0"}
        />
        <CustomButton title="Change Role" handlePress={handleRoleChange} customStyle={"px-4 bg-mint_87 mx-0 min-h-[35px] "} textStyle={"text-base text-white mx-0 text-mint-87 "}
        isLoading={isChangingRole}/>
      </View>
    </View>
  </View>
  )
}

export default RoleDialogBox