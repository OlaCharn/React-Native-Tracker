import { createContext, useReducer } from "react";

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
  {
    id: "e6",
    description: "New Rock",
    amount: 19.99,
    date: new Date("2024-02-14"),
  },
  {
    id: "e7",
    description: "New Bag",
    amount: 199.99,
    date: new Date("2024-01-15"),
  },
  {
    id: "e8",
    description: "Book",
    amount: 19.99,
    date: new Date("2024-03-05"),
  },
  {
    id: "e9",
    description: "Book",
    amount: 9.99,
    date: new Date("2024-03-10"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updateItem = { ...updatableExpense, ...action.payload.data };
      const updateExpenses = [...state];
      updateExpenses[updatableExpenseIndex] = updateItem;
      return updateExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [espensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENCES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: espensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
