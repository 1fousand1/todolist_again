import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {

    let [todolists, setTodolists] = useState<Array<TodoListType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'}
        ]
    )


    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'SQL', isDone: false}
    ]);




    function removeTask(id: string) {
        let filtredTasks = tasks.filter(t => t.id != id);
        setTasks(filtredTasks);
    }

    function changeTodoListFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl=>tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    function addTasks(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }

    return (
        <div className={'App'}>
            {todolists.map(todolist => {
                let tasksForTodolist = tasks;

                if (todolist.filter === 'active') {
                    tasksForTodolist = tasks.filter(t => t.isDone === false)
                }
                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasks.filter(t => t.isDone === true)
                }

                return <TodoList
                    key={todolist.id}
                    id={todolist.id}
                    title={todolist.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeTodoListFilter={changeTodoListFilter}
                    addTasks={addTasks}
                    changeTaskStatus={changeStatus}
                    filter={todolist.filter}
                />
            })
            }

        </div>
    );
}

export default App;
