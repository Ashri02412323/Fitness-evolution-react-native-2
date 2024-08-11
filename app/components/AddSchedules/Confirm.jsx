import { View } from 'react-native'
import React from 'react'
import DetailInstance from '../MySchedules/DetailInstance'
import CustomButton from '../CustomButton';
import { useFormContext } from '../../../contexts/FormProivder';
import { FontAwesome5 } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useGlobalContext } from '../../../contexts/GlobalProvider';

const Confirm = ({ values, handleBack,handleSubmit }) => {
  const { selectedDate, startTime, endTime, subject, description, userName, link,postLoading,submitStatus } = useFormContext();
  const {user} = useGlobalContext();
  const localDate = new Date(selectedDate).toLocaleDateString();

  const formattedTime = `${startTime} - ${endTime}`;
  return (
    <View className="mt-0">
      <View>
        <DetailInstance title="Schedule Subject" value={subject} />
        <DetailInstance title="Schedule Description" value={description} />
        <DetailInstance title="Date" value={localDate} />
        <DetailInstance title="Time" value={formattedTime} />
        { user.role==="user" &&
        <DetailInstance title="Trainer" value={user.trainerAssigned?.fullName} isLast={true}/>
        }
        {user.role==="admin" &&
        <>
        <DetailInstance title="User" value={userName} />
        <DetailInstance title="Link" value={link} isLast={true} isLink={true} />
        </>
      }
      </View>

      <View className="flex items-center justify-center w-full flex-row px-0 mt-16 gap-x-0">
        <CustomButton
          title="Back"
          customStyle={"mx-0 bg-mint-87 scale-90 px-4"}
          handlePress={() => handleBack(values)}
          startIcon={<FontAwesome5 name="chevron-left" size={20} color="#fff" />} textStyle={"ml-4"}
          
        />
        <CustomButton
          title={user?.role==="user"?"Request Schedule": submitStatus==="toApprove"?"Approve it" : submitStatus==="toReschedule"?"Reschedule it":"Confirm Schedule"}
          customStyle={"mx-0 bg-mint-87 scale-90 px-4"}
          handlePress={() => handleSubmit()}
          endIcon={<MaterialIcons name="schedule" size={24} color="#fff" />}
          textStyle={"mr-2"}
          isLoading={postLoading}
        />
      </View>
    </View>
  )
}

export default Confirm