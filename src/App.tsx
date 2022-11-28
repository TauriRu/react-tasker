import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import ToDoList from './components/ToDoList';
import { toMake } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [toDo, setTodo] = useState<string | number>("");
  const [toDos, setTodos] = useState<toMake[]>([]);
  const [completedTodos, setCompletedTodos] = useState<toMake[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (toDo) {
      setTodos([...toDos, { id: Date.now(), toDo, isDone: false }])
      setTodo('')
    }
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    
    const { source, destination } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index)
      return;

    let add,
      active = toDos,
      complete = completedTodos;


    if (source.droppableId === 'todosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === 'todosList') {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    setCompletedTodos(complete);
    setTodos(active);

  }

  return (
    <DragDropContext onDragEnd={onDragEnd} >
      <div className='App'>
        <span className='heading'>My Task creator</span>
        <InputField toDo={toDo} setTodo={setTodo} handleAdd={handleAdd} />
        <ToDoList todos={toDos} setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />

      </div>
    </DragDropContext>

  );
}

export default App;
