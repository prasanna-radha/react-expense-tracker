import { action, makeAutoObservable, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IExpense } from "../models/expense";

configure ({enforceActions: "always"});

class ExpenseStore {
    expenses: IExpense[] = [];
    expense: IExpense | undefined = undefined;
    target: string = "";
    loadingStatus = false;
    editMode = false;
    submitting = false;

    constructor() {
        makeAutoObservable(this);
    }

    @action loadExpenses = async () => {
        this.loadingStatus = true;
        try {
            const expenses = await agent.Expenses.list();
            runInAction(() => {
                expenses.forEach((expense) => {
                    this.expenses.push(expense);
                });   
                this.loadingStatus = false;   
            });
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loadingStatus = false;
            });            
        }
    };

    @action selectExpense = (id: string) => {
        console.log("selectExpense called..");
        this.expense = this.expenses.find( a => a.id === id);
        this.editMode = true;
    };

    @action createExpense = async (expense: IExpense) => {
        this.submitting = true;
        try {
            await agent.Expenses.create(expense);
            this.expenses.push(expense);
            this.editMode = false;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }       
    };

    @action editExpense = async (expense: IExpense) => {
        this.submitting = true;
        try {
            await agent.Expenses.update(expense);
            this.expenses = [...this.expenses.filter(a => a.id !== expense.id), expense];
            this.expense = expense;
            this.editMode = false;
            this.submitting = false;
        } catch(error) {
            this.submitting = false;
            console.log(error);
        }  
    };

    @action deleteExpense = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Expenses.delete(id);
            this.expenses = [...this.expenses.filter(a => a.id !== id)];
            this.submitting = false;   
        } catch(error){
            this.submitting = false;
            console.log(error);
        }
    };

    @action openCreateForm = () => {
        this.editMode = true;
        this.expense = undefined;
    };
}

export default createContext(new ExpenseStore());