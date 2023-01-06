import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HabitService from "../../../Services/HabitService";

export default function UpdateExcludeButtons({
  habitInput,
  handleUpdate,
  habitArea,
}) {
  const navigation = useNavigation();

  function handleDeleteHabit() {
    HabitService.deleteByName(habitArea)
      .then(() => {
        Alert.alert("Exclusão feita com sucesso.");
        navigation.navigate("Home", { excludeArea: `${habitArea}` });
      })
      .catch((error) => console.log(error));
  }

  return (
    <View className="flex-row mb-5">
      <TouchableOpacity
        className="border border-[#FFFFFF] w-40 h-14 mr-3 items-center justify-center rounded-xl"
        activeOpacity={0.8}
        onPress={() => {
          Alert.alert(
            "Ao prosseguir você vai atualizar o hábito, tem certeza?",
            "Ao fazer isso você pode mudar o hábito, frequência e notificação.",
            [
              {
                text: "Cancelar",
              },
              {
                text: "Atualizar",
                onPress: handleUpdate,
              },
            ]
          );
        }}
      >
        <Text className="text-lg text-[#FFFFFF] font-bold">Atualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="border border-[#FF0044] rounded-xl justify-center items-center w-24"
        activeOpacity={0.8}
        onPress={() => {
          Alert.alert(
            `Você tem certeza que quer excluir o hábito?`,
            "Ao fazer isso perderá todo o progresso ou falha do hábito.",
            [
              {
                text: "Cancelar",
                onPress: () => {
                  Alert.alert("Exclusão cancelada com sucesso!");
                },
              },
              {
                text: "Excluir",
                onPress: handleDeleteHabit,
              },
            ]
          );
        }}
      >
        <Image
          source={require("../../../assets/icons/trash.png")}
          style={styles.trash}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  trash: {
    width: 28,
    height: 28,
  },
});
