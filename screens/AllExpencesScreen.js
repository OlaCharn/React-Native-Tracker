import ExpencesOutput from "../components/ExpencesOutput/ExpencesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpencesScreen() {
  const expencesCtx = useContext(ExpensesContext);
  return (
    <ExpencesOutput
      expences={expencesCtx.expenses}
      expencesPeriod="Total"
      fallbackText="No registered expenses"
    />
  );
}

export default AllExpencesScreen;
