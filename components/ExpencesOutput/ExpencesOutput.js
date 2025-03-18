import { View, StyleSheet, Text } from "react-native";
import ExpencesSummary from "./ExpencesSummary";
import ExpencesList from "./ExpencesList";
import { GlobalStyles } from "../../constants/styles";

// expences={DUMMY_EXPENCES} - это так мы получаем доступ к данным из DUMMY_EXPENCES
// но впоследствии мы будем получать данные от юзера

function ExpencesOutput({ expences, expencesPeriod, fallbackText }) {
  //console.log(DUMMY_EXPENCES); // Должно показать массив расходов в консоли
  

  let content = <Text style={styles.infoText}> {fallbackText} </Text>;

  if (expences.length > 0) {
    content = <ExpencesList expences={expences} />;
  }

  return (
    <View style={styles.container}>
      <ExpencesSummary expences={expences} periodName={expencesPeriod} />

      {content}
    </View>
  );
}

export default ExpencesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
  
});
