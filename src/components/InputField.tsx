import React, { useRef } from 'react';
import './styles.css';


interface Props {
   toDo: string | number;
   setTodo: React.Dispatch<React.SetStateAction<string | number>>;
   handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ toDo, setTodo, handleAdd }) => {
   const inputRef = useRef<HTMLInputElement>(null)
   return (

      <form className='input' onSubmit={(e) => {
         handleAdd(e)
         inputRef.current?.blur()
      }}>
         <input type="input" value={toDo}
            ref={inputRef}
            onChange={
               (e) => setTodo(e.target.value)
            }
            placeholder='Enter a task' className='inputBox' />
         <button className='inputSubmit'>LeGo</button>

      </form>


   );
}

export default InputField;
