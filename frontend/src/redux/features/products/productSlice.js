import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from './productService';
import { toast } from 'react-toastify';

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createProduct = createAsyncThunk(
  'product/create',
  async (formData, thunkApi) => {
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const getAllProducts = createAsyncThunk(
  'product/getall',
  async (_, thunkApi) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    calcStoreValue(state) {
      console.log(state);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = true;
        state.products.push(action.payload);
        toast.success('Product added successfully');
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { calcStoreValue } = productSlice.actions;

export const selectIsLoading = state => state.product.isLoading;

export default productSlice.reducer;
