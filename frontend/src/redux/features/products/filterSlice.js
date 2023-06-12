import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: 'filtered',
  initialState,
  reducers: {
    filterProducts(state, action) {
      const { products, searchTerm } = action.payload;
      const tempProducts = products.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

      state.filteredProducts = tempProducts;
    },
  },
});

export const { filterProducts } = filterSlice.actions;
export const selectFilteredProducts = state => state.filtered.filteredProducts;
export default filterSlice.reducer;
