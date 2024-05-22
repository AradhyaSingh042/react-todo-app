import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

let todoList = JSON.parse(localStorage.getItem("todoList"));
let savedList = [];
if (todoList) {
  savedList = todoList;
}

const initialState = {
  allTodos: savedList,
  activeTodos: [],
  completedTodos: [],
};

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.allTodos.push(action.payload);
      //local storage
      localStorage.setItem("todoList", JSON.stringify(state.allTodos));
      //toasts
      toast.success("Todo Added Successfully");
    },

    removeTodo: (state, action) => {
      state.allTodos = state.allTodos.filter((todo) => {
        return todo.todoId !== action.payload;
      });
      //local storage
      localStorage.setItem("todoList", JSON.stringify(state.allTodos));
      //toasts
      toast.error("Todo Removed Successfully");
    },

    editTodo: (state, action) => {
      delete state.allTodos.find((todo) => {
        return todo.todoId === action.payload;
      }).todoContent;
      //local storage
      localStorage.setItem("todoList", JSON.stringify(state.allTodos));
    },

    updateTodo: (state, action) => {
      state.allTodos.find((todo) => {
        return todo.todoId === action.payload.todoId;
      }).todoContent = action.payload.todoContent;
      //local storage
      localStorage.setItem("todoList", JSON.stringify(state.allTodos));
      //toasts
      toast("Todo Updated Successfully", {
        icon: "👏",
      });
    },

    completeTodo: (state, action) => {
      state.allTodos.find((todo) => {
        return todo.todoId === action.payload.todoId;
      }).isCompleted = action.payload.isCompleted;
      //local storage
      localStorage.setItem("todoList", JSON.stringify(state.allTodos));
    },

    filterTodo: (state, action) => {
      state.activeTodos.splice(0, state.activeTodos.length);
      state.completedTodos.splice(0, state.completedTodos.length);
      for (let todo of state.allTodos) {
        if (todo.isCompleted) {
          state.completedTodos.push(todo);
        } else {
          state.activeTodos.push(todo);
        }
      }
    },

    clearCompleted: (state, action) => {
      state.allTodos = state.allTodos.filter((todo) => {
        return !todo.isCompleted;
      });
      state.completedTodos.splice(0, state.completedTodos.length);
    },
  },
});

export const {
  addTodo,
  removeTodo,
  editTodo,
  updateTodo,
  completeTodo,
  filterTodo,
  clearCompleted,
} = TodoSlice.actions;

export default TodoSlice.reducer;
