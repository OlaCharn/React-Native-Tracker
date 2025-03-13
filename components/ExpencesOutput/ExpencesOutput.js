import { View } from "react-native";
import ExpencesSummary from "./ExpencesSummary";
import ExpencesList from "./ExpencesList";

const DUMMY_EXPENCES = [
  {
    id: "e1",
    description: "New Shoes",
    amount: 99.99,
    date: new Date("2024-01-14"),
  },
  {
    id: "e2",
    description: "New Rock",
    amount: 19.99,
    date: new Date("2024-02-14"),
  },
  {
    id: "e3",
    description: "New Bag",
    amount: 199.99,
    date: new Date("2024-01-15"),
  },
  {
    id: "e4",
    description: "Book",
    amount: 19.99,
    date: new Date("2024-03-05"),
  },
  {
    id: "e5",
    description: "Book",
    amount: 9.99,
    date: new Date("2024-03-10"),
  },

]

// expences={DUMMY_EXPENCES} - это так мы получаем доступ к данным из DUMMY_EXPENCES
// но впоследствии мы будем получать данные от юзера

function ExpencesOutput({ expences, expencesPeriod }) {
  return (
    <View>
      <ExpencesSummary expences={DUMMY_EXPENCES} periodName={expencesPeriod} />
      <ExpencesList expences={DUMMY_EXPENCES} />
    </View>
  );
}

export default ExpencesOutput;
