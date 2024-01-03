import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
    todoListsReducer
} from "./todolists-reducer";

export let todoListId1: string
export let todoListId2: string
export let startTodolist: TodolistDomainType[]
beforeEach(() => {
    todoListId1 = 'TodoList1'
    todoListId2 = 'TodoList2'
    startTodolist = [
        {id: todoListId1, title: 'firstList', filter: "All"},
        {id: todoListId2, title: 'secondList', filter: "All"},
    ]
})

test('correct todoList should be removed', () => {
    const endState = todoListsReducer(startTodolist, removeTodolistAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})
test('correct todoList should be added', () => {
    const title = 'new todo'
    const endState = todoListsReducer(startTodolist, addTodolistAC(title))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(title)
})
test('correct todolist should change its name', () => {
    const newTitle = 'new title'
    const endState = todoListsReducer(startTodolist, changeTodolistTitleAC(todoListId1, newTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTitle)
})
test('correct todolist should change its filter', () => {
    const newFilter: FilterValuesType = 'Completed'
    const endState = todoListsReducer(startTodolist, changeTodolistFilterAC(todoListId1, newFilter))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe(newFilter)
})