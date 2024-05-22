import React, { useRef, useState } from "react";
import {
  removeTodo,
  editTodo,
  updateTodo,
  completeTodo,
} from "../redux/slices/TodoSlice";

import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { motion, useDragControls } from "framer-motion";

function Todo({ todoData }) {
  const controls = useDragControls();

  const [isEdited, setIsEdited] = useState(false);

  const dispatch = useDispatch();

  function deleteTodo() {
    dispatch(removeTodo(todoData.todoId));
  }

  const todoField = useRef();

  function modifyTodo() {
    setIsEdited(true);
    todoField.current.removeAttribute("readonly");
    // todoField.current.value = "";
    todoField.current.focus();
    dispatch(editTodo(todoData.todoId));
  }

  function setTodo() {
    dispatch(
      updateTodo({
        todoId: todoData.todoId,
        todoContent: todoField.current.value,
      })
    );
    todoField.current.setAttribute("readonly", "readonly");
    setIsEdited(false);
  }

  function todoComplete() {
    if (todoData.isCompleted) {
      dispatch(
        completeTodo({
          todoId: todoData.todoId,
          isCompleted: false,
        })
      );

      return;
    }
    dispatch(
      completeTodo({
        todoId: todoData.todoId,
        isCompleted: true,
      })
    );
  }

  return (
    <>
      <motion.div
        drag="y"
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
        dragElastic={0.25}
        className="todo flex flex-row justify-between relative shadow-md w-full"
      >
        <input
          type="checkbox"
          className={`absolute left-5 top-1/2 translate-y-[-50%] border-2 border-slate-500 scale-150 cursor-pointer appearance-none w-4 h-4 rounded-full flex justify-center items-center ${
            todoData.isCompleted
              ? "bg-sky-400 before:content-['✔'] before:text-[11px] before:absolute before:text-slate-500 before:font-bold before:top-1/2 before:translate-y-[-36%]"
              : "bg-white"
          }`}
          onClick={todoComplete}
        />
        <input
          type="text"
          value={todoData.todoContent}
          ref={todoField}
          readOnly
          className={`w-full py-4 bg-white dark:bg-[#25273C] dark:text-white pl-14 rounded-lg text-xl text-[#535353] cursor-pointer focus:outline-none focus:bg-slate-300 ${
            todoData.isCompleted ? "line-through" : "no-underline"
          }`}
        />
        <div className="absolute right-3 top-1/2 translate-y-[-50%] flex flex-row items-center gap-2">
          <button
            className="bg-violet-400 text-white py-2 px-3 rounded-lg font-semibold flex justify-center items-center"
            onClick={modifyTodo}
          >
            <FaEdit fontSize="1.5rem" />
          </button>
          {isEdited ? (
            <button
              className="bg-cyan-400 text-white py-2 px-3 rounded-lg font-semibold flex justify-center items-center"
              onClick={setTodo}
            >
              <IoAddCircleOutline fontSize="1.5rem" />
            </button>
          ) : (
            <button
              className="bg-red-400 text-white py-2 px-3 rounded-lg font-semibold flex justify-center items-center"
              onClick={deleteTodo}
            >
              <MdDelete fontSize="1.5rem" />
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default Todo;
