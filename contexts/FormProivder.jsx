import React, { createContext, useContext, useEffect, useState } from "react";
import dayjs from 'dayjs';
import { router } from "expo-router";
// import Toast from "react-native-toast-message";
import { Toast } from "toastify-react-native";

const FormContext = createContext();
export const useFormContext = () => useContext(FormContext);

const getNextRoundedHour = (hourNext) => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + hourNext); // Add one hour
    return now.toTimeString().slice(0, 2) + ':00'; 
  };

export const FormProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const currStartTime = getNextRoundedHour(1);
    const currEndTime = getNextRoundedHour(2);
    const currStartTimeIso = new Date().toISOString();
    const [startTime, setStartTime] = useState(currStartTime);
    const [startTimeIso, setStartTimeIso] = useState(currStartTimeIso);
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [userName, setUserName] = useState('');
    const [link, setLink] = useState('');
    const [userId, setUserId] = useState('');
    const [endTime, setEndTime] = useState(currEndTime);
    const [postLoading, setPostLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
  const [submitStatus,setSubmitStatus] = useState("createNew");

  const [scheduleApprovedId, setScheduleApprovedId] = useState('');

  const getIsoDateTimeString = (selectedDate, itemValue) => {
        
    const combinedDateTime = new Date(selectedDate);
    const [hours, minutes] = itemValue.split(':');
    combinedDateTime.setHours(hours);
    combinedDateTime.setMinutes(minutes);
    return combinedDateTime.toISOString();
  };
  const reverseFromIsoString = (isoString) => {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleApprove = async(id,date,startTime,endTime,scheduleLink,scheduleSubject,scheduleDescription,userId,userName,reqStatus) => {
    
    let finalStartTime = startTime;
    let finalEndTime = endTime;
    let finalDate = date;
    // if the endtime is in past now, show a warning message throught toast
    if(endTime<=new Date().toISOString() || date<new Date().toISOString()){
      Toast.warn('End time is in past. Setting next 2 hour as start and end time.','top')
      finalStartTime = getNextRoundedHour(1);
      finalEndTime = getNextRoundedHour(2);
      finalDate = new Date();
    }else{
      finalStartTime = reverseFromIsoString(finalStartTime);
      finalEndTime = reverseFromIsoString(finalEndTime);
    }
    setSelectedDate(finalDate);
    setStartTime(finalStartTime);
    setEndTime(finalEndTime);
    setLink(scheduleLink);
    setSubject(scheduleSubject);
    setDescription(scheduleDescription);
    setUserName(userName);
    setUserId(userId);
    let obj = {
      fullName: userName,
      id: userId
    }
    setSelectedUser(obj);
    setScheduleApprovedId(id);
    setSubmitStatus(reqStatus)
    router.push('/addSchedules');
  }
  const resetFormValues = () => {
    setSelectedDate(dayjs());
    setStartTime(currStartTime);
    setStartTimeIso(currStartTimeIso);
    setSubject('');
    setDescription('');
    setUserName('');
    setLink('');
    setUserId('');
    setEndTime(currEndTime);
    setSelectedUser(null);
    setSubmitStatus("createNew");
    setScheduleApprovedId('');
    router.back();
  };
    const getTimeOptions = (ISODate) => {
      const timeOptions = [];
      let date = new Date(ISODate);
      // if same day do date.now
      if(dayjs(date).isSame(dayjs(), 'day')){
        date = new Date();
      }
      const hours = date.getHours();
  
      for (let i = hours+1; i < 24; i++) {
        timeOptions.push(`${i < 10 ? '0' + i : i}:00`);
      }
  
      return timeOptions;
    };
    
  const [startOptions, setStartOptions] = useState(getTimeOptions(selectedDate));
  const [endOptions, setEndOptions] = useState(getTimeOptions(startTimeIso));
  return (
    <FormContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        startOptions,
        setStartOptions,
        endOptions,
        setEndOptions,
        startTimeIso,
        setStartTimeIso,
        getTimeOptions,
        getIsoDateTimeString,
        subject, setSubject, description, setDescription, userName, setUserName, link, setLink, userId, setUserId, submitStatus, setSubmitStatus, scheduleApprovedId, setScheduleApprovedId, handleApprove, postLoading, setPostLoading,reverseFromIsoString, selectedUser, setSelectedUser,resetFormValues
      }}
    >
      {children}
    </FormContext.Provider>
  );
};


