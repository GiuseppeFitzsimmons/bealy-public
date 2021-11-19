import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFromServer, postToServer } from './serverCalls';
var FileSaver = require('file-saver');
var mimeDb = require('mime-db');
var mimeDictionary;
function guessMime(fileName) {
    if (!mimeDictionary) {
        mimeDictionary = {};
        for (var everyType in mimeDb) {
            let everyExtension = mimeDb[everyType];
            if (everyExtension.extensions) {
                for (var extension in everyExtension.extensions) {
                    mimeDictionary[everyExtension.extensions[extension]] = everyType;
                }
            }
        }
    }
    try {
        return mimeDictionary[fileName.split('.').pop()];
    } catch (err) {
        console.log("Error guessing mime", fileName);
        return 'text/plain'
    }
}

const initialState = {
    status: 'idle',
    error: undefined,
    actionQueue: []
};

export const createRoomAsync = createAsyncThunk(
    'room/create',
    async (payload) => {
        const response = await postToServer({
            resource: 'room',
            params: payload
        });
        return response
    }
);
export const getRoomsAsync = createAsyncThunk(
    'room/get',
    async (payload) => {
        const response = await getFromServer({
            resource: 'room'
        });
        console.log('response', response)
        return response
    }
);

export const uploadFileAsync = createAsyncThunk(
    'upload/post',
    async (payload) => {
        console.log('postToServer payload', payload)
        const response = await postToServer({
            resource: 'upload',
            params: payload
        });
        console.log('after postToServer')
        return response
    }
)

export const getFileAsync = createAsyncThunk(
    'file/get',
    async (payload) => {
        const response = await getFromServer({
            resource: 'file',
            params: payload
        });
        console.log('getFileAsync response', response)
        return response
    }
)

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRoomAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getRoomsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getRoomsAsync.fulfilled, (state, action) => {
                console.log('getRoomsAsync.fulfilled');
                state.status = 'idle';
                state.rooms = action.payload;
            })
            .addCase(uploadFileAsync.pending, (state) => {
                console.log('uploadFileAsync pending');
                state.status = 'loading';
            })
            .addCase(uploadFileAsync.fulfilled, (state, action) => {
                console.log('uploadFileAsync fulfilled');
                state.status = 'idle';
            })
            .addCase(getFileAsync.pending, (state) => {
                console.log('getFileAsync pending');
                state.status = 'loading';
            })
            .addCase(getFileAsync.fulfilled, (state, action) => {
                console.log('getFileAsync fulfilled', action);
                //var blob = new Blob(action.payload[0].fileContents.data, { type: guessMime(action.payload[0].fileId) });
                var file = window.URL.createObjectURL(action.payload[0].fileContents.data);
                window.location.assign(file);
                //FileSaver.saveAs(blob, action.payload[0].fileId);
                state.status = 'idle';
            })
    }
});

export default roomSlice.reducer;