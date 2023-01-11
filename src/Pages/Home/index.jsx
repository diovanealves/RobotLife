import { ScrollView, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import LifeStatus from "../../Components/Common/LifeStatus";
import StatusBar from "../../Components/Home/StatusBar";
import CreateHabit from "../../Components/Home/CreateHabit";
import EditHabit from "../../Components/Home/EditHabit";
import ChangeNavigationService from "../../Services/ChangeNavigationService";
import HabitService from "../../Services/HabitService";
import CheckService from "../../Services/CheckService";
import db from "../../Database";

export default function Home({ route }) {
  const navigation = useNavigation();

  const [mindHabit, setMindHabit] = useState();
  const [moneyHabit, setMoneyHabit] = useState();
  const [bodyHabit, setBodyHabit] = useState();
  const [funHabit, setFunHabit] = useState();

  const [robotDayLife, setRobotDayLife] = useState();
  const [checks, setChecks] = useState();
  const [gameOver, setGameOver] = useState(false);

  const today = new Date();

  function handleNavExplanation() {
    navigation.navigate("Explanation");
  }

  function handleGameOver() {
    navigation.navigate("Start");
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE habits;");
      tx.executeSql("DROP TABLE change_navigation;");
    });
  }

  const excludeArea = route.params?.excludeArea;

  console.log({ mindHabit });

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
        const month = `${today.getMonth() + 1}`.padStart(2, "0");
        const day = `${today.getDate()}`.padStart(2, "0");
        const formDate = `${today.getFullYear()}-${month}-${day}`;
        const checkDays =
          new Date(formDate) - new Date(showHome.appStartData) + 1;
        if (checkDays === 0) {
          setRobotDayLife(checkDays.toString().padStart(2, "0"));
        } else {
          setRobotDayLife(parseInt(checkDays / (1000 * 3600 * 24)));
        }
      })
      .catch((err) => console.log(err));
  }, [route.params]);

  useEffect(() => {
    CheckService.removeCheck(mindHabit, moneyHabit, bodyHabit, funHabit);
    CheckService.checkStatus(mindHabit, moneyHabit, bodyHabit, funHabit);
    const mindChecks = mindHabit ? mindHabit?.habitChecks : 0;
    const moneyChecks = moneyHabit ? moneyHabit?.habitChecks : 0;
    const bodyChecks = bodyHabit ? bodyHabit?.habitChecks : 0;
    const funChecks = funHabit ? funHabit?.habitChecks : 0;
    setChecks(mindChecks + moneyChecks + bodyChecks + funChecks);
    if (
      mindHabit?.progressBar === 0 ||
      moneyHabit?.progressBar === 0 ||
      bodyHabit?.progressBar === 0 ||
      funHabit?.progressBar === 0
    ) {
      setGameOver(true);
    }
  }, [mindHabit, moneyHabit, bodyHabit, funHabit]);

  return (
    <View className="h-full bg-[#212121]">
      <ScrollView>
        <View className="items-center">
          {!gameOver ? (
            <Text className="mt-10 text-lg text-center font-bold text-[#FFFFFF]">
              ❤️ {robotDayLife} {robotDayLife === "01" ? "dia" : "dias"} - ✔️{" "}
              {checks} {checks === 1 ? "Check" : "Checks"}
            </Text>
          ) : (
            <Text className="my-6 text-xl font-bold text-[#FFFFFF]">
              Game Over
            </Text>
          )}

          <LifeStatus
            mindHabit={mindHabit}
            moneyHabit={moneyHabit}
            bodyHabit={bodyHabit}
            funHabit={funHabit}
          />
          <StatusBar
            mindHabit={mindHabit?.progressBar}
            moneyHabit={moneyHabit?.progressBar}
            bodyHabit={bodyHabit?.progressBar}
            funHabit={funHabit?.progressBar}
          />

          {!gameOver ? (
            <View>
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

              <Text
                className="text-[#FFFFFF] text-base font-bold text-center pt-4 pb-6"
                onPress={() => {
                  handleNavExplanation();
                }}
              >
                Ver explicações novamente
              </Text>
            </View>
          ) : (
            <View className="my-10">
              <DefaultButton
                buttonText={"Resetar o Game"}
                handlePress={handleGameOver}
                width={250}
                height={50}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
