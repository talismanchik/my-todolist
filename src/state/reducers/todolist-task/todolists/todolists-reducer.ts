import {v1} from "uuid";

const initialState: TodolistDomainType[] = [
    {id: 'TodoList1', title: 'firstList', filter: "All"},
    {id: 'TodoList2', title: 'secondList', filter: "All"},
]

export const todoListsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "ADD_TODOLIST":
            return [{id: action.todoListId, title: action.title, filter: "All"}, ...state]
        case "CHANGE_TODOLIST_TITLE":
            return state.map(td =>
                td.id === action.todoListId
                    ? {...td, title: action.newTitle}
                    : td
            )
        case "CHANGE_TODOLIST_FILTER":
            return state.map(td =>
                td.id === action.todoListId
                    ? {...td, filter: action.newFilter}
                    : td
            )
        default:
            return state
    }
}


// ACTIONS

export const removeTodolistAC = (todoListId: string) => ({type: 'REMOVE_TODOLIST', todoListId} as const)
export const addTodolistAC = (title: string) => ({type: 'ADD_TODOLIST', todoListId: v1(), title} as const)
export const changeTodolistTitleAC = (todoListId: string, newTitle: string) => ({type: 'CHANGE_TODOLIST_TITLE', todoListId, newTitle} as const)
export const changeTodolistFilterAC = (todoListId: string, newFilter: FilterValuesType) => ({type: 'CHANGE_TODOLIST_FILTER', todoListId, newFilter} as const)

// TYPES

type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

export type TodolistDomainType = {
    title: string,
    id: string,
    filter: FilterValuesType,
}

export type FilterValuesType = 'All' | 'Completed' | 'Active'