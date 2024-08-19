import { View, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView} from 'react-native-safe-area-context'
import ScheduleHeader from '../components/MySchedules/ScheduleHeader'
import { router, useGlobalSearchParams } from 'expo-router'
import AboutProfile from '../components/Profile/AboutProfile'
import UserSettings from '../components/Admin/UserSettings'
import {  Ionicons, MaterialIcons } from '@expo/vector-icons'
import UserAboutDetail from '../components/Admin/UserAboutDetail'
import UserAboutAnalysis from '../components/Admin/UserAboutAnalysis'
import { useGlobalContext } from '../../contexts/GlobalProvider'
import { deleteUser, updateRole } from '../../lib/Users/User'
import DeleteDialogBox from '../components/Admin/DeleteDialogBox'
import RoleDialogBox from '../components/Admin/RoleDialogBox'



const UserAbout = () => {
const {name,gender,profile,age,role,email,id} = useGlobalSearchParams();
const [fullName,setFullName] = useState('');
const {token,setAllUsers} = useGlobalContext();
const [deleteVisible,setDeleteVisible] = useState(false);
const [inputError,setInputError] = useState(false);
const [isDeleting,setIsDeleting] = useState(false);
const [roleVisible,setRoleVisible] = useState(false);
const [roleTemp,setRoleTemp] = useState(role);
const [confirmRole,setConfirmRole] = useState(role);
const [isChangingRole,setIsChangingRole] = useState(false);
const handleDeleteUser = async() => {
  if (!fullName) {
    setInputError('Full Name is required');
    return;
  }

  if (fullName.trim() !== name) {
    setInputError('Full Name does not match');
    return;
  }
  try {
    setIsDeleting(true);
    const response = await deleteUser(token,id);
    if(response){
      setAllUsers((prev)=>prev.filter((user)=>user._id!==id));
      setIsDeleting(false);
      setDeleteVisible(false);
      router.push('/AdminUsers');
    }  
  } catch (error) {
    console.log(error);
  }
}
const handleRedirect = () => {
  const receiver = {
    userName: name,
    id: id
  }
  const userString = encodeURIComponent(JSON.stringify(receiver));
  console.log("Receiver: ",receiver);
  router.push({
    pathname: "/ChatScreen",
    params: {receiver:userString,userName:name}
  });
}
const handleRoleChange = async() => {

  // setConfirmRole(roleTemp);
  // setRoleVisible(false);
  try {
    setIsChangingRole(true);
    const response = await updateRole(token,id,roleTemp);
    if(response){
      setConfirmRole(roleTemp);
      setRoleVisible(false);
    }
  } catch (error) { 
    console.log("Error while changing role: ",error);
  }finally{
    setIsChangingRole(false);
  }

}
  return (
    <SafeAreaView className=" bg-primary h-full relative">
      <ScheduleHeader title={name}  isIconVisible={false}/>
      <ScrollView className="w-full px-0 mt-0 bg-primary relative z-10">
        { deleteVisible &&
          <DeleteDialogBox setDeleteVisible={setDeleteVisible} handleDeleteUser={handleDeleteUser} fullName={fullName} setFullName={setFullName} inputError={inputError} isDeleting={isDeleting} />
          }
          { roleVisible &&
          <RoleDialogBox setRoleVisible={setRoleVisible} handleRoleChange={handleRoleChange} role={roleTemp} setRole={setRoleTemp} isChangingRole={isChangingRole} />
          }
        <View className=" h-[225px] w-full px-2 flex flex-col items-center ">
          <View className="absolute -top-2 -left-2 -right-2 h-full bg-primary rounded-b-[50px] border-mint-87 border-[1px]" />
          <AboutProfile sizeClass="h-[150px] w-[150px]" textStyle="text-[100px] -bottom-1" parentStyle="" name={name} profileImg={profile} />

          <View className="flex flex-row items-center justify-around w-full mt-2">
            <UserSettings title={"Roles"}
            icon={<MaterialIcons name="published-with-changes" size={22} color="#01AFA8" />} onPress={()=>setRoleVisible(true)}
            />
            <UserSettings title={"Chat"}
            icon={<Ionicons name="chatbox-ellipses-outline" size={22} color="#01AFA8" />} onPress={handleRedirect}
            />
            <UserSettings title={"Delete"}
            icon={<Ionicons name="warning-outline" size={22} color="#FF3B30" />} onPress={()=>setDeleteVisible(true)}  isRed={true} isLast={true}
            />
          </View>
        </View>
        <UserAboutDetail name={name} role={confirmRole} age={age} gender={gender} email={email}/>
        <UserAboutAnalysis id={id} />
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserAbout