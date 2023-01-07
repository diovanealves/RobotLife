import { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DefaultButton from "../../Components/Common/DefaultButton";
import ExplanationCard from "../../Components/Explanation/ExplanationCard";
import ChangeNavigationService from "../../Services/ChangeNavigationService";

export default function Explanation() {
  const navigation = useNavigation();
  const [showHome, setShowHome] = useState("false");
  const startDate = new Date();
  const appStartData = `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`;

  function handleNavHome() {
    navigation.navigate("Home");
  }

  function handleSetShowHome() {
    if (showHome !== "true") {
      ChangeNavigationService.setShowHome({ showHome: "true", appStartData })
        .then(() => console.log(`Sucesso! ${showHome} ${appStartData}`))
        .catch((err) => console.log(err));
      setShowHome("true");
      handleNavHome();
    }
  }

  return (
    <View className="h-full bg-[#212121]">
      <ScrollView>
        <View className="items-center">
          <Text className="text-3xl font-bold text-[#ffffff] text-center my-10">
            Antes, deixa {"\n"} eu te explicar....
          </Text>

          <ExplanationCard />

          <Text className="text-lg font-bold text-[#ffffff] mt-5 mb-2">
            Pronto(a) para subir de nível na vida?
          </Text>
          <Text className="text-base text-[#ffffff] text-center mb-8">
            Na próxima tela você vai poder escolher {"\n"} seus 4 hábitos de
            forma individual.
          </Text>
          <DefaultButton
            buttonText={"Continuar"}
            handlePress={handleSetShowHome}
            width={250}
            height={50}
          />
        </View>
      </ScrollView>
    </View>
  );
}
