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

const validationSchema = Yup.object().shape({
  milestone1: Yup.string().required('Milestone 1 is required'),
  milestone2: Yup.string().required('Milestone 2 is required'),
  milestone3: Yup.string().required('Milestone 3 is required'),
});

const AddSchedule = () => {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(1);
const {selectedDate, startTime,  endTime,subject, description, userName,link} = useFormContext();
  const handleNext = (values) => {
    if (step < 3) {
      setStep(step + 1);
      if(step==1){
        console.log('Form values:', selectedDate, startTime, endTime);
      }else if(step==2){
        console.log('Form values:', subject, description, userName,link);
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
  const handleSubmit = () => {
    console.log("Form submitted successfully. All values: ",);
    console.log(selectedDate, startTime, endTime,subject, description, userName,link);
  }
  const changeMilestone = (step) => {
    return `Milestone ${step}`;
  }

  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title={"Create A Schedule"} />
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