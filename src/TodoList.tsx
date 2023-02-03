import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (value: FilterValuesType, todolistId: string) => void
    addTasks: (title: string) => void
    changeTaskStatus: (taskId:string, isDone:boolean) => void
    filter: string
}

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList = (props: PropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTasks = () => {
        if (title.trim() !=='') {
            props.addTasks(title);
            setTitle('')
        } else{
            setError('Title is required!')
        }
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTasks()
        }
    }

    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.id)


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                />
                <button onClick={addTasks}>+</button>
                {error && <div className={'error-message'}>{error}</div>}

            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onClickHandler = () => props.removeTask(t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue);

                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ""}>
                            <input type='checkbox' checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>

                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ''} onClick={handlerCreator('all')}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ''} onClick={handlerCreator('active')}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ''} onClick={handlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    )
};

export default TodoList;