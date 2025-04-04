import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenceScreen({ route, navigation }) {
  const [error, setError] = useState(); //для ошибок при фетче
  const [isLoading, setIsLoading] = useState(false); //для loader
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

  async function deleteExpenseHandler() {
    setIsLoading(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId); //мы обновляем локально сначала перед тем, как посылать request
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense. Please try later!");
      setIsLoading(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function AddAndUpdateHandler(expenseData) {
    setIsLoading(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(
          editedExpenseId,
          expenseData // мы заменили эти dummy данные на expenseData из ExpenseForm {description: "test!!!", amount: 10.0, date: new Date("2030-10-10"),}
        );
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data. Please try again later!");
      setIsLoading(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isLoading) {
    <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={AddAndUpdateHandler}
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
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
