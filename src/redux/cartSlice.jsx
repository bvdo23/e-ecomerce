// src/redux/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            state.items.push(newItem);
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(item => item.product_id !== productId);
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
