import { createSlice } from "@reduxjs/toolkit";

const dashBoardSlice = createSlice({
  name: "dashBoardSlice",
  initialState: false,
  reducers: {
    
     toggleSideBarOpen: (state) => !state,
    toggleSideBarClose: () => false,
  },
});

export const { toggleSideBarOpen, toggleSideBarClose } = dashBoardSlice.actions;
export default dashBoardSlice.reducer;
