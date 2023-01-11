import { ScrollView, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import LifeStatus from "../../Components/Common/LifeStatus";
import StatusBar from "../../Components/Home/StatusBar";
import CreateHabit from "../../Components/Home/CreateHabit";
import EditHabit from "../../Components/Home/EditHabit";
import ChangeNavigationService from "../../Services/ChangeNavigationService";
import HabitService from "../../Services/HabitService";

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

  const excludeArea = route.params?.excludeArea;

  useEffect(() => {
    HabitService.findByArea("Mente").then((mind) => {
      setMindHabit(mind[0]);
    });
    HabitService.findByArea("Financeiro").then((money) => {
      setMoneyHabit(money[0]);
    });
    HabitService.findByArea("Corpo").then((body) => {
      setBodyHabit(body[0]);
    });
    HabitService.findByArea("Humor").then((fun) => {
      setFunHabit(fun[0]);
    });

    if (excludeArea) {
      if (excludeArea == "Mente") {
        setMindHabit(null);
      }
      if (excludeArea == "Financeiro") {
        setMoneyHabit(null);
      }
      if (excludeArea == "Corpo") {
        setBodyHabit(null);
      }
      if (excludeArea == "Humor") {
        setFunHabit(null);
      }
    }

    ChangeNavigationService.checkShowHome(1)
      .then((showHome) => {
        const formDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        const checkDays =
          new Date(formDate) - new Date(showHome.appStartData) + 1;
        setRobotDayLife(checkDays.toString().padStart(2, "0"));
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
          <StatusBar
            mindHabit={mindHabit?.progressBar}
            moneyHabit={moneyHabit?.progressBar}
            bodyHabit={bodyHabit?.progressBar}
            funHabit={funHabit?.progressBar}
          />

          {mindHabit ? (
            <EditHabit habit={mindHabit} checkColor="#90B7F3" />
          ) : (
            <CreateHabit habitArea="Mente" borderColor="#90B7F3" />
          )}

          {moneyHabit ? (
            <EditHabit habit={moneyHabit} checkColor="#85BB65" />
          ) : (
            <CreateHabit habitArea="Financeiro" borderColor="#85BB65" />
          )}

          {bodyHabit ? (
            <EditHabit habit={bodyHabit} checkColor="#FF0044" />
          ) : (
            <CreateHabit habitArea="Corpo" borderColor="#FF0044" />
          )}

          {funHabit ? (
            <EditHabit habit={funHabit} checkColor="#FE7F23" />
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
