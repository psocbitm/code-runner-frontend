import { createSlice } from "@reduxjs/toolkit"

const codeSlice = createSlice({
  name: "code",
  initialState: { value: "" },
  reducers: {
    setCode: (state, action) => {
      state.value = action.payload
    },
    clearCode: (state) => {
      state.value = ""
    }
  },
})

export const { setCode, clearCode } = codeSlice.actions
export default codeSlice.reducer
