import React, { createContext, useContext, useEffect, useState } from "react";
import dayjs from 'dayjs';

const FormContext = createContext();
export const useFormContext = () => useContext(FormContext);

const getNextRoundedHour = (hourNext) => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + hourNext); // Add one hour
    return now.toTimeString().slice(0, 2) + ':00'; 
  };
const FormProvider = ({ children }) => {
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
    const [endTime, setEndTime] = useState(currEndTime);
    const getIsoDateTimeString = (selectedDate, itemValue) => {
        
        const combinedDateTime = new Date(selectedDate);
        const [hours, minutes] = itemValue.split(':');
        combinedDateTime.setHours(hours);
        combinedDateTime.setMinutes(minutes);
        // console.log("next rounded: ",combinedDateTime.toISOString()," : ", combinedDateTime.toLocaleString());
        return combinedDateTime.toISOString();
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
        subject, setSubject, description, setDescription, userName, setUserName, link, setLink
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
