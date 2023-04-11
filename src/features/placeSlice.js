import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  place:null,
};

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPlace: (state ,action) => {
     state.place=action.payload;
    },
    removePlace: (state) => {
      state.place=null;
    },
   
  },
 
});

export const { addPlace,removePlace } = placeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.place.value)`
export const selectplace = (state) => state.place.place;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default placeSlice.reducer;
