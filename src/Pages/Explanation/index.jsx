import { Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DefaultButton from "../../Components/Common/DefaultButton";
import ExplanationCard from "../../Components/Explanation/ExplanationCard";

export default function Explanation() {
  const navigation = useNavigation();

  const handleNavHome = () => {
    navigation.navigate("Home");
  };

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
            handlePress={handleNavHome}
            width={250}
            height={50}
          />
        </View>
      </ScrollView>
    </View>
  );
}
