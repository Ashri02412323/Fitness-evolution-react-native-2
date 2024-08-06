import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const DropDown = ({ items, onSelect, placeholder,isVisible,setIsVisible }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (onSelect) => {
    setIsVisible(false);
    onSelect && onSelect();
  };

  return (
    <View className="w-full my-2.5">
     
      {isVisible && (
        <View className="mt-1.25 bg-lava rounded py-2">
          {items.map((item) => (
            <Pressable key={item.value} className="p-2.5 px-4 flex flex-row items-end gap-x-3" onPress={() => handleSelect(item?.onSelect)}>
                {item?.icon}
               <Text className={`font-pop_Regular ${item.isRed?"text-[#FF3B30]":"text-white_87"}`}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};


export default DropDown;