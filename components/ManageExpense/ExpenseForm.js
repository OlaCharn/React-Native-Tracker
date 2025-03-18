import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";

import Input from "./Input";
import Button from "../UI/Button";

function ExpenseForm( {onCancel, onSubmit, submitButtonLabel} ) {
  //типичный вариант работы с введенными данными. Но нам надо таких сделать 3: для даты, описания и суммы.
  //ниже вариант замены.
  //const [amountValue, setAmountValue] = useState("");
  //function amountChangeHandler(enteredAmount) {
  //  setAmountValue(enteredAmount)
  //}

  //Вариант замены.
  //В useState мы получаем не пустую строку, а объект
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });
  //эта функция позволяет нам set and tagrget properties dynamically
  //это reusable generic change input function with 1 state
  //потом с помощью bind()метода мы связываем нашу функцию с конкретным полем ввода
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((currentInputValue) => {
      return {
        ...currentInputValue,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  //SUBMIT Button
  // идея в том, что мы собираем данные юзера, но не проверяем их пока тут
  function submitHandler() {
    const expenseData = {
      amount: + inputValues.amount, //конвертируем в число
      date: new Date(inputValues.date),
      description: inputValues.description
    };
    
    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false, //default is true
          autoCapitalize: "sentences",
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />

      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 9,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.accent500,
    marginVertical: 24,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  //этот стиль для расположения окон ввода в строку
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
  },

});
