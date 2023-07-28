import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const addToRoster = createAsyncThunk(
    'roster/addToRoster',
    async (characterData, { getState }) => {
        try {
            const { auth } = getState()
            const { userToken } = auth
            const response = await axios.post('http://localhost:3001/add-to-roster', characterData, {
                headers: {
                    authorization: userToken
                }
            })
            console.log("THIS IS RESPONSE", response)
            return response.data
        } catch (err) {
            console.log('We had an issue with your request', err)
            alert('Try again')
        }
    }
)

export const getRoster = createAsyncThunk(
    'roster/getRoster',
    async (_, { getState }) => {
        try {
            const { auth } = getState()
            const { userToken } = auth
            console.log(userToken)
            const response = await axios.get('http://localhost:3001/view-roster', {
                headers: {
                    authorization: userToken
                }
            })
            console.log("THIS IS RESPONSE", response)
            return response.data
        } catch (err) {
            console.log('We had an issue with your request', err)
            alert('Try again')
        }
    }
)

export const createRoster = createAsyncThunk(
    'roster/createRoster', 
    async (rosterData, { getState }) => {
    try {
        const { auth } = getState()
        const { userToken } = auth

        const response = await axios.post('http://localhost:3001/create-roster', rosterData, {
            headers: {
                Authorization: userToken
            }
        })
    console.log(response)
    return response.data
    } catch (err) {
        console.log('We had an issue with your request', err)
        alert('Try again')
    }
})

const rosterSlice = createSlice({
    name: 'roster',
    initialState: {
        roster: {
            name: '',
            characters: [],
          },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRoster.fulfilled, (state, action) => {
            state.roster = action.payload
        })
        builder.addCase(createRoster.fulfilled, (state, action) => {
            state.roster = action.payload
        })
        builder.addCase(addToRoster.fulfilled, (state, action) => {
            state.roster = action.payload
        })
    }
})

export default rosterSlice.reducer;