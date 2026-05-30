import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/APIService";
import { HRLeavesPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRLeaves = createAsyncThunk('HandleGetHRLeaves', async (leaveData, { rejectWithValue }) => {
    try {
        const { apiroute } = leaveData
        const response = await apiService.get(`${HRLeavesPageEndPoints[apiroute]}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const HandlePatchHRLeaves = createAsyncThunk('HandlePatchHRLeaves', async (leaveData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = leaveData
        const response = await apiService.patch(`${HRLeavesPageEndPoints[apiroute]}`, data, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
