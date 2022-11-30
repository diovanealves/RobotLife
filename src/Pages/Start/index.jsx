import { Text, View, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DefaultButton from "../../Components/Common/DefaultButton";
import LifeStatus from "../../Components/Common/LifeStatus";

export default function Start() {
  const navigation = useNavigation();

  const handleNavAppExplanation = () => {
    navigation.navigate("Explanation");
  };

  return (
    <View className="h-full bg-[#212121]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center">
          <Image
            source={require("../../assets/icons/logo3.png")}
            className="w-[300px] h-16 mt-16 mb-5"
          />
          <LifeStatus />

          <Text className="text-[#ffff] text-xl text-center my-16">
            Vamos transformar sua Vida {"\n"} em jogo, Buscando sempre {"\n"} o
            melhor nível.
          </Text>

          <DefaultButton
            buttonText={"Continuar"}
            handlePress={handleNavAppExplanation}
            width={250}
            height={50}
          />
        </View>
      </ScrollView>
    </View>
  );
}
