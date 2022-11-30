import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import LifeStatus from "../../Components/Common/LifeStatus";

export default function Home() {
  const navigation = useNavigation();

  function handleNavExplanation() {
    navigation.navigate("Explanation");
  }

  return (
    <View className="h-full bg-[#212121]">
      <ScrollView>
        <View className="items-center">
          <Text className="text-[#FFFFFF] text-lg font-bold text-center mt-10">
            ❤ 20 dias | ✔️ 80 checks{" "}
          </Text>
          <LifeStatus />
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
