import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const policySplice = createSlice({
  name: "policy",
  initialState,
  reducers: {
    addpolicy: (state, action) => {
      state.tasks.push(action.payload);
    }, 
    deletepolicy: (state, action) => {    
      const tasksToDelete = state.tasks.filter((task) => task.name === action.payload.name);    
      state.tasks = state.tasks.filter((task) => task.name !== action.payload.name);
    },
    
  },
});

export const { addpolicy, deletepolicy } = policySplice.actions;

export default policySplice.reducer;
