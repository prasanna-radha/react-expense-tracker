import React, { useContext, useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react';
import { IExpense } from "../models/expense";
import NavBar from '../../features/navbar/NavBar';
import { ExpenseDashboard } from '../../features/expenses/dashboard/ExpenseDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';
import ExpenseStore from "../stores/expenseStore";

const App = () => {

  const expenseStore = useContext(ExpenseStore);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleSelectExpense = (id: string) => {
    setSelectedExpense(expenses.filter(a => a.id === id)[0]);
    setEditMode(true);
  }

  const handleOpenCreateForm = () => {
    setSelectedExpense(null);
    setEditMode(true);
  }

  const handleCreateExpense = (expense: IExpense) => {
    setSubmitting(true);
    agent.Expenses.create(expense).then(() => {
      setExpenses([...expenses, expense]);
      setSelectedExpense(expense);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  };

  const handleEditExpense = (expense: IExpense) => {
    setSubmitting(true);
    agent.Expenses.update(expense).then(() => {
      setExpenses([...expenses.filter(a => a.id !== expense.id), expense]);
      setSelectedExpense(expense);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  };

  const handleDeleteExpense = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Expenses.delete(id).then(() => {
      setExpenses([...expenses.filter(a => a.id !== id)]);
    }).then(() => setSubmitting(false));
  }

  useEffect(() => {
    agent.Expenses.list()
      .then(response => {
        setExpenses(response)
      }).then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading Expense Details..." />

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} submitting={submitting} />
      <Container style={{ marginTop: '5em' }}>
        <ExpenseDashboard
          expenses={expenses}
          editMode={editMode}
          setEditMode={setEditMode}
          selectExpense={handleSelectExpense}
          expense={selectedExpense}
          createExpense={handleCreateExpense}
          editExpense={handleEditExpense}
          deleteExpense={handleDeleteExpense}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
}

export default App;
