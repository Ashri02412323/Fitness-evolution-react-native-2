import { View, Text } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';

const PickerInstance  = ({ selectedUser, userNames, onUserChange,title,defaultOption,itemNotObj,isDisable }) => {
    return (
      <View className="mt-4">
        <Text className="text-white_60 font-pop_Regular mb-2">{title}</Text>
        <View className={`${isDisable&& "opacity-80"} bg-white_87 rounded`}>
         
            {itemNotObj ? 
            <>
            
             <Picker
             enabled={!isDisable}
              selectedValue={selectedUser}
              onValueChange={(itemValue) => {
                console.log(itemValue)
                onUserChange(itemValue);
              }}
              className="border rounded p-2 px-4 bg-white_87 text-black font_inter_Regular"
            >
            <Picker.Item label={selectedUser ? selectedUser :defaultOption} value={selectedUser ?? ""} />
            {userNames.map((item, index) => (
                item !== selectedUser &&
              <Picker.Item key={index} label={item} value={item} />
            ))}
            </Picker>
            </>
            :
            <>
             <Picker
              enabled={!isDisable}
              selectedValue={selectedUser}
              onValueChange={(itemValue) => {
                onUserChange(itemValue);
              }}
              className="border rounded p-2 px-4 bg-white_87 text-black font_inter_Regular"
            >
            <Picker.Item label={selectedUser ? selectedUser.fullName :defaultOption} value={selectedUser ?? ""} />
            {userNames.map((item, index) => (
                item !== selectedUser &&
              <Picker.Item key={index} label={item.fullName} value={item} />
            ))}
            </Picker>
            </>
          }
        </View>
      </View>
    );
  };

export default PickerInstance