import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const filterSlice = createSlice({
    name: "value",
    initialState,
    reducers: {
        setFilterValue: (state, action) => action.payload
    }
})

export const { setFilterValue } = filterSlice.actions;
export default filterSlice.reducer;