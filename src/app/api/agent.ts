import axios, { AxiosResponse } from "axios";
import { IExpense } from "../models/expense";

axios.defaults.baseURL = "http://localhost:3004";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (msecs: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), msecs));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body:{}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
};

const Expenses = {
    list: (): Promise<IExpense[]> => requests.get("/expenses"),
    details: (id: string) => requests.get(`/expenses/${id}`),
    create: (expense:IExpense) => requests.post("/expenses", expense),
    update: (expense:IExpense) => requests.put(`/expenses/${expense.id}`, expense),
    delete: (id: string) => requests.delete(`/expenses/${id}`)
};

export default {
    Expenses
};