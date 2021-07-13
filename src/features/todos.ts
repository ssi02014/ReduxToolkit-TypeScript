import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface todoProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getList: any = createAsyncThunk("GET_TODO", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  console.log(response);
  return response.data;
});

const initialState: todoProps[] = [];

const todoReducer = createSlice({
  name: "todoList",
  initialState,
  reducers: {},
  extraReducers: {
    [getList.fulfilled]: (state, { payload }) => [...payload],
    // [getList.rejected]: (state, { payload }) => ["sibal"],
  },
});

export default todoReducer.reducer;
