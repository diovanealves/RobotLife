import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";

import SelectHabit from "../../Components/HabitPage/SelectHabit";
import SelectFrequency from "../../Components/HabitPage/SelectFrequency";
import Notification from "../../Components/HabitPage/Notification";
import TimeDatePicker from "../../Components/HabitPage/TimeDataPicker";
import UpdateExcludeButtons from "../../Components/HabitPage/UpdateExcludeButtons";
import DefaultButton from "../../Components/Common/DefaultButton";

export default function HabitPage({ route }) {
  const navigation = useNavigation();
  const [habitInput, setHabitInput] = useState();
  const [frequencyInput, setFrequencyInput] = useState();
  const [notificationToggle, setNotificationToggle] = useState();
  const [dayNotification, setDayNotification] = useState();
  const [timeNotification, setTimeNotification] = useState();

  const { create, habit } = route.params;

  function handleCreateHabit() {
    if (habitInput === undefined || frequencyInput === undefined) {
      Alert.alert(
        "Você preecisa selecionar um hábito e uma frequência para continuar."
      );
    } else if (
      notificationToggle === true &&
      frequencyInput === "Diário" &&
      timeNotification === undefined
    ) {
      Alert.alert("Você precisa dizer o horário da notificação.");
    } else if (
      notificationToggle === true &&
      frequencyInput === "Diário" &&
      dayNotification === undefined &&
      timeNotification == undefined
    ) {
      Alert.alert(
        "Você precisa dizer a frequência e o horário da notificação."
      );
    } else
      navigation.navigate("Home", {
        createdHabit: `Created in ${habit?.habitArea}`,
      });
  }

  function handleUpdateHabit() {
    if (notificationToggle === true && !dayNotification && !timeNotification) {
      Alert.alert(
        "Você preecisa colocar a frequência e o horário da notificação."
      );
    } else {
      navigation.navigate("Home", {
        updatedHabit: `Updated in ${habit?.habitArea}`,
      });
    }
  }

  return (
    <View className="h-screen bg-[#212121]">
      <ScrollView>
        <View>
          <TouchableOpacity
            className="w-10 m-6"
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
            <Text className="text-[#FFFFFF] text-base mt-9 mb-3 ml-2">
              Hábito
            </Text>
            <SelectHabit habit={habit} habitInput={setHabitInput} />
            <Text className="text-[#FFFFFF] text-base mt-9 mb-3 ml-2">
              Frequência
            </Text>
            <SelectFrequency
              habitFrequency={habit?.habitFrequency}
              frequencyInput={setFrequencyInput}
            />
            {frequencyInput === "Mensal" ? null : (
              <Notification
                notificationToggle={notificationToggle}
                setNotificationToggle={setNotificationToggle}
              />
            )}

            {notificationToggle ? (
              frequencyInput === "Mensal" ? null : (
                <TimeDatePicker
                  frequency={frequencyInput}
                  dayNotification={dayNotification}
                  timeNotification={timeNotification}
                  setDayNotification={setDayNotification}
                  setTimeNotification={setTimeNotification}
                />
              )
            ) : null}

            {create === false ? (
              <UpdateExcludeButtons
                handleUpdate={handleUpdateHabit}
                habitArea={habitArea}
                habitInput={habitInput}
              />
            ) : (
              <View className="items-center">
                <DefaultButton
                  buttonText={"Criar"}
                  handlePress={handleCreateHabit}
                  width={250}
                  height={50}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  arrowBack: {
    width: 40,
    height: 40,
  },
});
