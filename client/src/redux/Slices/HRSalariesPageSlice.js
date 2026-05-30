import { createSlice } from "@reduxjs/toolkit";
import { AsyncReducer } from "../AsyncReducers/asyncreducer.js";
import { HandleGetHRSalaries, HandlePatchHRSalaries } from "../Thunks/HRSalariesThunk.js";

const HRSalariesPageSlice = createSlice({
    name: "HRSalaries",
    initialState: {
        data: null,
        isLoading: false,
        success: false,
        error: {
            status: false,
            message: null,
            content: null,
        },
    },
    extraReducers: (builder) => {
        AsyncReducer(builder, HandleGetHRSalaries)
        AsyncReducer(builder, HandlePatchHRSalaries)
    },
})

export default HRSalariesPageSlice.reducer
