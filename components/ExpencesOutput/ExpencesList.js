import { FlatList, Text } from "react-native";

function renderExpenceItem({ item}) {
  return <Text>{item.description}</Text>;
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
