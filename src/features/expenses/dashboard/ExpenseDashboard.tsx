import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { ExpenseForm } from '../form/ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseStore from "../../../app/stores/expenseStore";

const ExpenseDashboard: React.FC = () => {
    const expenseStore = useContext(ExpenseStore);
    const { editMode, expense } = expenseStore;
    return (
        <div>
            <Grid>
                <Grid.Column width={10}>
                    <ExpenseList />
                </Grid.Column>
                <Grid.Column width={6}>
                    {
                        editMode &&
                        <ExpenseForm
                            key={expense && expense.id || 0}
                            expense={expense!}
                        />
                    }
                </Grid.Column>
            </Grid>
        </div>
    )
}
export default observer(ExpenseDashboard);