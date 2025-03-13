import { View } from "react-native";
import ExpencesOutput from "../components/ExpencesOutput/ExpencesOutput";

function RecentExpencesScreen() {
  return (
    <View>
      <ExpencesOutput expencesPeriod="Last 7 Days" />
    </View>
  );
}

export default RecentExpencesScreen;
