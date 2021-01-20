import React, { SyntheticEvent } from 'react';
import { Grid } from 'semantic-ui-react';
import { IExpense } from '../../../app/models/expense';
import { ExpenseForm } from '../form/ExpenseForm';
import { ExpenseList } from './ExpenseList';

interface IProps {
    expenses: IExpense[];
    selectExpense: (id: string) => void;
    expense: IExpense | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    editExpense: (expense: IExpense) => void;
    createExpense: (expense: IExpense) => void;
    deleteExpense: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

export const ExpenseDashboard: React.FC<IProps> = ({
    expenses,
    editMode,
    setEditMode,
    selectExpense,
    expense,
    createExpense,
    editExpense,
    deleteExpense,
    submitting,
    target }) => {
    return (
        <div>
            <Grid>
                <Grid.Column width={10}>
                    <ExpenseList
                        expenses={expenses}
                        editMode={editMode}
                        selectExpense={selectExpense}
                        deleteExpense={deleteExpense}
                        submitting={submitting}
                        target={target}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    {
                        editMode &&
                        <ExpenseForm
                            key={expense && expense.id || 0}
                            setEditMode={setEditMode}
                            expense={expense!}
                            createExpense={createExpense}
                            editExpense={editExpense}
                            submitting={submitting}
                        />
                    }
                </Grid.Column>
            </Grid>
        </div>
    )
}
