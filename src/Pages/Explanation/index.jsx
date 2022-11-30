import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DefaultButton from "../../Components/Common/DefaultButton";

export default function Explanation() {
  const handleSetShowHome = () => {
    console.log("show home");
  };

  return (
    <View className="h-full bg-[#212121]">
      <ScrollView>
        <View className="items-center">
          <Text className="text-3xl font-bold text-[#ffffff] text-center my-10">
            Antes, deixa {"\n"} eu te explicar....
          </Text>
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
