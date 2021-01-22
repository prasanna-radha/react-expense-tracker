import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import ExpenseStore from "../../../app/stores/expenseStore";

const ExpenseList: React.FC = () => {
    const expenseStore = useContext(ExpenseStore);
    const { expenses, selectExpense, submitting, deleteExpense, target } = expenseStore;
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

export default observer(ExpenseList);