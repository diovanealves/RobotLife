import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";

export default function HabitPage({ route }) {
  const navigation = useNavigation();
  const { create, habit } = route.params;

  return (
    <View className="h-full flex bg-[#212121]">
      <ScrollView>
        <View>
          <TouchableOpacity
            style={styles.backPageBTN}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../../assets/icons/arrowBack.png")}
              style={styles.arrowBack}
            />
          </TouchableOpacity>
          <View className="w-64 self-center">
            <Text className="text-3xl text-[#FFFFFF] font-bold text-center">
              Configurações {"\n"} de hábito
            </Text>
            <Text className="text-[#FFFFFF] text-base mt-9 mb-3 ml-2">
              Área
            </Text>
            <View className="border border-[#FFFFFF] rounded-xl py-4 px-5">
              <Text className="text-[#BBBBBB] text-sm">{habit?.habitArea}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backPageBTN: {
    width: 40,
    height: 40,
    margin: 25,
  },
  arrowBack: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(21, 21, 21, 0.98)",
  },
});
