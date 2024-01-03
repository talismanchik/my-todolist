import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType,
} from "./tasks-reducer";
import {todoListId1, todoListId2} from "../todolists-reducer.test";
import {addTodolistAC, removeTodolistAC} from "../todolists-reducer";

export let startTasks: TasksStateType

beforeEach(() => {
    startTasks = {
        [todoListId1]: [
            {taskId: '11', title: 'JS', status: true},
            {taskId: '12', title: 'TS', status: true},
            {taskId: '13', title: 'React', status: true},
            {taskId: '14', title: 'Angular', status: false}],
        [todoListId2]: [
            {taskId: '21', title: 'HTML', status: true},
            {taskId: '22', title: 'CSS', status: true},
            {taskId: '23', title: 'Redux', status: true},
            {taskId: '24', title: 'RTK', status: false}]
    }
})

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startTasks, removeTaskAC(todoListId2, '23'))

    expect(endState[todoListId2].length).toBe(3)
    expect(endState[todoListId2][2].title).toBe('RTK')
})
test('correct task should be added from correct array', () => {
    const newTask = 'new task'
    const endState = tasksReducer(startTasks, addTaskAC(todoListId2, newTask))

    expect(endState[todoListId2].length).toBe(5)
    expect(endState[todoListId2][0].title).toBe(newTask)
})
test('title of specified task should be changed', () => {
    const newTitle = 'new title'
    const endState = tasksReducer(startTasks, changeTaskTitleAC(todoListId2, '22', newTitle))

    expect(endState[todoListId2].length).toBe(4)
    expect(endState[todoListId2][1].title).toBe(newTitle)
})
test('status of specified task should be changed', () => {
    const newStatus = true
    const endState = tasksReducer(startTasks, changeTaskStatusAC(todoListId2, '24', newStatus))

    expect(endState[todoListId2].length).toBe(4)
    expect(endState[todoListId2][3].status).toBe(newStatus)
})
test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startTasks, removeTodolistAC(todoListId1))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListId1]).not.toBeDefined()
})
test('property with todolistId should be added', () => {
    const newTitle = 'new title'
    const endState = tasksReducer(startTasks, addTodolistAC(newTitle))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(3)
})
