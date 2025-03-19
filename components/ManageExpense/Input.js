import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, style, inValid, textInputConfig }) {
  //это сделано для применения отдельного стиля к строке ввода description,
  //чтобы обеспечить применение стиля не только общего, но и конкретного для multiline
  //смотри, что в инпуте ссылаемся не на styles.input, а на нашу переменную inputStyles
  const inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if(inValid) {
    inputStyles.push(styles.inValidInput)
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label , inValid && styles.inValidLabel ]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}
export default Input;
// {...textInputConfig} таким образом мы передаем объект из пропсов каких угодно
// и конфигурируем их в expenseForm.js

const styles = StyleSheet.create({
  inputContainer: {
    
    marginHorizontal: 4,
    marginVertical: 10,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.accent500,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.error50,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.gray700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  inValidLabel: {
    color: GlobalStyles.colors.accent500,
  },
  inValidInput: {
    backgroundColor: GlobalStyles.colors.accent500
  }
});
