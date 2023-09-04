import { configureStore } from "@reduxjs/toolkit";
import { appointmentsReducer } from "../features/appointments/appointmentsSlice";
import { commentsReducer } from "../features/comments/commentsSlice";
import { partnersReducer } from "../features/partners/partnersSlice";
import { promotionsReducer } from "../features/promotions/promotionsSlice";
import { favoritesReducer } from "../features/favorites/favoritesSlice";
import { exercisesReducer } from "../features/exercises/exercisesSlice";
import {
  persistStore,
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
  key: "root",
  storage: AsyncStorage,
  debug: true,
};

export const store = configureStore({
  reducer: persistCombineReducers(config, {
    appointments: appointmentsReducer,
    comments: commentsReducer,
    partners: partnersReducer,
    promotions: promotionsReducer,
    favorites: favoritesReducer,
    exercises: exercisesReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
