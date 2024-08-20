import { View, Text, TextInput } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import FormDetailInstance from './FormDetailInstance';

import { useFormContext } from '../../../contexts/FormProivder';
import CustomButton from '../CustomButton';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useGlobalContext } from '../../../contexts/GlobalProvider';
import PickerInstance from './PickerInstance';


const ScheduleDetails = ({ values, touched, errors, handleNext, handleBack }) => {
  const { subject, setSubject, description, setDescription, userName, setUserName, link, setLink ,setUserId,selectedUser, setSelectedUser,selectedArea,setSelectedArea,submitStatus} = useFormContext();
  const {allUsers} = useGlobalContext();
  const [userNames, setUserNames] = useState([]);
  const painAreas = useMemo(() => {
        return [
        "Yoga",
      "Strength and conditioning",
      "Fat loss / weight loss",
      "Homebased body weight workout",
      "CrossFit",
      "High intensity interval training",
      "Kettlebell workout",
      "Fitness kickboxing"
    ];
  }, []);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const {user} = useGlobalContext();
  useEffect(() => {
    let userNamesTemp = [];
    allUsers.map((user)=>{
        let obj = {
          fullName:user.fullName,
          id:user._id
        }
        userNamesTemp.push(obj);
    })
    setUserNames(userNamesTemp);
  }, [allUsers]);

useEffect(()=>{
  if(user?.role === 'user'){
  setUserId(user._id);
}
},[])
useEffect(()=>{
  if(user?.role === 'admin'){
  setUserName(selectedUser?.fullName);
  setUserId(selectedUser?.id);
}else {
  setUserName(user?.fullName);
}
},[selectedUser])
  useEffect(() => {
    const checkFields = () => {
      if(user?.role==="user" || user?.role==="trainer"){
        if (subject) {
          setIsNextDisabled(false);
        } else {
          setIsNextDisabled(true);
        }
      }else {
        if (subject && userName && link) {
          setIsNextDisabled(false);
        } else {
          setIsNextDisabled(true)
        }
      }
    }
    checkFields();
  }, [subject, userName, link]);
  useEffect(()=>{
    console.log("setting selectedArea: ",selectedArea);
    setSubject(selectedArea);
  },[selectedArea])
  return (
    <View className="mt-0">
      <View>
        {/* <FormDetailInstance
          title={"Schedule Subject*"}
          placeholder={"What is this schedule for?"}
          value={subject}
          setValue={setSubject}
          error={touched.subject && errors.subject}
        /> */}
          <PickerInstance
          title="Subject*"
          selectedUser={selectedArea}
          userNames={painAreas}
          onUserChange={setSelectedArea}
          defaultOption="Select Subject"
          itemNotObj={true}
          
        />
        <FormDetailInstance
          title={"Schedule Description(optional)"}
          placeholder={"Description for schedule ..."}
          isTextArea={true}
          value={description}
          setValue={setDescription}
          error={touched.description && errors.description}
        />
        {user?.role ==='admin' && 
        <>
        <PickerInstance
          title="Select User*"
          selectedUser={selectedUser}
          userNames={userNames}
          onUserChange={setSelectedUser}
          defaultOption="Select User"
          isDisable={submitStatus!=='createNew'}
        />
        <FormDetailInstance
          title="Schedule Link*"
          placeholder="Add a link to the schedule"
          value={link}
          setValue={setLink}
          error={touched.link && errors.link}
        />
        </>
      }
      </View>

      <View className="flex items-center justify-end w-full flex-row px-1 mt-16">
        <CustomButton
          title="Back"
          customStyle={"mx-0 bg-mint-87 scale-90 px-6"}
          handlePress={() => handleBack(values)}
          startIcon={<FontAwesome5 name="chevron-left" size={20} color="#fff" />} textStyle={"ml-4"}
          
        />
        <CustomButton
          title="Next"
          customStyle={"mx-0 bg-mint-87 scale-90 px-6"}
          handlePress={() => handleNext(values)}
          endIcon={<FontAwesome5 name="chevron-right" size={20} color="#fff" />}
          textStyle={"mr-4"}
          disabled={isNextDisabled}
        />
      </View>
    </View>
  );
};

export default ScheduleDetails;