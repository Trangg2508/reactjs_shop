import { createSlice } from "@reduxjs/toolkit";

const LOVE_LOCAL_STORAGE_KEY = "loveList";

const loveSlice = createSlice({
    name: 'love',
    initialState: {
        loveItem: JSON.parse(localStorage.getItem(LOVE_LOCAL_STORAGE_KEY)) || [],
    },
    reducers: {
        addToList: (state, action) => {
            const newItem = { ...action.payload };
            const updatedList = [...state.loveItem, newItem];
            localStorage.setItem(LOVE_LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
            return { ...state, loveItem: updatedList };
        },

        removeFromList: (state, action) => {
            const movieID = action.payload;
            const updatedList = state.loveItem.filter(item => item.id !== movieID);
            localStorage.setItem(LOVE_LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
            return { ...state, loveItem: updatedList };
        },

        clearList: (state) => {
            localStorage.removeItem(LOVE_LOCAL_STORAGE_KEY);
            return { ...state, loveItem: [] };
        },
    }

});

export const { addToList, removeFromList, clearList } = loveSlice.actions;
export default loveSlice.reducer;