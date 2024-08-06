import { View, Text, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import FormDetailInstance from './FormDetailInstance';
import { Picker } from '@react-native-picker/picker';
import { useFormContext } from '../../../contexts/FormProivder';
import CustomButton from '../CustomButton';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const ScheduleDetails = ({ values, touched, errors, handleNext, handleBack }) => {
  const userNames= [ 'John Doe', 'Jane Smith', 'John Johnson', 'Jane Johnson' ];
  const { subject, setSubject, description, setDescription, userName, setUserName, link, setLink } = useFormContext();
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  useEffect(() => {
    const checkFields = () => {
      if (subject && userName && link) {
        setIsNextDisabled(false);
      } else {
        setIsNextDisabled(true);
      }
    };
    checkFields();
  }, [subject, description, userName, link]);
  return (
    <View className="mt-0">
      <View>
        <FormDetailInstance
          title={"Schedule Subject*"}
          placeholder={"What is this schedule for?"}
          value={subject}
          setValue={setSubject}
          error={touched.subject && errors.subject}
        />
        <FormDetailInstance
          title={"Schedule Description(optional)"}
          placeholder={"Description for schedule ..."}
          isTextArea={true}
          value={description}
          setValue={setDescription}
          error={touched.description && errors.description}
        />

        <View className="mt-4">
          <Text className="text-white_60 font-pop_Regular mb-2">Select User*</Text>
          <View className="bg-white_87 rounded">
            <Picker
              selectedValue={userName}
              onValueChange={(itemValue) => setUserName(itemValue)}
              className="border rounded p-2 px-4 bg-white_87 text-black font_inter_Regular"
            >
              <Picker.Item label="Select a user" value="" />
              {userNames.map((name, index) => (
                <Picker.Item key={index} label={name} value={name} />
              ))}
            </Picker>
          </View>
        </View>

        <FormDetailInstance
          title="Schedule Link*"
          placeholder="Add a link to the schedule"
          value={link}
          setValue={setLink}
          error={touched.link && errors.link}
        />
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