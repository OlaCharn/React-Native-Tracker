import axios from "axios";
const BACKEND_URL =
  "https://react-native-first-c38f9-default-rtdb.europe-west1.firebasedatabase.app";

//используем в ManageExpense
export async function storeExpense(expenseData) {
  const responce = await axios.post(
    BACKEND_URL + "/expenses.json", //first argument - ulr + expenses.json это добавляем сами
    expenseData //second argument - тут пишем value, которые should be sended. Это объект, который ожидает моя функция
  );
  const id = responce.data.name;
  return id;
}

export async function fetchExpenses() {
  const responce = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];
  //console.log(responce.data)

  //тут мы динамически отображаем данные и сохраняем их у себя в приложении
  for (const key in responce.data) {
    const expenseObj = {
      id: key,
      amount: responce.data[key].amount,
      date: new Date(responce.data[key].date),
      description: responce.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
