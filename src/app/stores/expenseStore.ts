import { observable, action } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IExpense } from "../models/expense";

class ExpenseStore {
    @observable expenses: IExpense[] = [];
    @observable loadingInitial = false;

    @action loadExpenses = () => {
        this.loadingInitial = true;
        agent.Expenses.list()
        .then(expenses => {
            expenses.forEach((expense) => {
                this.expenses.push(expense);
            })
        }).finally(() => this.loadingInitial = false);
    };
}

export default createContext(new ExpenseStore());