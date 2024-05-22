import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo";
import { addTodo, filterTodo, clearCompleted } from "../redux/slices/TodoSlice";
import { nanoid } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function Todos() {
  // themes
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  function themeHandler() {
    if (theme === "dark") {
      toast("Back to Light!", {
        icon: "☀️",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
        },
      });
    } else {
      toast("Hello Darkness!", {
        icon: "🌙",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const dispatch = useDispatch();

  const allTodos = useSelector((state) => {
    return state.todo.allTodos;
  });

  const activeTodos = useSelector((state) => {
    return state.todo.activeTodos;
  });

  const completedTodos = useSelector((state) => {
    return state.todo.completedTodos;
  });

  const [all, setAll] = useState(true);
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  const todoInput = useRef();
  const todoId = useRef(null);
  const todoContent = useRef("");
  const isCompleted = useRef(false);

  function createTodo() {
    if (todoInput.current.value) {
      todoId.current = nanoid();
      todoContent.current = todoInput.current.value;
      dispatch(
        addTodo({
          todoId: todoId.current,
          todoContent: todoContent.current,
          isCompleted: isCompleted.current,
        })
      );
    }
  }

  useEffect(() => {
    dispatch(filterTodo());
  }, [allTodos]);

  return (
    <>
      <div className="todos flex flex-col w-10/12 md:max-w-[46%] absolute top-5 lg:top-28 gap-5 pb-8">
        <div className="w-full py-2 flex justify-between items-center">
          <h2 className="text-white uppercase text-4xl font-semibold tracking-wider">
            Todo
          </h2>
          <button onClick={themeHandler}>
            {theme === "dark" ? (
              <MdLightMode fontSize="2rem" fill="#ffffff" />
            ) : (
              <MdDarkMode fontSize="2.25rem" fill="#ffffff" />
            )}
          </button>
        </div>

        <div className="flex flex-row gap-4 relative shadow-md ">
          <input
            type="text"
            maxLength="42"
            ref={todoInput}
            placeholder="Create a new todo..."
            className="todo-input w-full py-4 bg-white px-4 rounded-xl text-xl placeholder:relative placeholder:top-[0.5px]"
          />
          <div className="absolute right-3 top-1/2">
            <button
              className=" translate-y-[-50%] bg-green-400 text-white py-2 px-3.5 rounded-lg font-semibold"
              onClick={createTodo}
            >
              Create
            </button>
          </div>
        </div>
        {allTodos.length > 0 ? (
          <div className="todos-container w-full h-max rounded-xl overflow-hidden bg-slate-50 dark:bg-[#25273C] flex flex-col gap-2 mt-5">
            {all &&
              allTodos.map((todo) => {
                return <Todo key={todo.todoId} todoData={todo} />;
              })}

            {active &&
              activeTodos.map((todo) => {
                return <Todo key={todo.todoId} todoData={todo} />;
              })}

            {completed &&
              completedTodos.map((todo) => {
                return <Todo key={todo.todoId} todoData={todo} />;
              })}

            <div className="footer-container w-full mt-5 h-max bg-slate-400 dark:bg-slate-600 flex flex-row flex-wrap justify-center md:justify-between items-center px-4 py-3.5">
              <span className="text-white cursor-pointer my-1 md:my-0">
                {activeTodos.length} items left
              </span>
              <div className="filter-container flex gap-4 items-center ml-2 text-white capitalize cursor-pointer my-1 md:my-0">
                <button
                  onClick={(e) => {
                    setAll(true);
                    setActive(false);
                    setCompleted(false);
                  }}
                  className="hover:text-cyan-400 transition-all duration-200"
                >
                  All
                </button>
                <button
                  onClick={(e) => {
                    setAll(false);
                    setActive(true);
                    setCompleted(false);
                  }}
                  className="hover:text-cyan-400 transition-all duration-200"
                >
                  Active
                </button>
                <button
                  onClick={(e) => {
                    setAll(false);
                    setActive(false);
                    setCompleted(true);
                  }}
                  className="hover:text-cyan-400 transition-all duration-200 my-1 md:my-0"
                >
                  Completed
                </button>
              </div>
              <button
                className="text-white capitalize cursor-pointer hover:text-cyan-400 transition-all duration-200"
                onClick={(e) => {
                  dispatch(clearCompleted());
                }}
              >
                clear completed
              </button>
            </div>
          </div>
        ) : (
          <div className="py-1 px-6 bg-cyan-400 rounded-xl w-full flex justify-center mt-7">
            <p className="text-2xl font-semibold mt-2 text-[#535353]">
              No Todo Found!
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Todos;
