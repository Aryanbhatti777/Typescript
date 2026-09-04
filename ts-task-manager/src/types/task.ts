export interface Task{
    id: number,
    title: string,
    completed: boolean;
}

export type TaskFilter = "all" | "active" | "completed";