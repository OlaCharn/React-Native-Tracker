import { FlatList, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenceItem({ item }) {
  //console.log("Rendering item:", item);
  return <ExpenseItem {...item} />
    }

function ExpencesList({ expences }) {
  return (
    <FlatList
      data={expences}
      renderItem={renderExpenceItem}
      keyExtractor={(item) => item.id}
      
    />
  );
}

export default ExpencesList;
//<ExpenseItem description={item.description}   amount={item.amount} />
// <Text>{item.description}</Text>