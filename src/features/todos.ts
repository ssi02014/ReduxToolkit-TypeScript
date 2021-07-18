import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface todoProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface InititStateProps {
  todos: todoProps[];
  isLoading: boolean;
}

export const getList: any = createAsyncThunk("GET_TODO", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  console.log(response);
  return response.data;
});

const initialState: InititStateProps = {
  todos: [],
  isLoading: false,
};

// const todoReducer = createSlice({
//   name: "todoList",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [getList.pending]: (state, { payload }) => {
//       state.isLoading = true;
//     },
//     [getList.fulfilled]: (state, { payload }) => {
//       state.isLoading = false;
//       state.todos = [...payload];
//     },
//     [getList.rejected]: (state, { payload }) => {
//       state.isLoading = false;
//     },
//   },
// });

const todoReducer = createSlice({
  name: "todoList",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getList.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.todos = [...payload];
      })
      .addCase(getList.rejected, (state, { payload }) => {
        state.isLoading = false;
      }),
});

export default todoReducer.reducer;
