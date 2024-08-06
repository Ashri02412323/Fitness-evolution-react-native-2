import { View, Text } from 'react-native'
import React from 'react'
import DetailInstance from '../MySchedules/DetailInstance'
import { formatTime } from '../../../lib/Users/Schedule';
import CustomButton from '../CustomButton';
import { useFormContext } from '../../../contexts/FormProivder';
import { FontAwesome5 } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Confirm = ({ values, handleBack,handleSubmit }) => {
  const { selectedDate, startTime, endTime, subject, description, userName, link } = useFormContext();
  const localDate = new Date(selectedDate).toLocaleDateString();
  const formattedTime = `${startTime} - ${endTime}`;
  return (
    <View className="mt-0">
      <View>
        <DetailInstance title="Schedule Subject" value={subject} />
        <DetailInstance title="Schedule Description" value={description} />
        <DetailInstance title="Date" value={localDate} />
        <DetailInstance title="Time" value={formattedTime} />
        <DetailInstance title="User" value={userName} />
        <DetailInstance title="Link" value={link} isLast={true} isLink={true} />
      </View>

      <View className="flex items-center justify-end w-full flex-row px-0 mt-16 ">
        <CustomButton
          title="Back"
          customStyle={"mx-0 bg-mint-87 scale-90 px-6"}
          handlePress={() => handleBack(values)}
          startIcon={<FontAwesome5 name="chevron-left" size={20} color="#fff" />} textStyle={"ml-4"}
          
        />
        <CustomButton
          title="Confirm"
          customStyle={"mx-0 bg-mint-87 scale-90 px-6"}
          handlePress={() => handleSubmit()}
          endIcon={<MaterialIcons name="schedule" size={24} color="#fff" />}
          textStyle={"mr-2"}
        />
      </View>
    </View>
  )
}

export default Confirm