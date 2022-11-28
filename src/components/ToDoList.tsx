import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { toMake } from '../model';
import SingleToDo from './SingleToDo';
import './styles.css';

interface Props {
    todos: toMake[];
    setTodos: React.Dispatch<React.SetStateAction<toMake[]>>;
    completedTodos: toMake[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<toMake[]>>;
}

const ToDoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {

    return (

        <div className='container'>
            <Droppable droppableId="todosList">
                {(provided, snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : " "}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className='todo_heading'>Active Tasks</span>
                        {todos.map((todo, index) => (
                            <SingleToDo
                                index={index}
                                todo={todo}
                                key={todo.id}
                                todos={todos}
                                setTodos={setTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )
                }
            </Droppable>
            <Droppable droppableId='todosRemove'>
                {(provided, snapshot) => (
                    <div className={`todos remove ${snapshot.isDraggingOver ? "dragremove" : " "}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className='todo_heading'>completed Tasks</span>
                        {completedTodos.map((todo, index) => (
                            <SingleToDo
                                index={index}
                                todo={todo}
                                key={todo.id}
                                todos={completedTodos}
                                setTodos={setCompletedTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        </div>

    );
}

export default ToDoList;
