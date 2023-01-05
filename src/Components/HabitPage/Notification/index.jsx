import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Switch } from "react-native-gesture-handler";

export default function Notification({
  notificationToggle,
  setNotificationToggle,
}) {
  const toggleSwitch = () => {
    setNotificationToggle((previousState) => !previousState);
  };
  return (
    <>
      <View className="flex items-center mb-5">
        <Text className="text-[#FFFFFF] text-xl mr-3">Notificação</Text>
        <Switch
          trackColor={{ false: "#FF0044", true: "#2DBE56" }}
          thumbColor={"#FFFFFF"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={notificationToggle}
        />
      </View>
    </>
  );
}
