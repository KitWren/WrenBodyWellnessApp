import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";

export const fetchExercises = createAsyncThunk(
  "exercises/fetchExercises",
  async () => {
    const response = await fetch(baseUrl + "exercises");
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status: " + response.status);
    }
    const data = await response.json();
    return data;
  }
);

const exercisesSlice = createSlice({
  name: "exercises",
  initialState: { isLoading: true, errMess: null, exercisesArray: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMess = null;
        state.exercisesArray = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.error ? action.error.message : "Fetch failed";
      });
  },
});

export const exercisesReducer = exercisesSlice.reducer;
