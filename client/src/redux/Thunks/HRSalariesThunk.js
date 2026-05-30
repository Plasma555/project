import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/APIService";
import { HRSalariesPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRSalaries = createAsyncThunk('HandleGetHRSalaries', async (salaryData, { rejectWithValue }) => {
    try {
        const { apiroute } = salaryData
        const response = await apiService.get(`${HRSalariesPageEndPoints[apiroute]}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const HandlePatchHRSalaries = createAsyncThunk('HandlePatchHRSalaries', async (salaryData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = salaryData
        const response = await apiService.patch(`${HRSalariesPageEndPoints[apiroute]}`, data, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
