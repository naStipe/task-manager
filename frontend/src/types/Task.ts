export interface Task{
    id?: number;
    name: string,
    content: string,
    startDate?:string,
    endDate?:string,
    tags?: string[],
    isDone: boolean
}