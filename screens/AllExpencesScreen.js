import { View, Text } from "react-native";
import ExpencesOutput from "../components/ExpencesOutput/ExpencesOutput";

function AllExpencesScreen() {
  return (
    <View>
      <ExpencesOutput expencesPeriod="Total"  />
    </View>
  );
}

export default AllExpencesScreen;
