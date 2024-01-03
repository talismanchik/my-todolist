import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "../todolists-reducer";

const initialState: TasksStateType = {
    'TodoList1': [
        {taskId: v1(), title: 'JS', status: true},
        {taskId: v1(), title: 'TS', status: true},
        {taskId: v1(), title: 'React', status: true},
        {taskId: v1(), title: 'Angular', status: false}],
    'TodoList2': [
        {taskId: v1(), title: 'HTML', status: true},
        {taskId: v1(), title: 'CSS', status: true},
        {taskId: v1(), title: 'Redux', status: true},
        {taskId: v1(), title: 'RTK', status: false}]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE_TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.taskId !== action.taskId)
            }
        case "ADD_TASK":
            return {
                ...state,
                [action.todoListId]: [{taskId: v1(), title: action.title, status: false}, ...state[action.todoListId]]
            }
        case "CHANGE_TASK_TITLE":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.taskId === action.taskId ? {...t, title: action.newTitle} : t)
            }
        case "CHANGE_TASK_STATUS":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.taskId === action.taskId ? {...t, status: action.newStatus} : t)
            }
        case "REMOVE_TODOLIST":
            const copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        case "ADD_TODOLIST":
            return {...state, [action.todoListId]: []}
        default:
            return state
    }
}


// ACTIONS

export const removeTaskAC = (todoListId: string, taskId: string) => ({type: 'REMOVE_TASK', todoListId, taskId} as const)
export const addTaskAC = (todoListId: string, title: string) => ({type: 'ADD_TASK', todoListId, title} as const)
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => ({
    type: 'CHANGE_TASK_TITLE',
    todoListId,
    taskId,
    newTitle,
} as const)
export const changeTaskStatusAC = (todoListId: string, taskId: string, newStatus: boolean) => ({
    type: 'CHANGE_TASK_STATUS',
    todoListId,
    taskId,
    newStatus
} as const)

// TYPES

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type TaskType = {
    title: string
    taskId: string
    status: boolean
}