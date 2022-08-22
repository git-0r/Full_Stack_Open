const { createSlice } = require("@reduxjs/toolkit")

const statusSlice = createSlice({
    name: "status",
    initialState: { text: null, status: null, id: null },
    reducers: {
        setStatus: (state, action) => {
            console.log(state, action)
            return { ...state, ...action.payload }
        },
        clearPrevStatus: (state) => {
            if (state.id) {
                clearInterval(state.id)
                return { message: null, status: null, id: null }
            }
        }
    }
})

export const { setStatus, clearPrevStatus } = statusSlice.actions
export default statusSlice.reducer

export const showStatus = (message) => {
    return async (dispatch) => {

        dispatch(clearPrevStatus())
        const id = setTimeout(() => {
            dispatch(clearPrevStatus())
        }, 3000)
        dispatch(setStatus({ ...message, id }))
    }
}