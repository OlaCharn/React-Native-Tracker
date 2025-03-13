import { Text, View } from "react-native";

function ExpencesSummary({ periodName, expences }) {
  
  const expencesSum = expences.reduce((sum, expence) => {
    return sum + expence.amount;
  }, 0);

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>€{expencesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpencesSummary;
