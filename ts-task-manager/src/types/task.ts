export interface Task{
    id: number,
    title: string,
    completed: boolean;
}

export type taskFilter = "all" | "active" | "completed";