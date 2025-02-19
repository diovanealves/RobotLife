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
import * as Notifications from "expo-notifications";

import SelectHabit from "../../Components/HabitPage/SelectHabit";
import SelectFrequency from "../../Components/HabitPage/SelectFrequency";
import Notification from "../../Components/HabitPage/Notification";
import TimeDatePicker from "../../Components/HabitPage/TimeDataPicker";
import UpdateExcludeButtons from "../../Components/HabitPage/UpdateExcludeButtons";
import DefaultButton from "../../Components/Common/DefaultButton";

import NotificationService from "../../Services/NotificationService";
import HabitService from "../../Services/HabitService";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function HabitPage({ route }) {
  const navigation = useNavigation();
  const [habitInput, setHabitInput] = useState();
  const [frequencyInput, setFrequencyInput] = useState();
  const [notificationToggle, setNotificationToggle] = useState();
  const [dayNotification, setDayNotification] = useState();
  const [timeNotification, setTimeNotification] = useState();

  const { create, habit } = route.params;

  const habitCreated = new Date();
  const formatDate = `${habitCreated.getFullYear()}-${habitCreated.getMonth()}-${habitCreated.getDate()}`;

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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
    } else {
      if (notificationToggle) {
        NotificationService.createNotification(
          habitInput,
          frequencyInput,
          dayNotification,
          timeNotification
        );
      }
      HabitService.createHabit({
        habitArea: habit?.habitArea,
        habitName: habitInput,
        habitFrequency: frequencyInput,
        habitHasNotification: notificationToggle,
        habitNotificationFrequency: dayNotification,
        habitNotificationTime: timeNotification,
        lastCheck: formatDate,
        daysWithoutChecks: 0,
        habitIsChecked: 0,
        progressBar: 1,
        habitChecks: 0,
      }).then(() => {
        Alert.alert("Sucesso na criação do hábito!");

        navigation.navigate("Home", {
          createdHabit: `Created in ${habit?.habitArea}`,
        });
      });
    }
  }

  function handleUpdateHabit() {
    if (notificationToggle === true && !dayNotification && !timeNotification) {
      Alert.alert(
        "Você preecisa colocar a frequência e o horário da notificação."
      );
    } else {
      HabitService.updateHabit({
        habitArea: habit?.habitArea,
        habitName: habitInput,
        habitFrequency: frequencyInput,
        habitHasNotification: notificationToggle,
        habitNotificationFrequency: dayNotification,
        habitNotificationTime: timeNotification,
        habitNotificationId: notificationToggle ? habitInput : null,
      }).then(() => {
        Alert.alert("Sucesso na atualização do hábito");
        if (!notificationToggle) {
          NotificationService.deleteNotification(habit?.habitName);
        } else {
          NotificationService.deleteNotification(habit?.habitName);
          NotificationService.createNotification(
            habitInput,
            frequencyInput,
            dayNotification,
            timeNotification
          );
        }
        navigation.navigate("Home", {
          updatedHabit: `Updated in ${habit?.habitArea}`,
        });
      });
    }
  }

  useEffect(() => {
    if (habit?.habitHasNotification == 1) {
      setNotification(true);
      setDayNotification(habit?.habitNotificationFrequency);
      setTimeNotification(habit?.habitNotificationTime);
    }
  }, []);

  useEffect(() => {
    if (notificationToggle === false) {
      setTimeNotification(null);
      setDayNotification(null);
    }
  }, [notificationToggle]);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
                habitArea={habit?.habitArea}
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
