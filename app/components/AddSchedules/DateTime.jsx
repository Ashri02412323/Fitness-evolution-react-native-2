import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from '../CustomButton';
import DatePicker from 'react-native-ui-datepicker';
import { Picker} from '@react-native-picker/picker';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFormContext } from '../../../contexts/FormProivder';

const DateTime = ({ values, errors, handleNext}) => {
  const {
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
    setStartTimeIso,
    getTimeOptions,
    getIsoDateTimeString,
  } = useFormContext();

  const onDateChange = (params) => {
    setSelectedDate(params.date);
    // Convert the date to a local date string in UTC
    const localDate = new Date(params.date).toISOString();
    let newStartOptions = getTimeOptions(localDate, true);
    setStartOptions(newStartOptions);
  };

  const onTimeChange = (itemValue, setSelectedTime, isStart) => {
    setSelectedTime(itemValue);
    const isoDateTimeString = getIsoDateTimeString(selectedDate, itemValue);
    if (isStart) {
      setStartTimeIso(isoDateTimeString);
      let endOptions = getTimeOptions(isoDateTimeString);
      setEndOptions(endOptions);
    }
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <View className="mt-0">
      <View>
        <View className="flex flex-row items-center justify-between mb-0">
          <Text className="text-white_60 text-base font-pop_Medium">Select Date</Text>
          <Pressable
            onPress={() => {
              onDateChange({ date: new Date() });
            }}
          >
            <Text className="text-mint-87 font-inter_Regular text-base py-2">
              Reset Date
            </Text>
          </Pressable>
        </View>
        <View className="bg-white_87 mx-auto rounded-lg w-[290px] px-4 scale-95 py-2">
          <DatePicker
            date={selectedDate}
            onChange={onDateChange}
            mode="single"
            height={250}
            selectedItemColor="#00C7BE"
            minDate={yesterday}
          />
        </View>

        {(!selectedDate || errors?.milestone1) && (
          <Text className="text-red-500">Date is required</Text>
        )}
      </View>
      <View className="mt-4 flex flex-row items-center justify-between">
        <View>
          <Text className="text-white_60 text-base font-pop_Medium mb-2">Start Time</Text>
          <View className="bg-white_87 w-32 rounded-md scale-[0.85]">
            <Picker
              selectedValue={startTime}
              onValueChange={(e) => onTimeChange(e, setStartTime, true)}
            >
              {startOptions.map((time, index) => (
                <Picker.Item key={index} label={time} value={time} />
              ))}
            </Picker>
          </View>
        </View>

        <View>
          <Text className="text-white_60 text-base font-pop_Medium mb-2">End Time</Text>
          <View className="bg-white_87 w-32 rounded-md scale-[0.85]">
            <Picker
              selectedValue={endTime}
              onValueChange={(e) => onTimeChange(e, setEndTime, false)}
            >
              {endOptions.map((time, index) => (
                <Picker.Item key={index} label={time} value={time} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      <View className="flex items-center justify-end w-full flex-row px-1 mt-16">
        <CustomButton
          title="Next"
          customStyle={"mx-0 w-[120px] bg-mint-87 scale-90"}
          handlePress={() => handleNext(values)}
          endIcon={<FontAwesome5 name="chevron-right" size={24} color="#fff" />}
        />
      </View>
    </View>
  );
};

export default DateTime;