import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: [],
};

export const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, action) => {
      state.modules.push(action.payload);
    },
    updateModule: (state, action) => {
      const index = state.modules.findIndex(
        (module) => module.id === action.payload.id
      );
      if (index !== -1) {
        state.modules[index] = action.payload;
      }
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module) => module.id !== action.payload
      );
    },
  },
});

export const { addModule, updateModule, deleteModule } = modulesSlice.actions;

export default modulesSlice.reducer;
