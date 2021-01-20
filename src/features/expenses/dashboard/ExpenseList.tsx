import React, { SyntheticEvent } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { IExpense } from '../../../app/models/expense';

interface IProps {
    expenses: IExpense[];
    selectExpense: (id: string) => void;
    editMode: boolean;
    deleteExpense: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

export const ExpenseList: React.FC<IProps> = ({ expenses, selectExpense, deleteExpense, submitting, target }) => {
    return (
        <div>
            <Segment clearing>
                <Item.Group divided>
                    {expenses.map(expense => (
                        <Item key={expense.id}>
                            <Item.Image size="small" src="/assets/placeholder.png" />
                            <Item.Content>
                                <Item.Header as='a'>{expense.name}</Item.Header>
                                <Item.Meta>{expense.dateCreated}</Item.Meta>
                                <Item.Description>
                                    <div className="rightAlign">
                                        <span >${expense.price}</span>
                                        <span >${expense.remarks}</span>
                                    </div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button floated="right"
                                        content="Edit"
                                        color="blue"
                                        onClick={() => selectExpense(expense.id)}
                                    />
                                    <Button floated="right"
                                        name={expense.id}
                                        content="Delete"
                                        color="red"
                                        onClick={(e) => deleteExpense(e, expense.id)}
                                        loading={target === expense.id && submitting}
                                    />
                                    <Label content={expense.categoryId} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>

                    ))}
                </Item.Group>
            </Segment>
        </div>
    )
}
