export interface IUser {
    id: number;
    userId: string;
    firstName: string;
    lastName: string;
    dateCreated: Date;
    createdBy: number;
    dateModified: Date;
    modifiedBy: number;
}