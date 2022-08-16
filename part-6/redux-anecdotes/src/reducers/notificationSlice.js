import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "text",
  initialState: { content: null, id: null },
  reducers: {
    setNotification: (state, action) => {
      state.id && clearInterval(state.id);
      return { content: action.payload.text, id: action.payload.id };
    },
    removeNotification: (state, action) => {
      return { content: null, id: null };
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;

export const notification = ({ text, ms }) => {
  return (dispatch) => {
    const id = setTimeout(() => {
      dispatch(removeNotification());
    }, ms);
    dispatch(setNotification({ text, id }));
  };
};
