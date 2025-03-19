import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpenceScreen({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext); //чтобы иметь доступ к управдению состоянием в expenses-context

  //НАВИГАЦИЯ

  //логика. Если есть id, значит окно вызвано из ExpenseItem.js и данные уже есть
  //если isEditing = false, значит окно вызвано из App.js и данных нет
  //в зависимости от этого показываем разные title окна

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId; //с помощью !! преобразуем в boolean

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  //используем useLayoutEffect чтобы изменить navigation в зависимости от того, откуда было вызвано окно
  useLayoutEffect(() => {
    //конфигурируем navigation в зависимости от того, откуда было вызвано окно
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  //КНОПКИ с состоянием из контекста

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function AddAndUpdateHandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense(
        editedExpenseId,
        expenseData
        // мы заменили эти dummy данные на expenseData из ExpenseForm
        //{
        //description: "test!!!",
        //amount: 10.0,
        //date: new Date("2030-10-10"),
        //  }
      );
    } else {
      expensesCtx.addExpense(
        expenseData
        // мы заменили эти dummy данные на expenseData из ExpenseForm
        // {
        // description: "test",
        // amount: 100.0,
        // date: new Date("2025-10-10"),
        //}
      );
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={AddAndUpdateHandler}
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues = {selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenceScreen;

//особенность этого окна в том, что данные в нем будут изменяться динамически в зависимости от того
//откуда окно было вызвано
//если оно вызвано из + из App.js, то оно не имеет изначальных данных и нет id => "add"
//а если оно вызвано из ExpenseItem.js, то оно имеет id и данные => "edit"
//значит мы используем route чтобы понимать, откуда было вызвано окно

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  deleteContainer: {
    marginTop: 24,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.error50,
    alignItems: "center",
  },
});
