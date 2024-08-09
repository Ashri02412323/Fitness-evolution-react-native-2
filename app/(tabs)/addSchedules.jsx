import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView ,ScrollView} from 'react-native';
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
import Toast from 'react-native-toast-message';
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
  const {token,user,setIntialRoute} = useGlobalContext();
  const {setRefreshing} = useScheduleContext();
  const handleNext = (values) => {
    if (step < 3) {
      setStep(step + 1);
      if(step==1){
        console.log('Form values:', selectedDate, startTime, endTime);
      }else if(step==2){
        console.log('Form values:', subject, description, link,userId,userName);
      }
    } else {
      // Submit the form

      console.log('Form values:', values);
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
  // time is in 24 hour format and i have date... so i need to combine them in a single date iso string
  if(selectedDate && startTime && endTime){
    startTimeFormatted = getIsoDateTimeString(selectedDate,startTime);
    endTimeFormatted = getIsoDateTimeString(selectedDate,endTime);
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
  console.log("SUbmitSttus:   ",submitStatus);
  console.log('Data:',data);
    if(submitStatus==='createNew'){
      setPostLoading(true);
      try{
      const response = await postSchedule(token,data);
        if(response){
        console.log('Schedule created:',response);
        // Toast.show({
        //   type: 'success',
        //   text1: 'Success',
        //   text2: 'Schedule created successfully'
        // });
        }
        setRefreshing(true);
        setIntialRoute("Upcoming")
        setStep(1);
        resetFormValues();
        if(user?.role === 'admin'){
        router.push('/mySchedules');
        }else{
          router.push('/chat');
        }
      }catch (err){
        console.error('Error creating schedule:',err);
        const errorMessage = err.response?.data?.message || 'Error creating schedule';
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage
        });
      }finally{
        setPostLoading(false);
      }
    }
    else if(submitStatus==='toUpdate'){
      if(!scheduleApprovedId){
        console.error('Schedule approved id not found');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Schedule approve id not found'
        });
        return;
      }
      setPostLoading(true);
      try{
        console.log("updating it");
        const response = await modifySchedule(token,scheduleApprovedId,data);
        if(response){
          console.log('Schedule modified:',response);
          // Toast.show({
          //   type: 'success',
          //   text1: 'Success',
          //   text2: 'Schedule modified successfully'
          // });
        setRefreshing(true);
        setIntialRoute("Upcoming")
        setStep(1);
        resetFormValues();
        router.push('/mySchedules');
        }
      }catch (err){
        console.error('Error modifying schedule:',err);
        const errorMessage = err.response?.data?.message || 'Error modifying schedule';
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage
        });
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