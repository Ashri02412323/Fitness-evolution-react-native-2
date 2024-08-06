import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import MilestoneVisual from '../components/AddSchedules/MilestoneVisual';

const validationSchema = Yup.object().shape({
  milestone1: Yup.string().required('Milestone 1 is required'),
  milestone2: Yup.string().required('Milestone 2 is required'),
  milestone3: Yup.string().required('Milestone 3 is required'),
});

const AddSchedule = () => {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(1);

  const handleNext = (values) => {
    if (step < 3) {
      setStep(step + 1);
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
  const handleSubmit = (values) => {
    console.log('Form values:', values);
  }
  const changeMilestone = (step) => {
    return `Milestone ${step}`;
  }

  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title={"Create A Schedule"} />
      <Formik
        initialValues={{ milestone1: '', milestone2: '', milestone3: '' }}
        validationSchema={validationSchema}
        onSubmit={handleNext}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View className="p-4">

          <MilestoneVisual step={step} />
            {step === 1 && (
              <View>
                <TextInput
                  className="border p-2 text-white_87 bg-white_38"
                  onChangeText={handleChange('milestone1')}
                  onBlur={handleBlur('milestone1')}
                  value={values.milestone1}
                />
                {touched.milestone1 && errors.milestone1 && <Text className="text-red-500">{errors.milestone1}</Text>}
                <Button title="Next" onPress={handleNext} />
              </View>
            )}
            {step === 2 && (
              <View>
                <TextInput
                  className="border p-2 text-white_87"
                  onChangeText={handleChange('milestone2')}
                  onBlur={handleBlur('milestone2')}
                  value={values.milestone2}
                />
                {touched.milestone2 && errors.milestone2 && <Text className="text-red-500">{errors.milestone2}</Text>}
                <Button title="Back" onPress={handleBack} />
                <Button title="Next" onPress={handleNext} />
              </View>
            )}
            {step === 3 && (
              <View>
                <TextInput
                  className="border p-2 text-white_87"
                  onChangeText={handleChange('milestone3')}
                  onBlur={handleBlur('milestone3')}
                  value={values.milestone3}
                />
                {touched.milestone3 && errors.milestone3 && <Text className="text-red-500">{errors.milestone3}</Text>}
                <Button title="Back" onPress={handleBack} />
                <Button title="Submit" onPress={handleSubmit} />
              </View>
            )}
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default AddSchedule;