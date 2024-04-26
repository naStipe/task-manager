
export interface Activity{
    id?: number,
    name: string,
    content: string,
    isDone: boolean,
    tags?: string[],
    activityType?: string
}