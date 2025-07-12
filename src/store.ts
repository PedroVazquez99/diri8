// filepath: c:\Users\pedra\Desktop\MASTER-UA\disenyoInterRicos\sesion5\compracomida\src\store.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';

const foodSlice = createSlice({
  name: 'food',
  initialState: [],
  reducers: {
    setFoods: (_, action) => action.payload,
    // añade más reducers según tus necesidades
  },
});

export const { setFoods } = foodSlice.actions;

export const store = configureStore({
  reducer: {
    food: foodSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;