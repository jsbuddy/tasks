export interface IProject {
    _id: string,
    name: string
}

export interface ITask {
    _id: string,
    name: string,
    due: string,
    priority: number,
    project: string,
    completed: boolean
}

export interface ICreateTask {
    name: string,
    due: string,
    priority: number,
    project?: string,
}

export interface IUpdateTask {
    name?: string,
    due?: string,
    priority?: number,
    completed?: boolean
}