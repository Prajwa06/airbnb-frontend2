import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  page:null,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPage:(state,action) =>{
      state.page=action.payload;
    },
    removePage: (state) => {
      state.page=null;
    },
   
  },
 
});

export const { setPage, removePage } = pageSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.page.value)`
export const selectPage = (state) => state.page.page;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default pageSlice.reducer;
