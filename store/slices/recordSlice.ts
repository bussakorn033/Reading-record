import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface ReadingRecordState {
    bookTitle?: string;
    date?: string;
    readTime?: number;
    image?: string;
}

export interface RecordState {
    recordList?: any;
}

const initialState: RecordState = {
    recordList: [],
} as const;

export const recordSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setRecordList: (
            state: Draft<any>,
            params: Draft<any>) => {
            const { payload } = params
            state.recordList.push(payload)
        },

        updateRecordList: (
            state: Draft<any>,
            params: Draft<any>
        ) => {
            const { payload } = params
            const { index, updateDataRecord } = payload
            state.recordList[index] = updateDataRecord
        },

        deleteRecordItem: (
            state: Draft<any>,
            params: Draft<any>
        ) => {
            const { payload } = params
            const { index } = payload
            state.recordList.splice(index, 1)
        },



    },
});

export const getRecordState = (state: { record: RecordState }) => state.record;

export const { setRecordList, updateRecordList, deleteRecordItem } = recordSlice.actions;

export default recordSlice.reducer;