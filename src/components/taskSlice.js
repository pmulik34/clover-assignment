import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.tasks.push(action.payload);
    }, 
    deleteTodo: (state, action) => {    
      const tasksToDelete = state.tasks.filter((task) => task.name === action.payload.name);    
      state.tasks = state.tasks.filter((task) => task.name !== action.payload.name);
    },
    
  },
});

export const { addTodo, deleteTodo } = taskSlice.actions;

export default taskSlice.reducer;
