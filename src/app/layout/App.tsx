import React, { useContext, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/navbar/NavBar';
import ExpenseDashboard from '../../features/expenses/dashboard/ExpenseDashboard';
import { LoadingComponent } from './LoadingComponent';
import ExpenseStore from "../stores/expenseStore";
import { observer } from 'mobx-react-lite';

const App = () => {

  const expenseStore = useContext(ExpenseStore);

  useEffect(() => {
    expenseStore.loadExpenses();
  }, [expenseStore]);

  if (expenseStore.loadingStatus) return <LoadingComponent content="Loading Expense Details..." />

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '5em' }}>
        <ExpenseDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App);
