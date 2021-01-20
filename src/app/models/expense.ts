export interface IExpense {
    id: string;
    name: string;
    price: number;
    remarks: string;
    categoryId: number;
    dateCreated: string;
    createdBy: number;
    dateModified: string;
    modifiedBy: number;
}