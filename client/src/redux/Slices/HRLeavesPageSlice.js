import { createSlice } from "@reduxjs/toolkit";
import { AsyncReducer } from "../AsyncReducers/asyncreducer.js";
import { HandleGetHRLeaves, HandlePatchHRLeaves } from "../Thunks/HRLeavesThunk.js";

const HRLeavesPageSlice = createSlice({
    name: "HRLeaves",
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
        AsyncReducer(builder, HandleGetHRLeaves)
        AsyncReducer(builder, HandlePatchHRLeaves)
    },
})

export default HRLeavesPageSlice.reducer
