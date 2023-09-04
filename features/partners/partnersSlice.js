import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mapImageURL } from "../../utils/mapImageURL";
import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";

export const fetchPartners = createAsyncThunk(
  "partners/fetchPartners",
  async () => {
    const querySnapshot = await getDocs(collection(db, "partners"));
    const partners = [];
    querySnapshot.forEach((doc) => {
      partners.push(doc.data());
    });
    return partners;
  }
);

const partnersSlice = createSlice({
  name: "partners",
  initialState: { isLoading: true, errMess: null, partnersArray: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMess = null;
        state.partnersArray = mapImageURL(action.payload);
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.error ? action.error.message : "Fetch failed";
      });
  },
});

export const partnersReducer = partnersSlice.reducer;
