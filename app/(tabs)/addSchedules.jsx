import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView ,ScrollView, ToastAndroid} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import MilestoneVisual from '../components/AddSchedules/MilestoneVisual';
import DateTime from '../components/AddSchedules/DateTime';
import ScheduleDetails from '../components/AddSchedules/ScheduleDetails';
import { useFormContext } from '../../contexts/FormProivder';
import Confirm from '../components/AddSchedules/Confirm';
import { useScheduleContext } from '../../contexts/ScheduleProvider';
import { modifySchedule, postSchedule } from '../../lib/Users/Schedule';
import { useGlobalContext } from '../../contexts/GlobalProvider';
import {Toast} from 'toastify-react-native';
import { router } from 'expo-router';
const validationSchema = Yup.object().shape({
  milestone1: Yup.string().required('Milestone 1 is required'),
  milestone2: Yup.string().required('Milestone 2 is required'),
  milestone3: Yup.string().required('Milestone 3 is required'),
});

const AddSchedule = () => {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(1);
  const {selectedDate, startTime,  endTime,subject, description, userName,link,userId,submitStatus,setPostLoading,scheduleApprovedId,getIsoDateTimeString,resetFormValues} = useFormContext();
  const {token,user,setIntialRoute,socket,scrollRef} = useGlobalContext();
  const {setRefreshing} = useScheduleContext();
  const handleNext = (values) => {
    if (step < 3) {
      setStep(step + 1);
      if(step==1){

      }else if(step==2){
      }
    } else {
      // Submit the form
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handleSubmit = async() => {
  //   {
  //     "date": "2024-09-18T00:00:00.000Z",
  //     "startTime": "2024-09-18T21:50:00.000Z",
  //     "endTime": "2024-09-18T21:52:00.000Z",
  //     "scheduleLink": "https://example.com/meeting-link-8",
  //     "scheduleSubject": "Another Classes",
  //     "scheduleDescription": "A another class it is.It is gonna be fun. Lets talk all about anything.",
  //     "userId": "66a9073fa5ee023b22478122",
  //     "trainerId": "66a9004cb1a81ce392c54cdf"
  // }
  const trainerId = user?.role === 'admin' ? user?._id : user.trainerAssigned?._id;
  let startTimeFormatted,endTimeFormatted;
  if(selectedDate && startTime && endTime){
    startTimeFormatted = getIsoDateTimeString(selectedDate,startTime);
    if(endTime === '00:00'){
      // extend plus one date then convert to isostring
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      endTimeFormatted = getIsoDateTimeString(nextDay,endTime);
    }else{
     endTimeFormatted = getIsoDateTimeString(selectedDate,endTime);
  }
  }
  
  const data = {
    date: selectedDate,
    startTime: startTimeFormatted,
    endTime: endTimeFormatted,
    scheduleLink: link,
    scheduleSubject: subject,
    scheduleDescription: description,
    userId: userId,
    trainerId: trainerId,
  }
  const trainer = user?.role=="admin"?user:user.trainerAssigned;
  const userString = encodeURIComponent(JSON.stringify(trainer));
  const trainerName = user?.role=="admin"?user?.fullName:user.trainerAssigned?.fullName;
  const sendMessage = (msg) => {
    const newMsg = {
      senderName: trainerName,
      receiverName: userName,
      message: msg,
      senderId: trainer?._id,
      receiverId: userId,
      status: 'pending'
    };
  }
    if(submitStatus==='createNew'){
      setPostLoading(true);
      try{
      const response = await postSchedule(token,data);
        if(response){
        }
        setRefreshing(true);
        setIntialRoute("Upcoming")
        setStep(1);
        resetFormValues();
        if(user?.role === 'admin'){
          Toast.success('Schedule created successfully','top')
          router.push('/mySchedules');
        }else{
          Toast.success('Schedule requested successfully','top')
          sendMessage("Thanks for scheduling a class with me. I am looking forward to it. I will approve the schedule soon :)");
          router.push('/chat')
        }
      }catch (err){
        Toast.error(errorMessage,'top')
        console.error('Error creating schedule:',err);
        const errorMessage = err.response?.data?.message || 'Error creating schedule';
      }finally{
        setPostLoading(false);
      }
    }
    else if(submitStatus==='toReschedule' || submitStatus==='toApprove'){
      if(!scheduleApprovedId){
        Toast.error('Schedule approve id not found','top')
        console.error('Schedule approved id not found');
        return;
      }
      setPostLoading(true);
      try{
        const response = await modifySchedule(token,scheduleApprovedId,data);
        if(response){
        setRefreshing(true);
        setIntialRoute("Upcoming")
        setStep(1);
        resetFormValues();
        if(submitStatus==='toReschedule'){
          Toast.success('Schedule rescheduled successfully','top')
          sendMessage("I have rescheduled the class. Please check the new schedule in your upcomings.");
          router.push('/chat')
        }else{
          Toast.success('Schedule approved successfully','top')
          sendMessage("I have approved the schedule. Please check the schedule in your upcomings.");
          router.push('/chat')
        }
      }
      }catch (err){
        Toast.error(errorMessage,'top')
        console.error('Error modifying schedule:',err);
        const errorMessage = err.response?.data?.message || 'Error modifying schedule';
      }finally{
        setPostLoading(false);
      }
    }
  }
  const changeMilestone = (step) => {
    return `Milestone ${step}`;
  }

  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title={"Create A Schedule"} onPress={resetFormValues} />
      <ScrollView>
      <Formik
        initialValues={{
          milestone1: { date: '', startTime: '', endTime: '' },
         milestone2: '',
         milestone3: '' }}
        validationSchema={validationSchema}
        onSubmit={handleNext}
      >
        {({ handleChange, handleBlur, handleSubmit2, values, errors, touched }) => (
          <View className="p-4">

          <MilestoneVisual step={step} />
            {step === 1 && (
              <DateTime values={values} errors={errors} handleNext={handleNext} />
            )}
            {step === 2 && (
              <ScheduleDetails values={values} touched={touched} errors={errors} handleNext={handleNext} handleBack={handleBack} />
            )}
            {step === 3 && (
             <Confirm values={values} handleBack={handleBack} handleSubmit={handleSubmit} />
            )}
          </View>
        )}
      </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddSchedule;