import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";
import { mapImageURL } from "../../utils/mapImageURL";

export const fetchExercises = createAsyncThunk(
  "exercises/fetchExercises",
  async () => {
    const querySnapshot = await getDocs(collection(db, "exercises"));
    const exercises = [];
    querySnapshot.forEach((doc) => {
      exercises.push(doc.data());
    });
    return exercises;
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
        state.exercisesArray = mapImageURL(action.payload);
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.error ? action.error.message : "Fetch failed";
      });
  },
});

export const exercisesReducer = exercisesSlice.reducer;
