import { Pressable, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";
import { getFormettedDate } from "../../util/date";

function ExpenseItem({ id, description, date, amount }) {

  const navigation = useNavigation();

  function handleItemPress() {
    //console.log("ExpenseItem Pressed");
    //вызываем метод навигации для открытия экрана ManageExspeseScreen чтобы внести новые данные
    //ExpenseItem не экран и по\тому не имеет доступа к методам навигации
    //для этого используем хук useNavigation
    navigation.navigate("ManageExpence", {
      expenseId: id,
    });
    
  }
  return (
    <Pressable
      onPress={handleItemPress}
      style={({ pressed }) => pressed && styles.pressed}
      android_ripple={{ color: GlobalStyles.colors.primary400 }}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormettedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}> {amount.toFixed(2)} </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.error50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.primary400,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: "balck",
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: GlobalStyles.colors.gray500,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    minWidth: 100,
  },
  amount: {
    color: GlobalStyles.colors.white,
    //color:"red",
    fontSize: 16,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
//<Text style={styles.textBase} >{date}</Text>
