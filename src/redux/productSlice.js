import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Base API endpoint to fetch all products with a limit (not currently used)
const API_URL = "https://dummyjson.com/products?limit=100"; 
// Thunk to fetch paginated products for infinite scroll
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page = 1, thunkAPI) => {
    try {
      const limit = 10;
      const skip = (page - 1) * limit;
      const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      const data = await res.json();
      return { products: data.products, total: data.total, page };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Thunk to fetch all available product categories
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const categories = await res.json();
      return categories;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Thunk to fetch all products at once (for filtering)
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      return data.products;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Thunk to fetch details of a specific product by its ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    return await res.json();
  }
);

// Redux slice to manage all product-related state and actions
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
    total: 0,
    categories: [],
    searchQuery: "",
    selectedCategories: [],
    priceRange: { min: "", max: "" },
    allProducts: [],
  },
  reducers: {
    // Updates the search query in the state
    setSearchQuery: (state, action) => {
      console.log("🔍 Search query set to:", action.payload);
      state.searchQuery = action.payload;
    },
    // Updates selected categories based on user filter interaction
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
    // Updates the selected price range (not actively used now)
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loading state when products are being fetched
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Append newly fetched products and update pagination and loading state
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload.products];
        state.loading = false;
        state.page = action.payload.page + 1;
        state.total = action.payload.total;
        state.hasMore = state.items.length < action.payload.total;
      })
      // Handle error state when product fetch fails
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Store fetched category list in state
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      // Clear currently selected product before new fetch
      .addCase(fetchProductById.pending, (state) => {
        state.selectedProduct = null;
      })
      // Store the fetched product details in the state
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
  },
});

export const { setSearchQuery, setSelectedCategories, setPriceRange } =
  productSlice.actions;

export default productSlice.reducer;