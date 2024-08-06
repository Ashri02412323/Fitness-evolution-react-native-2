import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

const milestones = [
  { id: 1, label: 'Date & Time', icon: MaterialIcons, iconName: 'date-range' },
  { id: 2, label: 'Schedule Details', icon: FontAwesome6, iconName: 'list-check' },
  { id: 3, label: 'Confirm Schedule', icon: Ionicons, iconName: 'checkmark-done-sharp' },
];

const MilestoneVisual = ({ step }) => {
  return (
    <View className="flex-row items-start justify-center mb-4">
      {milestones.map((milestone, index) => {
        const IconComponent = milestone.icon;
        const iconColor = step >= milestone.id ? '#FFFFFF' : '#00C7BE';
        const bgColor = step >= milestone.id ? 'bg-[#00c7be]' : 'bg-[#F6FFFF]';
        const lineColor = step > milestone.id ? '#00C7BE' : '#F6FFFF';

        return (
          <View key={milestone.id} className={`relative flex flex-col gap-y-2 items-center justify-center w-20  ${index !== milestones.length - 1?"mr-8":""}`}>
            <View className={`relative mb-1`}>
              <View className={`rounded-full w-12 h-12 flex-col flex z-20 items-center justify-center ${bgColor}`}>
                <IconComponent name={milestone.iconName} size={24} color={iconColor} />
              </View>
              {index < milestones.length - 1 && <View className={`w-20 h-1 rounded absolute z-10 left-[50%] top-1/2`} style={{ backgroundColor: lineColor }} />}
            </View>
            <Text className="ml-2 w-20 text-center font-inter_Regular text-xs text-white_60 leading-[18px]">{milestone.label}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default MilestoneVisual;