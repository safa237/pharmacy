// Wishlist-slice.js

/*import { createSlice , createAction} from '@reduxjs/toolkit';

const localStorageKey = 'wishlist';

const loadWishlistFromStorage = () => {
  const storedWishlist = localStorage.getItem(localStorageKey);
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

const saveWishlistToStorage = (wishlist) => {
  localStorage.setItem(localStorageKey, JSON.stringify(wishlist));
};

export const clearWishlist = createAction('wishlist/clearWishlist');

const initialState = loadWishlistFromStorage();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState, // Use the defined initialState
  reducers: {
    addToWishlist: (state, action) => {
      const productId = action.payload;
      if (!state.includes(productId)) {
  
        saveWishlistToStorage([...state, productId]);
        return [...state, productId];
      }
      return state;
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      const updatedWishlist = state.filter((id) => id !== productId);
      saveWishlistToStorage(updatedWishlist);
      return updatedWishlist;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearWishlist, () => {
      saveWishlistToStorage([]); 
      return []; 
    });
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const selectWishlist = (state) => state.wishlist;

export default wishlistSlice.reducer;


// wishlistSlice.js

/*import { createSlice, createAction } from '@reduxjs/toolkit';

export const loadWishlistFromStorage = (userId) => {
  const storedWishlist = localStorage.getItem(`wishlist_${userId}`);
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

export const saveWishlistToStorage = (userId, wishlist) => {
  localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist));
};

export const clearWishlist = createAction('wishlist/clearWishlist');

// Define the initial state here
const initialState = [];

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState, // Use the defined initialState
  reducers: {
    addToWishlist: (state, action) => {
      const { userId, productId } = action.payload;
      if (!state.includes(productId)) {
        saveWishlistToStorage(userId, [...state, productId]);
        return [...state, productId];
      }
      return state;
    },
    removeFromWishlist: (state, action) => {
      const { userId, productId } = action.payload;
      const updatedWishlist = state.filter((id) => id !== productId);
      saveWishlistToStorage(userId, updatedWishlist);
      return updatedWishlist;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearWishlist, () => {
      // Clear wishlist in Redux state (handled automatically by createSlice)
      return [];
    });
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const selectWishlist = (state) => state.wishlist;

export default wishlistSlice.reducer;*/


// wishlistSlice.js
/*import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

 const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, productId }) => {
    const res = await fetch(
      `https://mostafaben.bsite.net/api/Wishlist?userId=${userId}&productId=${productId}`,
      {
        method: "POST", // or "PUT" or "DELETE" depending on your API
        // Add any headers or body as needed for your API request
      }
    );
    const data = await res.json();
    return data;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    // Add wishlist-specific state if needed
  },
  reducers: {
    // Add any wishlist-specific reducers if needed
  },
  extraReducers: (builder) => {
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      // Handle success if needed
    });
  },
});

export { addToWishlist }; // Export the new action

export default wishlistSlice.reducer;*/




// wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: storedWishlist,
  reducers: {
    addToWishlist: (state, action) => {
      console.log('Adding to wishlist:', action.payload);
      state.push(action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
    removeFromWishlist: (state, action) => {
      console.log('Removing from wishlist:', action.payload);
      const updatedState = state.filter((product) => product.id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(updatedState));
      return updatedState;
    },
    clearWishlist: (state) => {
      localStorage.removeItem('wishlist'); // Clear Wishlist data in local storage
      return [];
    },
  },
});



export const { addToWishlist, removeFromWishlist , clearWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;

