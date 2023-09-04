import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mapImageURL } from "../../utils/mapImageURL";
import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async () => {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push(doc.data());
    });
    return appointments;
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: { isLoading: true, errMess: null, appointmentsArray: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMess = null;
        state.appointmentsArray = mapImageURL(action.payload);
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.error ? action.error.message : "Fetch failed";
      });
  },
});

export const appointmentsReducer = appointmentsSlice.reducer;
