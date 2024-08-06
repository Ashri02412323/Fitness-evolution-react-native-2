// NoInternetConnection.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, Image ,TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import noWifi from '../assets/images/noWifi.png';

const NoInternetConnection = () => {
  return (
    <View style={styles.container}>
        <StatusBar style="light" />
        <Image source={noWifi} className="h-[200px] aspect-square" />
        <Text className="text-white mt-2 font-semibold text-xl mb-2">No Internet Connection</Text>
        <TouchableOpacity className="p-2 rounded-md">
            <Text className="text-white">Retry</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default NoInternetConnection;