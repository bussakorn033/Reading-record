import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface ReadingRecordState {
    bookTitle?: string;
    date?: string;
    readTime?: number;
    image?: string;
    id?: string;
}

export interface RecordState {
    recordList?: any;
    recordItemSelect?: ReadingRecordState;
    recordIndexSelect?: number;
}

const initialState: RecordState = {
    recordList: [],
    recordItemSelect: {},
    recordIndexSelect: 0,
} as const;

export const recordSlice = createSlice({
    name: 'record',
    initialState,
    reducers: {

        setRecordField: (
            state: Draft<any>,
            params: Draft<any>) => {
            const { payload } = params
            const { key, value } = payload
            state[key] = value
        },

        setRecordList: (
            state: Draft<any>,
            params: Draft<any>) => {
            const { payload } = params
            state.recordList.push(payload)
        },

        setRecordSelect: (
            state: Draft<any>,
            params: Draft<any>) => {
            const { payload } = params
            const { recordItem, recordIndex } = payload
            state.recordItemSelect = recordItem
            state.recordIndexSelect = recordIndex
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

export const { setRecordField, setRecordSelect, setRecordList, updateRecordList, deleteRecordItem } = recordSlice.actions;

export default recordSlice.reducer;