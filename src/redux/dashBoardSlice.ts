import { createSlice } from "@reduxjs/toolkit";

const dashBoardSlice = createSlice({
  name: "dashBoardSlice",
  initialState: false,
  reducers: {
    toggleSideBar: state => !state,
  },
});

export const { toggleSideBar } = dashBoardSlice.actions;
export default dashBoardSlice.reducer;
