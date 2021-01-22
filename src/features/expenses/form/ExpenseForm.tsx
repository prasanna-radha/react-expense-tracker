import React, { useState, FormEvent, useContext } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IExpense } from '../../../app/models/expense';
import { v4 as uuid } from "uuid";
import ExpenseStore from "../../../app/stores/expenseStore";

interface IProps {
    expense: IExpense;
}

export const ExpenseForm: React.FC<IProps> = ({
    expense: initialFormState,
}) => {

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: '',
                name: '',
                price: 0,
                remarks: '',
                categoryId: 0,
                dateCreated: '',
                createdBy: 0,
                dateModified: '',
                modifiedBy: 0
            };
        }
    }

    const [expense, setExpense] = useState<IExpense>(initializeForm);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setExpense({ ...expense, [name]: value });
    };

    const handleSubmit = () => {
        if (expense.id.length === 0) {
            let newExpense = {
                ...expense,
                id: uuid()
            }
            createExpense(newExpense);
        } else {
            editExpense(expense);
        }
    };
    const expenseStore = useContext(ExpenseStore);
    const { createExpense, editExpense, submitting } = expenseStore;
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    placeholder="Expense Name"
                    name="name"
                    onChange={handleInputChange}
                    value={expense.name}
                />
                <Form.Input
                    placeholder="Price"
                    name="price"
                    onChange={handleInputChange}
                    value={expense.price} />
                <Form.Input
                    placeholder="Date"
                    name="dateCreated"
                    onChange={handleInputChange}
                    type="date-local"
                    value={expense.dateCreated} />
                <Form.Input
                    placeholder="Category"
                    name="categoryId"
                    onChange={handleInputChange}
                    value={expense.categoryId} />
                {/* <Form.Dropdown placeholder="Category" search selection /> */}
                < Form.TextArea
                    placeholder="Remarks"
                    name="remarks"
                    onChange={handleInputChange}
                    rows={2}
                    value={expense.remarks} />
                <Button
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                    loading={submitting}
                ></Button>
                <Button
                    floated="right"
                    type="button"
                    content="Cancel"
                    onClick={() => expenseStore.editMode = false}
                ></Button>

            </Form>
        </Segment>
    )
}
