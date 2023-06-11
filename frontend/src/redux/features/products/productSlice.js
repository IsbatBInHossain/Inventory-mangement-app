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

const createProduct = createAsyncThunk(
  'product/create',
  async (formData, thunkApi) => {
    try {
      return await productService.createProduct();
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
        state.products.push(action.paload);
        console.log(action.payload);
        toast.success('Product added successfully');
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error('Failed to add Product');
      });
  },
});

export const { calcStoreValue } = productSlice.actions;

export default productSlice.reducer;
