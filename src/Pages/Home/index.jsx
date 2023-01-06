import { ScrollView, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import LifeStatus from "../../Components/Common/LifeStatus";
import StatusBar from "../../Components/Home/StatusBar";
import CreateHabit from "../../Components/Home/CreateHabit";
import EditHabit from "../../Components/Home/EditHabit";
import ChangeNavigationService from "../../Services/ChangeNavigationService";

export default function Home({ route }) {
  const navigation = useNavigation();

  const [mindHabit, setMindHabit] = useState();
  const [moneyHabit, setMoneyHabit] = useState();
  const [bodyHabit, setBodyHabit] = useState();
  const [funHabit, setFunHabit] = useState();

  const [robotDayLife, setRobotDayLife] = useState();
  const today = new Date();

  function handleNavExplanation() {
    navigation.navigate("Explanation");
  }
  useEffect(() => {
    ChangeNavigationService.checkShowHome(1)
      .then((showHome) => {
        const formDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        const checkDays =
          new Date(formDate) - new Date(showHome.appStartData) + 1;
        setRobotDaysLife(checkDays.toString().padStart(2, "0"));
      })
      .catch((err) => console.log(err));
  }, [route.params]);

  return (
    <View className="h-full bg-[#212121]">
      <ScrollView>
        <View className="items-center">
          <Text className="text-[#FFFFFF] text-lg font-bold text-center mt-10">
            ❤ {robotDayLife} {robotDayLife === "01" ? "dia" : "dias"} | ✔️ 80
            checks
          </Text>
          <LifeStatus />
          <StatusBar />
          {mindHabit ? (
            <EditHabit
              habit={mindHabit?.habitName}
              frequency={`${mindHabit?.habitTime}- ${mindHabit?.habitFrequency}`}
              habitArea={mindHabit?.habitArea}
              checkColor="#90B7F3"
            />
          ) : (
            <CreateHabit habitArea="Mente" borderColor="#90B7F3" />
          )}

          {moneyHabit ? (
            <EditHabit
              habit={moneyHabit?.habitName}
              frequency={`${moneyHabit?.habitTime}- ${moneyHabit?.habitFrequency}`}
              habitArea={moneyHabit?.habitArea}
              checkColor="#86BB65"
            />
          ) : (
            <CreateHabit habitArea="Financeiro" borderColor="#86BB65" />
          )}

          {bodyHabit ? (
            <EditHabit
              habit={bodyHabit?.habitName}
              frequency={`${bodyHabit?.habitTime}- ${bodyHabit?.habitFrequency}`}
              habitArea={bodyHabit?.habitArea}
              checkColor="#FF0044"
            />
          ) : (
            <CreateHabit habitArea="Corpo" borderColor="#FF0044" />
          )}
          {funHabit ? (
            <EditHabit
              habit={funHabit?.habitName}
              frequency={`${funHabit?.habitTime}- ${funHabit?.habitFrequency}`}
              habitArea={funHabit?.habitArea}
              checkColor="#FE7F23"
            />
          ) : (
            <CreateHabit habitArea="Humor" borderColor="#FE7F23" />
          )}
        </View>
        <Text
          className="text-[#FFFFFF] text-base font-bold text-center pt-4 pb-6"
          onPress={() => {
            handleNavExplanation();
          }}
        >
          Ver explicação novamente
        </Text>
      </ScrollView>
    </View>
  );
}
