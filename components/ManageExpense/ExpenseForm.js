import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";

import Input from "./Input";
import Button from "../UI/Button";
import { getFormettedDate } from "../../util/date";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  //типичный вариант работы с введенными данными. Но нам надо таких сделать 3: для даты, описания и суммы.
  //ниже вариант замены.
  //const [amountValue, setAmountValue] = useState("");
  //function amountChangeHandler(enteredAmount) {
  //  setAmountValue(enteredAmount)
  //}

  //Вариант замены.
  //В useState мы получаем не пустую строку, а объект
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true 
    },
    date: {
      value: defaultValues ? getFormettedDate(defaultValues.date) : "",
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : "",
      isValid: true  
    },
  });

  //эта функция позволяет нам set and tagrget properties dynamically
  //это reusable generic change input function with 1 state
  //потом с помощью bind()метода мы связываем нашу функцию с конкретным полем ввода
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  //SUBMIT Button
  // идея в том, что мы собираем данные юзера,  проверяем
  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value, //конвертируем в число
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    //валидация
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //inform user that validation is failed
      //Alert.alert("Invalid input", "Please check your input values");
      //если хоть 1 инпут неверный, то
      //это нам надо, чтобы показать юзеру, что именно неверно
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          inValid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          inValid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        inValid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false, //default is true
          autoCapitalize: "sentences",
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText} > Invalid input values - please check your entered data</Text>
      )}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 6
  },
  
});
